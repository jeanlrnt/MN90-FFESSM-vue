<template>
  <div class="dive-display">
    <h3>{{title}}</h3>
    <template v-if="dive.stops.countStops > 0">
      <h4>Paliers</h4>
      <div v-for="stop of dive.stops.formatted" :key="stop.depth">
        <p v-if="stop.duration">{{ stop.depth }}m - {{ numberToDate(stop.duration) }}</p>
      </div>
    </template>
    <h4>Informations</h4>
    <p>Profondeur majorée pour {{ dive.depth }}m : {{ dive.refDepth }}m</p>
    <p>Temps de plongée majoré pour {{ numberToDate(dive.duration) }} : {{ numberToDate(dive.refDuration) }}</p>
    <p>Durée totale de remontée : {{ numberToDate(dive.stops.DTR) }}</p>
    <p>Temps de plongée total : {{ numberToDate(dive.stops.DTR + dive.duration) }}</p>
    <p>GPS : {{ dive.stops.GPS }}</p>
  </div>
</template>
<script lang="ts">
import Dive from '@/Models/Dive.ts'
import { numberToDate } from '../Helpers/Helper.ts'

export default {
  name: 'dive-display',
  methods: { numberToDate },
  props: {
    dive: {
      type: Dive,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    model() {
      return this.dive
    }
  }
}
</script>
