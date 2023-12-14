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
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.cartItem {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  flex-wrap: wrap;
}
.cartItemDetails {
  display: flex;
  align-items: center;
  flex-basis: 100%;
}

.cartItemImage {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 10px;
}

.cartItemInfo {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.cartItemTotal {
  flex-basis: 100%;
  text-align: right;
  margin-top: 10px;
}

.couponSection {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}

.couponSection label,
.couponSection input,
.couponSection button {
  flex: 1 100%;
}

/* Media Queries */
@media (min-width: 768px) {
  .cartContainer {
    max-width: 600px;
  }

  .cartItemDetails {
    flex-basis: auto;
  }

  .cartItemTotal {
    flex-basis: auto;
  }

  .couponSection label,
  .couponSection input,
  .couponSection button {
    flex: 1 auto;
  }
}

@media (max-width: 768px) {
  .cartItemInfo button,
  .couponSection button {
    padding: 10px 15px;
  }

  .couponSection input {
    padding: 10px;
  }
}
</style>
