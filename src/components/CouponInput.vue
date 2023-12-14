<template>
  <div>
    <label for="coupon">Apply Coupon:</label>
    <input type="text" id="coupon" v-model="couponCode" />
    <button @click="applyCoupon">Apply Coupon</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      couponCode: ''
    }
  },
  methods: {
    applyCoupon() {
      this.$emit('apply-coupon', this.couponCode)
      this.couponCode = ''
    }
  }
}
</script>
