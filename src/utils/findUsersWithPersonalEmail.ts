import { ChronusUser } from "../types/ChronusUser";

export const findUsersWithPersonalEmail = (users: ChronusUser[]) => {
  return users.filter(
    (user) => user.email && !user.email.includes("sydney.edu.au")
  );
};