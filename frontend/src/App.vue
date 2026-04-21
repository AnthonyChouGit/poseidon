<script setup>
import { RouterView } from 'vue-router'
import TopNav from '@/components/ui/TopNav.vue'
import SiteFooter from '@/components/ui/SiteFooter.vue'

const navLinks = [
  { label: '首页', to: '/' },
  { label: '关于', to: '/about' },
]

const brand="Project Poseidon"

/**
 * 默认未登录：currentUser = null
 * 登录后可替换为：
 * { name: '你的账号名', avatar: '头像地址' }
 */
const currentUser = null

const footerLinks = [
  { label: '首页', to: '/' },
  { label: '关于', to: '/about' },
  { label: 'GitHub', href: 'https://github.com/AnthonyChouGit/poseidon', newTab: true },
]
</script>

<template>
  <div class="app-shell">
    <TopNav
      :brand="brand"
      :links="navLinks"
      cta-label="登录"
      cta-to="/login"
      secondary-cta-label="注册"
      secondary-cta-to="/register"
      :current-user="currentUser"
    />
    <main class="page-content">
      <RouterView />
    </main>
    <SiteFooter
      :brand="brand"
      description="由ノゾム君全栈搭建的个人项目"
      :links="footerLinks"
    />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
}
</style>
