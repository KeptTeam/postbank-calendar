<template>
<q-page class="">
<q-infinite-scroll :handler="loadMore">

<q-list>
  <div v-for="(event, i) in events" v-if="event.start.getTime() >= fromDate.getTime()" :key="event.id">
    <q-list-header v-if="i == 0 || events[i - 1].start.getDate() != event.start.getDate()">
      {{formatDate(event.start, 'ddd, DD MMM, YYYY')}}
    </q-list-header>
    <q-card>
      <q-card-title>{{formatDate(event.start, 'hh:mm A')}} - {{formatDate(event.end, 'hh:mm A')}} │ {{event.title}}</q-card-title>
    </q-card>
    <q-context-menu>
      <q-list link separator no-border style="min-width: 150px; max-height: 300px;">
        <q-item v-close-overlay @click.native="$router.push('/event/' + event.id)"><q-item-main label="Редактирай"/></q-item>
        <q-item v-close-overlay @click.native="remove(event.id)"><q-item-main label="Изтрий" /></q-item>
      </q-list>
    </q-context-menu>
  </div>
</q-list>

<div style="text-align: center" slot="message">
  <q-spinner-dots :size="40"></q-spinner-dots>
</div>
</q-infinite-scroll>
<q-page-sticky position="bottom-right" :offset="[18, 18]">
  <q-btn
    round
    color="secondary"
    to="/event/"
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
import { events, fetch, deleteEvent } from '../services/events'

export default {
  name: 'PageIndex',
  data () {
    let fromDate = date.addToDate(new Date(), {hours: -1})
    return {
      events: events,
      fromDate: fromDate,
      reachedDate: fromDate,
      monthNames: ['Ян', 'Фев', 'Март', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'Окт', 'Ноем', 'Дек']
    }
  },
  methods: {
    formatDate: date.formatDate,
    loadMore (i, done) {
      let from = this.reachedDate
      this.reachedDate = date.addToDate(this.reachedDate, {days: 7})
      fetch(from, this.reachedDate, (result) => {
        if (!result) this.loadMore(i, done)
      })
    },
    remove (id) {
      deleteEvent(id, function () {})
    }
  }
}
</script>
