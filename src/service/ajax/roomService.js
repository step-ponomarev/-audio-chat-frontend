import {URL} from "@/config/conf";

/**
 *
 * @param {String} id
 * @returns {Promise<any>}
 */
export async function getRoom(id) {
  try {
    const response = await fetch(`${ URL }/api/room/${ id }`);

    if (response.ok) return await response.json();

    throw Error(response.statusText);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function createRoom() {
  try {
    const response = await fetch(`${ URL }/api/room/create`);

    if (response.ok) return await response.json();
  } catch (e) {
    return Promise.reject(e);
  }
}
