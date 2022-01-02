<template>
  <img v-if="dev" src="@/assets/tag.png" class="devTag" />
  <v-app>
    <v-main>
      <ProductList />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import ProductList from "@/components/ProductList.vue";

export default {
  name: "App",

  components: {
    ProductList,
  },
  data: () => ({
    dev: import.meta.env.DEV,
  }),
};
</script>

<style>
.devTag {
  height: 150px;
  width: 150px;
  margin-left: calc(100% - 150px);
  margin-top: 0;
  position: fixed;
  top: 0;
  z-index: 9999;
}
</style>
