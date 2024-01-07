<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { getEmailDetails } from '@/api/ApiClient';
import { onMounted, ref } from 'vue';
import type { EmailDetails } from '@/common/models';

const router = useRouter();
const route = useRoute();
const login = route.query.login?.toString() || "nologin";
const domain = route.query.domain?.toString() || "nodomain";
const id = Number(route.query.id?.toString()) || 0;

const details = ref<EmailDetails>();

onMounted( async () => {
  console.log("mounted")
  details.value = await getEmailDetails({login: login, domain: domain}, id) || undefined;
})

</script>

<template>
  <main>
    <h2 @click="router.back()">Back</h2>
    <h3>{{ details?.date }}</h3>
    <h1>{{ details?.subject }}</h1>
    <h2>{{ details?.from }}</h2>
    <div class="email-body">
      <span v-html="details?.body"></span>
    </div>
  </main>
</template>

<style>
  .email-body {
    border: 2px solid var(--color-text);
    border-radius: 0.5rem;
    padding: 1rem;
  }
</style>

