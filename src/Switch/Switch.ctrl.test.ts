import SwitchController from "./Switch.ctrl";

let switchController: SwitchController;

beforeEach(async () => {
  switchController = new SwitchController({
    isOn: true,
    leftBtnName: "left",
    rightBtnName: "right",
  });
});

describe("Switch actions", () => {
  it("toggle", async () => {
    expect(switchController.isSwitchOn).toBeTruthy();
    switchController.toggle();
    expect(switchController.isSwitchOn).toBeFalsy();
  });
});

describe("Switch computeds", () => {
  it("isSwitchOn", async () => {
    expect(switchController.isSwitchOn).toBeTruthy();
  });

  it("Left button name", async () => {
    expect(switchController.leftBtn).toBe("left");
  });
  it("Right button name", async () => {
    expect(switchController.rightBtn).toBe("right");
  });
});
