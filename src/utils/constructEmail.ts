import { SimpleUser } from "../types/SimpleUser";

export const constructEmail = (
  uniKeyMissing: SimpleUser[] | undefined,
  personalEmailMissing: SimpleUser[] | undefined
) => {
  const constructedSubject = `${
    uniKeyMissing.length + personalEmailMissing.length
  } users requiring manual processing`;

  let constructedBody = "Users for manual processing:\n\n";

  // Process missing uni key users
  if (uniKeyMissing.length > 0) {
    constructedBody += "Missing uni key:\n";
    uniKeyMissing.forEach(userEmail => {
      constructedBody += `- ${userEmail}\n`;
    });
    constructedBody += "\n";
  }

  // Process personal email missing users
  if (personalEmailMissing.length > 0) {
    constructedBody += "Personal email missing:\n";
    personalEmailMissing.forEach(userEmail => {
      constructedBody += `- ${userEmail}\n`;
    });
    constructedBody += "\n";
  }

  return { constructedSubject, constructedBody };
};
