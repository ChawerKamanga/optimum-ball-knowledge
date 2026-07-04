<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Add subtle hover tracking for glow effect on cards
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    })
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-on-surface font-body-md pt-20">
   

    <main class="flex-grow radial-bg relative">
      <div class="max-w-container-max mx-auto px-margin-desktop py-12">
    

        <!-- Page Header -->
        <header class="mb-16">
          <h1 class="font-display-lg text-display-lg text-white mb-4">Founders Rulebook</h1>
          <p class="text-on-surface-variant font-body-md max-w-2xl">The definitive guide to the Optimum World Cup predictor. Precision scoring, elite competition, and absolute clarity on the path to the trophy.</p>
        </header>

        <!-- Core Rulebook (Bento Grid) -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          <!-- Scoring Card -->
          <div class="md:col-span-5 glass-card p-10 flex flex-col justify-between group rounded-xl">
            <div>
              <div class="flex items-center gap-3 mb-6">
                <span class="material-symbols-outlined text-primary text-3xl">analytics</span>
                <h3 class="font-headline-lg text-headline-lg text-white">Scoring System</h3>
              </div>
              <p class="text-on-surface-variant font-body-md mb-8">Points are allocated per fixture based on accuracy. No partial credit for near misses.</p>
            </div>
            <div class="flex items-end gap-12">
              <div class="flex flex-col">
                <span class="text-primary font-display-lg text-6xl mb-2">+3</span>
                <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-tighter">Correct Result</span>
              </div>
              <div class="flex flex-col">
                <span class="text-white opacity-20 font-display-lg text-6xl mb-2">0</span>
                <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-tighter">Incorrect</span>
              </div>
            </div>
          </div>

          <!-- Match Condition Card -->
          <div class="md:col-span-7 glass-card p-10 group relative overflow-hidden rounded-xl">
            <div class="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <span class="material-symbols-outlined text-9xl" style="font-variation-settings: 'FILL' 1;">trophy</span>
            </div>
            <div class="relative z-10">
              <div class="flex items-center gap-3 mb-6">
                <span class="material-symbols-outlined text-primary text-3xl">verified</span>
                <h3 class="font-headline-lg text-headline-lg text-white">Match Condition</h3>
              </div>
              <p class="text-on-surface-variant font-body-md max-w-md mb-8">In the knockout stages, we simplify the complex. We do not track draws or extra-time goals. Your pick must be the team that ultimately lifts the trophy at the final whistle or after penalties.</p>
              <div class="inline-flex items-center gap-4 py-3 px-5 bg-surface-container-high border border-outline-variant rounded-lg">
                <span class="material-symbols-outlined text-primary">check_circle</span>
                <span class="font-body-md text-on-surface">Only the final advancing winner matters.</span>
              </div>
            </div>
          </div>

          <!-- Tie-Breaker Card -->
          <div class="md:col-span-12 glass-card p-10 flex flex-col md:flex-row items-center justify-between gap-8 group rounded-xl">
            <div class="max-w-xl">
              <div class="flex items-center gap-3 mb-4">
                <span class="material-symbols-outlined text-primary text-3xl">psychology</span>
                <h3 class="font-headline-lg text-headline-lg text-white">The Maverick Tracker</h3>
              </div>
              <h4 class="font-label-sm text-label-sm text-primary mb-4 uppercase tracking-widest">Primary Tie-Breaker</h4>
              <p class="text-on-surface-variant font-body-md">If the leaderboard is deadlocked, the winner is determined by the most successful solo picks. A "Maverick" pick is defined as a winning prediction where you were in the bottom 10% of participants for that specific match choice.</p>
            </div>
            <div class="w-full md:w-auto flex flex-col items-center bg-surface-container-lowest p-8 border border-outline-variant rounded-lg">
              <span class="font-display-lg text-display-lg text-white mb-2">Maverick</span>
              <div class="w-full h-1 bg-outline-variant mb-2 rounded-full overflow-hidden">
                <div class="w-1/3 h-full bg-primary gold-glow rounded-full"></div>
              </div>
              <span class="font-label-sm text-label-sm text-on-surface-variant">Uniqueness Bonus Active</span>
            </div>
          </div>
        </div>

        <!-- Banter Clause -->
        <div class="gold-border-outline bg-surface p-12 md:p-16 text-center relative overflow-hidden rounded-xl">
          <div class="absolute inset-0 opacity-5 pointer-events-none" style="background-image: radial-gradient(#e1b638 1px, transparent 1px); background-size: 20px 20px;"></div>
          <div class="relative z-10">
            <span class="font-label-sm text-label-sm text-primary uppercase tracking-[0.4em] mb-6 block">The Founder's Constitution</span>
            <h2 class="font-display-lg text-display-lg text-white mb-8">Article IV: The Banter Clause</h2>
            <p class="font-body-md text-on-surface-variant max-w-3xl mx-auto italic leading-relaxed text-lg">
              "In the event of unforeseen statistical anomalies, software glitches, or general disagreement over VAR decisions, all disputes shall be settled via public Slack banter. Decisions are final once a majority of participants react with a 👑 or 🦁 emoji. Technicalities are secondary to founder intuition and gut feelings."
            </p>
            <div class="mt-12 flex justify-center gap-8 opacity-40">
              <div class="flex flex-col items-center">
                <span class="material-symbols-outlined text-4xl mb-2">gavel</span>
                <span class="font-label-sm text-[10px] uppercase">Final Ruling</span>
              </div>
              <div class="flex flex-col items-center">
                <span class="material-symbols-outlined text-4xl mb-2">forum</span>
                <span class="font-label-sm text-[10px] uppercase">Open Debate</span>
              </div>
              <div class="flex flex-col items-center">
                <span class="material-symbols-outlined text-4xl mb-2">handshake</span>
                <span class="font-label-sm text-[10px] uppercase">Gentleman's Agreement</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
.glass-card {
  background: #131313;
  border: 1px solid #2d2d2d;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  border-color: #e1b638;
}

.gold-glow {
  box-shadow: 0 0 20px rgba(225, 182, 56, 0.1);
}

.gold-border-outline {
  border: 1px solid #e1b638;
  position: relative;
}

.gold-border-outline::before {
  content: '';
  position: absolute;
  inset: -2px;
  border: 1px solid rgba(225, 182, 56, 0.3);
  pointer-events: none;
  border-radius: inherit;
}

.radial-bg {
  background: radial-gradient(circle at 50% 50%, rgba(225, 182, 56, 0.05) 0%, rgba(0, 0, 0, 0) 70%);
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}
</style>