<script lang="ts" setup>
import StarIcon from "./svg/star.svg.vue";
defineProps<{
  stars: number;
  votes: number;
}>();
</script>

<template>
  <span class="rating">
    <span v-for="i in 5" :key="i" class="star">
      <star-icon
        :empty="i > stars"
        :half="i > stars && stars % i !== 0 && i - stars === 0.5"
      />
    </span>
    <span class="votes">{{ votes }}</span>
  </span>
</template>

<style lang="scss" scoped>
.rating {
  .star {
    height: 5px;
  }
  .votes {
    font-weight: 600;
    margin-left: var(--padding-tiny);
    color: var(--text-grey);
  }
}
</style>
