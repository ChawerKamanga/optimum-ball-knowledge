<script setup>
import { ref } from 'vue'

const isAdminPanelOpen = ref(false)
</script>

<template>
  <div class="fixed right-6 bottom-24 md:bottom-10 z-[60]">
    <div
      v-show="isAdminPanelOpen"
      id="admin-panel"
      class="glass-card p-md rounded-2xl mb-xs w-48 shadow-2xl animate-in slide-in-from-bottom-2 duration-300"
    >
      <h4 class="font-label-bold text-[10px] text-primary uppercase mb-xs tracking-widest">
        Simulate State
      </h4>
      <div class="flex flex-col gap-xs">
        <button class="text-left py-1 px-2 rounded hover:bg-surface-variant text-body-sm transition-colors" type="button">Go Live</button>
        <button class="text-left py-1 px-2 rounded hover:bg-surface-variant text-body-sm transition-colors" type="button">Finish Match</button>
        <button class="text-left py-1 px-2 rounded hover:bg-surface-variant text-body-sm transition-colors text-error" type="button">Reset Scores</button>
      </div>
    </div>

    <button
      class="w-14 h-14 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all glow-primary"
      type="button"
      @click="isAdminPanelOpen = !isAdminPanelOpen"
    >
      <span class="material-symbols-outlined" data-icon="settings">settings</span>
    </button>
  </div>
</template>
