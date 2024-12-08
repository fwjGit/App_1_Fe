<script setup lang="ts">
import Layout from '@/components/Layout.vue'
import { useDetailStore } from '@/stores/detail'
import UserLogo from '@/components/UserLogo.vue'
import { onMounted } from 'vue'
import { receiveToken, generateRouteMap } from '@/utils/tool'
import { host, wsPort } from '@/utils/utils'
import { PieChartOutlined, DesktopOutlined, UserOutlined } from '@ant-design/icons-vue'

const detailStore = useDetailStore()

onMounted(() => {
  receiveToken({ callBack: detailStore.initLoadAction, host, port: wsPort })
})
</script>

<template>
  <div class="container">
    <div class="header">
      <UserLogo :user-name="detailStore.userName" @click-handler="detailStore.logoutAction" />
    </div>
    <div class="content">
      <Layout :routeMessage="detailStore.routeMessage" :generateRouteMap="generateRouteMap">
        <template #1>
          <PieChartOutlined />
        </template>
        <template #4>
          <DesktopOutlined />
        </template>
        <template #7>
          <UserOutlined />
        </template>
      </Layout>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px auto;
}

.header {
  background-color: black;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
}

.content {
  grid-row: 2/3;
  min-height: 500px;
  min-width: 1024px;
  overflow: auto;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
</style>
