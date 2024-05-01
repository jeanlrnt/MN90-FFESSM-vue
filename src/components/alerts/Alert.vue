<template>
  <div class="alert">
    <a class="close" href="#" @click="close">X</a>
    <p class="content">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "AlertComponent",
  methods: {
    close() {
      this.$el.remove()
    }
  }
})
</script>
