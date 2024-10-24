<!-- dockerlearn-ui/src/components/ProductList.vue -->
<template>
  <div>
    <h1>Product List</h1>
    <ul>
      <li v-for="product in products" :key="product._id">
        {{ product.title }} - {{ product.price }}$
      </li>
    </ul>
  </div>
</template>

<script>
import api from "@/api";

export default {
  data() {
    return {
      products: [],
    };
  },
  created() {
    api
      .getProducts()
      .then((response) => {
        this.products = response.data.data;
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  },
};
</script>
