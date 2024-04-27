<template>
  <div class="dive-display">
    <div>
      <h2>Paliers de la plongée</h2>
      <div v-for="stop of dive.stops.formatted" :key="stop.depth">
        <p v-if="stop.duration">{{ stop.depth }}m - {{ stop.duration }}min</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import DiveChart from '@/components/charts/DiveChart.vue'
import Dive from '@/Models/Dive.ts'

export default {
  name: 'dive-display',
  components: { DiveChart },
  props: {
    dive: {
      type: Dive,
      required: true,
    }
  },
  computed: {
    model() {
      return this.dive
    }
  }
}
</script>
