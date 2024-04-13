<template>
  <div>
    <label :for="name">{{ label }}</label>
    <input v-model="model"
           :type="type"
           :name="name"
           :min="min"
           :required="required"
           :pattern="pattern"
           :id="name">
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ValueMixin from '@/Mixins/ValueMixin.ts'

export default defineComponent({
  name: "CustomInput",
  mixins: [ValueMixin],
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    min: {
      type: [Number, String],
      required: false,
    },
    required: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    pattern() {
      if (this.type === 'number') {
        return /\d*/
      }
      return null
    },
  },
})
</script>
