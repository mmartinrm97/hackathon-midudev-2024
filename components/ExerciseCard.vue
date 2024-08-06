<template>
  <Card class="md:col-span-3 shadow-lg">
    <CardHeader>
      <CardTitle class="flex items-center">
        <component :is="sectionIcon" :class="['mr-4 h-6 w-6', sectionColor]" />
        {{ title }}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="space-y-4">
        <div v-for="(exercise, exIndex) in exercises" :key="exIndex"
          class="flex items-center justify-between hover:bg-accent transition-colors duration-200 rounded-lg border p-3 ">
          <div>
            <h3 class="text-lg font-bold">{{ exercise.name }}</h3>
            <ul class="text-muted-foreground">
              <li>Repetitions: {{ exercise.repetitions }}</li>
              <li>Sets: {{ exercise.sets }}</li>
            </ul>
          </div>
          <div class="flex items-center gap-2">
            <Toggle @click="toggleExercise(exIndex)" class="group">
              <CheckIcon
                :class="['size-7 group-hover:scale-125 transition-transform duration-300', checkedExercises[exIndex] ? 'text-green-500' : 'text-primary']" />
            </Toggle>
            <Button variant="ghost" size="icon" @click="redirectToYouTube(exercise.name)" class="group">
              <VideoIcon class="size-7 group-hover:scale-125 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">

import { PlayIcon, CheckIcon, VideoIcon, FlameIcon, DumbbellIcon, WindIcon } from 'lucide-vue-next';
import type { Exercise } from '~/interfaces/exercise';


const props = defineProps<{
  title: string;
  exercises: Exercise[];
}>();

const sectionColor = computed(() => {
  switch (props.title) {
    case 'Warm-Up': return 'text-orange-500 dark:text-orange-400';
    case 'Main Workout': return 'text-blue-500 dark:text-blue-400';
    case 'Cool-Down': return 'text-green-500 dark:text-green-400';
    default: return '';
  }
});

const sectionIcon = computed(() => {
  switch (props.title) {
    case 'Warm-Up': return FlameIcon;
    case 'Main Workout': return DumbbellIcon;
    case 'Cool-Down': return WindIcon;
    default: return null;
  }
});

const checkedExercises = ref(Array.from({ length: props.exercises.length }, () => false));


const toggleExercise = (index: number) => {
  checkedExercises.value[index] = !checkedExercises.value[index];
};

const redirectToYouTube = (exerciseName: string) => {
  const query = encodeURIComponent(exerciseName);
  const url = `https://www.youtube.com/results?search_query=${query}`;
  window.open(url, '_blank');
};
</script>