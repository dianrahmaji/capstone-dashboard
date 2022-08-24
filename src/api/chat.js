export default (client) => ({
  fetchMessages: ({ roomId }) => client.get(`/api/chat/${roomId}`),
});
