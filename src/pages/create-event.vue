<template>
<q-page padding>

<q-field>
  <q-input v-model="event.title" float-label="Заглавие" />
</q-field>
<q-field>
  <q-input v-model="event.location" float-label="Място" />
</q-field>
<q-field>
  <q-input v-model="event.description" type="textarea" float-label="Описание" />
</q-field>
<q-field label="Дата">
  <q-datetime v-model="date" type="date" />
</q-field>
<q-field label="Цял ден">
  <q-toggle v-model="event.fullDay" />
</q-field>
<q-field label="От" v-if="!event.fullDay">
  <q-datetime v-model="event.start" type="time" />
</q-field>
<q-field label="До" v-if="!event.fullDay">
  <q-datetime v-model="event.end" type="time" />
</q-field>
<q-field label="Повторение">
<q-select
  v-model="event.recurrence"
  radio
  :options="[{label: 'Без', value: ''}, {label: 'Всеки месец', value: 'monthly'}, {label: 'Всяка седмица', value: 'weekly'}, {label: 'Всеки ден', value: 'daily'}, {label: 'Всяка година', value: 'yearly'}]"
/>
</q-field>

<q-page-sticky position="bottom-right" :offset="[9, 9]">
  <q-btn
    round
    color="secondary"
    size="lg"
    icon="save"
    @click="save"
  />
</q-page-sticky>
<q-page-sticky position="bottom-right" :offset="[18, 80]">
  <q-btn
    round
    color="tertiary"
    v-go-back="'/'"
    icon="cancel"
  />
</q-page-sticky>

</q-page>
</template>

<style>
</style>

<script>
import {modifyOrInsertEvent} from '../services/events'
import { date } from 'quasar'

export default {
  name: 'PageIndex',
  data () {
    return {
      event: {
        start: new Date(),
        end: new Date(),
        title: '',
        id: 0,
        location: '',
        description: '',
        fullDay: false,
        recurrence: ''
      }
    }
  },
  methods: {
    save () {
      modifyOrInsertEvent(this.event, () => {
        this.$router.push('/')
      })
    }
  },
  computed: {
    date: {
      set (value) {
        let start = date.clone(this.event.start)
        let end = date.clone(this.event.end)
        start.setFullYear(value.getFullYear())
        start.setMonth(value.getMonth())
        start.setDate(value.getDate())
        end.setFullYear(value.getFullYear())
        end.setMonth(value.getMonth())
        end.setDate(value.getDate())
        this.event.start = start
        this.event.end = end
      },
      get () {
        return date.startOfDate(this.event.start, 'day')
      }
    }
  }
}
</script>
