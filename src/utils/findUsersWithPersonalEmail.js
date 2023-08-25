"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUsersWithPersonalEmail = void 0;
var findUsersWithPersonalEmail = function (users) {
    return users.filter(function (user) { return user.email && !user.email.includes("sydney.edu.au"); });
};
exports.findUsersWithPersonalEmail = findUsersWithPersonalEmail;
