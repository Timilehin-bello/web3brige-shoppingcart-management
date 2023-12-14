<template>
  <li class="cartItem">
    <span>{{ item.name }}</span>
    <div>
      <button @click="decreaseQuantity">-</button>
      <span>{{ item.quantity }}</span>
      <button @click="increaseQuantity">+</button>
      <button @click="removeFromCart">Remove</button>
    </div>
    <span>${{ (item.amount * item.quantity).toFixed(2) }}</span>
  </li>
</template>

<script>
export default {
  props: {
    item: Object
  },
  methods: {
    removeFromCart() {
      this.$emit('remove-from-cart', this.item.id)
    },
    increaseQuantity() {
      this.$emit('increase-quantity', this.item.id)
    },
    decreaseQuantity() {
      this.$emit('decrease-quantity', this.item.id)
    }
  }
}
</script>
