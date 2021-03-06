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
    this.name = 'firebase'
    let store = firebase.firestore()
    store.settings({timestampsInSnapshots: true})
    this.collection = store.collection('promotions')
  }

  static canInsert () {
    return true
  }

  fetch (from, to, done) {
    // this.collection.where('start', '>=', from).where('start', '<=', to).get()
    this.collection.get()
      .then(function (docs) {
        let events = []
        docs.forEach(doc => {
          let data = doc.data()
          events.push({
            id: doc.id,
            start: data.start.toDate ? data.start.toDate() : new Date(data.start),
            end: data.end.toDate ? data.end.toDate() : new Date(data.end),
            title: data.title,
            location: data.location,
            description: data.description
          })
        })
        done(events)
      })
      .catch(function (err) {
        console.error(err)
      })
  }

  getEvent (id, done) {
    this.collection.doc(id).get()
      .then(function (doc) {
        if (doc.exists) {
          let data = doc.data()
          done({
            id: doc.id,
            start: data.start.toDate ? data.start.toDate() : new Date(data.start),
            end: data.end.toDate ? data.end.toDate() : new Date(data.end),
            title: data.title,
            location: data.location,
            description: data.description
          })
        } else {
          done(undefined)
        }
      })
      .catch(function (err) {
        console.error(err)
      })

    return true
  }

  deleteEvent (id, done) {
    this.collection.doc(id).delete()
      .then(done)
      .catch(function (err) {
        console.error(err)
      })

    return true
  }

  modifyEvent (id, event, done) {
    this.collection.doc(id).set({
      start: event.start,
      end: event.end,
      title: event.title,
      location: event.location,
      description: event.description
    })
      .then(done)
      .catch(function (err) {
        console.error(err)
      })

    return true
  }

  createEvent (event, done) {
    this.collection.add({
      start: event.start,
      end: event.end,
      title: event.title || '',
      location: event.location || '',
      description: event.description || ''
    })
      .then(done)
      .catch(function (err) {
        console.error(err)
      })

    return true
  }
}
