<template>
  <span>
    <fai name="window-close" @click="$emit('close')" scale="3"/>
  </span>
</template>
<style lang="stylus" scoped>
span
  display inline-block
  position absolute
  top 1rem
  right 1rem
  color #e74c3c
  z-index 1
</style>
