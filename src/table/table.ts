import { IRect, Layer } from 'holst'
import { Row } from './row'
import { CellDrawCallback, TableDesigner } from './table-designer'
import { TableBehavior, CellDropEventCallBack, CellDragoverEventCallBack, CellDragleaveEventCallBack, CellMouseEventCallBack } from './table-behavior'
import { IControl } from '../control'
import { TableControl } from './table-control'

export class Table implements IControl {
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

  constructor (containerSize: IRect) {
    this.containerRect = containerSize
  }

  create (layer: Layer) {
    const designer = new TableDesigner(this)
    if (this.onCellDraw) designer.onCellDraw = this.onCellDraw
    this.#controls = designer.create(layer)!!

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
