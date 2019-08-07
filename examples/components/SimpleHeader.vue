<template>
  <v-switcher :headers="headers">
    <div
      v-for="(item, index) in headers"
      :key="index"
      :slot="`${index}`"
    >
      {{ item }}
    </div>
  </v-switcher>
</template>

<script>
export default {
  name: 'SimpleHeader',
  computed: {
    headers() {
      return ['游戏', '动漫', '话题']
    }
  }
}
</script>
