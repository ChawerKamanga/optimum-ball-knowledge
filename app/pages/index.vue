<script setup>
import { ref, computed } from 'vue'
import { founderProfiles, worldCupMatches } from '~/data/worldCupData'

// Shared World Cup Data from one source of truth
const matches = ref(worldCupMatches)

const founderById = computed(() => {
  return founderProfiles.reduce((acc, founder) => {
    acc[founder.id] = founder
    return acc
  }, {})
})

const founderStats = computed(() => {
  const stats = {
    chawa: { points: 0, correct: 0 },
    shad: { points: 0, correct: 0 },
    vincent: { points: 0, correct: 0 }
  }

  matches.value
    .filter(match => match.score !== null)
    .forEach(match => {
      stats.chawa.points += match.points.chawa
      stats.shad.points += match.points.shad
      stats.vincent.points += match.points.vincent

      if (match.points.chawa > 0) stats.chawa.correct += 1
      if (match.points.shad > 0) stats.shad.correct += 1
      if (match.points.vincent > 0) stats.vincent.correct += 1
    })

  return stats
})

// Filter Selection State
const selectedStage = ref('All')

// Helper logic to grab local system string formatted as YYYY-MM-DD
const getTodayString = () => {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const todayDateStr = computed(() => getTodayString())

// Compute Smart Filtered and Dynamically Sorted Pipeline Order
const filteredMatches = computed(() => {
  const today = todayDateStr.value
  
  // 1. Initial stage filter evaluation
  let targetSet = matches.value
  if (selectedStage.value !== 'All') {
    targetSet = matches.value.filter(m => m.stage === selectedStage.value)
  }

  // 2. Perform intelligent structural ordering logic
  return [...targetSet].sort((a, b) => {
    // Check match relationship with today's calendar string
    const isAToday = a.date === today
    const isBToday = b.date === today

    if (isAToday && !isBToday) return -1
    if (!isAToday && isBToday) return 1

    // Evaluate future scopes
    const isAFuture = a.date > today
    const isBFuture = b.date > today

    if (isAFuture && !isBFuture) return -1
    if (!isAFuture && isBFuture) return 1

    // If both upcoming/future: Sort chronologically (closest chronologically first)
    if (isAFuture && isBFuture) {
      return a.date.localeCompare(b.date)
    }

    // If both historical/past: Sort reverse-chronologically (most recent results at top)
    return b.date.localeCompare(a.date)
  })
})

// Toggle Stage Filters
const toggleFilter = () => {
  selectedStage.value = selectedStage.value === 'All' ? 'Round of 16' : selectedStage.value === 'Round of 16' ? 'Round of 32' : 'All'
}
</script>

<template>
  <main class="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-lg">
    
    <!-- SECTION 1: Founders Leaderboard Podium -->
    <section class="mb-xl">
      <div class="flex flex-col md:flex-row items-end justify-center gap-gutter md:gap-lg mt-lg">
        
        <!-- 2nd Place: Shad (36 PTS) -->
        <div class="order-2 md:order-1 w-full md:w-1/4 flex flex-col items-center">
          <div class="glass-card neon-border w-full p-md rounded-xl flex flex-col items-center text-center relative mb-xs">
            <div class="absolute -top-6 bg-secondary text-on-secondary w-10 h-10 rounded-full flex items-center justify-center font-bold text-title-lg">2</div>
            <div class="w-20 h-20 rounded-full overflow-hidden mb-sm border-2 border-outline-variant">
              <img class="w-full h-full object-cover" :src="founderById.shad.avatar"/>
            </div>
            <h3 class="font-headline-md text-headline-md text-on-background">{{ founderById.shad.name }}</h3>
            <div class="flex items-center gap-xs mt-xs">
              <span class="font-label-bold text-[10px] text-secondary tracking-widest uppercase">{{ founderStats.shad.correct }} Correct Picks</span>
            </div>
            <p class="text-primary font-bold text-body-lg mt-xs">{{ founderStats.shad.points }} PTS</p>
          </div>
        </div>

        <!-- 1st Place: Chawanangwa (39 PTS) -->
        <div class="order-1 md:order-2 w-full md:w-1/3 flex flex-col items-center">
          <div class="glass-card neon-border w-full p-md rounded-xl flex flex-col items-center text-center relative mb-xs transform scale-105 shadow-xl">
            <div class="absolute -top-8 bg-primary text-on-primary w-14 h-14 rounded-full flex items-center justify-center font-bold text-headline-md glow-primary">1</div>
            <div class="w-24 h-24 rounded-full overflow-hidden mb-sm border-4 border-primary">
              <img class="w-full h-full object-cover" :src="founderById.chawa.avatar"/>
            </div>
            <h3 class="font-headline-md text-headline-md text-on-background">{{ founderById.chawa.name }}</h3>
            <div class="flex items-center gap-xs mt-xs">
              <span class="material-symbols-outlined text-primary text-sm" data-icon="verified">verified</span>
              <span class="font-label-bold text-label-bold text-primary tracking-widest">Ball Knower</span>
            </div>
            <p class="text-primary font-extrabold text-title-lg mt-xs">{{ founderStats.chawa.points }} PTS <span class="text-xs font-normal text-on-surface-variant">({{ founderStats.chawa.correct }} Picks)</span></p>
          </div>
        </div>

        <!-- 3rd Place: Vincent (30 PTS) -->
        <div class="order-3 md:order-3 w-full md:w-1/4 flex flex-col items-center">
          <div class="glass-card w-full p-md rounded-xl flex flex-col items-center text-center relative mb-xs">
            <div class="absolute -top-6 bg-tertiary-container text-on-tertiary-container w-10 h-10 rounded-full flex items-center justify-center font-bold text-title-lg">3</div>
            <div class="w-20 h-20 rounded-full overflow-hidden mb-sm border-2 border-outline-variant">
              <img class="w-full h-full object-cover" :src="founderById.vincent.avatar"/>
            </div>
            <h3 class="font-headline-md text-headline-md text-on-background">{{ founderById.vincent.name }}</h3>
            <div class="flex items-center gap-xs mt-xs">
              <span class="font-label-bold text-[10px] text-on-surface-variant tracking-widest uppercase">{{ founderStats.vincent.correct }} Correct Picks</span>
            </div>
            <p class="text-primary font-bold text-body-sm mt-xs">{{ founderStats.vincent.points }} PTS</p>
          </div>
        </div>

      </div>
    </section>

    <!-- SECTION 2: Tournament Fixtures Feed -->
    <section class="mt-xl">
      <div class="flex justify-between items-end mb-md">
        <div>
          <h2 class="font-headline-md text-headline-md text-primary">Tournament Pipeline</h2>
          <p class="text-on-surface-variant font-body-sm">Stage Scope: {{ selectedStage }}</p>
        </div>
        <button 
          @click="toggleFilter" 
          class="flex items-center gap-xs text-primary font-label-bold text-label-bold border border-primary/20 bg-primary/5 px-4 py-2 rounded-full hover:bg-primary/20 transition-all"
        >
          <span class="material-symbols-outlined text-sm" data-icon="filter_list">filter_list</span> 
          STAGE: {{ selectedStage.toUpperCase() }}
        </button>
      </div>

      <div class="grid grid-cols-1 gap-md">
        <!-- Loop structural pipeline output -->
        <div 
          v-for="(match, index) in filteredMatches" 
          :key="index" 
          class="glass-card rounded-xl overflow-hidden transition-all duration-300"
          :class="[
            match.date === todayDateStr ? 'border border-primary/40 shadow-[0_0_15px_rgba(225,182,56,0.15)] scale-[1.01]' : '',
            match.score === null && match.date !== todayDateStr ? 'opacity-75 hover:opacity-100' : ''
          ]"
        >
          <!-- Meta Header Stripe -->
          <div 
            class="px-md py-xs flex justify-between items-center border-b border-white/5" 
            :class="match.date === todayDateStr ? 'bg-primary/10' : match.score !== null ? 'bg-primary/5' : 'bg-surface-container-high'"
          >
            <span class="font-label-bold text-[11px] text-primary flex items-center gap-xs">
              <template v-if="match.date === todayDateStr">
                <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span class="text-red-400 font-bold tracking-wider">TODAY • LIVE/UPCOMING</span>
              </template>
              <template v-else>
                <span :class="['w-1.5 h-1.5 rounded-full', match.score !== null ? 'bg-emerald-500' : 'bg-amber-500']"></span>
                {{ match.type }}
              </template>
            </span>
            <span class="text-on-surface-variant text-[11px] font-medium tracking-wide uppercase">
              {{ match.stage }} • {{ match.date }}
            </span>
          </div>

          <!-- Team Flag / Display Rows -->
          <div class="p-lg flex items-center justify-between">
            <!-- Home Team -->
            <div class="flex flex-col items-center w-1/3 gap-sm">
              <div class="w-12 h-12 rounded-full glass-card flex items-center justify-center font-bold text-primary border border-outline-variant/30">
                {{ match.home.substring(0, 3).toUpperCase() }}
              </div>
              <span class="font-title-lg text-body-lg text-on-background font-medium">{{ match.home }}</span>
            </div>

            <!-- Contextual Metrics Middle Scoreboard -->
            <div class="flex flex-col items-center gap-xs">
              <div v-if="match.score" class="font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tighter">
                {{ match.score }}
                <div v-if="match.pens" class="text-xs text-on-surface-variant font-sans text-center tracking-normal mt-0.5">
                  ({{ match.pens }} Pens)
                </div>
              </div>
              <div v-else class="font-headline-md text-headline-md text-outline tracking-widest px-4 py-1 rounded bg-surface-container">
                VS
              </div>
            </div>

            <!-- Away Team -->
            <div class="flex flex-col items-center w-1/3 gap-sm">
              <div class="w-12 h-12 rounded-full glass-card flex items-center justify-center font-bold text-primary border border-outline-variant/30">
                {{ match.away.substring(0, 3).toUpperCase() }}
              </div>
              <span class="font-title-lg text-body-lg text-on-background font-medium text-center">{{ match.away }}</span>
            </div>
          </div>

          <!-- Matrix Point Allocations Grid -->
          <div class="px-md pb-md">
            <div class="grid grid-cols-3 gap-xs">
              <!-- Chawa Profile Prediction Badge -->
              <div 
                class="flex flex-col items-center p-xs rounded transition-all"
                :class="match.score ? (match.points.chawa > 0 ? 'bg-primary/20 text-primary font-semibold' : 'bg-surface-container text-on-surface-variant opacity-50') : 'bg-surface-container text-on-surface-variant border border-dashed border-outline-variant/40'"
              >
                <span class="text-[9px] uppercase tracking-wider opacity-70">Chawa (+{{ match.points.chawa }}pts)</span>
                <span class="font-label-bold text-[11px]">{{ match.predictions.chawa }}</span>
              </div>

              <!-- Shad Profile Prediction Badge -->
              <div 
                class="flex flex-col items-center p-xs rounded transition-all"
                :class="match.score ? (match.points.shad > 0 ? 'bg-primary/20 text-primary font-semibold' : 'bg-surface-container text-on-surface-variant opacity-50') : 'bg-surface-container text-on-surface-variant border border-dashed border-outline-variant/40'"
              >
                <span class="text-[9px] uppercase tracking-wider opacity-70">Shad (+{{ match.points.shad }}pts)</span>
                <span class="font-label-bold text-[11px]">{{ match.predictions.shad }}</span>
              </div>

              <!-- Vincent Profile Prediction Badge -->
              <div 
                class="flex flex-col items-center p-xs rounded transition-all"
                :class="match.score ? (match.points.vincent > 0 ? 'bg-primary/20 text-primary font-semibold' : 'bg-surface-container text-on-surface-variant opacity-50') : 'bg-surface-container text-on-surface-variant border border-dashed border-outline-variant/40'"
              >
                <span class="text-[9px] uppercase tracking-wider opacity-70">Vincent (+{{ match.points.vincent }}pts)</span>
                <span class="font-label-bold text-[11px]">{{ match.predictions.vincent }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </main>
</template>