<template>
  <div class="min-h-screen text-slate-900 dark:text-slate-100">
    <SiteHeader />

    <main id="top" class="-mt-16">
      <slot />
    </main>

    <IcpBeianFloat />
  </div>
</template>
