import {Mouse} from "../src/Mouse";
import {MouseEventType} from "../src/MouseEventType";
import {MouseEventListener} from "../src/MouseEventListener";

class ListenerMock implements MouseEventListener{
  type?: MouseEventType;

  handleMouseEvent(type: MouseEventType): void {
    this.type = type;
  }

}

describe('Mouse', () => {
  it('should be single click', function () {
    const mouse = new Mouse();
    const mouseMock = new ListenerMock();
    mouse.subscribe(mouseMock);
    mouse.pressLeftButton(new Date().getMilliseconds());
    mouse.releaseLeftButton(new Date().getMilliseconds());
    expect(mouseMock.type).toEqual(MouseEventType.SingleClick);
  });

  it('should be double click', function () {
    const mouse = new Mouse();
    const mouseMock = new ListenerMock();
    mouse.subscribe(mouseMock);
    mouse.pressLeftButton(new Date().getMilliseconds());
    mouse.releaseLeftButton(new Date().getMilliseconds());
    mouse.pressLeftButton(new Date().getMilliseconds());
    mouse.releaseLeftButton(new Date().getMilliseconds());
    expect(mouseMock.type).toEqual(MouseEventType.DoubleClick);
  });
});
