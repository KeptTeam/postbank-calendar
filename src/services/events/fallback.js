export class FallbackEventBackend {
  constructor () {
    if (window.localStorage.getItem('events')) {
      this.events = JSON.parse(window.localStorage.getItem('events'))
      for (let event of this.events) {
        event.start = new Date(event.start)
        event.end = new Date(event.end)
      }
    } else {
      this.events = [
        {
          start: new Date('2018-06-24T21:00:00'),
          end: new Date('2018-06-24T22:00:00'),
          title: 'This is a test event',
          id: 0
        },
        {
          start: new Date('2018-06-24T22:00:00'),
          end: new Date('2018-06-24T23:00:00'),
          title: 'Lorem ipsum dolor sit amet',
          id: 1
        },
        {
          start: new Date('2018-06-25T22:00:00'),
          end: new Date('2018-06-25T22:00:00'),
          title: 'Duis aute irure dolor',
          id: 2
        }
      ]
    }
  }

  static canInsert () {
    return !!window.localStorage
  }

  modifyEvent (id, event, done) {
    Object.assign(this.events[id], event)
    this.events[id].id = id
    window.localStorage.setItem('events', JSON.stringify(this.events))

    setTimeout(done)
    return true
  }

  createEvent (event, done) {
    this.events.push(Object.assign({}, event, {id: this.events.length}))
    // window.e = this.events
    window.localStorage.setItem('events', JSON.stringify(this.events))

    setTimeout(done)
    return true
  }

  fetch (from, to, done) {
    let events = this.events.filter(x => (x.start.getTime() <= to.getTime() && x.end.getTime() >= from.getTime()))
    setTimeout(function () {
      done(events)
    }, 10)
  }
}
