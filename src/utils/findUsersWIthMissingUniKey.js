"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUsersWithMissingUnikey = void 0;
var findUsersWithMissingUnikey = function (users) {
    var usersWithMissingUnikey = users.filter(function (user) { return user.email.includes("sydney.edu.au") && !user.uuid; });
    return usersWithMissingUnikey;
};
exports.findUsersWithMissingUnikey = findUsersWithMissingUnikey;
