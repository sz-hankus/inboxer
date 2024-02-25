import type { Address } from "./models";
import browser from "webextension-polyfill";

const LS_ADDR_NAME = "address";
const DEFAULT_DOMAIN = "1secmail.org";

const isValidAddress = (obj: any) => {
  return obj !== null &&
    typeof obj.login === "string" &&
    typeof obj.domain === "string";
}

const getRandomLogin = (length: number): string => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let output = '';
  for (let i = 0; i < length; i++)
    output += characters.charAt(Math.floor(Math.random() * characters.length))
  return output;
}

const generateNewAddress = (): Address => {
  const newAddress = { login: getRandomLogin(10), domain: DEFAULT_DOMAIN };
  return newAddress;
}

const getAddressFromStorage = async (): Promise<Address | undefined> => {
  console.log("getting address from storage");
  const address = browser.storage.local.get(LS_ADDR_NAME).then(stored => {
    console.log("stored", stored[LS_ADDR_NAME]);
    return stored[LS_ADDR_NAME] as Address || undefined;
  });
  return address;
}

const saveAddressToStorage = async (address: Address) => {
  console.log("saving address to storage", address)
  await browser.storage.local.set({ [LS_ADDR_NAME]: address });
}


export { getAddressFromStorage, generateNewAddress, saveAddressToStorage };