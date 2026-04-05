<script setup>
/**
 * SectionHeader
 * 作用：
 * - 统一区块标题、说明文案、右侧插槽操作区
 * - 适合用于 Hero、分组标题、页面说明等场景
 *
 * 调用示例：
 * <SectionHeader
 *   title="项目导航"
 *   subtitle="快速进入常用功能"
 * />
 */
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  align: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'center'].includes(value),
  },
})
</script>

<template>
  <header class="section-header" :class="`is-${align}`">
    <div class="main">
      <h2 class="title">{{ title }}</h2>
      <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
    </div>
    <div v-if="$slots.actions" class="actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.main {
  max-width: 680px;
}

.title {
  color: var(--color-heading);
  font-size: clamp(1.35rem, 2.5vw, 2rem);
  font-weight: 600;
  line-height: 1.2;
}

.subtitle {
  margin-top: 0.65rem;
  color: var(--color-text-soft);
  font-size: 0.97rem;
}

.actions {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.is-center {
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.is-center .actions {
  justify-content: center;
}

@media (max-width: 767px) {
  .section-header {
    flex-direction: column;
  }
}
</style>
