import {date} from 'quasar'

import {DeviceEventBackend} from './device'
// import {FallbackEventBackend} from './fallback'
import {FirebaseEventBackend} from './firebase'

let backends = []
for (let BackendClass of [DeviceEventBackend, FirebaseEventBackend]) {
  if (BackendClass.canInsert()) {
    let backend = new BackendClass()
    backend.id = backends.length
    backends.push(backend)
  }
}

export let events = []
export let eventsById = {}

export function fetch (from, to, done) {
  let newCount = 0
  let doneCount = 0
  for (let backend of backends) {
    backend.fetch(from, to, function (newEvents) {
      newCount += newEvents.length
      insertEvents(newEvents, backend)
      doneCount++
      if (doneCount === backends.length && done) done(newCount)
    })
  }
}

export function getEvent (id) {
  if (eventsById[id]) {
    return Object.assign({}, eventsById[id])
  } else {
    return undefined
  }
}

export function modifyOrInsertEvent (modifiedEvent, done) {
  if (modifiedEvent.id) {
    let splitPos = modifiedEvent.id.indexOf('-')
    let backend = backends[modifiedEvent.id.substr(0, splitPos)]
    let id = modifiedEvent.substr(splitPos)
    backend.modifyEvent(id, event, next)
  } else {
    for (let backend of backends) {
      if (modifiedEvent.backend && modifiedEvent.backend !== backend.name) continue
      if (backend.createEvent(modifiedEvent, next)) break
    }
  }
  function next () {
    events.splice(events.indexOf(eventsById[modifiedEvent.id]), 1)
    delete eventsById[modifiedEvent.id]
    fetch(modifiedEvent.start, modifiedEvent.end, done)
  }
}

export function deleteEvent (id, done) {
  let splitPos = id.indexOf('-')
  let backend = backends[id.substr(0, splitPos)]
  id = id.substr(splitPos)
  backend.deleteEvent(id, event, function () {
    events.splice(events.indexOf(eventsById[id]), 1)
    delete eventsById[id]
  })
}

function insertEvents (newEvents, fromBackend) {
  for (let event of newEvents) {
    event = Object.assign({}, event, {
      duration: date.getDateDiff(event.end, event.start, 'minutes'),
      id: fromBackend.id + '-' + event.id,
      backend: fromBackend.name
    })
    if (!eventsById[event.id]) {
      eventsById[event.id] = event
      events.push(event)
    }
  }
  events.sort(function (a, b) {
    return a.start > b.start ? 1 : a.start < b.start ? -1 : 0
  })
}

document.addEventListener('deviceready', () => {
  // fetch()
}, false)
