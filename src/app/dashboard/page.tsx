import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/db';
import Dashboard from '@/components/Dashboard';

const Page = async () => {
  const {getUser} = getKindeServerSession(); 
  const user = await getUser();

  // if no user id signed in
  if(!user || !user.id) {
    redirect('/auth-callback')
  }
  const dbUser = await db.user.findFirst({
    where: {
      id: user.id
    }
  })

  // if user is not synced with the database
  if(!dbUser){
    redirect('/auth-callback')
  }
  return <Dashboard />
}



export default Page;