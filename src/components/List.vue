<template>
  <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <div class="container">
          <slot name="content" :listItem="item"></slot>
        </div>
      </a-list-item>
    </template>
  </a-list>
</template>
<script lang="ts" setup>
interface DataItem {
  userName: string
  type: string
  text: string
}
defineProps<{
  data: DataItem[]
}>()
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}
</style>
