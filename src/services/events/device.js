export class DeviceEventBackend {
  static canInsert () {
    return !!(window.plugins && window.plugins.calendar)
  }

  modifyEvent () {
    return false
  }

  createEvent (event, done) {
    window.plugins.calendar.createEvent(
      event.title,
      event.location,
      event.description,
      event.start,
      event.end,
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
}
