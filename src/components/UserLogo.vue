<template>
  <a-dropdown placement="bottomRight">
    <div class="logo">
      <p>{{ userName }}</p>
      <a-avatar :size="40" class="avatar">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </div>
    <template #overlay>
      <a-menu class="logoutBox">
        <a-menu-item> 用户：{{ userName }} </a-menu-item>
        <a-menu-item @click="$emit('clickHandler')"> 退出登录 </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue'
defineProps<{
  userName: string
}>()

defineEmits(['clickHandler'])
</script>

<style scoped>
.logo {
  display: grid;
  grid-template-columns: auto 70px;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
}
.logo > p {
  color: aliceblue;
  font-size: 1.1rem;
  grid-column: 1/2;
}

.avatar {
  background-color: grey;
  grid-column: 2/3;
}

.logoutBox {
  padding: 10px 2px;
  display: flex;
  gap: 5px;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.logoutBox > *:hover {
  background-color: skyblue;
  font-size: 1.05rem;
}
</style>
