<template>
  <div class="productCard">
    <h4>{{ product.name }}</h4>
    <p>${{ product.amount.toFixed(2) }}</p>
    <button @click="addToCart">{{ addToCartLabel }}</button>
  </div>
</template>

<script>
export default {
  props: {
    product: Object
  },
  computed: {
    addToCartLabel() {
      return `Add to Cart`
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.product.id)
    }
  }
}
</script>
