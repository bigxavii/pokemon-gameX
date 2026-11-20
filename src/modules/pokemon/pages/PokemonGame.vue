<template>
    <section v-if="hasError" class="flex flex-col justify-center items-center min-h-screen w-full px-4 text-center">
        <h1 class="text-2xl">No se pudieron cargar los Pokémon</h1>
        <button
            @click="getNextRound()"
            class="mt-4 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-all cursor-pointer">
            Reintentar
        </button>
    </section>

    <section v-else-if="isLoading || !randomPokemon" class="flex flex-col justify-center items-center min-h-screen w-full px-4 text-center">
        <h1 class="text-3xl">Espere por favor</h1>
        <h3 class="animate-pulse">Cargando Pokémons</h3>
    </section>

    <section v-else class="flex flex-col justify-center items-center min-h-screen w-full px-4 py-6">
        <h1 class="text-2xl sm:text-3xl text-center">¿Quién es este Pokémon?</h1>

        <h3 v-if="gameStatus === GameStatus.Won" class="mt-2 text-xl text-green-600 text-center">
            ¡Ganaste! Era <span class="capitalize">{{ randomPokemon.name }}</span>
        </h3>
        <h3 v-else-if="gameStatus === GameStatus.Lost" class="mt-2 text-xl text-red-600 text-center">
            Perdiste, era <span class="capitalize">{{ randomPokemon.name }}</span>
        </h3>
        <h3 v-else class="mt-2 text-xl text-center">Elige una opción</h3>

        <div class="h-16 flex items-center">
            <button v-if="gameStatus !== GameStatus.Playing"
                @click="getNextRound()"
                class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition-all cursor-pointer">
                ¿Jugar de nuevo?
            </button>
        </div>

        <!-- Pokemon Picture -->
        <PokemonPicture :pokemon-id="randomPokemon.id" :show-pokemon="gameStatus !== GameStatus.Playing"/>

        <PokemonOptions
            :options="options"
            :block-selection="gameStatus !== GameStatus.Playing"
            :correct-answer="randomPokemon.id"
            @selected-option="checkAnswer"/>

        <!-- Estadísticas -->
        <div class="mt-6 bg-white shadow-md rounded-lg px-8 py-3 text-center">
            <h3 class="font-bold mb-1">Estadísticas</h3>
            <div class="flex gap-8 justify-center">
                <p>Ganados: <span class="font-bold text-green-600">{{ gamesWon }}</span></p>
                <p>Perdidos: <span class="font-bold text-red-600">{{ gamesLost }}</span></p>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import PokemonOptions from '@/components/PokemonOptions.vue';
import PokemonPicture from '../components/PokemonPicture.vue';
import { usePokemonGame } from '../composables/usePokemonGame.ts';
import { GameStatus } from '../interfaces/game-status-enum.ts';

const {
    randomPokemon,
    isLoading,
    hasError,
    gameStatus,
    pokemonOptions: options,
    gamesWon,
    gamesLost,
    checkAnswer,
    getNextRound,
} = usePokemonGame();
</script>

<style scoped>
</style>
