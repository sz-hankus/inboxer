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

const copyAddressToClipboard = async () => {
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

watch(props, () => {
  fetchEmails();
})

onMounted(() => { fetchEmails() })
</script>

<template>
    <div>
      <div id="controls-row">
        <div id="address-box">
          <span id="address">{{ `${props.address.login}@${props.address.domain}` }}</span>
          <div class="separator"></div>
          <button class="svg-button" id="clipboard-button" @click="copyAddressToClipboard()">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
          </button>
        </div>
        <button class="svg-button" id="refresh-button" @click="fetchEmails()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>

        <button class="svg-button" id="new-addr-button" @click="generateNewAddress()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </svg>
        </button>

      </div>
      <PreviewList :address="props.address" :previews="emails"></PreviewList>
    </div>
</template>

<style scoped>

#controls-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-bottom: 10px;
  gap: 1rem;
}

#address-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.7rem;

  font-size: 1rem;
  font-family: monospace;
  background-color: rgb(243 244 246);
  padding: 0.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  border: 2px solid rgb(156 163 175);
  border-radius: 0.5rem;
}

.separator {
  max-height: 1.5rem;
  height: 1.5rem;
  width: 1px;
  max-width: 1px;
  border: 0.5px solid rgb(156 163 175);
}

.svg-button {
    background-color: transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}

.svg-button svg {
  color: #64748b;
}
.svg-button svg:hover {
  color: #1f2937;
}


#clipboard-button {
    height: 20px;
}
#clipboard-button svg {
  height: 20px;
}

#refresh-button svg {
  color: #64748b;
  height: 20px;
}
#refresh-button svg:hover {
  color: #1f2937;
}

#new-addr-button svg {
  color: #64748b;
  height: 20px;
}
#new-addr-button svg:hover {
  color: #1f2937;
}
</style>