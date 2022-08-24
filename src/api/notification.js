export default (client) => ({
  fetchNotifications: ({ roomId, memberId }) =>
    client.get(`/api/notification/${roomId}/member/${memberId}`),
  resetNotificatons: ({ roomId, memberId }) =>
    client.put(`/api/notification/${roomId}/member/${memberId}`),
});
