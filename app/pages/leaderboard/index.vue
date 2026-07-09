<script setup>
import { ref, computed, onMounted } from 'vue'
import { founderProfiles, worldCupMatches } from '~/data/worldCupData'

// Filter state for standings calculations
const selectedStage = ref('All')

const completedMatches = computed(() => worldCupMatches.filter(match => match.score !== null))

// Filter completed matches based on the selected tournament stage
const filteredCompletedMatches = computed(() => {
  if (selectedStage.value === 'All') return completedMatches.value
  return completedMatches.value.filter(match => match.stage === selectedStage.value)
})

const filteredCompletedCount = computed(() => filteredCompletedMatches.value.length)
const totalCompletedCount = computed(() => completedMatches.value.length)

const founderStats = computed(() => {
  return founderProfiles
    .map(founder => {
      // Points and accuracy computed based on selected filter context
      const totalPoints = filteredCompletedMatches.value.reduce((sum, match) => sum + (match.points[founder.id] || 0), 0)
      const correctPicks = filteredCompletedMatches.value.filter(match => (match.points[founder.id] || 0) > 0).length
      const accuracy = filteredCompletedCount.value
        ? Math.round((correctPicks / filteredCompletedCount.value) * 100)
        : 0

      // Form remains global for structural consistency of recent performance
      const recentForm = [...completedMatches.value]
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 5)
        .map(match => (match.points[founder.id] || 0) > 0)

      // Maverick logic adjusted safely for null predictions
      const maverickWins = filteredCompletedMatches.value.reduce((count, match) => {
        const validPicks = Object.values(match.predictions).filter(pick => pick !== null)
        const predictionCounts = validPicks.reduce((acc, pick) => {
          acc[pick] = (acc[pick] || 0) + 1
          return acc
        }, {})

        const founderPick = match.predictions[founder.id]
        if (!founderPick) return count

        const isMaverickPick = predictionCounts[founderPick] === 1
        return count + (isMaverickPick && (match.points[founder.id] || 0) > 0 ? 1 : 0)
      }, 0)

      return {
        ...founder,
        totalPoints,
        correctPicks,
        accuracy,
        recentForm,
        maverickWins
      }
    })
    .sort((a, b) => {
      if (b.totalPoints !== a.totalPoints) {
        return b.totalPoints - a.totalPoints
      }
      return b.maverickWins - a.maverickWins
    })
})

const maverickLeader = computed(() => {
  return [...founderStats.value].sort((a, b) => b.maverickWins - a.maverickWins)[0]
})

const gaugeOffset = (accuracy) => {
  const circumference = 364.4
  return ((100 - accuracy) / 100) * circumference
}

// Toggle Stage Filter Logic
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

