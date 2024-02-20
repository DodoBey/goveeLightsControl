'use client';

import LightsPage from '@/components/LightsPage';
import { useQuery } from '@tanstack/react-query';
import { getApiKey } from '../utils/localStorage';
import { redirect } from 'next/navigation';

const Lights = () => {
  const { data } = useQuery({
    queryKey: ['userKey'],
    queryFn: () => getApiKey('userKey'),
  });

  if (!data) {
    redirect('/setkey');
  }

  return (
    <div className='flex justify-center items-center h-screen'>
      <LightsPage userKey={data} />
    </div>
  );
};
export default Lights;
