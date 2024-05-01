<template>
  <h2>{{ title }}</h2>
  <InputComponent
    v-model="model.depth"
    label="Profondeur (m)"
    :name="'depth_' + model.id"
    type="number"
    min="0"
    max="65" />
  <InputComponent
    v-model="model.duration"
    label="Durée (min)"
    :name="'duration_' + model.id"
    type="number"
    min="0" />
</template>

<script>
import { defineComponent } from 'vue';
import InputComponent from '@/components/inputs/InputComponent.vue'
import Dive from '@/Models/Dive.ts'
import ValueMixin from '@/Mixins/ValueMixin.ts'

export default defineComponent({
  name: 'DiveComponent',
  components: { InputComponent },
  mixins: [ValueMixin],
  props: {
    modelValue: {
      type: Dive,
      required: false,
      default: () => new Dive(),
    },
    title: {
      type: String,
      required: true,
    },
  },
})
</script>
