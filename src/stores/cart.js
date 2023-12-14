import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: []
  }),
  actions: {
    addToCart(productId) {
      // Implement the addToCart logic using state.cart
    },
    removeFromCart(productId) {
      // Implement the removeFromCart logic using state.cart
    },
    increaseQuantity(productId) {
      // Implement the increaseQuantity logic using state.cart
    },
    decreaseQuantity(productId) {
      // Implement the decreaseQuantity logic using state.cart
    },
    applyCoupon(couponCode) {
      // Implement the applyCoupon logic using state.cart
    }
  }
})

// Export your store to use in the main app
export function setupStore() {
  return useCartStore()
}
