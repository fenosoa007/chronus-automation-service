import { ChronusUser } from "../types/ChronusUser";

export const handlePersonalEmail = (userList: ChronusUser[]) => {
  let usersNotFound = [];
  const finalUserList = userList.map((user: ChronusUser) => {
    // retrieve from db
    const identityNowUser = user.email;
    // getFromIdentityNow({
    //    studentId,
    //    firstName,
    //    lastName
    // })
    if (!identityNowUser) {
      usersNotFound.push(user);
    }
  });
  return { finalUserList, usersNotFound };
};
