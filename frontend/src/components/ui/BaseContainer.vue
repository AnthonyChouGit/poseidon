<script setup>
/**
 * BaseContainer
 * 作用：
 * - 统一页面内容最大宽度与左右留白
 * - 通过 maxWidth / padding 控制不同页面的排版密度
 *
 * 调用示例：
 * <BaseContainer>
 *   <h2>内容区</h2>
 * </BaseContainer>
 */
defineProps({
  as: {
    type: String,
    default: 'div',
  },
  maxWidth: {
    type: String,
    default: '1120px',
  },
  padding: {
    type: String,
    default: '0 1rem',
  },
})
</script>

<template>
  <component :is="as" class="base-container" :style="{ '--container-max-width': maxWidth, '--container-padding': padding }">
    <slot />
  </component>
</template>

<style scoped>
.base-container {
  width: 100%;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--container-padding);
}

@media (min-width: 768px) {
  .base-container {
    padding: 0 1.5rem;
  }
}
</style>
