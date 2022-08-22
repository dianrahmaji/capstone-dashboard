export default function isAdmin(userId, adminIds) {
  return adminIds.includes(userId);
}
