<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { ref } from 'vue'
import theme from './theme'
import { RouterView } from 'vue-router'
const locale = ref(zhCN)
</script>

<template>
  <a-config-provider
    :locale="locale"
    :theme="{
      token: theme,
    }"
  >
    <div class="container">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition mode="out-in">
            <KeepAlive>
              <Suspense>
                <!-- 主要内容 -->
                <component :is="Component"></component>

                <!-- 加载中状态 -->
                <template #fallback> 正在加载... </template>
              </Suspense>
            </KeepAlive>
          </Transition>
        </template>
      </RouterView>
    </div>
  </a-config-provider>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}
</style>
