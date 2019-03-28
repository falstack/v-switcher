<style lang="scss"></style>

<template>
  <div class="vue-layout-tab">
    VueLayoutTab
  </div>
</template>

<script>
export default {
  name: 'VueLayoutTab',
  components: {},
  props: {
    headers: {
      type: Array,
      required: true
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    routable: {
      type: Boolean,
      default: false
    },
    anchor: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'around',
      validate: val => ~['around', 'start', 'center', 'end'].indexOf(val)
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
