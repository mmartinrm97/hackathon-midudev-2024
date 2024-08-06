<script setup lang="ts"></script>

<template>
    <div class="min-h-screen flex flex-col  text-gray-100 max-w-4xl mx-auto">
      <header class=" text-white p-4 mx-auto">

        <nav class="flex gap-4">
                <NuxtLink to="/">Home</NuxtLink>
                <NuxtLink to="/assistant">Assistant</NuxtLink>
                <NuxtLink to="/completion">Completion</NuxtLink>
                <NuxtLink to="/function-calling">Function calling</NuxtLink>
                <NuxtLink to="/vision">Chat with Vision</NuxtLink>
            </nav>
      </header>
      <main class="flex-grow container mx-auto px-4 py-8">
        <slot />
      </main>
      <!-- <footer class=" text-center p-4">
        <p class="text-sm text-gray-400">© 2024 Miguel Ramos</p>
      </footer> -->
    </div>
  </template>

<style>
.router-link-exact-active {
    color: #12b488;
}

:root {
    color-scheme: light dark;
}

html {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

body {
    background: #050505;
}
</style>
