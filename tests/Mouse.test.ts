import {Mouse} from "../src/Mouse";
import {MouseEventType} from "../src/MouseEventType";
import {MouseEventListener} from "../src/MouseEventListener";
import {MousePointerCoordinates} from "../src/MousePointerCoordinates";

class ListenerMock implements MouseEventListener{
  type?: MouseEventType;

  handleMouseEvent(type: MouseEventType): void {
    this.type = type;
  }

}

let listenerMock: ListenerMock;
let mouse: Mouse;
beforeEach(() => {
  listenerMock = new ListenerMock();
  mouse = new Mouse();
});

describe('Mouse', () => {
  it('should be single click', function () {
    mouse.subscribe(listenerMock);
    mouse.pressLeftButton(new Date().getMilliseconds());
    mouse.releaseLeftButton(new Date().getMilliseconds());
    expect(listenerMock.type).toEqual(MouseEventType.SingleClick);
  });

  it('should be double click', function () {
    mouse.subscribe(listenerMock);
    mouse.pressLeftButton(new Date().getMilliseconds());
    mouse.releaseLeftButton(new Date().getMilliseconds());
    mouse.pressLeftButton(new Date().getMilliseconds());
    mouse.releaseLeftButton(new Date().getMilliseconds());
    expect(listenerMock.type).toEqual(MouseEventType.DoubleClick);
  });

  it('should be triple click', function () {
    mouse.subscribe(listenerMock);
    mouse.pressLeftButton(new Date().getMilliseconds());
    mouse.releaseLeftButton(new Date().getMilliseconds());
    mouse.pressLeftButton(new Date().getMilliseconds());
    mouse.releaseLeftButton(new Date().getMilliseconds());
    mouse.pressLeftButton(new Date().getMilliseconds());
    mouse.releaseLeftButton(new Date().getMilliseconds());
    expect(listenerMock.type).toEqual(MouseEventType.TripleClick);
  });

  it('should be drag', function () {
    mouse.subscribe(listenerMock);
    mouse.pressLeftButton(new Date().getMilliseconds());
    mouse.move(new MousePointerCoordinates(0, 10), new MousePointerCoordinates(0, 20), new Date().getMilliseconds());
    expect(listenerMock.type).toEqual(MouseEventType.Drag);
  });
});
