import Label from 'src/models/Label'

export const fooLabel = new Label({
  id:    1,
  val:   'Foo',
  color: {
    r: 255,
    g: 0,
    b: 0,

    h: 100,
    s: 100,
    l: 50,
  },
})

export const barLabel = new Label({
  id:     2,
  val:   'Bar',
  color: {
    r: 0,
    g: 0,
    b: 255,

    h: 200,
    s: 100,
    l: 50,
  },
})
