import { createStore, Store } from 'vuex'
import type { InjectionKey } from 'vue'
import type { EmailPreview, Address } from '../common/models'
import { getEmails } from '../api/ApiClient'
import { generateNewAddress, getAddressFromStorage } from '../common/AddressUtils'

// define your typings for the store state
export interface State {
  address: Address
  mails: EmailPreview[]
}

// define injection key
const key: InjectionKey<Store<State>> = Symbol();

// Create a new store instance.
const store = createStore<State>({
  state() {
    return {
      address: getAddressFromStorage() || generateNewAddress(),
      mails: []
    }
  },
  mutations: {
    setAddress(state, newAddr: Address) {
      state.address = newAddr;
    },
    setEmails(state, newMails: EmailPreview[]) {
      state.mails = newMails;
    }
  },
  actions: {
    async fetchEmails(context) {
      console.log('Store fetching emails...')
      const mails = await getEmails(context.state.address) || [];
      console.log('Emails fetched: ', mails)
      context.commit('setEmails', mails)
    }
  }
})

export { store, key }