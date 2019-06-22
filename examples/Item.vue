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
  <div class="comp-item">
    <div :style="{ backgroundColor: item.style.color }">
      count：{{ index + 1 }}，id：{{ item.data.number_id }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  }
}
</script>
