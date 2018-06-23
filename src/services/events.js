import {date} from 'quasar'

export let events = []
export let eventsById = {}

function transformEvent (event) {
  let start = new Date(event.dtstart || event.startDate)
  let duration = date.getDateDiff(new Date(event.dtend || event.endDate), start, 'hours')
  return {
    date: start,
    duration: duration,
    title: event.title,
    location: event.location || event.eventLocation,
    id: event.id,
    fullDay: duration === 24
  }
}

export function fetch (from, done) {
  from = from || new Date()
  let to = date.addToDate(from, {days: 7})
  window.plugins.calendar.listEventsInRange(from, to, function (newEvents) {
    for (let event of newEvents) {
      event = transformEvent(event)
      if (!eventsById[event.id]) {
        events.push(event)
      }
    }
    events.sort(function (a, b) {
      return a.date > b.date ? 1 : a.date < b.date ? -1 : 0
    })
    if (done) done()
  })
}

document.addEventListener('deviceready', () => {
  fetch()
}, false)
