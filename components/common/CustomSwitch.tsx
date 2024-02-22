import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState, type FC } from 'react';
import type { CommandType } from '@/app/utils/action';

type CustomSwitchProps = {
  currentStatus: string;
  onSwitch: (cmd: CommandType) => void;
};

const CustomSwitch: FC<CustomSwitchProps> = ({ currentStatus, onSwitch }) => {
  const [lightStatus, setLightStatus] = useState<boolean>(
    currentStatus === 'on' ? true : false
  );

  const onSwitchHandler = () => {
    setLightStatus((prevLightStatus) => {
      const newLightStatus = !prevLightStatus;
      const cmd = { name: 'turn', value: newLightStatus ? 'on' : 'off' };
      onSwitch(cmd);
      return newLightStatus;
    });
  };

  return (
    <div className='flex items-center justify-between mb-8'>
      <Label htmlFor='airplane-mode'>Turn On/Off</Label>
      <Switch
        checked={lightStatus}
        onCheckedChange={onSwitchHandler}
        id='on-off'
      />
    </div>
  );
};
export default CustomSwitch;
