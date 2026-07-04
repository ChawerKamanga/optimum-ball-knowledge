<template>
  <nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 md:hidden bg-surface-container-lowest dark:bg-surface-container-lowest backdrop-blur-xl border-t border-white/5 shadow-[0_-4px_24px_rgba(0,0,0,0.5)] rounded-t-xl">
    
    <NuxtLink :class="mobileNavLinkClass('/')" to="/">
      <span class="material-symbols-outlined">sports_soccer</span>
      <span class="font-label-bold text-label-bold">Fixtures</span>
    </NuxtLink>

    <NuxtLink :class="mobileNavLinkClass('/leaderboard')" to="/leaderboard">
      <span class="material-symbols-outlined">leaderboard</span>
      <span class="font-label-bold text-label-bold">Leaderboard</span>
    </NuxtLink>

    <NuxtLink :class="mobileNavLinkClass('/rules')" to="/rules">
      <span class="material-symbols-outlined">gavel</span>
    </NuxtLink>

    <a 
      href="https://optimumsystemsmw.com/" 
      target="_blank" 
      rel="noopener noreferrer" 
      class="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
    >
      <span class="material-symbols-outlined">help</span>
      <span class="font-label-bold text-label-bold">About</span>
    </a>

  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const mobileNavLinkClass = (path: string) => {
  const baseClasses = 'flex flex-col items-center justify-center transition-all duration-200'
  
  if (route.path === path) {
    // Active state styles matching your theme
    return `${baseClasses} text-primary bg-primary/10 rounded-xl px-3 py-1 font-bold`
  }

  // Inactive state styles
  return `${baseClasses} text-on-surface-variant hover:text-primary`
}
</script>