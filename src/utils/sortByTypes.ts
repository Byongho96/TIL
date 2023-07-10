interface NameObject {
  name: string
}

export const sortByName = function (a: NameObject, b: NameObject) {
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

interface TitleObject {
  title: string
}

export const sortByTitle = function (a: TitleObject, b: TitleObject) {
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
