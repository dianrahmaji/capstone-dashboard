export default (client) => ({
  addDocument: (data) => client.post("/api/document", data),
  updateDocument: ({ documentId }, data) =>
    client.put(`/api/document/${documentId}`, { data }),
  deleteDocument: ({ documentId }) =>
    client.delete(`/api/document/${documentId}`),
});
