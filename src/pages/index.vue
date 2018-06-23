<template>
<q-page class="">

<q-list>
  <template v-for="(event, i) in events">
    <q-list-header :key="event.id + 'h'" v-if="i == 0 || events[i - 1].date.getDate() != event.date.getDate()">
      {{formatDate(event.date, 'ddd, DD MMM, YYYY')}}
    </q-list-header>
    <q-card :key="event.id">
      <q-card-title>{{formatDate(event.date, 'h:mm A')}} | {{event.title}}</q-card-title>
    </q-card>
  </template>
</q-list>

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
      events: [
        {date: new Date('2018-06-23T22:00:00'), title: 'Elemria meeting', id: 0},
        {date: new Date('2018-06-23T22:00:00'), title: 'test event', id: 1},
        {date: new Date('2018-06-25T22:00:00'), title: 'test event', id: 2}
      ]
    }
  },
  methods: {
    formatDate: date.formatDate
  }
}
</script>
