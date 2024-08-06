<template>
    <Carousel class="flex items-center justify-center" :plugins="[Autoplay({ delay: 4000 })]">
        <CarouselContent>
            <CarouselItem>
                <Workout1Icon class="w-full h-full object-cover" />
            </CarouselItem>
            <CarouselItem>
                <Workout2Icon class="w-full h-full object-cover" />
            </CarouselItem>
            <CarouselItem>
                <Workout3Icon class="w-full h-full object-cover" />
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
</template>

<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Workout1Icon from '~/assets/images/workouts/Workout1Icon.vue';
import Workout2Icon from '~/assets/images/workouts/Workout2Icon.vue';
import Workout3Icon from '~/assets/images/workouts/Workout3Icon.vue';
</script>