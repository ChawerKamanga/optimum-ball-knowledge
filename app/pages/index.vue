<script setup>
import { ref, computed } from 'vue'

// Real Scoreboard Data from World Cup 2026 Predictions
const matches = ref([
  { date: '2026-06-28', stage: 'Round of 32', home: 'South Africa', away: 'Canada', score: '0-1', pens: null, type: 'Full Time', winner: 'Canada', predictions: { chawa: 'Canada', shad: 'Canada', vincent: 'Canada' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-06-29', stage: 'Round of 32', home: 'Germany', away: 'Paraguay', score: '1-1', pens: '3-4', type: 'Penalties', winner: 'Paraguay', predictions: { chawa: 'Germany', shad: 'Germany', vincent: 'Germany' }, points: { chawa: 0, shad: 0, vincent: 0 } },
  { date: '2026-06-29', stage: 'Round of 32', home: 'Netherlands', away: 'Morocco', score: '1-1', pens: '2-3', type: 'Penalties', winner: 'Morocco', predictions: { chawa: 'Morocco', shad: 'Netherlands', vincent: 'Netherlands' }, points: { chawa: 3, shad: 0, vincent: 0 } },
  { date: '2026-06-29', stage: 'Round of 32', home: 'Brazil', away: 'Japan', score: '2-1', pens: null, type: 'Full Time', winner: 'Brazil', predictions: { chawa: 'Brazil', shad: 'Brazil', vincent: 'Brazil' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-06-30', stage: 'Round of 32', home: 'France', away: 'Sweden', score: '3-0', pens: null, type: 'Full Time', winner: 'France', predictions: { chawa: 'France', shad: 'France', vincent: 'France' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-06-30', stage: 'Round of 32', home: 'Ivory Coast', away: 'Norway', score: '1-2', pens: null, type: 'Full Time', winner: 'Norway', predictions: { chawa: 'Norway', shad: 'Norway', vincent: 'Norway' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-06-30', stage: 'Round of 32', home: 'Mexico', away: 'Ecuador', score: '2-0', pens: null, type: 'Full Time', winner: 'Mexico', predictions: { chawa: 'Mexico', shad: 'Mexico', vincent: 'Mexico' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-07-01', stage: 'Round of 32', home: 'England', away: 'DR Congo', score: '2-1', pens: null, type: 'Full Time', winner: 'England', predictions: { chawa: 'England', shad: 'England', vincent: 'England' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-07-01', stage: 'Round of 32', home: 'United States', away: 'Bosnia and Herzegovina', score: '2-0', pens: null, type: 'Full Time', winner: 'United States', predictions: { chawa: 'United States', shad: 'United States', vincent: 'United States' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-07-01', stage: 'Round of 32', home: 'Belgium', away: 'Senegal', score: '3-2', pens: null, type: 'Full Time', winner: 'Belgium', predictions: { chawa: 'Senegal', shad: 'Belgium', vincent: 'Senegal' }, points: { chawa: 0, shad: 3, vincent: 0 } },
  { date: '2026-07-02', stage: 'Round of 32', home: 'Portugal', away: 'Croatia', score: '2-1', pens: null, type: 'Full Time', winner: 'Portugal', predictions: { chawa: 'Portugal', shad: 'Portugal', vincent: 'Croatia' }, points: { chawa: 3, shad: 3, vincent: 0 } },
  { date: '2026-07-02', stage: 'Round of 32', home: 'Spain', away: 'Austria', score: '3-0', pens: null, type: 'Full Time', winner: 'Spain', predictions: { chawa: 'Spain', shad: 'Spain', vincent: 'Spain' }, points: { chawa: 3, shad: 3, vincent: 3 } },
  { date: '2026-07-02', stage: 'Round of 32', home: 'Switzerland', away: 'Algeria', score: '2-0', pens: null, type: 'Full Time', winner: 'Switzerland', predictions: { chawa: 'Switzerland', shad: 'Switzerland', vincent: 'Algeria' }, points: { chawa: 3, shad: 3, font: 0, vincent: 0 } },
  { date: '2026-07-03', stage: 'Round of 32', home: 'Australia', away: 'Egypt', score: '1-1', pens: '2-4', type: 'Penalties', winner: 'Egypt', predictions: { chawa: 'Australia', shad: 'Egypt', vincent: 'Australia' }, points: { chawa: 0, shad: 3, vincent: 0 } },
  { date: '2026-07-03', stage: 'Round of 32', home: 'Argentina', away: 'Cape Verde', score: '3-2', pens: null, type: 'Full Time', winner: 'Argentina', predictions: { chawa: 'Argentina', shad: 'Cape Verde', vincent: 'Argentina' }, points: { chawa: 3, shad: 0, vincent: 3 } },
  { date: '2026-07-03', stage: 'Round of 32', home: 'Colombia', away: 'Ghana', score: '1-0', pens: null, type: 'Full Time', winner: 'Colombia', predictions: { chawa: 'Ghana', shad: 'Ghana', vincent: 'Colombia' }, points: { chawa: 0, shad: 0, vincent: 3 } },
  // Round of 16 Matches
  { date: '2026-07-04', stage: 'Round of 16', home: 'Paraguay', away: 'France', score: null, pens: null, type: 'Upcoming', winner: null, predictions: { chawa: 'France', shad: 'France', vincent: 'France' }, points: { chawa: 0, shad: 0, vincent: 0 } },
  { date: '2026-07-04', stage: 'Round of 16', home: 'Canada', away: 'Morocco', score: '0-3', pens: null, type: 'Full Time', winner: 'Morocco', predictions: { chawa: 'Morocco', shad: 'Canada', vincent: 'Canada' }, points: { chawa: 3, shad: 0, vincent: 0 } },
  { date: '2026-07-05', stage: 'Round of 16', home: 'Brazil', away: 'Norway', score: null, pens: null, type: 'Upcoming', winner: null, predictions: { chawa: 'Norway', shad: 'Brazil', vincent: 'Norway' }, points: { chawa: 0, shad: 0, vincent: 0 } },
  { date: '2026-07-05', stage: 'Round of 16', home: 'Mexico', away: 'England', score: null, pens: null, type: 'Upcoming', winner: null, predictions: { chawa: 'England', shad: 'England', vincent: 'England' }, points: { chawa: 0, shad: 0, vincent: 0 } },
  { date: '2026-07-06', stage: 'Round of 16', home: 'Portugal', away: 'Spain', score: null, pens: null, type: 'Upcoming', winner: null, predictions: { chawa: 'Spain', shad: 'Portugal', vincent: 'Spain' }, points: { chawa: 0, shad: 0, vincent: 0 } },
  { date: '2026-07-06', stage: 'Round of 16', home: 'United States', away: 'Belgium', score: null, pens: null, type: 'Upcoming', winner: null, predictions: { chawa: 'United States', shad: 'Belgium', vincent: 'Belgium' }, points: { chawa: 0, shad: 0, vincent: 0 } },
  { date: '2026-07-07', stage: 'Round of 16', home: 'Argentina', away: 'Egypt', score: null, pens: null, type: 'Upcoming', winner: null, predictions: { chawa: 'Argentina', shad: 'Argentina', vincent: 'Argentina' }, points: { chawa: 0, shad: 0, vincent: 0 } },
  { date: '2026-07-07', stage: 'Round of 16', home: 'Switzerland', away: 'Colombia', score: null, pens: null, type: 'Upcoming', winner: null, predictions: { chawa: 'Switzerland', shad: 'Switzerland', vincent: 'Colombia' }, points: { chawa: 0, shad: 0, vincent: 0 } }
])

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
              <img class="w-full h-full object-cover" src="http://optimumsystemsmw.com/img/shad.jpeg"/>
            </div>
            <h3 class="font-headline-md text-headline-md text-on-background">Shad</h3>
            <div class="flex items-center gap-xs mt-xs">
              <span class="font-label-bold text-[10px] text-secondary tracking-widest uppercase">12 Correct Picks</span>
            </div>
            <p class="text-primary font-bold text-body-lg mt-xs">36 PTS</p>
          </div>
        </div>

        <!-- 1st Place: Chawanangwa (39 PTS) -->
        <div class="order-1 md:order-2 w-full md:w-1/3 flex flex-col items-center">
          <div class="glass-card neon-border w-full p-md rounded-xl flex flex-col items-center text-center relative mb-xs transform scale-105 shadow-xl">
            <div class="absolute -top-8 bg-primary text-on-primary w-14 h-14 rounded-full flex items-center justify-center font-bold text-headline-md glow-primary">1</div>
            <div class="w-24 h-24 rounded-full overflow-hidden mb-sm border-4 border-primary">
              <img class="w-full h-full object-cover" src="https://res.cloudinary.com/dejkd5he6/image/upload/v1772186782/chawa_xwjrzw.jpg"/>
            </div>
            <h3 class="font-headline-md text-headline-md text-on-background">Chawanangwa</h3>
            <div class="flex items-center gap-xs mt-xs">
              <span class="material-symbols-outlined text-primary text-sm" data-icon="verified">verified</span>
              <span class="font-label-bold text-label-bold text-primary tracking-widest">Ball Knower</span>
            </div>
            <p class="text-primary font-extrabold text-title-lg mt-xs">39 PTS <span class="text-xs font-normal text-on-surface-variant">(13 Picks)</span></p>
          </div>
        </div>

        <!-- 3rd Place: Vincent (30 PTS) -->
        <div class="order-3 md:order-3 w-full md:w-1/4 flex flex-col items-center">
          <div class="glass-card w-full p-md rounded-xl flex flex-col items-center text-center relative mb-xs">
            <div class="absolute -top-6 bg-tertiary-container text-on-tertiary-container w-10 h-10 rounded-full flex items-center justify-center font-bold text-title-lg">3</div>
            <div class="w-20 h-20 rounded-full overflow-hidden mb-sm border-2 border-outline-variant">
              <img class="w-full h-full object-cover" src="https://optimumsystemsmw.com/img/vin.jpeg"/>
            </div>
            <h3 class="font-headline-md text-headline-md text-on-background">Vincent</h3>
            <div class="flex items-center gap-xs mt-xs">
              <span class="font-label-bold text-[10px] text-on-surface-variant tracking-widest uppercase">10 Correct Picks</span>
            </div>
            <p class="text-primary font-bold text-body-sm mt-xs">30 PTS</p>
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
              <div v-if="match.score" class="font-display-lg text-display-lg text-primary tracking-tighter">
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