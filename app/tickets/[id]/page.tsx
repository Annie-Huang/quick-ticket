import React from 'react';

const TicketDetailsPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await props.params;

  return <>details {id}</>;
};

export default TicketDetailsPage;
