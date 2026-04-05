<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

/**
 * ActionButton
 * 作用：
 * - 统一按钮风格，支持内部路由跳转和外部链接跳转
 * - 通过 variant / size 在不同场景复用
 *
 * 调用示例：
 * <ActionButton label="进入工作台" to="/about" />
 * <ActionButton label="查看仓库" href="https://github.com" variant="ghost" newTab />
 */
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  to: {
    type: [String, Object],
    default: '',
  },
  href: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'ghost'].includes(value),
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  newTab: {
    type: Boolean,
    default: false,
  },
  ariaLabel: {
    type: String,
    default: '',
  },
})

const isRouterLink = computed(() => Boolean(props.to))
</script>

<template>
  <RouterLink
    v-if="isRouterLink"
    :to="to"
    class="action-button"
    :class="[`variant-${variant}`, `size-${size}`]"
    :aria-label="ariaLabel || label"
  >
    <span>{{ label }}</span>
    <slot />
  </RouterLink>

  <a
    v-else
    :href="href || '#'"
    class="action-button"
    :class="[`variant-${variant}`, `size-${size}`]"
    :target="newTab ? '_blank' : '_self'"
    :rel="newTab ? 'noopener noreferrer' : undefined"
    :aria-label="ariaLabel || label"
  >
    <span>{{ label }}</span>
    <slot />
  </a>
</template>

<style scoped>
.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  border-radius: 0.75rem;
  border: 1px solid transparent;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.action-button:hover {
  transform: translateY(-1px);
}

.size-sm {
  font-size: 0.85rem;
  padding: 0.45rem 0.75rem;
}

.size-md {
  font-size: 0.93rem;
  padding: 0.62rem 1rem;
}

.size-lg {
  font-size: 0.98rem;
  padding: 0.72rem 1.2rem;
}

.variant-primary {
  color: white;
  background: linear-gradient(120deg, var(--brand-600), var(--brand-500));
  box-shadow: 0 12px 24px -16px var(--brand-shadow);
}

.variant-primary:hover {
  box-shadow: 0 16px 32px -18px var(--brand-shadow);
}

.variant-secondary {
  color: var(--brand-700);
  background: var(--brand-050);
  border-color: var(--brand-200);
}

.variant-ghost {
  color: var(--color-text);
  background: transparent;
  border-color: var(--color-border);
}
</style>
