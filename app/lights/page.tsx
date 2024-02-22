'use client';

import LightsPage from '@/components/LightsPage';
import { useQuery } from '@tanstack/react-query';
import { getApiKey } from '../utils/localStorage';
import { redirect } from 'next/navigation';

const Lights = () => {
  const { data, isPending } = useQuery({
    queryKey: ['userKey'],
    queryFn: () => getApiKey('userKey'),
  });

  if (isPending) {
    return (
      <span className='m-auto text-secondary animate-bounce'>Loading...</span>
    );
  }

  if (!data) {
    redirect('/setkey');
  }

  console.log(data);

  return (
    <div className='flex flex-col items-center h-screen w-full'>
      <LightsPage userKey={data} />
    </div>
  );
};
export default Lights;
