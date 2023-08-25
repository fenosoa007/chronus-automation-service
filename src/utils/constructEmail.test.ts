import { constructEmail } from "./constructEmail";

describe('constructEmail', () => {
  test('should construct email with no missing users', () => {
    const uniKeyMissing = [];
    const personalEmailMissing = [];
    const expectedSubject = '0 users requiring manual processing';
    const expectedBody = 'Users for manual processing:\n\n';

    const { constructedSubject, constructedBody } = constructEmail(uniKeyMissing, personalEmailMissing);

    expect(constructedSubject).toBe(expectedSubject);
    expect(constructedBody).toBe(expectedBody);
  });

  test('should construct email with missing uni key users', () => {
    const uniKeyMissing = [
      { name: 'User 1', email: 'user1@example.com' },
      { name: 'User 2', email: 'user2@example.com' },
    ];
    const personalEmailMissing = [];
    const expectedSubject = '2 users requiring manual processing';
    const expectedBody =
      'Users for manual processing:\n\nMissing uni key:\n- User 1 (user1@example.com)\n- User 2 (user2@example.com)\n\n';

    const { constructedSubject, constructedBody } = constructEmail(uniKeyMissing, personalEmailMissing);

    expect(constructedSubject).toBe(expectedSubject);
    expect(constructedBody).toBe(expectedBody);
  });

  test('should construct email with missing personal email users', () => {
    const uniKeyMissing = [];
    const personalEmailMissing = [
      { name: 'User 3', email: 'user3@example.com' },
      { name: 'User 4', email: 'user4@example.com' },
    ];
    const expectedSubject = '2 users requiring manual processing';
    const expectedBody =
      'Users for manual processing:\n\nPersonal email missing:\n- User 3 (user3@example.com)\n- User 4 (user4@example.com)\n\n';

    const { constructedSubject, constructedBody } = constructEmail(uniKeyMissing, personalEmailMissing);

    expect(constructedSubject).toBe(expectedSubject);
    expect(constructedBody).toBe(expectedBody);
  });

  test('should construct email with missing uni key and personal email users', () => {
    const uniKeyMissing = [
      { name: 'User 5', email: 'user5@example.com' },
    ];
    const personalEmailMissing = [
      { name: 'User 6', email: 'user6@example.com' },
    ];
    const expectedSubject = '2 users requiring manual processing';
    const expectedBody =
      'Users for manual processing:\n\nMissing uni key:\n- User 5 (user5@example.com)\n\nPersonal email missing:\n- User 6 (user6@example.com)\n\n';

    const { constructedSubject, constructedBody } = constructEmail(uniKeyMissing, personalEmailMissing);

    expect(constructedSubject).toBe(expectedSubject);
    expect(constructedBody).toBe(expectedBody);
  });
});
