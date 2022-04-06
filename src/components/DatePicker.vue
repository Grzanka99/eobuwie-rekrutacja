<script setup lang="ts">
import StyledButton from "./common/StyledButton.vue";

import { IDatePickerProps } from "../types";

interface Props extends IDatePickerProps {}

const props = defineProps<Props>();
</script>

<template>
  <form class="date-picker">
    <styled-button button-text="Reserve" />
  </form>
</template>

<style scoped lang="scss">
.date-picker {
  display: flex;
  flex-direction: column;

  width: 350px;
  height: 160px;
  margin-left: calc(50% - 175px);
  border-radius: var(--border-radius-small);

  background-color: white;
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.15);
}
</style>
