<script lang="ts" setup>
import { Day } from "@cgsh/calendarts/build/main/types";
import { DateTime } from "luxon";
import { IPickedDates } from "~/types";

import DatesArrowIcon from "~/components/svg/dates-arrow.svg.vue";
import XIcon from "~/components/svg/x.svg.vue";

const props = defineProps<{
  picked: IPickedDates;
  modalOpen?: boolean;
  removeOne: (newValue: IPickedDates) => void;
}>();

const formatDate = (day: Day | string) => {
  if (typeof day === "string") return day;
  const date = DateTime.fromISO(day.fullJSONDate);
  return date.toFormat("dd LLL yyyy");
};

const removeStartDate = () =>
  props.removeOne({ ...props.picked, startDate: null });
const removeEndDate = () => props.removeOne({ ...props.picked, endDate: null });
</script>

<template>
  <div class="date-range" :class="{ modalOpen }">
    <span>
      {{ formatDate(picked.startDate || "Date from") }}
      <button @click.stop="removeStartDate" v-if="picked.startDate">
        <x-icon />
      </button>
    </span>
    <span class="with-icon">
      <dates-arrow-icon />
    </span>
    <span>
      {{ formatDate(picked.endDate || "Date to") }}
      <button @click.stop="removeEndDate" v-if="picked.endDate">
        <x-icon />
      </button>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.date-range {
  display: grid;
  grid-template-columns: 1fr 16px 1fr;
  grid-gap: var(--padding-tiny);
  width: 100%;

  height: var(--base-input-height);
  border: 1px solid var(--color-primary-light);
  border-radius: var(--border-radius);
  padding: var(--padding-small);

  cursor: pointer;

  transition: background 100ms ease-out;

  &.modalOpen {
    background-color: var(--background-green-light);
  }

  .with-icon,
  & > span:not(.with-icon) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > span:not(.with-icon) {
    border-radius: var(--border-radius-small);

    transition: background 100ms ease-out;
    &:hover,
    &:focus {
      background-color: var(--background-green-light);
    }

    & > button {
      margin-left: var(--padding-tiny);
    }
  }

  button {
    background: transparent;
    border: 0;
    padding: 0;
    margin: 0;
    cursor: pointer;

    transition: transform 100ms ease-out;

    &:hover {
      transform: scale(1.3);
    }

    svg {
      width: 10px;
      height: 10px;
    }
  }
}
</style>
