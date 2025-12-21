import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET to .env');
  }

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', { status: 400 });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Verify webhook
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error: Verification failed', { status: 400 });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, email_addresses, first_name, last_name } = evt.data;
    
    const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id);
    
    if (primaryEmail) {
      try {
        await prisma.user.create({
          data: {
            id: id,
            email: primaryEmail.email_address,
            name: first_name && last_name ? `${first_name} ${last_name}` : first_name || last_name || null,
          },
        });
        console.log('User created in database');
      } catch (error) {
        console.error('Error creating user:', error);
        return new Response('Error: Database error', { status: 500 });
      }
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name } = evt.data;
    
    const primaryEmail = email_addresses.find(email => email.id === evt.data.primary_email_address_id);
    
    if (primaryEmail) {
      try {
        await prisma.user.update({
          where: { id: id },
          data: {
            email: primaryEmail.email_address,
            name: first_name && last_name ? `${first_name} ${last_name}` : first_name || last_name || null,
          },
        });
        console.log('User updated in database');
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    
    try {
      await prisma.user.delete({
        where: { id: id as string },
      });
      console.log('User deleted from database');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return new Response('Webhook processed successfully', { status: 200 });
}