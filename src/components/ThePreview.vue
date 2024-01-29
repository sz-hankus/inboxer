<script setup lang="ts">
import type { EmailPreview } from '@/common/models';
import { computed } from 'vue';

const props = defineProps<EmailPreview>();
const faviconUrl = computed(() => {
  return `https://${props.from.split('@')[1]}/favicon.ico`
})
const formattedTime = computed(() => {
  const date = new Date(Date.parse(props.date));
  return `${date.getHours()}:${date.getMinutes()}`
})

</script>

<template>
  <div id="preview-container">
    <img v-bind:src="faviconUrl">
    <div id="description">
      <p>{{ props.subject }}</p>
      <p>{{ formattedTime }}</p>
    </div>
  </div>
</template>

<style scoped>
#preview-container {
  display: flex;
  flex-direction: row;
  align-items: center; 

  border: 2px solid var(--color-text);
  border-radius: 0.5rem;
  padding: 0.3rem;
}

img {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  max-width: 2.5rem;
  max-height: 2.5rem;
}


#description {
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* a {
    text-decoration: none;
    color: var(--color-text);
} */
</style>