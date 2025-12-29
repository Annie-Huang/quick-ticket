'use server';
import * as Sentry from '@sentry/nextjs';

// export async function createTicket(formData: FormData) {
export async function createTicket(
  prevState: { success: boolean; message: string }, // Need to create prevState otherwise useActionState(createTicket will get error.
  formData: FormData,
): Promise<{ success: boolean; message: string }> {
  try {
    const subject = formData.get('subject') as string;
    const description = formData.get('description') as string;
    const priority = formData.get('priority') as string;

    // The log is show in terminal for the server, not in the devtool console.
    console.log(subject, description, priority);

    if (!subject || !description || !priority) {
      Sentry.captureMessage(
        'Validation Error: Missing ticket fields',
        'warning',
      );
      return { success: false, message: 'All fields are required' };
    }

    return { success: true, message: 'Ticket created successfully' };
  } catch (error) {}
}
