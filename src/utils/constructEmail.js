"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructEmail = void 0;
var constructEmail = function (uniKeyMissing, personalEmailMissing) {
    var constructedSubject = "".concat(uniKeyMissing.length + personalEmailMissing.length, " users requiring manual processing");
    var constructedBody = "Users for manual processing:\n\n";
    // Process missing uni key users
    if (uniKeyMissing.length > 0) {
        constructedBody += "Missing uni key:\n";
        uniKeyMissing.forEach(function (userEmail) {
            constructedBody += "- ".concat(userEmail, "\n");
        });
        constructedBody += "\n";
    }
    // Process personal email missing users
    if (personalEmailMissing.length > 0) {
        constructedBody += "Personal email missing:\n";
        personalEmailMissing.forEach(function (userEmail) {
            constructedBody += "- ".concat(userEmail, "\n");
        });
        constructedBody += "\n";
    }
    return { constructedSubject: constructedSubject, constructedBody: constructedBody };
};
exports.constructEmail = constructEmail;
