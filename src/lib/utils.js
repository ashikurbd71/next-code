import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Converts skills data to an array format
 * Handles both array and comma-separated string formats
 * @param {string|Array} skills - Skills data from database
 * @returns {Array} Array of trimmed skill strings
 */
export function parseSkills(skills) {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills;
  if (typeof skills === 'string') {
    return skills.split(',').filter(s => s.trim()).map(s => s.trim());
  }
  return [];
}

/**
 * Generates a custom student ID in format: nextcode-ov-XX
 * @returns {string} Custom student ID with 2 random numbers
 */
export function generateStudentId() {
  const randomNumbers = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return `nextcode-ov-${randomNumbers}`;
}

/**
 * Generates a unique student ID with collision checking
 * @param {Function} checkExists - Function to check if ID already exists
 * @returns {Promise<string>} Unique student ID
 */
export async function generateUniqueStudentId(checkExists) {
  let studentId;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 100; // Increased for better collision handling

  while (!isUnique && attempts < maxAttempts) {
    studentId = generateStudentId();
    const exists = await checkExists(studentId);
    if (!exists) {
      isUnique = true;
    }
    attempts++;
  }

  if (!isUnique) {
    throw new Error('Failed to generate unique student ID after maximum attempts');
  }

  return studentId;
}