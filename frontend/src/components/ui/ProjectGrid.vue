<script setup>
import ProjectCard from './ProjectCard.vue'

/**
 * ProjectGrid
 * 作用：
 * - 按网格布局渲染项目列表
 * - 通过 columns 控制桌面端列数，支持未来扩展筛选/分页
 *
 * 调用示例：
 * <ProjectGrid :projects="projects" :columns="3" />
 */
defineProps({
  projects: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Number,
    default: 3,
  },
})
</script>

<template>
  <div v-if="projects.length" class="project-grid" :style="{ '--grid-columns': columns }">
    <ProjectCard v-for="project in projects" :key="project.title" :item="project" />
  </div>
  <div v-else class="empty">
    还没有项目，后续可以直接传入新的 projects 数据。
  </div>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.15rem;
  }
}

@media (min-width: 1080px) {
  .project-grid {
    grid-template-columns: repeat(var(--grid-columns), minmax(0, 1fr));
  }
}

.empty {
  border: 1px dashed var(--neutral-300);
  border-radius: 1rem;
  padding: 1.2rem;
  color: var(--color-text-soft);
  background: var(--neutral-050);
}
</style>
