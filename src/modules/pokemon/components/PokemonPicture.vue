<template>
    <section>
        <img
            :src="pokemonImage"
            alt="Pokémon"
            class="h-[180px] sm:h-[240px] max-w-full transition-all duration-500"
            :class="{ 'brightness-0': !showPokemon }"
        />
    </section>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

interface Props {
    pokemonId: number;
    showPokemon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showPokemon: false,
});

const pokemonImage = computed(() => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.pokemonId}.svg`);
</script>

<style scoped>
img{
    user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
}
</style>
