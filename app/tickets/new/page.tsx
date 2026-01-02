import TicketForm from '@/app/tickets/new/ticket-form';
import { getCurrentUser } from '@/lib/current-user';
import { redirect } from 'next/navigation';

const NewTicketPage = async () => {
  // At this is doing something else rather to calling the <TicketForm> to make the TicketForm a client component.

  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className='min-h-screen bg-blue-50 flex items-center justify-center px-4'>
      <TicketForm />
    </div>
  );
};

export default NewTicketPage;
