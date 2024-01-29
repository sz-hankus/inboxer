<script setup lang="ts">
import { useRoute } from 'vue-router';
import TheInbox from '../components/TheInbox.vue'
import TheHeader from '../components/TheHeader.vue'
import { computed } from 'vue';
const route = useRoute();

const addr = computed(() => {
  console.log({ login: route.query.login?.toString() || "nologin", domain: route.query.domain?.toString() || "nodomain" })
  return { login: route.query.login?.toString() || "nologin", domain: route.query.domain?.toString() || "nodomain" }
})

</script>

<template>
  <TheHeader/>
  <main>
    <TheInbox :address="addr"/>
  </main>
</template>

<style scoped>
</style>