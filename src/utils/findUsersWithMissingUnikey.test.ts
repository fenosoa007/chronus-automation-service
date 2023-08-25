import { findUsersWithMissingUnikey } from "./findUsersWithMissingUnikey";
import { ChronusUser } from "../types/ChronusUser";

describe("findUsersWithMissingUnikey", () => {
  it("should return an empty array when given an empty user list", () => {
    const users: ChronusUser[] = [];
    const result = findUsersWithMissingUnikey(users);
    expect(result).toEqual([]);
  });

  it("should return users with missing unikeys", () => {
    const users: ChronusUser[] = [
      { email: "user1@sydney.edu.au", uuid: undefined },
      { email: "user2@gmail.com", uuid: null },
      { email: "user3@sydney.edu.au", uuid: "" },
      { email: "user4@hotmail.com", uuid: undefined },
    ];
    const expected: ChronusUser[] = [
      { email: "user1@sydney.edu.au", uuid: undefined },
      { email: "user4@hotmail.com", uuid: undefined },
    ];
    const result = findUsersWithMissingUnikey(users);
    expect(result).toEqual(expected);
  });

  it("should return an empty array when all users have valid unikeys", () => {
    const users: ChronusUser[] = [
      { email: "user1@sydney.edu.au", uuid: "abc123" },
      { email: "user2@sydney.edu.au", uuid: "def456" },
      { email: "user3@sydney.edu.au", uuid: "ghi789" },
    ];
    const result = findUsersWithMissingUnikey(users);
    expect(result).toEqual([]);
  });

  it("should return an empty array when there are no email addresses", () => {
    const users: ChronusUser[] = [
      { email: undefined, uuid: undefined },
      { email: null, uuid: undefined },
      { email: "", uuid: undefined },
    ];
    const result = findUsersWithMissingUnikey(users);
    expect(result).toEqual([]);
  });
});