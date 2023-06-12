export function sortByName(a, b) {
  const nameA = a.name.toUpperCase() // ignore upper and lowercase
  const nameB = b.name.toUpperCase() // ignore upper and lowercase
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }

  // names must be equal
  return 0
}

export function sortByTitle(a, b) {
  const titleA = a.title.toUpperCase() // ignore upper and lowercase
  const titleB = b.title.toUpperCase() // ignore upper and lowercase
  if (titleA < titleB) {
    return -1
  }
  if (titleA > titleB) {
    return 1
  }

  // names must be equal
  return 0
}
