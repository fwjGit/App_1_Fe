<template>
  <div class="chatContainer">
    <div class="avatar" v-if="data.type === 'res'">
      <a-avatar :size="30">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </div>
    <div class="content" v-if="data.type === 'res'">
      <p>{{ data.userName }}</p>
      <div class="text">{{ data.text }}</div>
    </div>
    <div class="content" v-if="data.type === 'req'">
      <p class="right">{{ data.userName }}</p>
      <div class="text right">{{ data.text }}</div>
    </div>
    <div class="avatar" v-if="data.type === 'req'">
      <a-avatar :size="30">
        <template #icon><UserOutlined /></template>
      </a-avatar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { UserOutlined } from '@ant-design/icons-vue'
interface DataItem {
  userName: string
  type: string
  text: string
}
defineProps<{
  data: DataItem
}>()
</script>

<style scoped>
.chatContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
}
.avatar {
  width: 30px;
}
.content {
  flex: 1;
}

.text {
  margin-top: 5px;
  color: gray;
}

.right {
  display: flex;
  justify-content: flex-end;
}
</style>
