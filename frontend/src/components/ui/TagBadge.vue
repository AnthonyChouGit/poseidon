<script setup>
/**
 * TagBadge
 * 作用：
 * - 展示简短标签（如技术栈、状态、分类）
 * - 支持不同视觉风格，便于在多个页面统一复用
 *
 * 调用示例：
 * <TagBadge text="Vue 3" tone="primary" />
 */
defineProps({
  text: {
    type: String,
    required: true,
  },
  tone: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'neutral', 'success'].includes(value),
  },
})
</script>

<template>
  <span class="tag-badge" :class="`tone-${tone}`">{{ text }}</span>
</template>

<style scoped>
.tag-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.28rem 0.65rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 500;
  border: 1px solid transparent;
}

.tone-primary {
  color: var(--brand-700);
  background: var(--brand-050);
  border-color: var(--brand-200);
}

.tone-neutral {
  color: var(--color-text-soft);
  background: var(--neutral-050);
  border-color: var(--neutral-200);
}

.tone-success {
  color: #0e6245;
  background: #e9f8f2;
  border-color: #bee7d8;
}
</style>
