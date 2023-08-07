<template>
  <form @submit.prevent="submitForm">
    <slot />
  </form>
</template>

<script>
export default {
  name: "EditForm",
  methods: {
    submitForm() {
      this.$emit("submit");
    },
  },
};
</script>

<style></style>
