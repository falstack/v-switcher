<style lang="scss">
.comp-item {
  padding: 10px 10px 0;

  div {
    border-radius: 5px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
</style>

<template>
  <div v-if="item" class="comp-item">
    <div :style="{ backgroundColor: item.style.color }" @click="handleClick">
      count：{{ index + 1 }}，id：{{ item.data.number_id }}，{{ click }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      default: null
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      click: 0
    }
  },
  methods: {
    handleClick() {
      this.click++
    }
  }
}
</script>
