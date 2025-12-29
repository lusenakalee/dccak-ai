import { auth } from '@clerk/nextjs/server'

export type Role = 'creator' | 'agency' | 'brand'

export async function checkRole(role: Role) {
  const { has } = await auth()
  return has({ role: `org:${role}` })
}

export async function getUserRole(): Promise<Role | null> {
  const { has } = await auth()
  
  if (has({ role: 'org:creator' })) return 'creator'
  if (has({ role: 'org:agency' })) return 'agency'
  if (has({ role: 'org:brand' })) return 'brand'
  
  return null
}

export async function requireRole(role: Role) {
  const hasRole = await checkRole(role)
  
  if (!hasRole) {
    throw new Error(`Unauthorized: ${role} role required`)
  }
  
  return true
}