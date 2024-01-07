<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { getEmails } from '../api/ApiClient'
import type { Address, EmailPreview } from '@/common/models';
import PreviewList from './PreviewList.vue';
import { useRouter } from 'vue-router';
import { generateNewAddress, saveAddressToStorage } from '@/common/AddressUtils';

interface Props {
  address: Address;
}
const props = defineProps<Props>();
const emails = ref<EmailPreview[]>([]);
const router = useRouter();

const copyAddrToClipboard = async () => {
  await navigator.clipboard.writeText(`${props.address.login}@${props.address.domain}`)
}

const fetchEmails = async () => {
  emails.value = await getEmails(props.address) || [];
}

const newAddress = () => {
  const newAddr = generateNewAddress();
  saveAddressToStorage(newAddr);
  router.push({name: "inbox", query: {login: newAddr.login, domain: newAddr.domain} })
}

watch(props, newProps => {
  fetchEmails();
})

onMounted(() => { fetchEmails() })
</script>

<template>
    <div>
      <div id="main-row">
        <h2 class="address">{{ `${props.address.login}@${props.address.domain}` }}</h2>
        <button @click="copyAddrToClipboard()">Copy address</button>
      </div>
      <button @click="fetchEmails()">fetch</button>
      <button @click="newAddress()">New address</button>
      <PreviewList :address="props.address" :previews="emails"></PreviewList>
    </div>
</template>

<style scoped>
.address {
  font-family: monospace;
}

#main-row {
  display: flex;
  justify-content: left;
  margin: 0 auto;
  gap: 1rem;
}

</style>