import React from 'react';
import { getTickets } from '@/actions/ticket.actions';

const TicketsPage = async () => {
  const tickets = await getTickets();
  console.log(tickets);

  return (
    <div className='min-h-screen bg-blue-50 p-8'>
      <h1 className='text-3xl font-bold text-blue-600 mb-8 text-center'>
        Support Tickets
      </h1>

      {tickets.length === 0 ? (
        <p className='text-center text-gray-600'>No Tickets Yet</p>
      ) : (
        <div className='space-y-4 max-w-3xl mx-auto'>
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className='flex justify-between items-center bg-white rounded-lg shadow border border-gray-200 p-6'
            >
              {/* Left Side */}

              {/* Right Side */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketsPage;
