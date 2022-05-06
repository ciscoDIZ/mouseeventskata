import {MouseEventListener} from "./MouseEventListener";
import {MousePointerCoordinates} from "./MousePointerCoordinates";
import {MouseEventType} from "./MouseEventType";

export class Mouse {
  private listeners: MouseEventListener[] = new Array<MouseEventListener>();
  private readonly timeWindowInMillisecondsForDoubleClick: number = 500;
  private pressTime: number = 0;
  private lastEventType?: MouseEventType;

  public pressLeftButton(currentTimInMilliseconds: number): void {
    const clickInTime = currentTimInMilliseconds -
      this.pressTime < this.timeWindowInMillisecondsForDoubleClick;
    if (this.lastEventType == MouseEventType.DoubleClick && clickInTime) {
      this.notifySubscribers(MouseEventType.TripleClick);
      this.pressTime = currentTimInMilliseconds;
      return;
    }
    if (this.pressTime && clickInTime) {
      this.notifySubscribers(MouseEventType.DoubleClick);
      this.pressTime = currentTimInMilliseconds;
      return;
    }
    this.pressTime = currentTimInMilliseconds;
    this.notifySubscribers(MouseEventType.SingleClick);
  }

  public releaseLeftButton(currentTimInMilliseconds: number): void {
    this.pressTime = currentTimInMilliseconds;
    if (this.lastEventType == MouseEventType.Drag) {
      this.notifySubscribers(MouseEventType.Drop);
    }
  }

  public move(from: MousePointerCoordinates, to: MousePointerCoordinates,
              currentTimInMilliseconds: number): void {
    if (this.pressTime && (from.coordinate.x != to.coordinate.x ||
      from.coordinate.y != to.coordinate.y)) {
      this.notifySubscribers(MouseEventType.Drag);
    }
    this.pressTime = currentTimInMilliseconds;
  }

  public subscribe(listener: MouseEventListener): void {
    this.listeners.push(listener);
  }

  private notifySubscribers(eventType: MouseEventType): void {
    this.lastEventType = eventType;
    this.listeners.map(listener => listener.handleMouseEvent(eventType));
  }
}
