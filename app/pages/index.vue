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
  // Initialize dynamic object keys from profiles to easily handle expansion
  const stats = {}
  founderProfiles.forEach(founder => {
    stats[founder.id] = { points: 0, correct: 0, maverickWins: 0 }
  })

  const completedMatches = matches.value.filter(match => match.score !== null)

  completedMatches.forEach(match => {
    founderProfiles.forEach(founder => {
      const fid = founder.id
      // Safely increment points if key exists
      stats[fid].points += match.points[fid] || 0

      if ((match.points[fid] || 0) > 0) {
        stats[fid].correct += 1
      }
    })

    // Calculate maverick wins (ignoring null/non-predictions)
    const validPicks = Object.values(match.predictions).filter(pick => pick !== null)
    const predictionCounts = validPicks.reduce((acc, pick) => {
      acc[pick] = (acc[pick] || 0) + 1
      return acc
    }, {})

    Object.keys(stats).forEach(founderId => {
      const founderPick = match.predictions[founderId]
      if (founderPick) {
        const isMaverickPick = predictionCounts[founderPick] === 1
        if (isMaverickPick && (match.points[founderId] || 0) > 0) {
          stats[founderId].maverickWins += 1
        }
      }
    })
  })

  return stats
})

const sortedFounders = computed(() => {
  return founderProfiles
    .map(founder => ({
      ...founder,
      ...founderStats.value[founder.id]
    }))
    .sort((a, b) => {
      // First sort by total points
      if (b.points !== a.points) {
        return b.points - a.points
      }
      // If points are tied, sort by maverick wins
      return b.maverickWins - a.maverickWins
    })
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

// Compute Smart Filtered Pipeline Order
const filteredMatches = computed(() => {
  if (selectedStage.value !== 'All') {
    return matches.value
      .filter(m => m.stage === selectedStage.value)
      .sort((a, b) => a.date.localeCompare(b.date))
  }

  const upcoming = matches.value
    .filter(m => m.score === null)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 1)

  const results = matches.value
    .filter(m => m.score !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2)

  return [...upcoming, ...results]
})

// Toggle Stage Filters
const toggleFilter = () => {
  if (selectedStage.value === 'All') {
    selectedStage.value = 'Round of 32'
  } else if (selectedStage.value === 'Round of 32') {
    selectedStage.value = 'Round of 16'
  } else if (selectedStage.value === 'Round of 16') {
    selectedStage.value = 'Quarterfinal'
  } else {
    selectedStage.value = 'All'
  }
}
</script>

<template>
  <main class="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-lg">
    
    <!-- SECTION 1: Founders Leaderboard Podium (Handles 4 entries fluidly) -->
    <section class="mb-xl">
      <div class="flex flex-col md:flex-row items-end justify-center gap-gutter md:gap-lg mt-lg">
        
        <!-- 2nd Place -->
        <div v-if="sortedFounders[1]" class="order-2 md:order-1 w-full md:w-1/4 flex flex-col items-center">
          <div class="glass-card neon-border w-full p-md rounded-xl flex flex-col items-center text-center relative mb-xs">
            <div class="absolute -top-6 bg-secondary text-on-secondary w-10 h-10 rounded-full flex items-center justify-center font-bold text-title-lg">2</div>
            <div class="w-20 h-20 rounded-full overflow-hidden mb-sm border-2 border-outline-variant">
              <img class="w-full h-full object-cover" :src="sortedFounders[1].avatar"/>
            </div>
            <h3 class="font-headline-md text-headline-md text-on-background">{{ sortedFounders[1].name }}</h3>
            <div class="flex items-center gap-xs mt-xs">
              <span class="font-label-bold text-[10px] text-secondary tracking-widest uppercase">{{ sortedFounders[1].correct }} Correct Picks</span>
            </div>
            <p class="text-primary font-bold text-body-lg mt-xs">{{ sortedFounders[1].points }} PTS</p>
          </div>
        </div>

        <!-- 1st Place -->
        <div v-if="sortedFounders[0]" class="order-1 md:order-2 w-full md:w-1/3 flex flex-col items-center">
          <div class="glass-card neon-border w-full p-md rounded-xl flex flex-col items-center text-center relative mb-xs transform scale-105 shadow-xl">
            <div class="absolute -top-8 bg-primary text-on-primary w-14 h-14 rounded-full flex items-center justify-center font-bold text-headline-md glow-primary">1</div>
            <div class="w-24 h-24 rounded-full overflow-hidden mb-sm border-4 border-primary">
              <img class="w-full h-full object-cover" :src="sortedFounders[0].avatar"/>
            </div>
            <h3 class="font-headline-md text-headline-md text-on-background">{{ sortedFounders[0].name }}</h3>
            <div class="flex items-center gap-xs mt-xs">
              <span class="material-symbols-outlined text-primary text-sm" data-icon="verified">verified</span>
              <span class="font-label-bold text-label-bold text-primary tracking-widest">Ball Knower</span>
            </div>
            <p class="text-primary font-extrabold text-title-lg mt-xs">{{ sortedFounders[0].points }} PTS <span class="text-xs font-normal text-on-surface-variant">({{ sortedFounders[0].correct }} Picks)</span></p>
          </div>
        </div>

        <!-- 3rd Place -->
        <div v-if="sortedFounders[2]" class="order-3 md:order-3 w-full md:w-1/4 flex flex-col items-center">
          <div class="glass-card w-full p-md rounded-xl flex flex-col items-center text-center relative mb-xs">
            <div class="absolute -top-6 bg-tertiary-container text-on-tertiary-container w-10 h-10 rounded-full flex items-center justify-center font-bold text-title-lg">3</div>
            <div class="w-20 h-20 rounded-full overflow-hidden mb-sm border-2 border-outline-variant">
              <img class="w-full h-full object-cover" :src="sortedFounders[2].avatar"/>
            </div>
            <h3 class="font-headline-md text-headline-md text-on-background">{{ sortedFounders[2].name }}</h3>
            <div class="flex items-center gap-xs mt-xs">
              <span class="font-label-bold text-[10px] text-on-surface-variant tracking-widest uppercase">{{ sortedFounders[2].correct }} Correct Picks</span>
            </div>
            <p class="text-primary font-bold text-body-sm mt-xs">{{ sortedFounders[2].points }} PTS</p>
          </div>
        </div>

        <!-- 4th Place -->
        <div v-if="sortedFounders[3]" class="order-4 md:order-4 w-full md:w-1/4 flex flex-col items-center">
          <div class="glass-card w-full p-md rounded-xl flex flex-col items-center text-center relative mb-xs">
            <div class="absolute -top-6 bg-surface-container-highest text-on-surface w-10 h-10 rounded-full flex items-center justify-center font-bold text-title-lg">4</div>
            <div class="w-20 h-20 rounded-full overflow-hidden mb-sm border-2 border-outline-variant opacity-80">
              <img class="w-full h-full object-cover" :src="sortedFounders[3].avatar"/>
            </div>
            <h3 class="font-headline-md text-headline-md text-on-background">{{ sortedFounders[3].name }}</h3>
            <div class="flex items-center gap-xs mt-xs">
              <span class="font-label-bold text-[10px] text-on-surface-variant tracking-widest uppercase">{{ sortedFounders[3].correct }} Correct Picks</span>
            </div>
            <p class="text-primary font-bold text-body-sm mt-xs">{{ sortedFounders[3].points }} PTS</p>
          </div>
        </div>

      </div>
    </section>

    <!-- SECTION 2: Tournament Fixtures Feed -->
    <section class="mt-xl">
      <div class="flex justify-between items-end mb-md">
        <div>
          <h2 class="font-headline-md text-headline-md text-primary">Tournament Pipeline</h2>
          <p class="text-on-surface-variant font-body-sm">
            {{ selectedStage === 'All' ? 'Next Fixture & 2 Latest Results' : `Showing All Matches for ${selectedStage}` }}
          </p>
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
        <div 
          v-for="(match, index) in filteredMatches" 
          :key="index" 
          class="glass-card rounded-xl overflow-hidden transition-all duration-300"
          :class="[
            match.date === todayDateStr ? 'border border-primary/40 shadow-[0_0_15px_rgba(225,182,56,0.15)] scale-[1.01]' : '',
            match.score === null && match.date !== todayDateStr ? 'opacity-90 hover:opacity-100' : ''
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
              <template v-else-if="match.score === null">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span class="text-amber-400 font-bold tracking-wider">UPCOMING FIXTURE</span>
              </template>
              <template v-else>
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                RESULT
              </template>
            </span>
            <span class="text-on-surface-variant text-[11px] font-medium tracking-wide uppercase">
              {{ match.stage }} • {{ match.date }}
            </span>
          </div>

          <!-- Team Flag / Display Rows -->
          <div class="p-lg flex items-center justify-between">
            <div class="flex flex-col items-center w-1/3 gap-sm">
              <div class="w-12 h-12 rounded-full glass-card flex items-center justify-center font-bold text-primary border border-outline-variant/30">
                {{ match.home.substring(0, 3).toUpperCase() }}
              </div>
              <span class="font-title-lg text-body-lg text-on-background font-medium">{{ match.home }}</span>
            </div>

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

            <div class="flex flex-col items-center w-1/3 gap-sm">
              <div class="w-12 h-12 rounded-full glass-card flex items-center justify-center font-bold text-primary border border-outline-variant/30">
                {{ match.away.substring(0, 3).toUpperCase() }}
              </div>
              <span class="font-title-lg text-body-lg text-on-background font-medium text-center">{{ match.away }}</span>
            </div>
          </div>

          <!-- Matrix Point Allocations Grid (Loops cleanly across all 4 profiles) -->
          <div class="px-md pb-md">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-xs">
              <div 
                v-for="founder in founderProfiles"
                :key="founder.id"
                class="flex flex-col items-center p-xs rounded transition-all"
                :class="match.score ? ((match.points[founder.id] || 0) > 0 ? 'bg-primary/20 text-primary font-semibold' : 'bg-surface-container text-on-surface-variant opacity-50') : 'bg-surface-container text-on-surface-variant border border-dashed border-outline-variant/40'"
              >
                <span class="text-[9px] uppercase tracking-wider opacity-70">
                  {{ founder.name }} (+{{ match.points[founder.id] || 0 }}pts)
                </span>
                <span class="font-label-bold text-[11px]">
                  {{ match.predictions[founder.id] || '—' }}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </main>
</template>