'use server';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '@/db/prisma';
import { revalidatePath } from 'next/cache';
import { logEvent } from '@/utils/sentry';
import { getCurrentUser } from '@/lib/current-user';

// export async function createTicket(formData: FormData) {
export async function createTicket(
  prevState: { success: boolean; message: string }, // Need to create prevState otherwise useActionState(createTicket will get error.
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      logEvent('Unauthorized ticket creation attempt', 'ticket', {}, 'warning');

      return {
        success: false,
        message: 'You must be logged in to create a ticket.',
      };
    }

    // The error is in the Additional Data field under the sentry issue
    // throw new Error('Simulated Prisma error for testing');

    const subject = formData.get('subject') as string;
    const description = formData.get('description') as string;
    const priority = formData.get('priority') as string;

    // The log is show in terminal for the server, not in the devtool console.
    // console.log(subject, description, priority);

    if (!subject || !description || !priority) {
      // Sentry.captureMessage(
      //   'Validation Error: Missing ticket fields',
      //   'warning',
      // );
      logEvent(
        'Validation Error: Missing ticket fields',
        'ticket',
        { subject, description, priority },
        'warning',
      );
      return { success: false, message: 'All fields are required' };
    }

    // Create ticket
    const ticket = await prisma.ticket.create({
      data: { subject, description, priority },
    });

    // Sentry.addBreadcrumb({
    //   category: 'ticket',
    //   message: `Ticket created: ${ticket.id}`,
    //   level: 'info',
    // });
    // Sentry.captureMessage(`Ticket was created successfully: ${ticket.id}`);
    logEvent(
      `Ticket created successfully: ${ticket.id}`,
      'ticket',
      { ticketId: ticket.id },
      'info',
    );

    revalidatePath('/tickets');

    return { success: true, message: 'Ticket created successfully' };
  } catch (error) {
    // Sentry.captureException(error as Error, {
    //   extra: { formData: Object.fromEntries(formData.entries()) },
    // });
    logEvent(
      'An error occurred while creating the ticket',
      'ticket',
      {
        formData: Object.fromEntries(formData.entries()),
      },
      'error',
      error,
    );

    return {
      success: false,
      message: 'An error occurred while creating ticket',
    };
  }
}

export async function getTickets() {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: 'desc' },
    });

    logEvent(
      'Fetched ticket list',
      'ticket',
      { count: tickets.length },
      'info',
    );

    return tickets;
  } catch (error) {
    logEvent('Error fetching tickets', 'ticket', {}, 'error', error);

    return [];
  }
}

export async function getTicketById(id: string) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id: Number(id) },
    });

    if (!ticket) {
      logEvent('Ticket not found', 'ticket', { ticketId: id }, 'warning');
    }

    return ticket;
  } catch (error) {
    logEvent(
      'Error fetching ticket detail',
      'ticket',
      { ticketId: id },
      'error',
      error,
    );

    return null;
  }
}
