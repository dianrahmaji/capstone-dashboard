export default (client) => ({
  createFolder: (data) => client.post("/api/folder", data),
  updateFolder: ({ folderId }, data) =>
    client.put(`/api/folder/${folderId}`, data),
  deleteFolder: ({ folderId }) => client.delete(`/api/folder/${folderId}`),
  fetchFolderById: ({ folderId }) => client.get(`/api/folder/${folderId}`),
  updateFolderNote: ({ folderId }, data) =>
    client.put(`/api/folder/${folderId}/note`, data),
});
