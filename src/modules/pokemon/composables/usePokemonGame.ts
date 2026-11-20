import { computed, onMounted, ref } from 'vue'
import { GameStatus, type Pokemon, type PokemonListResponse } from "../interfaces"
import { pokemonApi } from '../api/pokemonApi';
import confetti from 'canvas-confetti';

export const usePokemonGame = () => {

    const gameStatus = ref<GameStatus>(GameStatus.Playing);
    const pokemons = ref<Pokemon[]>([])
    const pokemonOptions = ref<Pokemon[]>([]);
    const isLoading = computed(() => pokemons.value.length === 0);
    const hasError = ref(false);

    // Estadísticas del juego
    const gamesWon = ref(0);
    const gamesLost = ref(0);


    const randomPokemon = computed(() => {
        const randomIndex = Math.floor(Math.random() * pokemonOptions.value.length);
        return pokemonOptions.value[randomIndex];
    });

    const getPokemons = async () => {
        const response = await pokemonApi.get<PokemonListResponse>('/?limit=151');
        const pokemonsArray = response.data.results.map(pokemon => {
            const urlParts = pokemon.url.split('/');
            const id = urlParts.at(-2) ?? 0;
            return {
                name: pokemon.name,
                id: +id,
            }
        });
        return pokemonsArray.sort(() => Math.random() - 0.5);
    };

    const getNextRound = async (howMany: number = 5) => {
        hasError.value = false;

        try {
            if (pokemons.value.length < howMany) {
                pokemons.value = await getPokemons();
            }

            gameStatus.value = GameStatus.Playing;
            pokemonOptions.value = pokemons.value.slice(0, howMany);
            pokemons.value = pokemons.value.slice(howMany);
        } catch (error) {
            hasError.value = true;
        }
    };

    const checkAnswer = (id: number) => {
        if (gameStatus.value !== GameStatus.Playing) return;

        const hasWon = randomPokemon.value?.id === id;

        if (hasWon) {
            gameStatus.value = GameStatus.Won;
            gamesWon.value++;
            confetti({
                particleCount: 300,
                spread: 150,
                origin: {
                    y: 0.6
                },
            });
            return;
        }

        gameStatus.value = GameStatus.Lost;
        gamesLost.value++;
    }

    onMounted(() => {
        getNextRound();
    });

    return {
        gameStatus,
        isLoading,
        hasError,
        pokemonOptions,
        randomPokemon,
        gamesWon,
        gamesLost,
        getNextRound,
        checkAnswer,
    };
}
