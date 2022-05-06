export class MousePointerCoordinates {
  private static _Point = class {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  }

  private readonly _coordinate: object;
  constructor(x: number, y: number) {
    this._coordinate = new MousePointerCoordinates.Point(x, y);
  }


  get coordinate(): object {
    return this._coordinate;
  }


  private static get Point(): any {
    return this._Point;
  }
}
