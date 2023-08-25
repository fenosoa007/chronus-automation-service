import { findUsersWithMissingUnikey } from "./utils/findUsersWIthMissingUniKey";
import { findUsersWithPersonalEmail } from "./utils/findUsersWithPersonalEmail";
import { getChronusUsers } from "./utils/getChronusUsers";
import { handleMissingUniKey } from "./utils/handleMissingUniKey";
import { handlePersonalEmail } from "./utils/handlePersonalEmail";
import { sendEmailWithNodemailer } from "./services/email-service";
import { constructEmail } from "./utils/constructEmail";
import { updateChronusUser } from "./utils/updateChronusUser";
import * as dotenv from "dotenv";
dotenv.config();
export const chronusAutomationService = async () => {
  try {
    // Get all chronus users based on active users
    const chronusUsers = await getChronusUsers();

    // Sort chronus users into 2 collections
    const missingUnikeyUsers = await findUsersWithMissingUnikey(chronusUsers);
    const personalEmailUsers = await findUsersWithPersonalEmail(chronusUsers);

    const missingUniKeyHandled = handleMissingUniKey(missingUnikeyUsers);
    const personalEmailHandled = handlePersonalEmail(personalEmailUsers);

    const usersToUpdateInChronus = [
      ...missingUniKeyHandled.finalUserList,
      ...personalEmailHandled.finalUserList
    ];

    // usersToUpdateInChronus.forEach(user => {
    //   return updateChronusUser(user);
    // });

    const { constructedSubject, constructedBody } = constructEmail(
      missingUniKeyHandled.usersNotFound,
      personalEmailHandled.usersNotFound
    );
    console.log("mailing..");
    sendEmailWithNodemailer({
      subject: constructedSubject,
      body: constructedBody
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.log(err.message);

    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: err.message })
    };
  }
};

chronusAutomationService()
  .then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err.message);
  });
