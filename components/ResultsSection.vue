<template>
    <div class="mt-16">
        <h2 class="text-5xl font-bold mb-6">Your Personalized Workout</h2>

        <!-- Disclaimer -->
        <Alert variant="warning" class="mb-6">
            <AlertCircle class="w-4 h-4" />
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>
                This workout plan is generated by AI and may contain errors. Always consult with a fitness professional
                before starting any new exercise regimen, especially if you have any health concerns or injuries.
            </AlertDescription>
        </Alert>

        <!-- Warm-up Section -->
        <div class="grid md:grid-cols-3 gap-6 mb-8">
            <ExerciseCard :title="'Warm-Up'" :exercises="workoutPlan.warmup" />
        </div>

        <!-- Main Workout Section -->
        <div class="grid md:grid-cols-3 gap-6 mb-8">
            <ExerciseCard :title="'Main Workout'" :exercises="workoutPlan.mainWorkout" />
        </div>

        <!-- Cool-down Section -->
        <div class="grid md:grid-cols-3 gap-6">
            <ExerciseCard :title="'Cool-Down'" :exercises="workoutPlan.cooldown" />

        </div>
    </div>
</template>

<script setup lang="ts">
import type { WorkoutPlan } from '~/interfaces/workout';
import ExerciseCard from './ExerciseCard.vue';
import { AlertCircle } from 'lucide-vue-next';


defineProps<{
    workoutPlan: WorkoutPlan;
}>();
</script>