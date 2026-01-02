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

  return <div></div>;
  // Don't show the CloseTicketButton if the ticket is closed.
  if (isClosed) return null;
};

export default CloseTicketButton;
