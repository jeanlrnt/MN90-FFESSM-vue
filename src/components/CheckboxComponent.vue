<template>
  <div class="checkbox">
    <p class="label">{{ label }}</p>
    <input v-model="model"
           type="checkbox"
           :name="'checkbox_' + id">
    <label :for="'checkbox_' + id"
           @click="handleClick()"
    ></label>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ValueMixin from '@/Mixins/ValueMixin.ts'

export default defineComponent({
  name: 'CheckboxComponent',
  mixins: [ValueMixin],
  props: {
    modelValue: {
      type: Boolean,
      required: true,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      id: this.getRandomId(),
    }
  },
  methods: {
    handleClick() {
      this.model = !this.model
    },
  },
})
</script>