onMounted(() => {
  const observerOptions = { threshold: 0.1 }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0')
        entry.target.classList.remove('opacity-0', 'translate-y-10')
      }
    })
  }, observerOptions)

  document.querySelectorAll('.glass-card').forEach(card => {
    card.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10')
    observer.observe(card)
  })
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-background text-on-surface font-headline-lg">

    <main class="flex-grow pt-10 md:pt-24 px-4 md:px-gutter max-w-container-max mx-auto w-full">
      
      <!-- Header Staging Pipeline Controls -->
      <div class="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <h1 class="font-headline-md text-headline-md md:font-display-lg md:text-display-lg mt-4 text-on-surface">
            The Championship Standings
          </h1>
          <p class="font-body-md text-body-md text-on-surface-variant">
            {{ selectedStage === 'All' ? 'Global Leaderboard tracking continuous results' : `Standings calculated specifically for ${selectedStage}` }}
          </p>
        </div>
        
        <button 
          @click="toggleFilter" 
          class="flex items-center gap-xs text-primary font-label-bold text-label-bold border border-primary/20 bg-primary/5 px-5 py-2.5 rounded-full hover:bg-primary/20 transition-all cursor-pointer"
        >
          <span class="material-symbols-outlined text-sm" data-icon="filter_list">filter_list</span> 
          FILTER STAGE: {{ selectedStage.toUpperCase() }}
        </button>
      </div>

      <!-- Leaderboard Table -->
      <div class="glass-card rounded-xl overflow-hidden mb-12">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-outline-variant bg-surface-container-low">
                <th class="px-3 py-3 md:px-6 md:py-4 font-label-sm text-xs md:text-label-sm uppercase tracking-widest text-on-surface-variant">Rank</th>
                <th class="px-3 py-3 md:px-6 md:py-4 font-label-sm text-xs md:text-label-sm uppercase tracking-widest text-on-surface-variant">Founder</th>
                <th class="px-3 py-3 md:px-6 md:py-4 font-label-sm text-xs md:text-label-sm uppercase tracking-widest text-on-surface-variant">Global Form</th>
                <th class="px-3 py-3 md:px-6 md:py-4 font-label-sm text-xs md:text-label-sm uppercase tracking-widest text-on-surface-variant">Maverick Picks</th>
                <th class="px-3 py-3 md:px-6 md:py-4 font-label-sm text-xs md:text-label-sm uppercase tracking-widest text-on-surface-variant text-right">Points Pool</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-outline-variant">
              <tr v-for="(founder, index) in founderStats" :key="founder.id"
                class="leaderboard-row transition-all duration-300"
                :class="index === 0 ? 'border-2 border-transparent hover:border-primary-container relative' : ''">
                
                <!-- Rank -->
                <td class="px-3 py-4 md:px-6 md:py-8">
                  <div class="flex items-center space-x-1 md:space-x-2">
                    <span class="font-bold text-base md:text-headline-lg"
                      :class="index === 0 ? 'text-primary' : 'text-on-surface-variant'">{{ index + 1 }}</span>
                    <span v-if="index === 0" class="material-symbols-outlined text-primary text-sm md:text-base"
                      style="font-variation-settings: 'FILL' 1;">crown</span>
                  </div>
                </td>

                <!-- Founder Profile Meta Context -->
                <td class="px-3 py-4 md:px-6 md:py-8">
                  <div class="flex items-center space-x-2 md:space-x-4">
                    <div class="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0"
                      :class="index === 0 ? 'border-2 border-primary' : 'border border-outline-variant'">
                      <img class="w-full h-full object-cover" :alt="founder.name" :src="founder.avatar" />
                    </div>
                    <div>
                      <div class="font-headline-lg text-sm md:text-[20px] leading-tight text-on-surface break-words">{{ founder.name }}</div>
                      <div class="font-label-sm text-[10px] md:text-label-sm uppercase tracking-wider"
                        :class="index === 0 ? 'text-primary' : 'text-on-surface-variant'">{{ founder.role }}</div>
                    </div>
                  </div>
                </td>

                <!-- Form Strip Timeline -->
                <td class="px-3 py-4 md:px-6 md:py-8">
                  <div class="flex space-x-1">
                    <div v-for="(hit, formIndex) in founder.recentForm" :key="`${founder.id}-form-${formIndex}`"
                      class="w-2 h-2 md:w-3 md:h-3 rounded-full"
                      :class="hit ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-error shadow-[0_0_8px_rgba(255,180,171,0.5)]'">
                    </div>
                  </div>
                </td>

                <!-- Maverick Metrics -->
                <td class="px-3 py-4 md:px-6 md:py-8 font-label-sm text-sm md:text-headline-lg text-on-surface">{{ founder.maverickWins }}</td>
                
                <!-- Total Points Calculated Structure -->
                <td class="px-3 py-4 md:px-6 md:py-8 text-right font-display-lg text-base md:text-display-lg"
                  :class="index === 0 ? 'text-primary gold-glow' : 'text-on-surface'">
                  {{ founder.totalPoints }}
                </td>

              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Analytics Core Engine Section -->
      <section class="mb-20">
        <h2 class="font-headline-lg text-headline-lg text-on-surface mb-8">Guts & Glory Analytics</h2>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <!-- Maverick King Tracker Panel -->
          <div
            class="lg:col-span-1 glass-card p-8 rounded-xl flex flex-col justify-between relative overflow-hidden group">
            <div class="absolute -right-12 -top-12 opacity-10 transition-transform group-hover:scale-110 duration-700">
              <span class="material-symbols-outlined text-[160px] text-primary">psychology</span>
            </div>
            <div>
              <div class="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-lg mb-6">
                <span class="material-symbols-outlined text-primary">military_tech</span>
              </div>
              <h3 class="font-headline-md text-headline-md md:font-headline-lg md:text-headline-lg mb-2">Maverick King</h3>
              <p class="font-body-md text-body-md text-on-surface-variant">Highest number of "Gut Feeling" picks that resulted in a victory.</p>
            </div>
            <div class="mt-8" v-if="maverickLeader">
              <div class="text-primary font-headline-md text-headline-md md:font-display-lg md:text-display-lg">
                {{ maverickLeader.name }}
              </div>
              <div class="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                <span class="px-3 py-1 bg-primary/20 text-primary font-label-sm text-label-sm rounded-full w-fit">
                  {{ maverickLeader.maverickWins }} Maverick Wins
                </span>
                <span class="text-on-surface-variant text-label-sm font-label-sm">In selected filter round</span>
              </div>
            </div>
          </div>

          <!-- Dynamic Dial Accuracy Gauges Container -->
          <div class="lg:col-span-2 glass-card p-8 rounded-xl">
            <div class="flex justify-between items-center mb-10">
              <h3 class="font-headline-lg text-headline-lg">Accuracy Gauges</h3>
              <span class="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                Hit Rate ({{ selectedStage }})
              </span>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div v-for="founder in founderStats" :key="`${founder.id}-gauge`" class="flex flex-col items-center">
                <div class="relative w-28 h-28 mb-4">
                  <svg class="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" fill="transparent" r="50" stroke="#2d2d2d" stroke-width="6"></circle>
                    <circle cx="56" cy="56" fill="transparent" r="50" stroke="#e1b638" stroke-dasharray="314.1"
                      :stroke-dashoffset="((100 - founder.accuracy) / 100) * 314.1" stroke-linecap="round" stroke-width="6">
                    </circle>
                  </svg>
                  <div class="absolute inset-0 flex items-center justify-center font-display-lg text-title-lg text-on-surface">
                    {{ founder.accuracy }}%
                  </div>
                </div>
                <div class="font-body-md text-body-md font-bold text-on-surface">{{ founder.name }}</div>
                <div class="text-label-sm font-label-sm text-on-surface-variant">
                  {{ founder.correctPicks }} of {{ filteredCompletedCount }}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.glass-card {
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid #2d2d2d;
}

.leaderboard-row:hover {
  background: rgba(225, 182, 56, 0.05);
  border-color: #e1b638;
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(225, 182, 56, 0.1);
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

.gold-glow {
  text-shadow: 0 0 10px rgba(225, 182, 56, 0.5);
}
</style>