<template>
  <div class="cartContainer">
    <h3>Your Cart</h3>
    <ul>
      <CartItem
        v-for="item in cart"
        :key="item.id"
        :item="item"
        @remove-from-cart="removeFromCart"
        @increase-quantity="increaseQuantity"
        @decrease-quantity="decreaseQuantity"
      />
    </ul>
    <CouponInput @apply-coupon="applyCoupon" />
    <p>Total Amount: ${{ totalAmount.toFixed(2) }}</p>
  </div>
</template>

<script>
import CartItem from './CartItem.vue'
import CouponInput from './CouponInput.vue'

export default {
  components: {
    CartItem,
    CouponInput
  },
  props: {
    cart: Array,
    totalAmount: Number
  },
  methods: {
    removeFromCart(productId) {
      this.$emit('remove-from-cart', productId)
    },
    increaseQuantity(productId) {
      this.$emit('increase-quantity', productId)
    },
    decreaseQuantity(productId) {
      this.$emit('decrease-quantity', productId)
    },
    applyCoupon(couponCode) {
      this.$emit('apply-coupon', couponCode)
    }
  }
}
</script>
