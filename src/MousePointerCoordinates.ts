export class MousePointerCoordinates {
  private readonly _coordinate: Point;
  constructor(x: number, y: number) {
    this._coordinate = {x, y}
  }

  get coordinate(): Point {
    return this._coordinate;
  }
}
