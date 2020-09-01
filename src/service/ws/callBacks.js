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

  dispatch('guest/removeGuest', user.id);
  dispatch("notifications/addNotification", {
    msg: `${ user.name } покинул комнату.`,
    type: 'success'
  });
}

export async function onMessageReceived(message) {
  const msg = await JSON.parse(message.body);

  dispatch('message/addMessage', msg);
}

export async function getCurrentUser(usr) {
  const user = await JSON.parse(usr.body);

  dispatch('guest/setUser', user);
  dispatch('guest/addGuest', user);
}
