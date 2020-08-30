export function guestArrayToObj(array) {
  return array.reduce((acc, item) => {
    acc[item.sessionId] = item;

    return acc;
  }, {})
}
