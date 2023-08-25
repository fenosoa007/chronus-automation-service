"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePersonalEmail = void 0;
var handlePersonalEmail = function (userList) {
    var usersNotFound = [];
    var finalUserList = userList.map(function (user) {
        // retrieve from db
        var identityNowUser = user.email;
        // getFromIdentityNow({
        //    studentId,
        //    firstName,
        //    lastName
        // })
        if (!identityNowUser) {
            usersNotFound.push(user);
        }
    });
    return { finalUserList: finalUserList, usersNotFound: usersNotFound };
};
exports.handlePersonalEmail = handlePersonalEmail;
