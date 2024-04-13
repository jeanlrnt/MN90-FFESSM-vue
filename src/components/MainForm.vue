<template>
  <AlertComponent />
  <main>
    <div class="container">
      <h1>MN90-FFESSM</h1>
      <form @input="calculate">
        <DiveComponent v-model="model.firstDive" title="Première plongée"/>
        <CheckboxComponent v-model="model.hasSurfaceInterval" label="Successive"/>
        <template v-if="model.hasSurfaceInterval">
          <InputComponent v-model="model.interval"
                       type="number"
                       name="interval"
                       label="Interval de surface (min)"
                       min="0">
          </InputComponent>
          <DiveComponent v-model="model.secondDive" title="Deuxième plongée"/>
        </template>
        <div class="button-group">
          <span class="reset-share">
              <button type="reset" class="reset">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg>
              </button>
              <button type="button" class="share">
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M307 34.8c-11.5 5.1-19 16.6-19 29.2v64H176C78.8 128 0 206.8 0 304C0 417.3 81.5 467.9 100.2 478.1c2.5 1.4 5.3 1.9 8.1 1.9c10.9 0 19.7-8.9 19.7-19.7c0-7.5-4.3-14.4-9.8-19.5C108.8 431.9 96 414.4 96 384c0-53 43-96 96-96h96v64c0 12.6 7.4 24.1 19 29.2s25 3 34.4-5.4l160-144c6.7-6.1 10.6-14.7 10.6-23.8s-3.8-17.7-10.6-23.8l-160-144c-9.4-8.5-22.9-10.6-34.4-5.4z"/></svg>
              </button>
            </span>
        </div>
      </form>
<!--      <a class="lang" href="">EN</a>-->
    </div>
    <div class="results">
      <div v-if="model.firstDiveStops[5] !== '!'">
        <h2>Paliers de la première plongée</h2>
        <div v-for="stop of model.getFirstDiveStops.formatted" :key="stop.depth">
          <p v-if="stop.duration">{{ stop.depth }}m - {{ stop.duration }}min</p>
        </div>
      </div>
      <div v-if="model.hasSurfaceInterval && model.secondDiveStops[5] !== '!'">
        <h2>Paliers de la deuxième plongée</h2>
        <div v-for="stop of model.getSecondDiveStops.formatted" :key="stop.depth">
          <p v-if="stop.duration">{{ stop.depth }}m - {{ stop.duration }}min</p>
        </div>
      </div>
    </div>
    <div v-if="model.firstDiveStops[5] !== '!'" class="variables">

    </div>
    <div class="errors"></div>
  </main>
</template>

<script lang="ts">
import Planification from '../Models/Planification'
import { defineComponent } from 'vue'
import DiveComponent from '@/components/Dive.vue'
import AlertComponent from '@/components/alerts/Alert.vue'
import CheckboxComponent from '@/components/CheckboxComponent.vue'
import InputComponent from '@/components/inputs/InputComponent.vue'

export default defineComponent({
  name: "MainForm",
  components: {
    InputComponent,
    CheckboxComponent,
    DiveComponent,
    AlertComponent,
  },
  data() {
    return {
      model: new Planification(),
      isCalculated: false,
    }
  },
  methods: {
    reset() {
      this.model = new Planification()
    },
    calculate() {
      this.model.calculate()
      console.log(this.model.firstDiveStops)
    },
  },
})
</script>
