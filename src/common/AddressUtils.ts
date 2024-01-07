import type { Address } from "./models";

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

const getAddressFromStorage = (): Address | undefined => {
  const stored = JSON.parse(localStorage.getItem(LS_ADDR_NAME) || "{}");
  if (isValidAddress(stored))
    return stored;
  else
    return undefined;
}

const saveAddressToStorage = (addr: Address) => {
  localStorage.setItem(LS_ADDR_NAME, JSON.stringify(addr));
}


export { getAddressFromStorage, generateNewAddress, saveAddressToStorage };