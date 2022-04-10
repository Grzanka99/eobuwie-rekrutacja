<script lang="ts" setup>
import { Day } from "@cgsh/calendarts/build/main/types";
import { DateTime } from "luxon";
import { IPickedDates } from "~/types";

import DatesArrowIcon from "~/components/svg/dates-arrow.svg.vue";

defineProps<{
  picked: IPickedDates;
  modalOpen?: boolean;
}>();

const formatDate = (day: Day | string) => {
  if (typeof day === "string") return day;
  const date = DateTime.fromISO(day.fullJSONDate);
  return date.toFormat("dd LLL yyyy");
};
</script>

<template>
  <div class="date-range" :class="{ modalOpen }">
    <span>{{ formatDate(picked.startDate || "Date from") }}</span>
    <dates-arrow-icon />
    <span>{{ formatDate(picked.endDate || "Date to") }}</span>
  </div>
</template>

<style lang="scss" scoped>
.date-range {
  display: flex;
  flex-direction: row;
  height: var(--base-input-height);
  border: 1px solid var(--color-primary-light);
  border-radius: var(--border-radius);
  padding: 0 var(--padding-large);

  width: 100%;
  justify-content: space-between;
  align-items: center;

  transition: background 100ms ease-out;

  &:hover,
  &.modalOpen {
    background-color: var(--background-green-light);
  }
}
</style>
