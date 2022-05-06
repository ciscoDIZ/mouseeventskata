import {MouseEventListener} from "./MouseEventListener";
import {MousePointerCoordinates} from "./MousePointerCoordinates";
import {MouseEventType} from "./MouseEventType";

export class Mouse {
  private listeners: MouseEventListener[] = new Array<MouseEventListener>();
  private readonly timeWindowInMillisecondsForDoubleClick: number = 500;
  private pressTime: number = 0;

  public pressLeftButton(currentTimInMilliseconds: number): void {

  }

  public releaseLeftButton(currentTimInMilliseconds: number): void {

  }

  public move(from: MousePointerCoordinates, to: MousePointerCoordinates,
              currentTimInMilliseconds: number): void {
  }

  public subscribe(listener: MouseEventListener): void {
    this.listeners.push(listener);
  }

  private notifySubscribers(eventType: MouseEventType): void {
    this.listeners.map(listener => listener.handleMouseEvent(eventType));
  }
}
