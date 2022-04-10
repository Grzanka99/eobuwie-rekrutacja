<script setup lang="ts">
import { computed, ref } from "vue";
import { IPickedDates } from "~/types";
import StyledButton from "~/components/common/StyledButton.vue";
import DateRange from "~/components/DateRange.vue";
import Rating from "~/components/Rating.vue";
import CalendarModal from "~/components/CalendarModal/Calendar.vue";

const numerOfDays = ref(10);
const calendarModal = ref(true);

const props = defineProps<{
  basePrice: number;
  stars: number;
  votes: number;
  reservedDates: IPickedDates[];
}>();

const fullPrice = computed(() => numerOfDays.value * props.basePrice);

const handleModalToggle = () => {
  calendarModal.value = !calendarModal.value;
};
</script>

<template>
  <form class="date-picker">
    <div class="date-picker__info">
      <div class="date-picker__info__column">
        <span class="date-picker__info__price">{{ fullPrice }} zł</span>
        <rating
          class="date-picker__info__rating"
          :stars="stars"
          :votes="votes"
        />
      </div>
      <styled-button button-text="Reserve" />
    </div>
    <date-range @click="handleModalToggle" />
    <calendar-modal
      :is-open="calendarModal"
      class="modal"
      :reserved-dates="reservedDates"
    />
  </form>
</template>

<style scoped lang="scss">
.date-picker {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  width: 350px;
  height: 160px;
  margin-left: calc(50% - 175px);
  border-radius: var(--border-radius-small);

  background-color: var(--background);
  box-shadow: 0px 10px 40px 0px rgba(0, 0, 0, 0.15);
  padding: var(--padding-large);

  &__info {
    display: flex;
    justify-content: space-between;
    width: 100%;

    &__column {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    &__price {
      color: var(--text-dark);
      font-size: var(--font-size-large);
      font-weight: 700;
    }
  }

  .modal {
    position: absolute;
    top: calc(100% - var(--padding));
  }
}
</style>
