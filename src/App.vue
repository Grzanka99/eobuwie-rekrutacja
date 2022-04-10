<script setup lang="ts">
import DatePicker from "./components/DatePicker.vue";
</script>

<template>
  <DatePicker :base-price="38" :stars="3.5" :votes="128" />
</template>

<style>
@import "assets/scss/index.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
