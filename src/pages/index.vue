<template>
<q-page class="">
<q-infinite-scroll :handler="loadMore">

<q-list>
  <template v-for="(event, i) in events">
    <q-list-header :key="event.id + 'h'" v-if="i == 0 || events[i - 1].date.getDate() != event.date.getDate()">
      {{formatDate(event.date, 'ddd, DD MMM, YYYY')}}
    </q-list-header>
    <q-card :key="event.id">
      <q-card-title>{{formatDate(event.date, 'hh:mm A')}} | {{event.title}}</q-card-title>
    </q-card>
  </template>
</q-list>

<div style="text-align: center" slot="message">
  <q-spinner-dots :size="40" ></q-spinner-dots>
</div>
</q-infinite-scroll>
</q-page>
</template>

<style>
</style>

<script>
import { date } from 'quasar'
import { events, fetch } from '../services/events'

export default {
  name: 'PageIndex',
  data () {
    return {
      events: events
    }
  },
  methods: {
    formatDate: date.formatDate,
    loadMore: function (i, done) {
      fetch(this.events.length ? this.events[this.events.length - 1].date : undefined, done)
    }
  }
}
</script>
