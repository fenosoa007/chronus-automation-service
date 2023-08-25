import { findUsersWithPersonalEmail } from "./findUsersWithPersonalEmail";
import { ChronusUser } from "../types/ChronusUser";

describe("findUsersWithPersonalEmail", () => {
  it("should return an empty array when given an empty user list", () => {
    const users: ChronusUser[] = [];
    const result = findUsersWithPersonalEmail(users);
    expect(result).toEqual([]);
  });

  it("should return users with personal email addresses", () => {
    const users: ChronusUser[] = [
      { email: "user1@company.com" },
      { email: "user2@gmail.com" },
      { email: "user3@sydney.edu.au" },
      { email: "user4@hotmail.com" },
    ];
    const expected: ChronusUser[] = [
      { email: "user1@company.com" },
      { email: "user2@gmail.com" },
      { email: "user4@hotmail.com" },
    ];
    const result = findUsersWithPersonalEmail(users);
    expect(result).toEqual(expected);
  });

  it("should return an empty array when all users have sydney.edu.au email addresses", () => {
    const users: ChronusUser[] = [
      { email: "user1@sydney.edu.au" },
      { email: "user2@sydney.edu.au" },
      { email: "user3@sydney.edu.au" },
    ];
    const result = findUsersWithPersonalEmail(users);
    expect(result).toEqual([]);
  });

  it("should return an empty array when there are no email addresses", () => {
    const users: ChronusUser[] = [
      { email: undefined },
      { email: null },
      { email: "" },
    ];
    const result = findUsersWithPersonalEmail(users);
    expect(result).toEqual([]);
  });
});
