export class DeviceEventBackend {
  constructor () {
    this.name = 'device'
  }
  static canInsert () {
    return !!(window.plugins && window.plugins.calendar)
  }

  modifyEvent (id, event, done) {
    this.deleteEvent(id, () => {
      this.createEvent(event, done)
    })
  }

  deleteEvent (id, done) {
    window.plugins.calendar.deleteEventById(id, undefined,
      function (result) {
        done()
      },
      function (err) {
        console.error(err)
      })
  }

  createEvent (event, done) {
    let opts = window.plugins.calendar.getCalendarOptions()
    if (event.recurrence) opts.recurrence = event.recurrence
    window.plugins.calendar.createEventWithOptions(
      event.title,
      event.location,
      event.description,
      event.start,
      event.end,
      opts,
      function (result) {
        done()
      },
      function (err) {
        console.error(err)
      }
    )
    return true
  }

  fetch (from, to, done) {
    from = from || new Date()
    window.plugins.calendar.listEventsInRange(from, to, function (newEvents) {
      done(newEvents.map(function (event) {
        let start = new Date(event.dtstart || event.startDate)
        let end = new Date(event.dtend || event.endDate)
        return {
          id: event.id,
          start: start,
          end: end,
          title: event.title,
          location: event.location || event.eventLocation
        }
      }))
    }, function (err) {
      console.error(err)
    })
  }

  getEvent (id, done) {
    let opts = window.plugins.calendar.getCalendarOptions()
    opts.id = id
    window.plugins.calendar.findEventWithOptions('', '', '', new Date(), new Date(), opts, function (event) {
      if (event && event.id === id) {
        let start = new Date(event.dtstart || event.startDate)
        let end = new Date(event.dtend || event.endDate)
        done({
          id: event.id,
          start: start,
          end: end,
          title: event.title,
          description: event.notes || event.message,
          location: event.location || event.eventLocation
        })
      }
    }, function (err) {
      console.error(err)
    })
  }
}
