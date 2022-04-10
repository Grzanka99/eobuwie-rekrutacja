<script lang="ts" setup>
import * as Calendar from "@cgsh/calendarts";
import { Day } from "@cgsh/calendarts/build/main/types";
import { DateTime } from "luxon";
import { computed, ref } from "vue";
import { IPickedDates, DaysOfWeek } from "~/types";

import MonthPicker from "./MonthPicker.vue";
import DayButton from "./DayButton.vue";
import { useCalendarHelpers } from "~/composables/calendar.composable";

const { isReserved, validatePicked } = useCalendarHelpers();

const props = defineProps<{
  isOpen: boolean;
  reservedDates: IPickedDates[];
  toggleModal: () => void;
  picked: IPickedDates;
}>();

const currentYear = ref(DateTime.now().year);
const currentMonth = ref(
  Calendar.getMonth(DateTime.now().month - 1, currentYear.value)
);

const currentMonthArray = computed<Day[][]>(
  () => Calendar.getMonthArray(currentMonth.value) as unknown as Day[][]
);

const emit = defineEmits(["change"]);

const counter = ref(0);
const pickMe = (day: Day): void => {
  if (isReserved(day, props.reservedDates)) return;

  const localPicked: IPickedDates = {
    ...props.picked,
  };

  if (counter.value === 1)
    setTimeout(() => {
      props.toggleModal();
    }, 150);

  if (counter.value === 0) {
    localPicked.startDate = day;
    if (!localPicked.endDate) localPicked.endDate = day;
    counter.value = 1;
  } else if (counter.value === 1) {
    localPicked.endDate = day;
    counter.value = 0;
  }

  if (!validatePicked(localPicked)) {
    const temp = localPicked.startDate;
    localPicked.startDate = localPicked.endDate;
    localPicked.endDate = temp;
    counter.value = 1;
  }

  emit("change", localPicked);
};

const nextMonth = () => {
  const cm = currentMonth.value.month;
  if (cm === 11) currentYear.value++;
  currentMonth.value = Calendar.getMonth(
    cm === 11 ? 0 : cm + 1,
    currentYear.value
  );
};

const prevMonth = () => {
  const cm = currentMonth.value.month;
  if (cm === 0) currentYear.value--;
  currentMonth.value = Calendar.getMonth(
    cm === 0 ? 11 : cm - 1,
    currentYear.value
  );
};
</script>

<template>
  <div v-if="isOpen" class="calendar">
    <MonthPicker
      :prev="prevMonth"
      :next="nextMonth"
      :current-month="currentMonth.month"
    />
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
        <day-button
          v-for="day in week"
          :key="day.fullJSONDate"
          :reserved-dates="reservedDates"
          :day="day"
          :picked="picked"
          :on-pick="pickMe"
        />
      </div>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/font.scss";

.calendar {
  @include montserrat();

  display: flex;
  flex-direction: column;
  width: 300px;
  height: fit-content;
  background-color: var(--background);
  border-radius: var(--border-radius-small);
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.15);
  padding: var(--padding-large);
  gap: var(--padding);

  &__week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  &__container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--padding-tiny);

    list-style: none;
    padding: 0;
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
