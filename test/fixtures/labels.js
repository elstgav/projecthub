import Label from 'src/models/Label'

export const fooLabel = new Label({
  id:    1,
  val:   'Foo',
  style: { color: 'white', backgroundColor: 'red' },
})

export const barLabel = new Label({
  id:     2,
  val:   'Bar',
  style: { color: 'black', backgroundColor: 'rgba(0,0,255,.3)' },
})
