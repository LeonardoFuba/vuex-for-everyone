<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="logo" class="my-3" contain height="200" />
      </v-col>

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          <div>
            Welcome {{ username }} to the <br />
            Vue 3 + TypeScript + Vite + Vuetify 3 Alpha
          </div>
        </h1>

        <small>Vite Preview</small>

        <p class="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br />please join our online
          <a href="https://community.vuetifyjs.com" target="_blank">
            Discord Community
          </a>
        </p>
      </v-col>

      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-5">Links</h2>

        <v-row justify="center"> </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn @click="loadTable">chamada</v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import axios from "axios";
import logo from "../assets/logo.svg";

export default {
  name: "HelloWorld",

  data() {
    return {
      username: import.meta.env.VITE_USERNAME, //.env
      protocol: document.location.protocol,
      logo,
    };
  },
  methods: {
    async loadTable() {
      console.log(this.protocol);
      const response = await axios.get(
        `${this.protocol}//192.168.0.25:8080/v1/condicaopagamento`,
      );

      console.log(response.data);
    },
  },
};
</script>
