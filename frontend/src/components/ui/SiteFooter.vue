<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseContainer from './BaseContainer.vue'

/**
 * SiteFooter
 * 作用：
 * - 站点通用底部区域，展示品牌信息与快捷链接
 * - 支持传入 links 动态渲染，便于在不同项目中复用
 *
 * 调用示例：
 * <SiteFooter
 *   brand="Project Atlas"
 *   description="个人项目导航中心"
 *   :links="[{ label: '首页', to: '/' }, { label: 'GitHub', href: 'https://github.com', newTab: true }]"
 * />
 */
const props = defineProps({
  brand: {
    type: String,
    default: 'My Site',
  },
  description: {
    type: String,
    default: '',
  },
  links: {
    type: Array,
    default: () => [],
  },
  copyrightText: {
    type: String,
    default: '',
  },
})

const fallbackCopyright = computed(() => `© ${new Date().getFullYear()} ${props.brand}. All rights reserved.`)
</script>

<template>
  <footer class="site-footer">
    <BaseContainer class="footer-inner">
      <div class="brand-block">
        <p class="brand">{{ brand }}</p>
        <p v-if="description" class="desc">{{ description }}</p>
      </div>

      <nav v-if="links.length" class="links" aria-label="footer links">
        <template v-for="link in links" :key="link.label">
          <RouterLink v-if="link.to" :to="link.to" class="link">{{ link.label }}</RouterLink>
          <a
            v-else
            :href="link.href || '#'"
            class="link"
            :target="link.newTab ? '_blank' : '_self'"
            :rel="link.newTab ? 'noopener noreferrer' : undefined"
          >
            {{ link.label }}
          </a>
        </template>
      </nav>

      <p class="copy">{{ copyrightText || fallbackCopyright }}</p>
    </BaseContainer>
  </footer>
</template>

<style scoped>
.site-footer {
  margin-top: 2rem;
  border-top: 1px solid var(--neutral-200);
  background: color-mix(in srgb, white 78%, transparent);
}

.footer-inner {
  display: grid;
  gap: 0.9rem;
  padding-top: 1.2rem;
  padding-bottom: 1.4rem;
}

.brand {
  color: var(--color-heading);
  font-size: 0.98rem;
  font-weight: 600;
}

.desc {
  margin-top: 0.25rem;
  color: var(--color-text-soft);
  font-size: 0.9rem;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.link {
  color: var(--color-text-soft);
  font-size: 0.9rem;
}

.copy {
  color: var(--color-text-soft);
  font-size: 0.82rem;
}

@media (min-width: 900px) {
  .footer-inner {
    grid-template-columns: 1.2fr auto auto;
    align-items: end;
    gap: 1rem;
  }

  .copy {
    text-align: right;
  }
}
</style>
