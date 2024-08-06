<script setup lang="ts">
import { useChat } from '@ai-sdk/vue';
import Autoplay from 'embla-carousel-autoplay'
import { computed } from 'vue';
import Workout1Icon from '~/assets/images/workouts/Workout1Icon.vue';
import Workout2Icon from '~/assets/images/workouts/Workout2Icon.vue';
import Workout3Icon from '~/assets/images/workouts/Workout3Icon.vue';
import type { WorkoutPlan } from '~/interfaces/workout';

const parsedWorkout = ref<WorkoutPlan>({
  warmup: [],
  mainWorkout: [],
  cooldown: []
});


const { error, input, isLoading, handleSubmit: chatSubmit, messages, reload, stop } =
  useChat({
    keepLastMessageOnError: true,
    onFinish(message, { usage, finishReason }) {
      console.log('Usage', usage);
      console.log('FinishReason', finishReason);
    },
  });


const hasParsedWorkout = computed(() => {
  return parsedWorkout.value.warmup.length > 0 && parsedWorkout.value.mainWorkout.length > 0 && parsedWorkout.value.cooldown.length > 0;

})

const resultsSection = ref<HTMLElement | null>(null)

const handleSubmit = (values: {
  goal: string, level: string, duration: string
}) => {

  const { goal, level, duration } = values

  // Clear existing messages
  messages.value = []


  // Clear parsedWorkout
  parsedWorkout.value = {
    warmup: [],
    mainWorkout: [],
    cooldown: []
  }

  const prompt = `Generate a personalized workout plan for a ${level} level individual with a goal of ${goal} and ${duration} available time. Please structure the plan as follows:

  1. Warm-up:
     - List 2-3 warm-up exercises
     - For each exercise, provide:
       * Exercise name
       * Number of repetitions
       * Number of sets

  2. Main Workout:
     - List 4-5 main exercises targeting the goal of ${goal}
     - For each exercise, provide:
       * Exercise name
       * Number of repetitions
       * Number of sets

  3. Cool-down:
     - List 2-3 cool-down exercises or stretches
     - For each exercise, provide:
       * Exercise name
       * Duration or number of repetitions
       * Number of sets if applicable

  Please ensure the exercises are appropriate for the ${level} fitness level and can be completed within the ${duration} time frame.`

  input.value = prompt
  chatSubmit()
}


watch([() => messages.value, () => isLoading.value], async ([newMessages, loading]) => {
  const assistantMessage = newMessages.find(m => m.role === 'assistant')
  if (assistantMessage && !loading) {
    try {
      parsedWorkout.value = JSON.parse(assistantMessage.content)
    } catch (error) {
      console.error('JSON still building or invalid:', error)
    }
  }
}, { immediate: true })

</script>



<template>
  <div class="grid md:grid-cols-2 gap-8 space-x-20">
    <div class="space-y-14">
      <h2 class="text-7xl font-bold">Get Your Personalized Workout</h2>
      <p class="text-muted-foreground text-xl">
        Answer a few questions and we'll generate a custom workout routine tailored to your goals and fitness
        level.
      </p>
      <WorkOutForm :isLoading="isLoading" @submit="handleSubmit" @stop="stop" />
    </div>
    <div class="flex items-center justify-center">
      <TheCarousel />
    </div>
  </div>

  <!-- Error State -->
  <div v-if="error" class="flex flex-col justify-center items-center mt-16">
    <p class="text-red-500">An error occurred. Please try again.</p>
    <Button variant="ghost" size="icon" @click="reload" class="mt-4">
      Retry
    </Button>
  </div>


  <!-- Results -->
  <ResultsSection v-if="hasParsedWorkout" :workoutPlan="parsedWorkout" ref="resultsSection" />
</template>
