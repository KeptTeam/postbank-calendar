<template>
<q-page class="">

<q-list>
  <template v-for="event in events" v-if="event.backend === 'firebase'">
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
import { events } from '../../services/events'

export default {
  name: 'PageIndex',
  data () {
    return {
      events: events
    }
  },
  methods: {
    formatDate: date.formatDate
  }
}
</script>
