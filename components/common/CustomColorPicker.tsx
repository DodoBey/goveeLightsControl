import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useMemo, useState, type FC } from 'react';
import { Hue, Saturation, useColor } from 'react-color-palette';
import 'react-color-palette/css';
import { rgbFormatter } from '@/app/utils/rgbFormatter';
import type { CommandType } from '@/app/utils/action';

type CustomColorPicker = {
  initialValue: string;
  onUpdate: (cmd: CommandType) => void;
};

const CustomColorPicker: FC<CustomColorPicker> = ({
  initialValue,
  onUpdate,
}) => {
  const [color, setColor] = useColor(initialValue);
  const [buttonIsDisabled, setButtonIsDisable] = useState(true);

  useMemo(() => {
    if (initialValue === rgbFormatter(color.rgb)) {
      setButtonIsDisable(true);
    } else {
      setButtonIsDisable(false);
    }
  }, [color.rgb, initialValue]);

  const updateHandler = () => {
    const cmd = {
      name: 'color',
      value: { r: color.rgb.r, g: color.rgb.g, b: color.rgb.b },
    };
    setButtonIsDisable(true);
    onUpdate(cmd);
  };

  return (
    <div className='custom-layout'>
      <Label>Color</Label>
      <Saturation
        height={150}
        color={color}
        onChange={setColor}
      />
      <Hue
        color={color}
        onChange={setColor}
      />
      <Button
        className='mt-4 w-full'
        disabled={buttonIsDisabled}
        onClick={updateHandler}
      >
        Update Color
      </Button>
    </div>
  );
};
export default CustomColorPicker;
