import planningCenter from "../shared/clients/planningCenter";

/**
 * High level API methods to interact with Planning Center.
 */

/**
 * Find a planning center person, based on their phone or email.
 *
 * @param {string} phoneOrEmail   Their phone or email.
 */
export const findPlanningCenterPerson = async (phoneOrEmail) => {
  const [person] = await planningCenter.findPerson({
    where: {
      search_name_or_email_or_phone_number: phoneOrEmail
    }
  });
  if (!person) {
    return null;
  }
  const [emails, phoneNumbers] = await Promise.all([
    planningCenter.listPersonEmail(person.id),
    planningCenter.listPersonPhoneNumber(person.id)
  ])
  return {
    ...person,
    emails,
    phoneNumbers
  };
};

export const createPerson = async ({ firstName, lastName, email, phoneNumber }) => {
  const person = await planningCenter.createPerson({
    first_name: firstName,
    last_name: lastName
  });
  await Promise.all([
    planningCenter.createPersonEmail(person.id, {
      address: email,
      location: 'Home'
    }),
    planningCenter.createPersonPhoneNumber(person.id, {
      number: phoneNumber,
      location: 'Home'
    })
  ]);
}