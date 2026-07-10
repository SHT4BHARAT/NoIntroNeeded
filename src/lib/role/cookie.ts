// Role cookie utilities
// Cookie: role_preference, 1-year expiry, httpOnly: false (client needs to read for switcher UI)

export const ROLE_COOKIE_NAME = "role_preference";
export const ROLE_COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

export const ROLES = ["ai-engineer", "backend-systems"] as const;

export function isValidRole(value: string): value is (typeof ROLES)[number] {
  return ROLES.includes(value as (typeof ROLES)[number]);
}
