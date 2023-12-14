<template>
  <div class="cartContainer">
    <h3>Your Cart</h3>
    <ul id="cartItems">
      <li v-for="item in cartStore.cart" :key="item.id" class="cartItem">
        <div class="cartItemDetails">
          <img :src="`./${item.image}`" alt="Product Image" class="cartItemImage" />
          <div class="cartItemInfo">
            <span>{{ item.name }}</span>
            <div>
              <button @click="decreaseQuantity(item.id)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item.id)">+</button>
              <button @click="removeFromCart(item.id)">Remove</button>
            </div>
          </div>
        </div>
        <span class="cartItemTotal">$ {{ (item.amount * item.quantity).toFixed(2) }}</span>
      </li>
    </ul>
    <div class="couponSection">
      <label for="coupon">Apply Coupon:</label>
      <input type="text" v-model="couponCode" />
      <button @click="applyCoupon">Apply Coupon</button>
    </div>
    <p class="totalAmount">Total Amount: $ {{ totalAmount.toFixed(2) }}</p>
  </div>
</template>

<script>
import { useCartStore } from '../stores/cartStore'
import { ref, watch } from 'vue'

export default {
  setup() {
    const cartStore = useCartStore()
    const couponCode = ref('')
    const totalAmount = ref(cartStore.totalAmount)

    // Watch for changes in the totalAmount from the store and update the local totalAmount
    watch(
      () => cartStore.totalAmount,
      (newTotalAmount) => {
        totalAmount.value = newTotalAmount
      }
    )

    const applyCoupon = () => {
      try {
        const newTotalAmount = cartStore.applyCoupon(couponCode.value)
        totalAmount.value = newTotalAmount
        alert(`New total after discount: $${newTotalAmount.toFixed(2)}`)
        couponCode.value = ''
      } catch (error) {
        alert(error.message)
      }
    }

    const removeFromCart = (productId) => {
      cartStore.removeFromCart(productId)
    }

    const increaseQuantity = (productId) => {
      cartStore.increaseQuantity(productId)
    }

    const decreaseQuantity = (productId) => {
      cartStore.decreaseQuantity(productId)
    }
    return {
      cartStore,
      couponCode,
      totalAmount,
      applyCoupon,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity
    }
  }
}
</script>

<style scoped>
.cartContainer {
  /* Styles for cart container */
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.cartItem {
  /* Styles for each cart item */
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
}

.cartItemDetails {
  display: flex;
  align-items: center;
}

.cartItemImage {
  /* Styles for cart item image */
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
}

.cartItemInfo {
  /* Styles for cart item info */
  display: flex;
  flex-direction: column;
}

.cartItemInfo span {
  /* Styles for cart item name */
  font-weight: bold;
}

.cartItemInfo div {
  /* Styles for quantity buttons */
  display: flex;
  align-items: center;
}

.cartItemInfo button {
  /* Styles for quantity buttons */
  margin: 0 5px;
  padding: 5px 10px;
  border: none;
  background-color: #ccc;
  color: #fff;
  cursor: pointer;
}

.couponSection {
  /* Styles for coupon section */
  margin-top: 20px;
}

.couponSection label {
  /* Styles for coupon label */
  margin-right: 10px;
}

.couponSection input {
  /* Styles for coupon input */
  padding: 5px;
  border: 1px solid #ccc;
}

.couponSection button {
  /* Styles for apply coupon button */
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  background-color: #ccc;
  color: #fff;
  cursor: pointer;
}

.totalAmount {
  /* Styles for total amount */
  margin-top: 20px;
  font-weight: bold;
}
</style>
