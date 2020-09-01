const host = 'http://localhost:8080'

/**
 *
 * @param {String} id
 * @returns {Promise<any>}
 */
export async function getGuests(roomId) {
  try {
    const response = await fetch(`${ host }/api/room/${ roomId }/guest`);

    if (response.ok) return await response.json();

    throw Error(response.statusText);
  } catch (e) {
    return Promise.reject(e);
  }
}
