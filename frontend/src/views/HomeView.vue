<script setup>
import { ref, onMounted } from 'vue'
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ActionButton from '@/components/ui/ActionButton.vue'
import TagBadge from '@/components/ui/TagBadge.vue'
import ProjectGrid from '@/components/ui/ProjectGrid.vue'
import { fetch_all_apps } from '@/api/app_api'

/**
 * 封面图放在仓库根的 `media/covers/` 下，命名规则为 `<appid>_<title>.svg`，
 * 由后端的 media router 通过 `/media/covers/...` 路径下发，前端按需拼 URL 拉取。
 */
function resolve_cover(app) {
  return `/media/covers/${app.appid}_${app.title}.svg`
}

const apps = ref([])
const loading = ref(false)
const error_msg = ref('')

onMounted(async () => {
  loading.value = true
  try {
    const resp = await fetch_all_apps()
    const payload = resp.data
    if (payload?.success) {
      apps.value = (payload.data?.apps || []).map((app) => ({
        ...app,
        cover: resolve_cover(app),
      }))
    } else {
      error_msg.value = payload?.data?.msg || '获取应用列表失败'
    }
  } catch (err) {
    console.error(err)
    error_msg.value = err.message || '请求应用列表出错'
  } finally {
    loading.value = false
  }
})
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

        <p v-if="loading" class="status-line">正在加载应用列表…</p>
        <p v-else-if="error_msg" class="status-line error">{{ error_msg }}</p>
        <ProjectGrid v-else :projects="apps" :columns="3" />
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

.status-line {
  padding: 1rem;
  color: var(--color-text-soft);
  font-size: 0.95rem;
}

.status-line.error {
  color: #c0392b;
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
