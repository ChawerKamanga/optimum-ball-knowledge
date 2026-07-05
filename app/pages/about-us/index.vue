<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Glow effect on cards
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
  <div class="min-h-screen flex flex-col bg-background text-on-surface font-body-md pt-10 md:pt-24">
    
    <main class="flex-grow radial-bg relative">
      <div class="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
        
        <!-- Back Navigation -->
        <div class="mb-8">
          <NuxtLink to="/" class="group flex items-center space-x-2 w-fit text-primary font-body-md text-body-md hover:underline transition-all">
            <span class="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
            <span>Back to Fixtures</span>
          </NuxtLink>
        </div>

        <!-- Page Header -->
        <header class="mb-16">
          <span class="font-label-sm text-label-sm text-primary uppercase tracking-[0.4em] mb-4 block">Who We Are</span>
          <h1 class="font-headline-md text-headline-md md:font-display-lg md:text-display-lg text-white mb-4">
            About Optimum Systems
          </h1>
          <p class="text-on-surface-variant font-body-md max-w-2xl">
            From deploying modern enterprise digital infrastructure to arguing over high-stakes football margins—precision is everything we do.
          </p>
        </header>

        <!-- Bento Layout: Enterprise Profile & World Cup Banter -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          <!-- Corporate Mission & Location Card -->
          <div class="md:col-span-7 glass-card p-8 md:p-10 flex flex-col justify-between group rounded-xl relative overflow-hidden">
            <div class="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
              <span class="material-symbols-outlined text-[200px]">apartment</span>
            </div>
            <div>
              <div class="flex items-center gap-3 mb-6">
                <span class="material-symbols-outlined text-primary text-3xl">terminal</span>
                <h3 class="font-headline-md text-headline-md md:font-headline-lg md:text-headline-lg text-white">The Tech Stack & Mandate</h3>
              </div>
              <p class="text-on-surface-variant font-body-md mb-6 leading-relaxed">
                <strong class="text-white">Optimum Systems Limited</strong> is a Malawian technology company specializing in custom software development, mobile applications, data analytics, and AI integration. 
              </p>
              <p class="text-on-surface-variant font-body-md mb-6 leading-relaxed">
                Founded in 2024 and headquartered in Chigumula, Blantyre (on Vipya Avenue near the SMEDI offices), the company explicitly helps organizations phase out unreliable manual processes in favor of modern, data-driven digital infrastructure.
              </p>
            </div>
            <div class="mt-4 inline-flex items-center gap-3 py-2 px-4 bg-surface-container-high border border-outline-variant rounded-lg w-fit">
              <span class="material-symbols-outlined text-primary">location_on</span>
              <span class="font-label-sm text-label-sm text-on-surface">Chigumula, Blantyre, Malawi</span>
            </div>
          </div>

          <!-- Why We Built This Card -->
          <div class="md:col-span-5 glass-card p-8 md:p-10 group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#131313] to-surface-container-low">
            <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <span class="material-symbols-outlined text-8xl" style="font-variation-settings: 'FILL' 1;">sports_soccer</span>
            </div>
            <div class="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div class="flex items-center gap-3 mb-6">
                  <span class="material-symbols-outlined text-primary text-3xl">celebration</span>
                  <h3 class="font-headline-md text-headline-md md:font-headline-lg md:text-headline-lg text-white">Why This App?</h3>
                </div>
                <p class="text-on-surface-variant font-body-md mb-6 leading-relaxed">
                  Look, we build complex automated structures for work—but we live for the World Cup. 
                </p>
                <p class="text-on-surface-variant font-body-md mb-6 leading-relaxed">
                  Instead of tracking predictions inside messy WhatsApp groups or prone-to-error local spreadsheets, we built a robust, custom-engineered platform to crown the undisputed <strong>"Ball Knower"</strong> among the founders.
                </p>
              </div>
              <div class="text-primary font-mono text-[11px] uppercase tracking-widest mt-4">
                // Powered by genuine passion & gut feelings
              </div>
            </div>
          </div>

          <!-- Tech vs Ball Knowledge Metrics Card -->
          <div class="md:col-span-12 glass-card p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 group rounded-xl">
            <div class="max-w-xl">
              <div class="flex items-center gap-3 mb-4">
                <span class="material-symbols-outlined text-primary text-3xl">monitoring</span>
                <h3 class="font-headline-md text-headline-md md:font-headline-lg md:text-headline-lg text-white">Dual Competency</h3>
              </div>
              <p class="text-on-surface-variant font-body-md">
                We handle enterprise architecture and real-time data ingestion streams with ease. Yet, calculating the probability of a Maverick prediction hitting the net in the 90th minute remains our favorite engineering milestone to date.
              </p>
            </div>
            <div class="w-full md:w-auto flex items-center justify-center gap-10 bg-surface-container-lowest p-6 border border-outline-variant rounded-lg min-w-[280px]">
              <div class="text-center">
                <span class="text-primary font-display-lg text-4xl block font-bold mb-1">100%</span>
                <span class="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">Digital Infrastructure</span>
              </div>
              <div class="h-8 w-px bg-outline-variant"></div>
              <div class="text-center">
                <span class="text-white font-display-lg text-4xl block font-bold mb-1">∞%</span>
                <span class="font-label-sm text-[10px] text-on-surface-variant uppercase tracking-wider">Football Banter</span>
              </div>
            </div>
          </div>
        </div>

        <!-- The Banter Constitution Quote -->
        <div class="gold-border-outline bg-surface p-8 md:p-16 text-center relative overflow-hidden rounded-xl">
          <div class="absolute inset-0 opacity-5 pointer-events-none" style="background-image: radial-gradient(#e1b638 1px, transparent 1px); background-size: 20px 20px;"></div>
          <div class="relative z-10">
            <span class="font-label-sm text-label-sm text-primary uppercase tracking-[0.4em] mb-6 block">Founders Statement</span>
            <h2 class="font-headline-md text-headline-md md:font-display-lg md:text-display-lg text-white mb-6">Work Hard. Predict Harder.</h2>
            <p class="font-body-md text-on-surface-variant max-w-2xl mx-auto italic leading-relaxed text-base md:text-lg">
              "We take client transformations seriously, leaving no room for manual legacy bugs. But when the referee blows the whistle, all systems are deployed to see whether Chawa, Shad, or Vincent will take home the ultimate glory of the leaderboard."
            </p>
            <div class="mt-8 flex justify-center gap-6 opacity-40">
              <div class="flex flex-col items-center">
                <span class="material-symbols-outlined text-3xl mb-1">code</span>
                <span class="font-label-sm text-[9px] uppercase tracking-wider">Clean Code</span>
              </div>
              <div class="flex flex-col items-center">
                <span class="material-symbols-outlined text-3xl mb-1">sports</span>
                <span class="font-label-sm text-[9px] uppercase tracking-wider">Fair Play</span>
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