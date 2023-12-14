import { createPinia, defineStore } from 'pinia'

const getDefaultState = () => ({
  products: [
    { id: 1, name: 'Product 1', amount: 10, quantity: 0 }
    // ... add more products
  ],
  cart: [],
  couponCode: 'WEB3BRIDGECOHORTx',
  discount: 0.1 // 10%
})

export const pinia = createPinia()

export const useStore = defineStore('main', () => getDefaultState())

export default pinia
