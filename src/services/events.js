import {date} from 'quasar'

export let events = window.plugins ? [] : [
  {date: new Date('2018-06-23T22:00:00'), title: 'Elemria meeting', id: 0},
  {date: new Date('2018-06-23T22:00:00'), title: 'test event', id: 1},
  {date: new Date('2018-06-25T22:00:00'), title: 'test event', id: 2}
]
export let eventsById = {}

function transformEvent (event) {
  let start = new Date(event.dtstart || event.startDate)
  let end = new Date(event.dtend || event.endDate)
  let duration = date.getDateDiff(end, start, 'minutes')
  return {
    start: start,
    end: end,
    duration: duration / 60,
    title: event.title,
    location: event.location || event.eventLocation,
    id: event.id,
    fullDay: duration === 24
  }
}

export function fetch (from, done) {
  if (!window.plugins) return
  from = from || new Date()
  let to = date.addToDate(from, {days: 7})
  window.plugins.calendar.listEventsInRange(from, to, function (newEvents) {
    for (let event of newEvents) {
      event = transformEvent(event)
      if (!eventsById[event.id]) {
        eventsById[event.id] = event
        events.push(event)
      }
    }
    events.sort(function (a, b) {
      return a.date > b.date ? 1 : a.date < b.date ? -1 : 0
    })
    if (done) done()
  }, function (err) {
    console.error(err)
  })
}

document.addEventListener('deviceready', () => {
  // fetch()
}, false)
