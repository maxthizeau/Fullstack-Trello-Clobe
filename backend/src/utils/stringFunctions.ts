export function removeSpecialChar(stringToFormat: string): string {
  return stringToFormat.replace(/[^A-Z0-9]+/gi, "_")
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function lowercaseFirstLetter(string: string): string {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

export function tab(number: number): string {
  return " ".repeat(number)
}
