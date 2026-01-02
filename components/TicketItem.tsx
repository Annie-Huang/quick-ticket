// take the browser.ts version, the client.ts version is supposed to be use in server side entry point.
import type { Ticket } from '@/app/generated/prisma/browser';

type TicketItemProps = {
  ticket: Ticket;
};

const TicketItem = ({ ticket }: TicketItemProps) => {
  return <div></div>;
};

export default TicketItem;
