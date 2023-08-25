import { ChronusUser } from "../types/ChronusUser";

export const handleMissingUniKey = (userList: ChronusUser[]) => {
  let usersNotFound = [];
  const finalUserList = userList.map((user: ChronusUser) => {
    // retrieve from db
    const identityNowUser = user.email;
    // getFromIdentityNow(user.email)
    if (!identityNowUser) {
      usersNotFound.push(user);
    }
  });
  return { finalUserList, usersNotFound };
};
