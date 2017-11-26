import Label from 'src/models/Label'

export const testLabel = new Label({
  id:    1,
  val:   'Foo',
  style: { color: 'white', backgroundColor: 'red' },
})

export const testLabel2 = new Label({
  id:     2,
  val:   'Bar',
  style: { color: 'black', backgroundColor: 'rgba(0,0,255,.3)' },
})
