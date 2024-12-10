<script setup lang="ts">
import Layout from '@/components/Layout.vue'
import { useDetailStore } from '@/stores/detail'
import UserLogo from '@/components/UserLogo.vue'
import { onMounted, reactive } from 'vue'
import { receiveToken, generateRouteMap } from '@/utils/tool'
import { host, wsPort } from '@/utils/utils'
import { PieChartOutlined, DesktopOutlined } from '@ant-design/icons-vue'
import type { VueNode } from 'ant-design-vue/es/_util/type'
import { RouterView } from 'vue-router'
import Router from '@/router/index'

const detailStore = useDetailStore()
const icon: {
  [key: string]: VueNode
} = reactive({
  '1': PieChartOutlined,
  '4': DesktopOutlined,
})

// detail路由下的嵌套路由，需在项目中router文件中同步配置对应路由加载的组件
const routePath: {
  [key: string]: string
} = reactive({
  '1,2': '/chat',
  '1,3': '/aiChat',
  '4,5': '/chat',
  '4,6': '/aiChat',
})

const routeHandler = (id: string = '1,2') => {
  Router.push(routePath[id])
}

onMounted(() => {
  receiveToken({ callBack: detailStore.initLoadAction, host, port: wsPort })
})
</script>

<template>
  <div class="detailContainer">
    <div class="header">
      <UserLogo :user-name="detailStore.userName" @click-handler="detailStore.logoutAction" />
    </div>
    <div class="content">
      <Layout
        :routeMessage="detailStore.routeMessage"
        :generateRouteMap="generateRouteMap"
        @route-handler="routeHandler"
      >
        <template v-for="{ id } in detailStore.routeMessage" #[id]>
          <component :is="icon[id]"></component>
        </template>
        <template #content>
          <RouterView />
        </template>
      </Layout>
    </div>
  </div>
</template>

<style scoped>
.detailContainer {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 60px auto;
}

.header {
  background-color: black;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
}

.content {
  grid-row: 2/3;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
</style>
