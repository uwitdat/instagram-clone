
export const handleRouteToProfile = (notif, state) => {
  if (notif.fromUser.id === state.currentUser.id) {
    return true
  } else {
    return false
  }
}