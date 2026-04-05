<script setup>
import ActionButton from './ActionButton.vue'
import TagBadge from './TagBadge.vue'

/**
 * ProjectCard
 * 作用：
 * - 单个项目卡片展示（图片、标题、简介、标签、动作按钮）
 * - 通过 item 对象传入内容，方便接入后端接口或本地配置
 *
 * 调用示例：
 * <ProjectCard :item="projectItem" />
 *
 * projectItem 推荐结构：
 * {
 *   title: '项目名称',
 *   summary: '项目说明',
 *   cover: '/img/demo.svg',
 *   tags: ['Vue', 'Vite'],
 *   actions: [{ label: '进入', to: '/about' }]
 * }
 */
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="project-card">
    <img class="cover" :src="item.cover" :alt="item.title" loading="lazy" />

    <div class="body">
      <h3 class="title">{{ item.title }}</h3>
      <p class="summary">{{ item.summary }}</p>

      <div class="tags">
        <TagBadge
          v-for="tag in item.tags || []"
          :key="tag"
          :text="tag"
          tone="neutral"
        />
      </div>

      <div class="actions">
        <ActionButton
          v-for="action in item.actions || []"
          :key="`${item.title}-${action.label}`"
          :label="action.label"
          :to="action.to"
          :href="action.href"
          :new-tab="Boolean(action.newTab)"
          :variant="action.variant || 'secondary'"
          size="sm"
        />
      </div>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid var(--neutral-200);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 24px 50px -42px rgba(16, 24, 40, 0.55);
}

.cover {
  width: 100%;
  height: 182px;
  object-fit: cover;
  background: var(--neutral-100);
}

.body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
}

.title {
  color: var(--color-heading);
  font-size: 1.05rem;
  font-weight: 600;
}

.summary {
  color: var(--color-text-soft);
  font-size: 0.92rem;
  min-height: 44px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.15rem;
}
</style>
