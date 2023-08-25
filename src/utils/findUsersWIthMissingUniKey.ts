import { ChronusUser } from "../types/ChronusUser";

export const findUsersWithMissingUnikey = (
  users: ChronusUser[]
): ChronusUser[] => {
  const usersWithMissingUnikey = users.filter(
    user => user.email.includes("sydney.edu.au") && !user.uuid
  );
  return usersWithMissingUnikey;
};
