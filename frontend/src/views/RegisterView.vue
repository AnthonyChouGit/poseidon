<script setup>
import BaseContainer from '@/components/ui/BaseContainer.vue'
import SectionHeader from '@/components/ui/SectionHeader.vue'
import ActionButton from '@/components/ui/ActionButton.vue'
</script>

<template>
  <main class="auth-page">
    <BaseContainer>
      <section class="auth-card">
        <SectionHeader
          title="注册账号"
          subtitle="填写信息创建 Poseidon 账号。当前仅为前端静态页面展示。"
        />

        <form class="auth-form" @submit.prevent>
          <label class="field">
            <span>用户名</span>
            <input type="text" placeholder="请输入用户名" autocomplete="username" />
          </label>

          <label class="field">
            <span>邮箱</span>
            <input type="email" placeholder="请输入邮箱" autocomplete="email" />
          </label>

          <label class="field">
            <span>密码</span>
            <input type="password" placeholder="请输入密码" autocomplete="new-password" />
          </label>

          <label class="field">
            <span>确认密码</span>
            <input type="password" placeholder="请再次输入密码" autocomplete="new-password" />
          </label>

          <button type="submit" class="submit-btn">注册</button>
        </form>

        <div class="foot-actions">
          <ActionButton label="返回首页" to="/" variant="ghost" />
          <ActionButton label="去登录" to="/login" variant="secondary" />
        </div>
      </section>
    </BaseContainer>
  </main>
</template>

<style scoped>
.auth-page {
  padding: 1.5rem 0 2.5rem;
}

.auth-card {
  max-width: 520px;
  margin: 0 auto;
  background: white;
  border: 1px solid var(--neutral-200);
  border-radius: 1rem;
  padding: 1rem;
}

.auth-form {
  margin-top: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field span {
  color: var(--color-text-soft);
  font-size: 0.88rem;
}

.field input {
  width: 100%;
  border: 1px solid var(--neutral-300);
  border-radius: 0.65rem;
  padding: 0.6rem 0.72rem;
  font-size: 0.94rem;
  background: white;
}

.submit-btn {
  margin-top: 0.35rem;
  border: 0;
  border-radius: 0.7rem;
  padding: 0.68rem 0.85rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(120deg, var(--brand-600), var(--brand-500));
  cursor: pointer;
}

.foot-actions {
  margin-top: 0.8rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

@media (min-width: 900px) {
  .auth-page {
    padding-top: 2rem;
  }

  .auth-card {
    padding: 1.3rem;
  }
}
</style>
