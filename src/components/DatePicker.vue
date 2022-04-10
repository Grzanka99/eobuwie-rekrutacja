<script setup lang="ts">
import { computed, ref } from "vue";
import { IPickedDates } from "~/types";
import StyledButton from "~/components/common/StyledButton.vue";
import DateRange from "~/components/DateRange.vue";
import Rating from "~/components/Rating.vue";
import CalendarModal from "~/components/CalendarModal/Calendar.vue";

const numerOfDays = ref(10);
const calendarModal = ref(false);

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

const picked = ref<IPickedDates>({
  startDate: null,
  endDate: null,
});

const handleInput = (dates: IPickedDates) => {
  picked.value = { ...dates };
};
</script>

<template>
  <form class="date-picker" @submit.prevent>
    <div class="date-picker__info">
      <div class="date-picker__info__column">
        <span class="date-picker__info__price">{{ fullPrice }} zł</span>
        <rating
          class="date-picker__info__rating"
          :stars="stars"
          :votes="votes"
        />
      </div>
      <styled-button
        button-text="Reserve"
        :disabled="!picked.startDate || !picked.endDate"
      />
    </div>
    <date-range
      @click="handleModalToggle"
      :picked="picked"
      :modal-open="calendarModal"
    />
    <transition>
      <calendar-modal
        :is-open="calendarModal"
        class="modal"
        :reserved-dates="reservedDates"
        :toggle-modal="handleModalToggle"
        @input="handleInput"
      />
    </transition>
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
    transform-origin: top;
  }
}

.v-enter-active {
  animation: bounce-in 0.5s;
}
.v-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.8);
    z-index: -1;
  }
  50% {
    transform: translateY(50px) scale(1.1);
  }
  100% {
    transform: translateY(0) scale(1);
    z-index: 1;
    opacity: 1;
  }
}
</style>
