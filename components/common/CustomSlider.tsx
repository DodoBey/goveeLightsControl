import type { CommandType } from '@/app/utils/action';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useMemo, useState, type FC } from 'react';
import { Loader2 } from 'lucide-react';

type CustomSliderProps = {
  currentBrightness: number;
  onUpdate: (cmd: CommandType) => void;
  isLoading: boolean;
};

const CustomSlider: FC<CustomSliderProps> = ({
  currentBrightness,
  onUpdate,
  isLoading,
}) => {
  const [brightness, setBrightness] = useState(currentBrightness);
  const [buttonIsDisabled, setButtonIsDisable] = useState(true);

  useMemo(() => {
    if (currentBrightness === brightness) {
      setButtonIsDisable(true);
    } else {
      setButtonIsDisable(false);
    }
  }, [brightness, currentBrightness]);

  const updateHandler = () => {
    const cmd = { name: 'brightness', value: brightness };
    setButtonIsDisable(true);
    onUpdate(cmd);
  };

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-between'>
          <Label htmlFor='brightness'>Brightness</Label>
          <Label htmlFor='brightness'>{brightness}</Label>
        </div>
        <Slider
          value={[brightness]}
          max={100}
          step={1}
          className=''
          id='brightness'
          onValueChange={(e) => setBrightness(e[0])}
        />
        <Button
          className=' w-full mb-8'
          disabled={buttonIsDisabled}
          onClick={updateHandler}
        >
          {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
          {isLoading ? 'Updating the Brightness' : 'Update Brightness'}
        </Button>
      </div>
    </>
  );
};
export default CustomSlider;
