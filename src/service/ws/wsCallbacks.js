import store from "@/store";

export async function onUserJoined(guest) {
  const { dispatch } = store;
  const user = await JSON.parse(guest.body);

  dispatch("guest/addGuest", user);
  dispatch("notifications/addNotification", {
    msg: `${ user.name } подключился к комнате!`,
    type: 'success'
  });
}

export async function onUserLeaved(guest) {
  const { dispatch } = store;
  const user = await JSON.parse(guest.body);

  dispatch('guest/removeGuest', user.id);
  dispatch("notifications/addNotification", {
    msg: `${ user.name } покинул комнату.`,
    type: 'success'
  });
}

export async function onMessageReceived(message) {
  const { dispatch } = store;
  const msg = await JSON.parse(message.body);

  await dispatch('message/addMessage', msg);
}
