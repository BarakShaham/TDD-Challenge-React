import { observer } from "mobx-react";

import SwitchController from "./Switch.ctrl";

interface Props {
  controller: SwitchController;
}
const Switch = observer(({ controller }: Props) => {
  const isLeftDisabled = controller.isSwitchOn;
  return (
    <label onClick={() => controller.toggle()}>
      <button disabled={isLeftDisabled}>{controller.leftBtn}</button>
      <button disabled={!isLeftDisabled}>{controller.rightBtn}</button>
    </label>
  );
});

export default Switch;
