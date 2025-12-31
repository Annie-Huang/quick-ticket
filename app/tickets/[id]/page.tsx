import React from 'react';
import { getTicketById } from '@/actions/ticket.actions';
import { notFound } from 'next/navigation';
import { logEvent } from '@/utils/sentry';

const TicketDetailsPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;

  const ticket = await getTicketById(id);
  if (!ticket) {
    // Actually surprised we don't need to call 'return' on this method.
    notFound();
  }

  logEvent('View ticket details', 'ticket', { ticketId: ticket.id }, 'info');

  return <>details {id}</>;
};

export default TicketDetailsPage;
