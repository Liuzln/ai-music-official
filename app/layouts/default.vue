<template>
  <div class="min-h-screen bg-slate-50 pb-24 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <SiteHeader />

    <main id="top">
      <slot />
    </main>

    <IcpBeianFloat />
  </div>
</template>
