const host = 'http://localhost:8080'

/**
 *
 * @param {String} id
 * @returns {Promise<any>}
 */
export async function getRoom(id) {
  try {
    const response = await fetch(`${ host }/api/room/${ id }`);

    if (response.ok) return await response.json();

    throw Error(response.statusText);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function createRoom() {
  try {
    const response = await fetch(`${ host }/api/room/create`);

    if (response.ok) return await response.text();
  } catch (e) {
    return Promise.reject(e);
  }
}
