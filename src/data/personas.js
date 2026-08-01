// Overlays Nigerian names, companies, and phone numbers onto the records
// returned by the real API call (JSONPlaceholder). The API is still the
// actual data source — id, address, and website fields pass through
// untouched — this just relabels a few display fields per record so the
// directory reads naturally for a Nigerian audience instead of the
// default placeholder data.
const PERSONAS = {
  1: { name: 'Musa Ibrahim', username: 'musa.ibrahim', phone: '+2348031234567', company: 'MTN Nigeria' },
  2: { name: 'Ahmad Bello', username: 'ahmad.bello', phone: '+2348021234567', company: 'Dangote Group' },
  3: { name: 'Muhammad Sani', username: 'm.sani', phone: '+2347051234567', company: 'Tesla' },
  4: { name: 'Fatima Yusuf', username: 'fatima.yusuf', phone: '+2348091234567', company: 'Google Nigeria' },
  5: { name: 'Aisha Abdullahi', username: 'aisha.abdullahi', phone: '+2348131234567', company: 'GTBank' },
  6: { name: 'Ibrahim Lawal', username: 'ibrahim.lawal', phone: '+2347081234567', company: 'Zenith Bank' },
  7: { name: 'Zainab Umar', username: 'zainab.umar', phone: '+2348161234567', company: 'Airtel Nigeria' },
  8: { name: 'Yusuf Garba', username: 'yusuf.garba', phone: '+2348051234567', company: 'Flutterwave' },
  9: { name: 'Halima Sadiq', username: 'halima.sadiq', phone: '+2347061234567', company: 'Paystack' },
  10: { name: 'Abdullahi Musa', username: 'abdullahi.musa', phone: '+2348181234567', company: 'Andela' },
};

/**
 * Overlays a Nigerian name/company/phone persona onto a fetched API record.
 * Falls back to the original API data if no persona is defined for that id
 * (keeps the app working even if the API returns more/fewer records).
 * @param {Object} user - raw record from the API
 * @returns {Object} user with display fields overridden
 */
export function applyPersona(user) {
  const persona = PERSONAS[user.id];
  if (!persona) return user;

  return {
    ...user,
    name: persona.name,
    username: persona.username,
    email: `${persona.username}@gmail.com`,
    phone: persona.phone,
    company: {
      ...user.company,
      name: persona.company,
    },
  };
}
