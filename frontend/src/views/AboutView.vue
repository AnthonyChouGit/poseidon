<script setup>
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import TagBadge from '@/components/ui/TagBadge.vue'
import ActionButton from '@/components/ui/ActionButton.vue'

const blocks = [
  {
    title: '前端实现',
    desc: '使用Vue.js 3、Vue Router等技术栈实现前端页面。',
    tags: ['Vue.js', 'Vue Router'],
  },
  {
    title: '后端实现',
    desc: '使用Express.js和MongoDB实现后端API接口。',
    tags: ['Express.js', 'MongoDB'],
  },
]
</script>

<template>
  <main class="about-page">
    <BaseContainer>
      <SectionHeader
        title="关于Poseidon项目"
        subtitle="本项目由ノゾム君全栈搭建，用于个人实现服务器监控、知识库管理、视频同步观看等功能。"
      >
        <template #actions>
          <ActionButton label="返回首页" to="/" variant="secondary" />
        </template>
      </SectionHeader>

      <section class="info-grid">
        <article v-for="block in blocks" :key="block.title" class="info-card">
          <h3>{{ block.title }}</h3>
          <p>{{ block.desc }}</p>
          <div class="tags">
            <TagBadge v-for="tag in block.tags" :key="tag" :text="tag" />
          </div>
        </article>
      </section>
    </BaseContainer>
  </main>
</template>

<style scoped>
.about-page {
  padding: 1.5rem 0 2.5rem;
}

.info-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.9rem;
}

.info-card {
  background: white;
  border: 1px solid var(--neutral-200);
  border-radius: 1rem;
  padding: 1rem;
}

.info-card h3 {
  color: var(--color-heading);
  font-size: 1.06rem;
  font-weight: 600;
}

.info-card p {
  margin-top: 0.45rem;
  color: var(--color-text-soft);
  font-size: 0.93rem;
}

.tags {
  margin-top: 0.65rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

@media (min-width: 900px) {
  .about-page {
    padding-top: 2rem;
  }

  .info-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
}
</style>
