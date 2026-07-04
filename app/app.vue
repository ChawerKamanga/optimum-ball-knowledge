<script setup>
useHead({
  title: 'Optimum Ball Knowledge | Founders World Cup Predictor',
  htmlAttrs: {
    class: 'dark',
    lang: 'en'
  },
  bodyAttrs: {
    class: 'font-body-lg text-body-lg min-h-screen pb-24 md:pb-0'
  },
  link: [
    { href: 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;700&display=swap', rel: 'stylesheet' },
    { href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap', rel: 'stylesheet' }
  ],
  script: [
    { src: 'https://cdn.tailwindcss.com?plugins=forms,container-queries' },
    {
      id: 'tailwind-config',
      innerHTML: `
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                "on-tertiary-fixed": "#1b1c1c", "surface-container-highest": "#353534", "on-secondary": "#313030",
                "surface-container-lowest": "#0e0e0e", "inverse-on-surface": "#313030", "surface-container-low": "#1c1b1b",
                "outline-variant": "#4e4635", "inverse-primary": "#755b00", "inverse-surface": "#e5e2e1",
                "error": "#ffb4ab", "on-error-container": "#ffdad6", "on-secondary-fixed-variant": "#474746",
                "outline": "#9a907b", "error-container": "#93000a", "surface-dim": "#131313",
                "on-tertiary-container": "#4b4b4b", "on-primary-container": "#5e4800", "on-error": "#690005",
                "surface": "#131313", "surface-variant": "#353534", "on-background": "#e5e2e1",
                "tertiary-container": "#bdbbbb", "surface-container": "#201f1f", "secondary-fixed": "#e5e2e1",
                "on-surface": "#e5e2e1", "tertiary-fixed": "#e4e2e1", "on-surface-variant": "#d1c5af",
                "surface-container-high": "#2a2a2a", "on-tertiary": "#303030", "primary-fixed-dim": "#edc143",
                "secondary-fixed-dim": "#c8c6c5", "background": "#131313", "primary-fixed": "#ffdf91",
                "on-primary-fixed": "#241a00", "on-primary-fixed-variant": "#594400", "on-tertiary-fixed-variant": "#474747",
                "on-secondary-container": "#b7b5b4", "primary": "#e1b638", "secondary-container": "#474746",
                "primary-container": "#e1b638", "on-primary": "#3d2e00", "tertiary": "#d9d7d6",
                "surface-tint": "#edc143", "tertiary-fixed-dim": "#c8c6c6", "on-secondary-fixed": "#1c1b1b",
                "secondary": "#c8c6c5", "surface-bright": "#3a3939"
              },
              "borderRadius": {
                "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem"
              },
              "spacing": {
                "base": "8px", "lg": "40px", "gutter": "16px", "xl": "64px",
                "sm": "12px", "xs": "4px", "margin-mobile": "20px", "md": "24px", "margin-desktop": "48px"
              },
              "fontFamily": {
                "display-lg-mobile": ["Syne"], "label-bold": ["Plus Jakarta Sans"], "headline-md": ["Syne"],
                "body-lg": ["Plus Jakarta Sans"], "title-lg": ["Plus Jakarta Sans"], "body-sm": ["Plus Jakarta Sans"],
                "display-lg": ["Syne"]
              },
              "fontSize": {
                "display-lg-mobile": ["32px", {"lineHeight": "1.1", "fontWeight": "800"}],
                "label-bold": ["12px", {"lineHeight": "1", "letterSpacing": "0.1em", "fontWeight": "700"}],
                "headline-md": ["24px", {"lineHeight": "1.2", "fontWeight": "700"}],
                "body-lg": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
                "title-lg": ["20px", {"lineHeight": "1.4", "fontWeight": "700"}],
                "body-sm": ["14px", {"lineHeight": "1.5", "fontWeight": "400"}],
                "display-lg": ["48px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "800"}]
              }
            }
          }
        }
      `
    }
  ]
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
body {
  background-color: #0d0d0d;
  color: #e5e2e1;
  -webkit-font-smoothing: antialiased;
}

.glass-card {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  transition: border-color 0.3s ease;
}

.glass-card:not(.neon-border):hover {
  border-color: rgba(225, 182, 56, 0.2);
}

.glow-primary {
  box-shadow: 0 0 20px rgba(225, 182, 56, 0.3);
}

.neon-border {
  border: 2px solid #e1b638;
  box-shadow: 0 0 15px rgba(225, 182, 56, 0.4);
}

.maverick-dotted {
  border: 1.5px dashed #e1b638;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #0f1416;
}

::-webkit-scrollbar-thumb {
  background: #3e484e;
  border-radius: 10px;
}
</style>
