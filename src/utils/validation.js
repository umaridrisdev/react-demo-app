// Basic phone number validation for Kenyan-style numbers (+254 country code),
// matching the format given in the task brief.
// A valid number: starts with "+254" followed by exactly 9 digits.
const PHONE_REGEX = /^\+254\d{9}$/;

/**
 * Validates a phone number string.
 * @param {string} phone
 * @returns {{ valid: boolean, error: string | null }}
 */
export function validatePhoneNumber(phone) {
  if (!phone || !phone.trim()) {
    return { valid: false, error: 'Phone number is required.' };
  }

  if (!phone.startsWith('+254')) {
    return { valid: false, error: 'Phone number must start with +254.' };
  }

  if (!PHONE_REGEX.test(phone)) {
    return {
      valid: false,
      error: 'Enter a valid phone number, e.g. +254712345678.',
    };
  }

  return { valid: true, error: null };
}

// Mock authentication: in a real app this would call a backend/OTP service.
// For this demo, only the number from the task brief is accepted as a
// "registered" account.
const MOCK_VALID_NUMBER = '+254712345678';

/**
 * Mock login check.
 * @param {string} phone
 * @returns {{ success: boolean, error: string | null }}
 */
export function mockLogin(phone) {
  const { valid, error } = validatePhoneNumber(phone);
  if (!valid) {
    return { success: false, error };
  }

  if (phone !== MOCK_VALID_NUMBER) {
    return {
      success: false,
      error: `Account not found. Try the demo number ${MOCK_VALID_NUMBER}.`,
    };
  }

  return { success: true, error: null };
}
