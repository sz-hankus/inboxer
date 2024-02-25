<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getEmails } from '../api/ApiClient'
import type { Address, EmailPreview } from '@/common/models';
import { generateNewAddress, saveAddressToStorage } from '@/common/AddressUtils';
import ClipboardIcon from './icons/ClipboardIcon.vue';
import RefreshIcon from './icons/RefreshIcon.vue';
import PreviewList from './PreviewList.vue';

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
  router.push({name: "inbox", query: {login: newAddr.login, domain: newAddr.domain}})
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
            <ClipboardIcon class="w-6 h-6"/>
          </button>
        </div>
        <button class="svg-button" id="refresh-button" @click="fetchEmails()">
            <RefreshIcon class="w-6 h-6"></RefreshIcon>
        </button>
      </div>
      <button @click="newAddress()">New address</button>
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

</style>