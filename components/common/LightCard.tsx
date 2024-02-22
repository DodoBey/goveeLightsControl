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

type LightCardProps = {
  userKey: string;
  device: {
    device: string;
    model: string;
    deviceName: string;
  };
};

const LightCard: FC<LightCardProps> = ({ userKey, device }) => {
  const queryClient = useQueryClient();

  const { device: deviceMac, model } = device;

  const { data, isPending } = useQuery({
    queryKey: ['device', deviceMac],
    queryFn: () => getDeviceState(userKey, deviceMac, model),
  });

  const { mutate } = useMutation({
    mutationFn: async (body: BodyType) => {
      return await updateDeviceState(userKey, body);
    },
    onSuccess: () => {
      setTimeout(async () => {
        await queryClient.invalidateQueries({
          queryKey: ['device', deviceMac],
        });
      }, 2000);
    },
  });

  if (isPending) {
    return (
      <span className='m-auto text-secondary animate-bounce'>Loading...</span>
    );
  }
  const properties = data.data.properties;

  const rgbDefault: string = rgbFormatter(properties[3].color);
  const currentBrightness = properties[2].brightness;
  const currentStatus = properties[1].powerState;

  const onMutateHandler = (cmd: CommandType) => {
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
        />
        {currentStatus === 'on' && (
          <CustomSlider
            currentBrightness={currentBrightness}
            onUpdate={onMutateHandler}
          />
        )}
        {currentStatus === 'on' && (
          <CustomColorPicker
            initialValue={rgbDefault}
            onUpdate={onMutateHandler}
          />
        )}
      </CardContent>
    </Card>
  );
};
export default LightCard;
