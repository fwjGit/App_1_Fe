<template>
  <a-layout :style="{ minHeight: '100%' }">
    <a-layout-sider v-model:collapsed="collapsed" collapsible class="sider">
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <div v-for="{ name, id, children } in routeMessage">
          <a-menu-item :key="id" v-if="!children">
            <slot :name="id"><pie-chart-outlined /></slot>
            <span>{{ name }}</span>
          </a-menu-item>
          <a-sub-menu :key="id" v-if="children">
            <template #title>
              <span>
                <slot :name="id"><user-outlined /></slot>
                <span>{{ name }}</span>
              </span>
            </template>
            <a-menu-item v-for="{ name, id } in children" :key="id">{{ name }}</a-menu-item>
          </a-sub-menu>
        </div>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <!-- <a-layout-header style="background: #fff; padding: 0" /> -->
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item v-for="name in selectedNames">{{ name }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px', height: '100%' }">
          <slot name="content">default text</slot>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center', minHeight: '50px', maxHeight: '60px' }">
        <slot name="footer">Ant Design ©2018 Created by Ant UED</slot>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { PieChartOutlined, UserOutlined } from '@ant-design/icons-vue'
import { ref, watchEffect, computed } from 'vue'

type route = {
  name: string
  id: string
  children?: {
    name: string
    id: string
  }[]
}[]
const props = defineProps<{
  routeMessage: route
  generateRouteMap: (routes: route) => { [id: string]: string }
}>()
const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(['1'])
const selectedNames = ref<string[]>(['1'])

const generateRouteMap = computed(() => {
  return props.generateRouteMap(props.routeMessage)
})

watchEffect(() => {
  const keys = selectedKeys.value[0].split(',')
  const names: string[] = []
  keys.forEach((key) => {
    names.push(generateRouteMap.value[key])
  })
  selectedNames.value = names
})
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.sider >>> .ant-layout-sider-trigger {
  position: absolute;
}
</style>
