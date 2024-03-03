'use client';

import { fetchUserLights } from '@/app/utils/action';
import { useQuery } from '@tanstack/react-query';
import { type FC } from 'react';
import LightCard from './common/LightCard';

type LightsPageProps = {
  userKey: string;
};

type Device = {
  deviceName: string;
  device: string;
  model: string;
  supportCmds: string[];
};

export type SingleLight = SingleLightRoot[];

export interface Color {
  r: number;
  b: number;
  g: number;
}

export interface SingleLightRoot {
  online?: boolean;
  powerState?: string;
  brightness?: number;
  color?: Color;
}

const LightsPage: FC<LightsPageProps> = ({ userKey }) => {
  const { data, isPending } = useQuery({
    queryKey: ['userLights'],
    queryFn: () => fetchUserLights(userKey),
  });

  if (isPending) {
    return (
      <span className='m-auto text-secondary animate-bounce'>Loading...</span>
    );
  }

  const devices = data.data.devices;

  const lightsData = devices.map((device: Device) => {
    return (
      <LightCard
        device={device}
        userKey={userKey}
        key={device.device}
      />
    );
  });

  return (
    <>
      <h1 className='text-secondary text-3xl font-bold my-4'>
        Supported Lights
      </h1>
      <div className='flex flex-col sm:grid sm:grid-cols-4 gap-4 dark'>
        {lightsData}
      </div>
    </>
  );
};
export default LightsPage;
