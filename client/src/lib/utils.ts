import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Default timezone for the entire application
// Empty string means use the local system timezone
export const DEFAULT_TIMEZONE = '';

/**
 * Utility function to merge class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format time with the specified timezone
 * @param date - Date object to format
 * @param options - Intl.DateTimeFormatOptions for formatting
 * @param timezone - Optional timezone, defaults to system timezone if empty
 * @returns Formatted time string
 */
export function formatTime(
  date: Date,
  options: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' },
  timezone: string = DEFAULT_TIMEZONE
): string {
  // If timezone is empty, use system timezone
  const timeOptions = { ...options };
  if (timezone) {
    timeOptions.timeZone = timezone;
  }

  return date.toLocaleTimeString('en-US', timeOptions);
}

/**
 * Format date with the specified timezone
 * @param date - Date object to format
 * @param options - Intl.DateTimeFormatOptions for formatting
 * @param timezone - Optional timezone, defaults to system timezone if empty
 * @returns Formatted date string
 */
export function formatDate(
  date: Date,
  options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' },
  timezone: string = DEFAULT_TIMEZONE
): string {
  // If timezone is empty, use system timezone
  const dateOptions = { ...options };
  if (timezone) {
    dateOptions.timeZone = timezone;
  }

  return date.toLocaleDateString('en-US', dateOptions);
}

/**
 * Format date and time with the specified timezone
 * @param date - Date object to format
 * @param options - Intl.DateTimeFormatOptions for formatting
 * @param timezone - Optional timezone, defaults to system timezone if empty
 * @returns Formatted date and time string
 */
export function formatDateTime(
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric'
  },
  timezone: string = DEFAULT_TIMEZONE
): string {
  // If timezone is empty, use system timezone
  const dateTimeOptions = { ...options };
  if (timezone) {
    dateTimeOptions.timeZone = timezone;
  }

  return date.toLocaleString('en-US', dateTimeOptions);
}

/**
 * Get timezone display name
 * @param timezone - Timezone identifier
 * @returns Formatted timezone name or "Local Time" if using system timezone
 */
export function getTimezoneDisplayName(timezone: string = DEFAULT_TIMEZONE): string {
  if (!timezone) {
    return "Local Time";
  }
  return timezone.replace('_', ' ');
}
