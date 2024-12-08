<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <div class="box">
    <slot>
      <div>default</div>
    </slot>
    <p class="title">{{ title }}</p>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 5px;
}

.title {
  font-size: 1.1rem;
  text-align: center;
}
</style>
