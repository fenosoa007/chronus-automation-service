"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMissingUniKey = void 0;
var handleMissingUniKey = function (userList) {
    var usersNotFound = [];
    var finalUserList = userList.map(function (user) {
        // retrieve from db
        var identityNowUser = user.email;
        // getFromIdentityNow(user.email)
        if (!identityNowUser) {
            usersNotFound.push(user);
        }
    });
    return { finalUserList: finalUserList, usersNotFound: usersNotFound };
};
exports.handleMissingUniKey = handleMissingUniKey;
