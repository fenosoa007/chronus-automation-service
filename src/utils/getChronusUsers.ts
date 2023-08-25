import { getAllActiveUsers } from "./getAllActiveUsers";
import { ChronusUser } from "../types/ChronusUser";
const axios = require("axios");
// import { writeFileSync } from "node:fs";
export const getChronusUsers = async (): Promise<ChronusUser[]> => {
  const users = await getAllActiveUsers();
  console.log(users.length);
  return users;
  // var validUsers: ChronusUser[] = [];
  // let userLength = users.length;
  // var i = 0;
  // while (i < userLength) {
  //   let _users = users.slice(i, i + 25);
  //   const chronusUsersPromises: Promise<ChronusUser | undefined>[] = _users.map(
  //     async user => {
  //       // console.log(
  //       //   `${process.env.CHRONUS_BASE_URL}/members/${user.uuid}?api_key=${process.env.CHRONUS_API_KEY}`
  //       // );
  //       try {
  //         const response = await axios.get(
  //           `${process.env.CHRONUS_BASE_URL}/members/${user.uuid}?api_key=${process.env.CHRONUS_API_KEY}`
  //         );
  //         console.log(response.status);
  //         return response.data as ChronusUser | undefined;
  //       } catch (err) {
  //         console.error(err.message);
  //         return undefined;
  //       }
  //     }
  //   );
  //   const chronusUsers: (ChronusUser | undefined)[] = await Promise.all(
  //     chronusUsersPromises
  //   );
  //   const validChronusUsers = chronusUsers.filter(
  //     (user): user is ChronusUser => user !== undefined
  //   );
  //   validUsers.concat(validChronusUsers);
  //   i += 25;
  // }
  // return validUsers;
};
