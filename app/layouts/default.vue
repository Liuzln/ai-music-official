<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div class="bg-blob bg-blob-1 absolute -top-32 -right-40 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-500/15"></div>
      <div class="bg-blob bg-blob-2 absolute top-1/3 -left-40 h-[28rem] w-[28rem] rounded-full bg-fuchsia-300/20 blur-3xl dark:bg-fuchsia-500/10"></div>
      <div class="bg-blob bg-blob-3 absolute -bottom-40 right-1/4 h-[26rem] w-[26rem] rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/10"></div>
    </div>

    <SiteHeader />

    <main id="top">
      <slot />
    </main>
  </div>
</template>
