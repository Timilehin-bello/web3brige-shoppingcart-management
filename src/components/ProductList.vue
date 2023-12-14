<template>
  <div class="productsContainer">
    <div v-for="product in cartStore.products" :key="product.id" class="productCard">
      <h4>{{ product.name }}</h4>
      <img :src="`./src/assets/${product.image}`" alt="Product Image" class="product-image" />
      <p>${{ product.amount.toFixed(2) }}</p>
      <button @click="addToCart(product.id)">Add to Cart</button>
    </div>
  </div>
</template>
<script>
import { useCartStore } from '../stores/cartStore'

export default {
  setup() {
    const cartStore = useCartStore()

    const addToCart = (productId) => {
      try {
        cartStore.addToCart(productId)
        alert(`Added to cart!`)
      } catch (error) {
        alert(error.message)
      }
    }

    return { cartStore, addToCart }
  }
}
</script>

<style scoped>
.productsContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.productCard {
  width: 200px;
  margin-bottom: 20px;
  padding: 10px;
}

.product-image {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Add any other styles you want here */
</style>
