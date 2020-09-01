export function guestArrayToObj(array) {
  return array.reduce((acc, item) => {
    acc[item.id] = item;

    return acc;
  }, {})
}
