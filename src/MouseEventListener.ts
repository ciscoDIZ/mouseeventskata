import {MouseEventType} from "./MouseEventType";

export interface MouseEventListener {
  handleMouseEvent(type: MouseEventType): void;
}
