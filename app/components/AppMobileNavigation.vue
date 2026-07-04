<template>
  <nav class="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 md:hidden bg-surface-container-lowest dark:bg-surface-container-lowest backdrop-blur-xl border-t border-white/5 shadow-[0_-4px_24px_rgba(0,0,0,0.5)] rounded-t-full">
    <NuxtLink class="flex flex-col items-center justify-center text-primary bg-primary/10 rounded-full px-4 py-1" to="#">
      <span class="material-symbols-outlined" data-icon="sports_soccer">sports_soccer</span>
      <span class="font-label-bold text-label-bold">Matches</span>
    </NuxtLink>
    <NuxtLink class="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" to="#">
      <span class="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
      <span class="font-label-bold text-label-bold">Rankings</span>
    </NuxtLink>
    <NuxtLink class="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" to="#">
      <span class="material-symbols-outlined" data-icon="history">history</span>
      <span class="font-label-bold text-label-bold">History</span>
    </NuxtLink>
    <NuxtLink class="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" to="#">
      <span class="material-symbols-outlined" data-icon="person">person</span>
      <span class="font-label-bold text-label-bold">Profile</span>
    </NuxtLink>
  </nav>
</template>
