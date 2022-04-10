<script lang="ts" setup>
defineProps<{
  buttonText: string;
  disabled?: boolean;
}>();
</script>

<template>
  <button class="styled-button" :disabled="disabled">{{ buttonText }}</button>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/font.scss";

.styled-button {
  @include montserrat();

  border-radius: var(--border-radius);
  height: var(--base-input-height);

  padding: var(--padding-smaller) var(--padding);
  width: fit-content;
  min-width: 75px;
  color: var(--text);

  border: none;
  background-color: var(--color-primary);

  font-size: var(--font-size);
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary-dark);
  }

  &:disabled {
    background-color: var(--color-primary-light);
    cursor: not-allowed;
  }
}
</style>
