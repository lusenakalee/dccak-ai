'use server'

import { auth, clerkClient } from '@clerk/nextjs/server'

export const completeOnboarding = async (formData: FormData) => {
  const { isAuthenticated, userId } = await auth()

  if (!isAuthenticated) {
    return { error: 'No Logged In User' }
  }

  const client = await clerkClient()

  try {
    // Extract form data
    const title = formData.get('title') as string
    const niche = formData.get('niche') as string
    const phone = formData.get('phone') as string
    const youtube = formData.get('youtube') as string
    const tiktok = formData.get('tiktok') as string
    const instagram = formData.get('instagram') as string
    const facebook = formData.get('facebook') as string
    const twitter = formData.get('twitter') as string

    // Validate required fields
    if (!title || !niche || !phone) {
      return { error: 'Please fill in all required fields.' }
    }

    // Prepare social media links object (only include if provided)
    const socialLinks: Record<string, string> = {}
    if (youtube) socialLinks.youtube = youtube
    if (tiktok) socialLinks.tiktok = tiktok
    if (instagram) socialLinks.instagram = instagram
    if (facebook) socialLinks.facebook = facebook
    if (twitter) socialLinks.twitter = twitter

    // Update user metadata
    const res = await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        title,
        niche,
        phone,
        socialLinks,
      },
    })

    return { message: 'Profile completed successfully', data: res.publicMetadata }
  } catch (err) {
    console.error('Error updating user metadata:', err)
    return { error: 'There was an error updating your profile. Please try again.' }
  }
}