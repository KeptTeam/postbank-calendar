import firebase from 'firebase'
firebase.initializeApp({
  apiKey: 'AIzaSyCtaBeRj88RXsJSm5xlFXVRUp4U-OfL30c',
  authDomain: 'postbank-calendar-4a15e.firebaseapp.com',
  databaseURL: 'https://postbank-calendar-4a15e.firebaseio.com',
  projectId: 'postbank-calendar-4a15e',
  storageBucket: 'postbank-calendar-4a15e.appspot.com',
  messagingSenderId: '530286606184'
})

export class FirebaseEventBackend {
  constructor () {
    this.collection = firebase.firestore().collection('promotions')
  }

  static canInsert () {
    return true
  }

  fetch (from, to, done) {
    this.collection.where('start', '>=', from).where('start', '<=', to).get()
      .then(function (docs) {
        done(docs.map(x => Object.assign(x.data(), {id: x.id})))
      })
      .catch(function (err) {
        console.error(err)
      })
  }

  modifyEvent (id, event, done) {
    Object.assign(this.events[id], event)
    window.localStorage.setItem('events', JSON.stringify(this.events))

    setTimeout(done)
    return true
  }

  createEvent (event, done) {
    this.collection.set({
      start: event.start,
      end: event.end,
      title: event.title,
      location: event.location,
      description: event.description
    })
      .then(function (docs) {
        done(docs.map(x => Object.assign(x.data(), {id: x.id})))
      })
      .catch(function (err) {
        console.error(err)
      })
    this.events.push(Object.assign({}, event, {id: this.events.length}))

    setTimeout(done)
    return true
  }
}
