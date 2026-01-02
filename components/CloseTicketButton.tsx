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
};

export default CloseTicketButton;
