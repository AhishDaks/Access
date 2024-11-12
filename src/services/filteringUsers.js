export function filterDesiredUser(fetchDesiredUser, id) {
  return fetchDesiredUser.filter((a) => a.id === parseInt(id));
}
