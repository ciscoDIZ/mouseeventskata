import {MouseEventType} from "./MouseEventType";

export interface MouseEventListener {
  (type: MouseEventType): void;
}
