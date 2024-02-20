import { fetchUserLights, getDeviceState } from '@/app/utils/action';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LightsPageProps = {
  userKey: string;
};

const LightsPage: FC<LightsPageProps> = ({ userKey }) => {
  const queryClient = useQueryClient();
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

  const fetchDeviceData = async (
    userKey: string,
    deviceMac: string,
    model: string
  ) => {
    const deviceData = await queryClient.fetchQuery({
      queryKey: [deviceMac],
      queryFn: () => getDeviceState(userKey, deviceMac, model),
    });
    console.log(deviceData);
  };

  // const lightsData = devices.map((device) => {});

  return (
    <Card className='w-[350px] dark'>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                placeholder='Name of your project'
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <Button variant='outline'>Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
};
export default LightsPage;
