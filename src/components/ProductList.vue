<template>
  <v-row>
    <v-col>
      <h1>Lista de Produtos</h1>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.title }} - {{ product.price }}
        </li>
      </ul>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  name: "ProductList",
  data() {
    return {};
  },

  computed: {
    products() {
      return this.$store.getters.availableProducts;
    },
  },

  created() {
    this.$store.dispatch("fetchProducts");
  },
};
</script>

<style></style>
