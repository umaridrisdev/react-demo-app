const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch the list of users.
 * @returns {Promise<Array>}
 */
export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/users`);
  if (!response.ok) {
    throw new Error(`Failed to fetch users (status ${response.status})`);
  }
  return response.json();
}

/**
 * Fetch a single user by id.
 * @param {string|number} id
 * @returns {Promise<Object>}
 */
export async function fetchUserById(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user ${id} (status ${response.status})`);
  }
  return response.json();
}
