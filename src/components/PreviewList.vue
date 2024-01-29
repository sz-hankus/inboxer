<script setup lang="ts">
import type { Address, EmailPreview } from '@/common/models';
import ThePreview from './ThePreview.vue';

interface Props {
  address: Address;
  previews: EmailPreview[];
}
const props = defineProps<Props>();

</script>

<template>
    <ol>
        <li v-for="preview in previews" :key="preview.id">
            <router-link :to="{path: '/message', query: {login: props.address.login, domain: props.address.domain, id: preview.id}}">
                <ThePreview v-bind="preview"/>
            </router-link>
        </li>
    </ol>
</template>

<style scoped>
ol {
    list-style: none;
    padding-left: 0;
}

li {
    margin: 0.5rem;
}

a {
    text-decoration: none;
    color: var(--color-text);
}
</style>
