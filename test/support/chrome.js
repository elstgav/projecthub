const storage = {}

global.chrome = {
  runtime: {
    lastError: false,
    sendMessage(_msg) {},
  },

  storage: {
    sync: {
      get(items, callback) {
        const payload = {}
        switch (items.constructor.name) {
          default:
          case 'String':
            payload[items] = storage[items]
            break
          case 'Array':
            items.forEach((item) => { payload[item] = storage[item] })
            break
        }
        callback(payload)
      },

      set(items, callback) {
        Object.assign(storage, items)
        callback()
      },

      clear(callback) {
        Object.keys(storage).forEach(key => delete storage[key])
        callback()
      },
    },
  },
}
