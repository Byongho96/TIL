export function cutLetters(string, maxLetters) {
  if (string.length > maxLetters) {
    return string.substring(0, maxLetters) + '...'
  }
  return string
}
