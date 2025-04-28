import sql from '../db.js';

export const getUserById = async (userId) => {
  try {
    const result = await sql`
    SELECT id, email, name
    FROM users
    WHERE id = ${userId}
    `;

    return result.rows[0];
  } catch (error) {
    console.log('getUserById error:', error);
  }
}