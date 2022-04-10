<script lang="ts" setup>
import { Months } from "~/types";
import ArrowIcon from "~/components/svg/arrow.svg.vue";

defineProps<{
  prev: () => void;
  next: () => void;
  currentMonth: number;
}>();
</script>

<template>
  <div class="switch-month">
    <button @click="prev">
      <arrow-icon />
    </button>
    {{ Months[currentMonth] }}
    <button @click="next">
      <arrow-icon rev />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.switch-month {
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  border: 1px solid var(--text-grey);
  border-radius: var(--border-radius);
  height: var(--base-input-height);
  padding: 0 var(--padding-smaller);

  & > button {
    border: none;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;
    transition: transform 75ms ease-in;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
