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
      return;
    }
    if (this.pressTime && clickInTime) {
      this.notifySubscribers(MouseEventType.DoubleClick);
      return;
    }
    this.notifySubscribers(MouseEventType.SingleClick);
  }

  public releaseLeftButton(currentTimInMilliseconds: number): void {
    this.pressTime = currentTimInMilliseconds;
  }

  public move(from: MousePointerCoordinates, to: MousePointerCoordinates,
              currentTimInMilliseconds: number): void {
  }

  public subscribe(listener: MouseEventListener): void {
    this.listeners.push(listener);
  }

  private notifySubscribers(eventType: MouseEventType): void {
    this.lastEventType = eventType;
    this.listeners.map(listener => listener.handleMouseEvent(eventType));
  }
}
