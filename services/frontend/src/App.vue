<!-- dockerlearn-ui/src/App.vue -->
<template>
  <div id="app">
    <ProductList />
    <AddProduct />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';
import AddProduct from './components/AddProduct.vue';

export default {
  components: {
    ProductList,
    AddProduct
  }
};
</script>
