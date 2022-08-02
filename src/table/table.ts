import { IRect, Scene } from 'holst'
import { Row } from './row'
import { CellDrawCallback, TableDesigner } from './table-designer'
import { TableBehavior, CellDropEventCallBack, CellDragoverEventCallBack, CellDragleaveEventCallBack, CellMouseEventCallBack } from './table-behavior'
import { IComponent } from '../component'
import { TableControl } from './table-control'

export class Table implements IComponent {
  #controls: TableControl[] = []
  private behavior: TableBehavior | null = null
  containerRect: IRect
  rows: Row[] = []
  onCellDraw: CellDrawCallback | null = null
  onDrop: CellDropEventCallBack | null = null
  onDragover: CellDragoverEventCallBack | null = null
  onDragleave: CellDragleaveEventCallBack | null = null
  onCellHover: CellMouseEventCallBack | null = null
  onCellLeave: CellMouseEventCallBack | null = null
  order: number = 0

  constructor (containerSize: IRect) {
    this.containerRect = containerSize
  }

  create (scene: Scene) {
    const designer = new TableDesigner(this, scene)
    if (this.onCellDraw) designer.onCellDraw = this.onCellDraw
    this.#controls = designer.create()!!

    this.behavior = new TableBehavior(this.#controls)
    this.behavior.onDrop = this.onDrop
    this.behavior.onDragover = this.onDragover
    this.behavior.onDragleave = this.onDragleave
    this.behavior.onCellHover = this.onCellHover
    this.behavior.onCellLeave = this.onCellLeave
    this.behavior.create()
  }

  addRow (): Row {
    const row = new Row()
    this.rows.push(row)
    return row
  }

  get controls () {
    return this.#controls
  }
}
