<template>
  <header class="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-16 z-50 bg-background dark:bg-background border-b border-outline-variant shadow-[0_0_20px_rgba(225,182,56,0.1)] sticky top-0">
    <div class="font-display-lg-mobile text-display-lg-mobile font-extrabold text-primary dark:text-primary tracking-tighter">
      Optimum Ball Knowledge
    </div>

    <nav class="hidden md:flex gap-base">
      <NuxtLink :class="navLinkClass('/')" to="/">Fixtures</NuxtLink>
      <NuxtLink :class="navLinkClass('/leaderboard')" to="/leaderboard">Leaderboard</NuxtLink>
      <NuxtLink :class="navLinkClass('/rules')" to="/rules">Rules</NuxtLink>
    </nav>

    <div class="flex items-center gap-sm">
      <a 
        href="https://optimumsystemsmw.com/" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="material-symbols-outlined text-primary hover:scale-95 transition-transform" 
        title="About Optimum Systems"
      >
        help
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()

const navLinkClass = (path: string) => {
  if (route.path === path) {
    return 'text-primary font-bold border-b-2 border-primary pb-1 font-label-bold text-label-bold'
  }

  return 'text-on-surface-variant font-medium hover:text-primary hover:bg-surface-variant/30 transition-colors px-3 py-1 rounded font-label-bold text-label-bold'
}
</script>