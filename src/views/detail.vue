<script setup lang="ts">
import Layout from '@/components/Layout.vue'
import { useDetailStore } from '@/stores/detail'
import UserLogo from '@/components/UserLogo.vue'
import { onMounted, reactive } from 'vue'
import { receiveToken, generateRouteMap } from '@/utils/tool'
import { host, wsPort } from '@/utils/utils'
import { PieChartOutlined, DesktopOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { VueElement } from 'vue'
import type { VueNode } from 'ant-design-vue/es/_util/type'

const detailStore = useDetailStore()
const icon: {
  [key: string]: VueNode
} = reactive({
  '1': PieChartOutlined,
  '4': DesktopOutlined,
})

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
        <template v-for="{ id } in detailStore.routeMessage" #[id]>
          <component :is="icon[id]"></component>
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
