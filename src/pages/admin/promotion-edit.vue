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
<q-field label="От">
  <q-datetime v-model="event.start" type="date" />
</q-field>
<q-field label="До">
  <q-datetime v-model="event.end" type="date" />
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
    v-go-back="'/admin/promotions/'"
    icon="cancel"
  />
</q-page-sticky>

</q-page>
</template>

<style>
</style>

<script>
import { date } from 'quasar'
import { getEvent, modifyOrInsertEvent } from '../../services/events'

export default {
  name: 'PageIndex',
  props: ['id'],
  data () {
    return {
      event: {}
    }
  },
  watch: {
    id: {
      immediate: true,
      handler () {
        getEvent(this.id, (event) => {
          this.event = event || {
            start: date.startOfDate(new Date(), 'day'),
            end: date.endOfDate(new Date(), 'day'),
            title: '',
            location: '',
            description: '',
            fullDay: false,
            recurrence: ''
          }
        })
      }
    }
  },
  methods: {
    save () {
      modifyOrInsertEvent(this.event, () => {
        this.$router.replace('/admin/promotions')
      })
    }
  }
}
</script>
