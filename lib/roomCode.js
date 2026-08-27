/**
 * Utility to generate formatted temporary Room Codes for Private Rooms.
 * Format: CP-XXXX-XXXX (e.g. CP-X7K9-M4Q2)
 *
 * NOTE: Generated only in temporary client state; never persisted to a database.
 */

const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Removed easily confused chars (I, O, 0, 1)

export function generateRoomCode() {
  let part1 = "";
  let part2 = "";

  for (let i = 0; i < 4; i++) {
    part1 += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
    part2 += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
  }

  return `CP-${part1}-${part2}`;
}

export function formatRoomCodeInput(input) {
  // Clean non-alphanumeric except hyphen
  let cleaned = input.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (cleaned.startsWith("CP")) {
    cleaned = cleaned.slice(2);
  }

  const chunk1 = cleaned.slice(0, 4);
  const chunk2 = cleaned.slice(4, 8);

  let formatted = "CP";
  if (chunk1) formatted += `-${chunk1}`;
  if (chunk2) formatted += `-${chunk2}`;

  return formatted;
}
