'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getDeviceState,
  updateDeviceState,
  type BodyType,
  type CommandType,
} from '@/app/utils/action';
import { useState, type FC } from 'react';
import CustomColorPicker from './CustomColorPicker';
import { rgbFormatter } from '@/app/utils/rgbFormatter';
import CustomSlider from './CustomSlider';
import CustomSwitch from './CustomSwitch';
import { useToast } from '@/components/ui/use-toast';

type LightCardProps = {
  userKey: string;
  device: {
    device: string;
    model: string;
    deviceName: string;
    supportCmds: string[];
  };
};

const initialState = {
  powerSwitchLoader: false,
  colorLoader: false,
  brightnesLoader: false,
};

const LightCard: FC<LightCardProps> = ({ userKey, device }) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const [powerSwitchLoader, setPowerSwitchLoader] = useState(false);
  const [colorLoader, setColorLoader] = useState(false);
  const [brightnesLoader, setBrightnesLoader] = useState(false);

  const loaderHandler = (command: string) => {
    if (command === 'brightness') {
      setBrightnesLoader(true);
      return;
    }
    if (command === 'color') {
      setColorLoader(true);
      return;
    }
    if (command === 'turn') {
      setPowerSwitchLoader(true);
      return;
    }
  };

  const { device: deviceMac, model, supportCmds } = device;

  const { data, isPending } = useQuery({
    queryKey: ['device', deviceMac],
    queryFn: () => getDeviceState(userKey, deviceMac, model),
  });

  const { mutate, variables } = useMutation({
    mutationFn: async (body: BodyType) => {
      return await updateDeviceState(userKey, body);
    },
    onSuccess: () => {
      setTimeout(async () => {
        await queryClient.invalidateQueries({
          queryKey: ['device', deviceMac],
        });
        {
          variables?.cmd.name === 'brightness' && setBrightnesLoader(false);
        }
        {
          variables?.cmd.name === 'color' && setColorLoader(false);
        }
        {
          variables?.cmd.name === 'turn' && setPowerSwitchLoader(false);
        }
        toast.toast({ description: 'Device status updated' });
      }, 2000);
    },
    onError: () => {
      toast.toast({ description: 'Something went wrong.' });
    },
  });

  if (isPending) {
    return (
      <span className='m-auto text-secondary animate-bounce'>Loading...</span>
    );
  }
  const properties = data.data.properties;

  const rgbDefault: string =
    supportCmds.includes('color') &&
    properties[3].color &&
    rgbFormatter(properties[3].color);
  const currentBrightness: number =
    supportCmds.includes('brightness') && properties[2].brightness;
  const currentStatus = properties[1].powerState;

  const onMutateHandler = (cmd: CommandType) => {
    loaderHandler(cmd.name);
    const body = { deviceMac, model, cmd };
    mutate(body);
  };

  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle>{device.deviceName}</CardTitle>
      </CardHeader>
      <CardContent>
        <CustomSwitch
          currentStatus={currentStatus}
          onSwitch={onMutateHandler}
          isLoading={powerSwitchLoader}
        />
        {currentStatus === 'on' && supportCmds.includes('brightness') && (
          <CustomSlider
            currentBrightness={currentBrightness}
            onUpdate={onMutateHandler}
            isLoading={brightnesLoader}
          />
        )}
        {currentStatus === 'on' && supportCmds.includes('color') && (
          <CustomColorPicker
            initialValue={rgbDefault}
            onUpdate={onMutateHandler}
            isLoading={colorLoader}
          />
        )}
      </CardContent>
    </Card>
  );
};
export default LightCard;
