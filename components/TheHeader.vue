<template>
    <header ref="headerRef"
        class="py-4 px-6 sticky z-40 top-0 bg-radial-purple/80 backdrop-blur-lg border-b-2 border-border ">
        <div class="container mx-auto flex items-center justify-between">
            <div class="flex items-center gap-2">
                <DumbbellIcon class="w-6 h-6" />
                <h1 class="text-3xl font-bold">Workout Wizard</h1>
            </div>
            <div class="flex items-center gap-4">
                <Button class="flex items-center justify-center" aria-label="Toggle dark mode" :variant="'ghost'"
                    :size="'icon'" @click="toggleDark()">
                    <component :is="isDark ? MoonIcon : SunIcon" class="size-5" />
                </Button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { DumbbellIcon, MoonIcon, SunIcon } from 'lucide-vue-next';
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const headerRef = ref<HTMLDivElement | null>(null)
</script>