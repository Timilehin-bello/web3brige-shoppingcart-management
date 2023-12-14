import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    products: [
      { id: 1, name: 'Eyeglass', image: 'eyeglass.png', amount: 10.99 },
      { id: 2, name: 'Fridge', image: 'fridge.png', amount: 10.99 },
      { id: 3, name: 'Jean', image: 'jean.png', amount: 10.99 },
      { id: 4, name: 'Laptop', image: 'laptop.png', amount: 10.99 },
      { id: 5, name: 'Microwave', image: 'microwave.png', amount: 10.99 },
      { id: 6, name: 'Monitor', image: 'monitor.png', amount: 10.99 },
      { id: 7, name: 'Phone', image: 'phone.png', amount: 10.99 },
      { id: 8, name: 'Shoe', image: 'shoe.png', amount: 10.99 },
      { id: 9, name: 'Sneaker', image: 'sneaker.png', amount: 10.99 },
      { id: 10, name: 'Television', image: 'television.png', amount: 20.49 }
    ]
  }),
  getters: {
    totalAmount() {
      return this.cart.reduce((total, item) => total + item.amount * item.quantity, 0)
    }
  },
  actions: {
    addToCart(productId) {
      const product = this.products.find((p) => p.id === productId)
      if (!product) throw new Error('Product not found')

      const existingItem = this.cart.find((item) => item.id === productId)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
      this.persistCart()
    },
    removeFromCart(productId) {
      this.cart = this.cart.filter((item) => item.id !== productId)
      this.persistCart()
    },
    increaseQuantity(productId) {
      const item = this.cart.find((item) => item.id === productId)
      if (item) {
        item.quantity += 1
        this.persistCart()
      }
    },
    decreaseQuantity(productId) {
      const item = this.cart.find((item) => item.id === productId)
      if (item && item.quantity > 1) {
        item.quantity -= 1
        this.persistCart()
      } else {
        this.removeFromCart(productId)
      }
    },
    applyCoupon(couponCode) {
      if (couponCode === 'WEB3BRIDGECOHORTx') {
        this.couponApplied = true
        const discount = this.totalAmount * 0.1
        return this.totalAmount - discount
      } else {
        throw new Error('Invalid coupon code')
      }
    },
    clearCoupon() {
      this.couponApplied = false
    },
    persistCart() {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    }
  }
})
