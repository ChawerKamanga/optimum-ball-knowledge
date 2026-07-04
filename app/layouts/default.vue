<template>
  <div>
    <AppHeader />

    <main class="max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-lg">
      <slot />
    </main>

    <AppAdminPanel />
    <AppMobileNavigation />
    <AppFooter />
  </div>
</template>
