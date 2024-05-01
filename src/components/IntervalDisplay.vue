<template>
  <div class="interval">
    <h3>Interval de surface</h3>
    <p>Interval de surface majoré pour {{ numberToDate(display.interval) }} : {{ numberToDate(display.refInterval) }}</p>
    <p>Coefficient d'Azote résiduel pour {{ display.N2Coef }} : {{ display.refN2Coef }}</p>
    <p>Majoration en minutes : {{ numberToDate(display.majorationMin) }}</p>
  </div>
</template>
<script lang="ts">
import Planification from '@/Models/Planification.ts'
import { numberToDate } from '@/Helpers/Helper.ts'

export default {
  name: 'interval-display',
  methods: { numberToDate },
  props: {
    display: {
      type: Planification,
      required: true,
    }
  }
}
</script>
