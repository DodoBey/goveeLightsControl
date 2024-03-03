import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState, type FC } from 'react';
import type { CommandType } from '@/app/utils/action';
import { Loader2 } from 'lucide-react';

type CustomSwitchProps = {
  currentStatus: string;
  onSwitch: (cmd: CommandType) => void;
  isLoading: boolean;
};

const CustomSwitch: FC<CustomSwitchProps> = ({
  currentStatus,
  onSwitch,
  isLoading,
}) => {
  const [lightStatus, setLightStatus] = useState<boolean>(
    currentStatus === 'on' ? true : false
  );

  const onSwitchHandler = () => {
    setLightStatus((prevLightStatus) => !prevLightStatus);

    const cmd = { name: 'turn', value: lightStatus ? 'off' : 'on' };
    onSwitch(cmd);
  };

  return (
    <div className='flex items-center justify-between mb-8'>
      <Label htmlFor='airplane-mode'>Turn On/Off</Label>
      {isLoading ? (
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <Switch
          checked={lightStatus}
          onCheckedChange={onSwitchHandler}
          id='on-off'
        />
      )}
    </div>
  );
};
export default CustomSwitch;
