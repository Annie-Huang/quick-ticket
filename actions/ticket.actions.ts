'use server';

export async function createTicket(formData: FormData) {
  const subject = formData.get('subject') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as string;

  // The log is show in terminal for the server, not in the devtool console.
  console.log(subject, description, priority);

  return { success: true, message: 'Ticket created successfully' };
}
