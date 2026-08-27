/**
 * Generate a random anonymous alias for chat identity.
 * Users are identified by these aliases instead of real names/emails.
 *
 * Examples: "SilentTiger", "BlueFox", "ShadowCloud", "NeonWolf"
 */

const adjectives = [
  "Silent", "Shadow", "Crystal", "Neon", "Cosmic", "Phantom", "Mystic",
  "Azure", "Crimson", "Golden", "Silver", "Violet", "Ember", "Frost",
  "Thunder", "Lunar", "Solar", "Storm", "Stealth", "Midnight", "Rapid",
  "Electric", "Blazing", "Iron", "Dark", "Bright", "Swift", "Brave",
  "Clever", "Wild", "Noble", "Fierce", "Calm", "Bold", "Lucky",
  "Hidden", "Frozen", "Burning", "Glowing", "Rising",
];

const nouns = [
  "Tiger", "Fox", "Wolf", "Eagle", "Hawk", "Phoenix", "Dragon",
  "Panther", "Falcon", "Raven", "Lion", "Bear", "Cobra", "Shark",
  "Viper", "Owl", "Lynx", "Jaguar", "Puma", "Mustang", "Sparrow",
  "Cloud", "Storm", "Star", "Flame", "Wave", "Blade", "Shadow",
  "Knight", "Sage", "Ghost", "Titan", "Ninja", "Ranger", "Scout",
  "Cipher", "Drift", "Pulse", "Orbit", "Nexus",
];

export function generateAnonymousAlias() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 9000) + 1000; // 4-digit number
  return `${adj}${noun}${num}`;
}
