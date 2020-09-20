import { URL } from "@/config/conf";

/**
 *
 * @param {String} id
 * @returns {Promise<any>}
 */
export async function getMessages(roomId) {
  try {
    const response = await fetch(`${ URL }/api/message/room/${ roomId }`);

    if (response.ok) return await response.json();

    throw Error(response.statusText);
  } catch (e) {
    return Promise.reject(e);
  }
}
