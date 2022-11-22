import { makeAutoObservable } from "mobx";

interface Constructor {
  isOn: boolean;
  leftBtnName: string;
  rightBtnName: string;
}

export default class SwitchController {
  private isOn: boolean;
  private leftBtnName: string;
  private rightBtnName: string;

  constructor({ isOn, leftBtnName, rightBtnName }: Constructor) {
    this.isOn = isOn;
    this.leftBtnName = leftBtnName;
    this.rightBtnName = rightBtnName;
    makeAutoObservable(this);
  }

  toggle() {
    this.isOn = !this.isOn;
  }

  get isSwitchOn() {
    return this.isOn;
  }

  get leftBtn(): string {
    return this.leftBtnName;
  }
  get rightBtn(): string {
    return this.rightBtnName;
  }
}
