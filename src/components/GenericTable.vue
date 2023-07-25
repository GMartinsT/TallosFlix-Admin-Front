<template>
  <div class="table-responsive">
    <table class="table table-bordered">
      <thead>
        <tr>
          <slot name="header" />
        </tr>
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "GenericTable",
};
</script>

<style></style>
