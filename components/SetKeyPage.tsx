'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { getApiKey, setApiKey } from '../app/utils/localStorage';
import { redirect } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const SetKeyPage = () => {
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ['userKey'],
    queryFn: () => getApiKey('userKey'),
  });

  if (isPending) {
    return (
      <span className='m-auto text-secondary animate-bounce'>Loading...</span>
    );
  }

  if (data) {
    redirect('/lights');
  }

  const setUsersKey = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData);
    const objectKey = Object.keys(userData)[0];
    const userVal = userData[objectKey] as string;
    setApiKey(objectKey, userVal);
    e.currentTarget.reset();
    queryClient.invalidateQueries({ queryKey: ['userKey'] });
    redirect('/lights');
  };

  return (
    <Card className='w-[350px] m-auto'>
      <CardHeader>
        <CardTitle>Set your API Key</CardTitle>
        <CardDescription>
          You should set your API key to use your own lights.
          <Button variant='link'>
            <Link
              href={
                'https://app-h5.govee.com/share/community?client=0&postId=124855'
              }
              target='_blank'
            >
              How to get an API key?
            </Link>
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={setUsersKey}>
          <div className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
              <Label htmlFor='name'>Your Key</Label>
              <Input
                id='apikey'
                name='userKey'
                placeholder='Your own API key'
              />
            </div>
          </div>
          <Button
            type='submit'
            className='mt-6'
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
export default SetKeyPage;
