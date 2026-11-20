<template>
    <section class="mt-5 flex flex-wrap justify-center max-w-xl">
        <button
            v-for="{ name, id } in options"
            :key="id"
            @click="$emit('selectedOption', id)"
            :class="['capitalize', {
                correct: id === correctAnswer && blockSelection,
                incorrect: id !== correctAnswer && blockSelection
            }]"
            :disabled="blockSelection">
            {{ name }}
        </button>
    </section>
</template>

<script lang="ts" setup>
import type { Pokemon } from '@/modules/pokemon/interfaces';

interface Props {
    options: Pokemon[];
    blockSelection: boolean;
    correctAnswer: number;
}

defineProps<Props>();

defineEmits<{
    selectedOption: [id: number];
}>();
</script>

<style scoped>
@reference "tailwindcss";

button{
    @apply bg-white text-gray-800 shadow-md rounded-lg p-3 m-2 cursor-pointer w-40 text-center transition-all hover:bg-gray-100;
}

button:disabled{
    @apply cursor-not-allowed shadow-none;
}

button.correct{
    @apply bg-blue-500 text-white;
}

button.incorrect{
    @apply bg-red-100 text-gray-800 opacity-70;
}
</style>
