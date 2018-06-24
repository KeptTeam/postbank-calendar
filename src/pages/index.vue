<template>
<q-page class="">
<q-infinite-scroll :handler="loadMore">

<q-list>
  <template v-for="(event, i) in events" v-if="event.start.getTime() >= fromDate.getTime()">
    <q-list-header :key="event.id + 'h'" v-if="i == 0 || events[i - 1].start.getDate() != event.start.getDate()">
      {{formatDate(event.start, 'ddd, DD MMM, YYYY')}}
    </q-list-header>
    <q-card :key="event.id">
      <q-card-title>{{formatDate(event.start, 'hh:mm A')}} │ {{event.title}}</q-card-title>
    </q-card>
  </template>
</q-list>

<div style="text-align: center" slot="message">
  <q-spinner-dots :size="40"></q-spinner-dots>
</div>
</q-infinite-scroll>
<q-page-sticky position="bottom-right" :offset="[18, 18]">
  <q-btn
    round
    color="secondary"
    to="/create"
    size="lg"
    icon="add"
  />
</q-page-sticky>
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
    let fromDate = date.addToDate(new Date(), {hours: -1})
    return {
      events: events,
      fromDate: fromDate,
      reachedDate: fromDate
    }
  },
  methods: {
    formatDate: date.formatDate,
    loadMore: function (i, done) {
      let from = this.reachedDate
      this.reachedDate = date.addToDate(this.reachedDate, {days: 7})
      fetch(from, this.reachedDate, (result) => {
        if (!result) this.loadMore(i, done)
      })
    }
  }
}
</script>
