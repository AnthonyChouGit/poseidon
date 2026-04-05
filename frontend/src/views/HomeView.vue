<script setup>
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ActionButton from '@/components/ui/ActionButton.vue'
import TagBadge from '@/components/ui/TagBadge.vue'
import ProjectGrid from '@/components/ui/ProjectGrid.vue'

import serverMonitorCover from '@/assets/images/module-server-monitor.svg'
import knowledgeBaseCover from '@/assets/images/module-knowledge-base.svg'
import watchPartyCover from '@/assets/images/module-watch-party.svg'

/**
 * 首页导航数据
 * 后续只需替换/新增这个数组内容，就能扩展导航入口。
 */
const projects = [
  {
    title: '服务器运行监控',
    summary: '监控服务器运行状态，包括CPU、内存、磁盘、网络等指标。',
    cover: serverMonitorCover,
    tags: ['服务器', '监控', '状态'],
    actions: [
      { label: '进入模块', to: '/', variant: 'primary' },
      { label: '关于本模块', href: '#', variant: 'secondary' },
    ],
  },
  {
    title: 'pwiki知识库',
    summary: '用于放置个人知识库，支持快速查阅和编辑。',
    cover: knowledgeBaseCover,
    tags: ['知识库', '查阅', '编辑'],
    actions: [
      { label: '进入模块', to: '/', variant: 'primary' },
      { label: '关于本模块', href: '#', variant: 'secondary' },
    ],
  },
  {
    title: '视频同步观看',
    summary: '支持多人同时观看视频，支持实时同步进度。',
    cover: watchPartyCover,
    tags: ['视频', '同步', '观看'],
    actions: [
      { label: '进入模块', to: '/', variant: 'primary' },
      { label: '关于本模块', href: '#', variant: 'secondary' },
    ],
  },
]
</script>

<template>
  <main class="home-page">
    <section class="hero">
      <BaseContainer class="hero-content">
        <SectionHeader
          title="你好，欢迎来到Poseidon项目主页"
          subtitle="本项目由ノゾム君全栈搭建，包含服务器监控、个人知识库管理、视频同步观看等功能"
        >
          <template #actions>
            <TagBadge text="前端：vue.js" />
            <TagBadge text="后端：express.js" tone="success" />
          </template>
        </SectionHeader>

        <div class="hero-actions">
          <ActionButton label="了解本项目" to="/about" variant="primary" size="lg" />
          <ActionButton label="问题反馈" href="#" variant="ghost" size="lg" />
        </div>
      </BaseContainer>
    </section>

    <section class="projects">
      <BaseContainer>
        <SectionHeader
          title="项目功能导航"
          subtitle="请选择你想体验的功能模块"
        />

        <ProjectGrid :projects="projects" :columns="3" />
      </BaseContainer>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  padding: 1.4rem 0 3rem;
}

.hero {
  margin-bottom: 1.8rem;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding-top: 1.2rem;
  padding-bottom: 1.4rem;
  background: linear-gradient(145deg, rgba(223, 240, 255, 0.58), rgba(235, 252, 247, 0.7));
  border: 1px solid var(--neutral-200);
  border-radius: 1.2rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.projects :deep(.section-header) {
  margin-bottom: 1rem;
}

@media (min-width: 1080px) {
  .home-page {
    padding-top: 2rem;
  }

  .hero-content {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style>
