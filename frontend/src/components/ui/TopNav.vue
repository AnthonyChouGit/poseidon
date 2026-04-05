<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ActionButton from './ActionButton.vue'
import BaseContainer from './BaseContainer.vue'

/**
 * TopNav
 * 作用：
 * - 站点顶部导航栏（品牌 + 菜单 + 可选 CTA）
 * - 内置移动端菜单开关，适配手机与桌面
 *
 * 调用示例：
 * <TopNav
 *   brand="NaviLab"
 *   :links="[{ label: '首页', to: '/' }]"
 *   cta-label="关于我"
 *   cta-to="/about"
 * />
 */
const props = defineProps({
  brand: {
    type: String,
    default: 'My Navigation',
  },
  links: {
    type: Array,
    default: () => [],
  },
  ctaLabel: {
    type: String,
    default: '',
  },
  ctaTo: {
    type: [String, Object],
    default: '',
  },
  /**
   * currentUser 结构示例：
   * {
   *   name: 'Alice',
   *   avatar: 'https://example.com/avatar.png'
   * }
   * 传 null 或不传即为未登录状态。
   */
  currentUser: {
    type: Object,
    default: null,
  },
  guestText: {
    type: String,
    default: '未登录',
  },
})

const route = useRoute()
const isMenuOpen = ref(false)
const isLoggedIn = computed(() => Boolean(props.currentUser?.name))
const displayName = computed(() => (isLoggedIn.value ? props.currentUser.name : props.guestText))
const avatarUrl = computed(() => (isLoggedIn.value ? props.currentUser.avatar : ''))
const avatarFallback = computed(() => (isLoggedIn.value ? String(props.currentUser.name).charAt(0) : '?'))

function closeMenu() {
  isMenuOpen.value = false
}

function isActiveLink(link) {
  return route.path === link.to
}
</script>

<template>
  <header class="top-nav">
    <BaseContainer class="inner">
      <div class="brand-area">
        <RouterLink to="/" class="brand" @click="closeMenu">{{ brand }}</RouterLink>
      </div>

      <div class="tools">
        <div class="auth-status" :class="{ logged: isLoggedIn }" aria-label="登录状态">
          <span class="avatar">
            <img v-if="avatarUrl" :src="avatarUrl" :alt="`${displayName} 头像`" />
            <span v-else class="fallback">{{ avatarFallback }}</span>
          </span>
          <span class="name">{{ displayName }}</span>
        </div>

        <button class="menu-toggle" type="button" @click="isMenuOpen = !isMenuOpen" aria-label="切换导航菜单">
          {{ isMenuOpen ? '关闭' : '菜单' }}
        </button>
      </div>

      <nav class="menu" :class="{ open: isMenuOpen }">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="menu-link"
          :class="{ active: isActiveLink(link) }"
          @click="closeMenu"
        >
          {{ link.label }}
        </RouterLink>

        <ActionButton
          v-if="ctaLabel"
          class="cta"
          :label="ctaLabel"
          :to="ctaTo"
          variant="primary"
          size="sm"
          @click="closeMenu"
        />
      </nav>
    </BaseContainer>
  </header>
</template>

<style scoped>
.top-nav {
  position: sticky;
  top: 0;
  z-index: 30;
  backdrop-filter: blur(10px);
  background: color-mix(in srgb, white 78%, transparent);
  border-bottom: 1px solid var(--neutral-200);
}

.inner {
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.brand {
  color: var(--color-heading);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: 0.02em;
}

.tools {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.auth-status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.28rem 0.5rem 0.28rem 0.3rem;
  border: 1px solid var(--neutral-300);
  background: white;
  border-radius: 999px;
}

.auth-status.logged {
  border-color: var(--brand-200);
  background: var(--brand-050);
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 999px;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--neutral-100);
  border: 1px solid var(--neutral-200);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fallback {
  color: var(--color-text-soft);
  font-size: 0.75rem;
  font-weight: 600;
}

.name {
  color: var(--color-text-soft);
  font-size: 0.82rem;
  line-height: 1;
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.auth-status.logged .name {
  color: var(--brand-700);
}

.menu-toggle {
  border: 1px solid var(--neutral-300);
  background: white;
  color: var(--color-text);
  border-radius: 0.65rem;
  padding: 0.28rem 0.65rem;
  font-size: 0.85rem;
}

.menu {
  display: none;
  align-items: center;
  gap: 0.65rem;
}

.menu.open {
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 0.85rem 1rem 1rem;
  background: white;
  border-bottom: 1px solid var(--neutral-200);
}

.menu-link {
  color: var(--color-text-soft);
  padding: 0.45rem 0.2rem;
  border-bottom: 1px solid var(--neutral-100);
}

.menu-link.active {
  color: var(--brand-700);
  font-weight: 600;
}

@media (min-width: 900px) {
  .menu-toggle {
    display: none;
  }

  .auth-status {
    margin-right: 0.35rem;
  }

  .menu,
  .menu.open {
    position: static;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 0;
    background: transparent;
    padding: 0;
  }

  .menu-link {
    border-bottom: 0;
    padding: 0.4rem 0.75rem;
    border-radius: 0.6rem;
  }

  .menu-link:hover {
    color: var(--color-text);
    background: var(--neutral-100);
  }
}
</style>
