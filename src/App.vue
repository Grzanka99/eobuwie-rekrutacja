<script setup lang="ts">
import DatePicker from "./components/DatePicker.vue";
import { IPickedDates } from "./types";
import * as Calendar from "@cgsh/calendarts";
import { DateTime } from "luxon";

const currentMonthArray = Calendar.getMonthArray(
  Calendar.getMonth(DateTime.now().month - 1, DateTime.now().year)
);

const reserved: IPickedDates[] = [
  {
    startDate: currentMonthArray[0][6],
    endDate: currentMonthArray[1][2],
  },
  {
    startDate: currentMonthArray[1][4],
    endDate: currentMonthArray[1][5],
  },
];
</script>

<template>
  <DatePicker
    :base-price="38"
    :stars="3.5"
    :votes="128"
    :reserved-dates="reserved"
  />
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
