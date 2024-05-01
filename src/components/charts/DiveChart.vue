<template>
  <LineChart :data="data" :options="options" >
    <template #default="{ data }">
      <div v-for="d in data.datasets[0].data" :key="d">{{ d }}</div>
    </template>
  </LineChart>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, Filler
} from 'chart.js'
import { Line as LineChart } from 'vue-chartjs'
import Dive from '@/Models/Dive.ts'
import Planification from '@/Models/Planification.ts'
import { options } from './chartConfig.js'

ChartJS.register( Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Filler)

export default defineComponent({
  name: 'DiveChart',
  components: { LineChart },
  props: {
    modelValue: {
      type: Planification,
      required: true,
    },
  },
  computed: {
    options() {
      return options as any
    },
    data(): any {
      return {
        labels: this.getXValues(),
        datasets: [
          this.modelValue.firstDive.isValid() && {
            label: 'Plongée 1',
            data: this.getValues(this.modelValue.firstDive),
            backgroundColor: 'transparent',
            borderColor: 'rgb(40,140,216)',
          },
          this.modelValue.secondDive.isValid() && {
            label: 'Plongée 2',
            data: this.getValues(this.modelValue.secondDive),
            backgroundColor: 'transparent',
            borderColor: 'rgb(140,63,220)',
          },
        ],
      }
    },
  },
  methods: {
    timeToMaxDepth(dive: Dive): number {
      return Math.min(dive.duration * .1, 2)
    },
    getXValues() : number[] {
      let result = this.getX(this.modelValue.firstDive)
      if (this.modelValue.secondDive) {
        result = result.concat(this.getX(this.modelValue.secondDive))
      }
      return result
    },
    getValues(dive: Dive) {
      var x = this.getX(dive)
      var y = this.getY(dive)
      return x.map((value, index) => ({ x: value, y: y[index] }))
    },
    getX(dive: Dive, interval: number = 0) : number[] {
      let count = interval || 0;
      let labels = [count]
      labels.push(count + this.timeToMaxDepth(dive))
      count += dive.duration
      labels.push(count)
      count += dive.stops.DRToFirstStop
      if (dive.stops.stop15m) {
        labels.push(count)
        count += dive.stops.stop15m
        labels.push(count)
        count += dive.stops.DRBetweenStops
      }
      if (dive.stops.stop12m) {
        labels.push(count)
        count += dive.stops.stop12m
        labels.push(count)
        count += dive.stops.DRBetweenStops
      }
      if (dive.stops.stop9m) {
        labels.push(count)
        count += dive.stops.stop9m
        labels.push(count)
        count += dive.stops.DRBetweenStops
      }
      if (dive.stops.stop6m) {
        labels.push(count)
        count += dive.stops.stop6m
        labels.push(count)
        count += dive.stops.DRBetweenStops
      }
      if (dive.stops.stop3m) {
        labels.push(count)
        count += dive.stops.stop3m
        labels.push(count)
        count += dive.stops.DRBetweenStops
      }
      labels.push(count)

      return labels
    },
    getY(dive: Dive) : number[]{
      let profondeur = [0]
      if (dive.duration < this.timeToMaxDepth(dive)) {
        return profondeur
      }

      profondeur.push(-dive.depth)
      profondeur.push(-dive.depth)
      if (dive.stops.stop15m) {
        profondeur.push(-15)
        profondeur.push(-15)
      }
      if (dive.stops.stop12m) {
        profondeur.push(-12)
        profondeur.push(-12)
      }
      if (dive.stops.stop9m) {
        profondeur.push(-9)
        profondeur.push(-9)
      }
      if (dive.stops.stop6m) {
        profondeur.push(-6)
        profondeur.push(-6)
      }
      if (dive.stops.stop3m) {
        profondeur.push(-3)
        profondeur.push(-3)
      }
      profondeur.push(0)

      return profondeur
    },
  },
})
</script>
