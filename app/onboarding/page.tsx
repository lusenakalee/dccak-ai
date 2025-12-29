'use client'

import * as React from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { completeOnboarding } from './_actions'

const NICHES = [
  'Technology',
  'Beauty',
  'Gaming',
  'Lifestyle',
  'Fashion',
  'Food & Cooking',
  'Travel',
  'Fitness & Health',
  'Education',
  'Entertainment',
  'Business & Finance',
  'Arts & Crafts',
  'Music',
  'Sports',
  'Other'
]

export default function OnboardingComponent() {
  const [error, setError] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { user } = useUser()
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setError('')
    
    const res = await completeOnboarding(formData)
    
    if (res?.message) {
      // Forces a token refresh and refreshes the `User` object
      await user?.reload()
      router.push('/dashboard')
    }
    
    if (res?.error) {
      setError(res?.error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Profile
            </h1>
            <p className="text-gray-600">
              Tell us about yourself to get started
            </p>
          </div>

          <form action={handleSubmit} className="space-y-6">
            {/* Professional Title */}
            <div>
              <label 
                htmlFor="title" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Professional Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="e.g., Professional Content Creator"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Niche Selection */}
            <div>
              <label 
                htmlFor="niche" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Niche *
              </label>
              <select
                id="niche"
                name="niche"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              >
                <option value="">Select your niche</option>
                {NICHES.map((niche) => (
                  <option key={niche} value={niche.toLowerCase()}>
                    {niche}
                  </option>
                ))}
              </select>
            </div>
         

            {/* Phone Number */}
            <div>
              <label 
                htmlFor="phone" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1 (555) 000-0000"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              />
            </div>

            {/* Social Media Links */}
            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Social Media Links
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Add your social media profiles (optional)
              </p>

              <div className="space-y-4">
                {/* YouTube */}
                <div>
                  <label 
                    htmlFor="youtube" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    YouTube
                  </label>
                  <input
                    type="url"
                    id="youtube"
                    name="youtube"
                    placeholder="https://youtube.com/@yourchannel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                {/* TikTok */}
                <div>
                  <label 
                    htmlFor="tiktok" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    TikTok
                  </label>
                  <input
                    type="url"
                    id="tiktok"
                    name="tiktok"
                    placeholder="https://tiktok.com/@yourusername"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                {/* Instagram */}
                <div>
                  <label 
                    htmlFor="instagram" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Instagram
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    name="instagram"
                    placeholder="https://instagram.com/yourusername"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                {/* Facebook */}
                <div>
                  <label 
                    htmlFor="facebook" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Facebook
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    name="facebook"
                    placeholder="https://facebook.com/yourprofile"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>

                {/* Twitter/X */}
                <div>
                  <label 
                    htmlFor="twitter" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Twitter / X
                  </label>
                  <input
                    type="url"
                    id="twitter"
                    name="twitter"
                    placeholder="https://twitter.com/yourusername"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-medium">Error:</p>
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Completing...' : 'Complete Profile'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}