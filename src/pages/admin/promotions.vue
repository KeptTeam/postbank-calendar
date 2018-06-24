<template>
<q-page class="">

<q-list>
  <template v-for="event in events">
    <q-card :key="event.id" v-ripple class="relative-position" @click.native="$router.push('/admin/promotion/' + event.id)">
      <q-card-title>
        {{formatDate(event.start, 'DD MMM YYYY')}} - {{formatDate(event.end, 'DD MMM YYYY')}} | {{event.title}}
         <q-icon slot="right" name="edit" />
      </q-card-title>
    </q-card>
  </template>
</q-list>
<q-page-sticky position="bottom-right" :offset="[18, 18]">
  <q-btn
    round
    color="secondary"
    to="/admin/promotion/"
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

export default {
  name: 'PageIndex',
  data () {
    return {
      events: [
        {start: new Date('2018-06-23T22:00:00'), end: new Date('2018-08-23T22:00:00'), title: '10% off', id: 0},
        {start: new Date('2018-06-27T22:00:00'), end: new Date('2018-08-28T22:00:00'), title: '10% off', id: 1},
        {start: new Date('2018-06-30T22:00:00'), end: new Date('2018-08-30T22:00:00'), title: '10% off', id: 2}
      ]
    }
  },
  methods: {
    formatDate: date.formatDate
  }
}
</script>
