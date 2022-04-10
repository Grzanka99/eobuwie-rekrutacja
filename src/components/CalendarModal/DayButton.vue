<script lang="ts" setup>
import { DateTime } from "luxon";
import { Day } from "@cgsh/calendarts/build/main/types";
import { IPickedDates } from "../../types";
import { useCalendarHelpers } from "~/composables/calendar.composable";

const { isReserved } = useCalendarHelpers();

const props = defineProps<{
  day: Day;
  reservedDates: IPickedDates[];
  picked: IPickedDates;
  onPick: (day: Day) => void;
}>();

const pickedStatus = (day: Day): 0 | 1 | 2 | 3 | 4 => {
  if (!props.picked.startDate || !props.picked.endDate) return 0;
  const startDate = props.picked.startDate.fullJSONDate;
  const endDate = props.picked.endDate.fullJSONDate;
  const toCheck = day.fullJSONDate;

  if (toCheck === startDate && startDate === endDate) return 4;
  if (toCheck === startDate) return 1;
  if (toCheck === endDate) return 2;
  if (toCheck > startDate && toCheck < endDate) return 3;

  return 0;
};
</script>

<template>
  <li
    class="day-button"
    :class="{
      virtual: !day.isInCurrentMonth,
      reserved: isReserved(day, props.reservedDates),
      today: DateTime.now().toJSON() === day.fullJSONDate,
    }"
    :data-picked="pickedStatus(day)"
    @click="onPick(day)"
  >
    {{ day.number }}
  </li>
</template>

<style lang="scss" scoped>
.day-button {
  cursor: pointer;
  position: relative;
  width: 100%;
  z-index: 1;

  &.virtual,
  &.reserved {
    opacity: 0.5;
  }

  &.reserved {
    cursor: not-allowed;
  }

  &[data-picked="1"],
  &[data-picked="2"],
  &[data-picked="3"],
  &[data-picked="4"] {
    background-color: var(--background-green-light);
    color: var(--background);
  }

  &[data-picked="1"] {
    border-top-left-radius: var(--border-radius-small);
    border-bottom-left-radius: var(--border-radius-small);
  }

  &[data-picked="2"] {
    border-top-right-radius: var(--border-radius-small);
    border-bottom-right-radius: var(--border-radius-small);
  }

  &[data-picked="3"] {
    color: var(--color-primary);
  }

  &[data-picked="4"] {
    background-color: transparent;
  }

  &[data-picked="1"],
  &[data-picked="2"],
  &[data-picked="4"] {
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--color-primary);
      border-radius: var(--border-radius-small);
      z-index: -1;
    }
  }
}
</style>
