<template>
  <footer class="border-t border-slate-200/70 bg-white/75 dark:border-slate-800/70 dark:bg-slate-950/70">
    <div class="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm text-slate-500 dark:text-slate-400 md:grid-cols-2 md:items-start">
      <div class="space-y-2">
        <div>© {{ year }} {{ siteName }}. All rights reserved.</div>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          <div class="inline-flex items-center gap-2">
            <QrCode class="h-4 w-4" />
            <span class="font-medium text-slate-600 dark:text-slate-300">{{ t('contact.wechat.label') }}:</span>
            <span>{{ contactWeChat || t('contact.wechat.placeholder') }}</span>
          </div>
          <div class="inline-flex items-center gap-2">
            <Mail class="h-4 w-4" />
            <span class="font-medium text-slate-600 dark:text-slate-300">{{ t('contact.email.label') }}:</span>
            <span>{{ contactEmail || t('contact.email.placeholder') }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-wrap gap-x-5 gap-y-2 md:justify-end">
        <NuxtLink class="hover:text-slate-700 dark:hover:text-slate-200" to="/templates">
          {{ t('sections.footerLinks.features') }}
        </NuxtLink>
        <NuxtLink class="hover:text-slate-700 dark:hover:text-slate-200" to="/models">
          {{ t('sections.footerLinks.workflow') }}
        </NuxtLink>
        <NuxtLink class="hover:text-slate-700 dark:hover:text-slate-200" to="/about">
          {{ t('sections.footerLinks.scenarios') }}
        </NuxtLink>
        <NuxtLink class="hover:text-slate-700 dark:hover:text-slate-200" to="/contact">
          {{ t('sections.footerLinks.faq') }}
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Mail, QrCode } from 'lucide-vue-next'

const { t } = useI18n()
const { siteName, contactEmail, contactWeChat } = useOfficialSiteConfig()
const year = new Date().getFullYear()
</script>
