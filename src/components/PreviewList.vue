<script setup lang="ts">
import type { Address, EmailPreview } from '@/common/models';

interface Props {
  address: Address;
  previews: EmailPreview[];
}
const props = defineProps<Props>();

// const store = useStore(key);
</script>

<template>
    <ol>
        <li v-for="preview in previews" :key="preview.id">
            <router-link :to="{path: '/message', query: {login: props.address.login, domain: props.address.domain, id: preview.id}}">
                <p class="time"><span>{{ preview.date }}</span></p>
                <p class="time"><span class="subject">{{ preview.subject }}</span></p>
                <p class="time"><span class="sender">{{ preview.from }}</span></p>
            </router-link>
        </li>
    </ol>
</template>

<style scoped>
li { 
    list-style-type: none;
    border: 2px solid var(--color-text);
    border-radius: 0.5rem;
    padding: 0.3rem;
    margin: 0.8rem;
}
a {
    text-decoration: none;
    color: var(--color-text);
}
</style>
