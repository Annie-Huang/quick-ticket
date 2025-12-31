import React from 'react';
import { getTickets } from '@/actions/ticket.actions';

const TicketsPage = async () => {
  const tickets = await getTickets();
  console.log(tickets);

  return <>tickets</>;
};

export default TicketsPage;
