<script setup lang="ts">
import { useRoute } from 'vue-router';
import TheInbox from '../components/TheInbox.vue'
import type { Address } from '../common/models'
import { computed } from 'vue';
const route = useRoute();

const addr = computed(() => {
  console.log({ login: route.query.login?.toString() || "nologin", domain: route.query.domain?.toString() || "nodomain" })
  return { login: route.query.login?.toString() || "nologin", domain: route.query.domain?.toString() || "nodomain" }
})

</script>

<template>
  <header>
    <h1>Inboxer</h1>
  </header>
  <main>
    <TheInbox :address="addr"/>
  </main>
</template>
