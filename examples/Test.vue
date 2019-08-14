<style lang="scss">
</style>

<template>
  <p v-text="text" />
</template>

<script>
export default {
  name: 'Test',
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  }
}
</script>
