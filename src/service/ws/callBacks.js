import store from "@/store";

const { dispatch } = store;

export async function onUserJoined(guest) {
  const user = await JSON.parse(guest.body);

  dispatch("guest/addGuest", user);
  dispatch("notifications/addNotification", {
    msg: `${ user.name } подключился к комнате!`,
    type: 'success'
  });
}

export async function onUserLeaved(guest) {
  const user = await JSON.parse(guest.body);

  dispatch('guest/removeGuest', user.sessionId);
  dispatch("notifications/addNotification", {
    msg: `${ user.name } покинул комнату.`,
    type: 'success'
  });
}

export async function getCurrentUser(user) {
  dispatch('guest/setUser', await JSON.parse(user.body));
}
