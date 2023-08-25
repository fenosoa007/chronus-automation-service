const axios = require("axios");
import { getChronusUsers } from "./getChronusUsers";
import { ChronusUser } from "../types/ChronusUser";

jest.mock("axios");

describe("getChronusUsers", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should return an empty array when there are no active users", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    const result = await getChronusUsers();

    expect(result).toEqual([]);
  });

  it("should filter out users with missing UUIDs", async () => {
    const mockUsers = [
      { uuid: "abc123", email: "test1@sydney.edu.au" },
      { uuid: undefined, email: "test2@sydney.edu.au" },
      { uuid: "def456", email: "test3@sydney.edu.au" },
    ];
    const mockChronusUsers = [
      { uuid: "abc123", email: "test1@sydney.edu.au", firstName: "John", lastName: "Doe" },
      { uuid: "def456", email: "test3@sydney.edu.au", firstName: "Jane", lastName: "Smith" },
    ];
    axios.get.mockResolvedValueOnce({ data: mockUsers });
    axios.get.mockResolvedValueOnce({ data: mockChronusUsers });

    const result = await getChronusUsers();

    expect(result).toEqual(mockChronusUsers);
  });

  it("should handle errors gracefully", async () => {
    axios.get.mockRejectedValueOnce(new Error("Request failed"));

    const result = await getChronusUsers();

    expect(result).toEqual([]);
  });
});