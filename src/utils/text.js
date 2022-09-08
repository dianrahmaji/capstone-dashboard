export function capitalizeFirstLetter([first, ...rest]) {
  return first ? first.toUpperCase() + rest.join("") : "";
}

export function getProfileFromFullName(fullName) {
  const names = fullName.split(" ");

  if (names.length < 2) return fullName.slice(0, 2).toUpperCase();
  return `${names[0][0]}${names[1][0]}`;
}
