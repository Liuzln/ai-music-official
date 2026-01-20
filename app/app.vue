<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html {
  scroll-behavior: smooth;
}

/* Transitions */
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: opacity, transform, filter;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(12px) scale(0.985);
  filter: blur(16px);
}
.page-leave-from,
.page-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0);
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
  .page-enter-from,
  .page-leave-to {
    transform: none;
    filter: none;
  }
}
</style>
