<!-- dockerlearn-ui/src/components/AddProduct.vue -->
<template>
    <div>
      <h1>Add Product</h1>
      <form @submit.prevent="submitProduct">
        <div>
          <label>Title:</label>
          <input v-model="product.title" />
        </div>
        <div>
          <label>Description:</label>
          <input v-model="product.description" />
        </div>
        <div>
          <label>Price:</label>
          <input v-model="product.price" />
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '@/api';
  
  export default {
    data() {
      return {
        product: {
          title: '',
          description: '',
          price: ''
        }
      };
    },
    methods: {
      submitProduct() {
        api.addProduct(this.product).then(() => {
          alert('Product added successfully!');
        }).catch(error => {
          console.error("Error adding product:", error);
        });
      }
    }
  };
  </script>
  