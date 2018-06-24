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
<q-field label="От">
  <q-datetime v-model="event.start" type="time" />
</q-field>
<q-field label="До">
  <q-datetime v-model="event.end" type="time" />
</q-field>

<q-page-sticky position="bottom-right" :offset="[9, 9]">
  <q-btn
    round
    color="secondary"
    size="lg"
    icon="save"
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
import { date } from 'quasar'

export default {
  name: 'PageIndex',
  data () {
    return {
      event: {
        start: new Date('2018-06-23T22:00:00'),
        end: new Date('2018-08-23T22:00:00'),
        title: '',
        id: 0,
        location: '',
        description: ''}
    }
  },
  methods: {
    formatDate: date.formatDate
  },
  computed: {
    date: {
      set (value) {
        date.adjustDate(this.event.start, {year: value.getYear(), month: value.getMonth(), day: value.getDay()})
        date.adjustDate(this.event.end, {year: value.getYear(), month: value.getMonth(), day: value.getDay()})
      },
      get () {
        return date.startOfDate(this.event.start, 'day')
      }
    }
  }
}
</script>
