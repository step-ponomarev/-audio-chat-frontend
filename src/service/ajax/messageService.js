const host = 'http://localhost:8080'

/**
 *
 * @param {String} id
 * @returns {Promise<any>}
 */
export async function getMessages(roomId) {
  try {
    const response = await fetch(`${ host }/api/message/room/${ roomId }`);

    if (response.ok) return await response.json();

    throw Error(response.statusText);
  } catch (e) {
    return Promise.reject(e);
  }
}
