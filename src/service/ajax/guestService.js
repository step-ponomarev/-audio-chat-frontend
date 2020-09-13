import {URL} from "@/config/conf";

/**
 *
 * @param {String} id
 * @returns {Promise<any>}
 */
export async function getGuests(roomId) {
  try {
    const response = await fetch(`${ URL }/api/guest/room/${ roomId }`);

    if (response.ok) return await response.json();

    throw Error(response.statusText);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function createGuest(roomId) {
  try {
    const response = await fetch(`${ URL }/api/guest/room/${ roomId }/create`);

    if (response.ok) return await response.json();

    throw Error(response.statusText);
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function removeGuest(guestId) {
  try {
    const response = await fetch(`${ URL }/api/guest/${ guestId }/remove`);

    if (!response.ok) {
      throw new Error("Error removing guest");
    }
  } catch (e) {
    return Promise.reject(e);
  }
}

export async function getGuest(guestId) {
  try {
    const response = await fetch(`${ URL }/api/guest/${ guestId }`);

    if (!response.ok) {
      throw new Error("Error findUser guest");
    }

    return response.json();
  } catch (e) {
    return Promise.reject(e);
  }
}
