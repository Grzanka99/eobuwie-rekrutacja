<script lang="ts" setup>
import * as Calendar from "@cgsh/calendarts";
import { Day } from "@cgsh/calendarts/build/main/types";
import { DateTime } from "luxon";
import { computed, ref } from "vue";
import { IPickedDates, DaysOfWeek } from "~/types";

const props = defineProps<{
  isOpen: boolean;
  reservedDates: IPickedDates[];
}>();

const currentMonth = ref(
  Calendar.getMonth(DateTime.now().month - 1, DateTime.now().year)
);

const currentMonthArray = computed<Day[][]>(
  () => Calendar.getMonthArray(currentMonth.value) as unknown as Day[][]
);

const isReserved = (day: Day): boolean =>
  !!props.reservedDates.filter(
    (reservedDate) =>
      day.fullJSONDate >= reservedDate.startDate.fullJSONDate &&
      day.fullJSONDate <= reservedDate.endDate.fullJSONDate
  ).length;

const picked = ref<IPickedDates>({
  startDate: null,
  endDate: null,
});

const pickedStatus = (day: Day): 0 | 1 | 2 | 3 | 4 => {
  if (!picked.value.startDate && !picked.value.endDate) return 0;
  const startDate = picked.value.startDate.fullJSONDate;
  const endDate = picked.value.endDate.fullJSONDate;
  const toCheck = day.fullJSONDate;

  if (toCheck === startDate && startDate === endDate) return 4;
  if (toCheck === startDate) return 1;
  if (toCheck === endDate) return 2;
  if (toCheck > startDate && toCheck < endDate) return 3;

  return 0;
};

const counter = ref(0);

const validatePicked = (val: IPickedDates) => {
  if (val.startDate.fullJSONDate > val.endDate.fullJSONDate) {
    const temp = val.startDate;
    val.startDate = val.endDate;
    val.endDate = temp;
    counter.value = 1;
  }

  return true;
};

const pickMe = (day: Day) => {
  if (isReserved(day)) return;

  if (counter.value === 0) {
    picked.value.startDate = day;
    if (!picked.value.endDate) picked.value.endDate = day;
    counter.value = 1;
  } else if (counter.value === 1) {
    picked.value.endDate = day;
    counter.value = 0;
  }

  validatePicked(picked.value);
};
</script>

<template>
  <div v-if="isOpen" class="calendar">
    <ol class="calendar__container">
      <div class="calendar__week">
        <li v-for="name in DaysOfWeek" :key="name" class="flex center">
          {{ name }}
        </li>
      </div>
      <div
        class="calendar__week"
        v-for="(week, i) in currentMonthArray"
        :key="i"
      >
        <li
          v-for="day in week"
          :key="day.fullJSONDate"
          class="calendar__week__day"
          :class="{ virtual: !day.isInCurrentMonth, reserved: isReserved(day) }"
          :data-picked="pickedStatus(day)"
          @click="pickMe(day)"
        >
          {{ day.number }}
        </li>
      </div>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/font.scss";

.calendar {
  width: 300px;
  height: 380px;
  background-color: var(--background);
  border-radius: var(--border-radius-small);
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.15);

  &__week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    &__day {
      @include montserrat();

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
  }

  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--padding-tiny);

    list-style: none;
    padding: var(--padding-large);
    margin: 0;
    font-size: var(--font-size-small);

    li {
      display: flex;
      justify-content: center;
      align-items: center;

      padding: 0;
      margin: 0;

      height: 36px;
    }
  }
}
</style>
