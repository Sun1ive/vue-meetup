<template>
  <v-alert color="error" dismissible icon="warning" value="true" @input="onClose">
      {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: {
    text: String,
  },
  methods: {
    onClose() {
      this.$emit('dismissed');
    },
  },
};
</script>