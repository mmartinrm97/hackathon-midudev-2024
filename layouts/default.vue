<script setup lang="ts">
import { DumbbellIcon, MoonIcon, SunIcon } from 'lucide-vue-next';
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const headerRef = ref<HTMLDivElement | null>(null)


</script>


<template>
  <Toaster />
  <div
    class="absolute top-0 z-[-2] min-h-screen w-full bg-white dark:bg-neutral-950 bg-radial-blue dark:bg-radial-purple">
    <div class="flex flex-col min-h-screen  max-w-6xl mx-auto">
      <TheHeader />
      <main class="flex-1 container mx-auto py-12 px-6 ">
        <NuxtPage />
      </main>
      <TheFooter />
    </div>
  </div>
</template>

<style>
/* .router-link-exact-active {
  color: #12b488;
} */

:root {
  color-scheme: light dark;
}

html {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
