import { Rect, Renderer2D, Scene, Shape, Color } from 'holst/src'
import { Row, Table, Button } from '../../src/index'

const scene = new Scene

const button = new Button()
button.setPosition(20, 20)
button.text = 'Кнопка 11200-1010\nasdasd'
button.autosize = true

button.create(scene.createLayer())
button.height = 40
button.onClick = () => {
  alert('AAA')
}



const button2 = new Button()
button2.setPosition(20, 80)
button2.text = 'Кнопка 2\n asdasd'
//button2.autosize = true
button2.create(scene.createLayer())
button2.onClick = () => {
  // button.setPosition(10, 10)
  button.hidden = !button.hidden
}


const table = new Table(new Rect(0,190,500,700))

const row = table.addRow()
const cell = row.createCell()
cell.content = [
  Shape.create({ fill: '#334455' }).circle(40, 50, 30)
]
const cell2 = row.createCell()

table.create(scene.createLayer())


const canvas = document.getElementById('canvas') as HTMLCanvasElement

const renderer = new Renderer2D(canvas.getContext('2d')!!)
renderer.render(scene)