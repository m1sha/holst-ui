import { Rect, IPoint } from 'holst'
import { TableControl } from './table-control'

export type CellDropEventCallBack = (data: unknown, point: IPoint, rect: Rect) => void
export type CellDragoverEventCallBack = (control: TableControl, point: IPoint) => void
export type CellDragleaveEventCallBack = (control: TableControl, point: IPoint) => void
export type CellMouseEventCallBack = (control: TableControl, point: IPoint) => void

export class TableBehavior {
  private controls: TableControl[]
  onDrop: CellDropEventCallBack | null = null
  onDragover: CellDragoverEventCallBack | null = null
  onDragleave: CellDragleaveEventCallBack | null = null
  onCellHover: CellMouseEventCallBack | null = null
  onCellLeave: CellMouseEventCallBack | null = null
  constructor (controls: TableControl[]) {
    this.controls = controls
  }

  create () {
    const controls = this.controls
    for (const control of controls) {
      if (control.columnIndex === 0) continue
      const shape = control.cellShape

      if (this.onDragover) shape.on('dragover', e => {
          const point = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
          if (this.onDragover) this.onDragover(control, point)
      })

      if (this.onDragleave) shape.on('dragleave', e => {
          const point = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
          if (this.onDragleave) this.onDragleave(control, point)
      })

      if (this.onCellHover) shape.on('hover', e => {
          const point = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
          if (this.onCellHover) this.onCellHover(control, point)
      })
      if (this.onCellLeave) shape.on('leave', e => {
          const point = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
          if (this.onCellLeave) this.onCellLeave(control, point)
      })

      if (this.onDrop) shape.on('drop', e => {
        const data = JSON.parse(e.event.origin.dataTransfer!!.getData('text/plain'))
        const point = { x: e.event.origin.offsetX, y: e.event.origin.offsetY }
        if (this.onDrop) this.onDrop(data, point, shape.bounds)
      })
    }
  }
}
