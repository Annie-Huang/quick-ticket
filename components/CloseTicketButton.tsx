import { useActionState } from 'react';
import { closeTicket } from '@/actions/ticket.actions';

const CloseTicketButton = ({
  ticketId,
  isClosed,
}: {
  ticketId: number;
  isClosed: boolean;
}) => {
  const initialState = {
    success: false,
    message: '',
  };

  const [state, formAction] = useActionState(closeTicket, initialState);

  // Don't show the CloseTicketButton if the ticket is closed.
  if (isClosed) return null;

  // I personally think it's a bit stupid to create a <form> just so that we can use the useActionState hook
  return (
    <form action={formAction}>
      <input type='hidden' name='ticketId' value={ticketId} />
      <button
        type='submit'
        className='bg-red-500 text-white px-3 py-3 w-full rounded hover:bg-red-600 transition'
      >
        Close Ticket
      </button>
    </form>
  );
};

export default CloseTicketButton;
