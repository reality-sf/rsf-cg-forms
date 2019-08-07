import airtable from "../shared/clients/airtable";
import _ from "lodash";

const getOrCreatePerson = async (person, emailOrPhone) => {
  const [airtablePerson] = await airtable.findPerson({ Email: emailOrPhone, 'Phone Number': emailOrPhone });
  if (airtablePerson) {
    return airtablePerson;
  }
  const extraDetails = emailOrPhone.indexOf('@') > -1 ? 'Email' : 'Phone Number';
  const createdPerson = await airtable.createPerson({
    'First Name': person.attributes.first_name,
    'Last Name': person.attributes.last_name,
    [extraDetails]: emailOrPhone
  });
  return createdPerson;
};

const getOrCreateAttendance = async () => {
  const [today] = new Date().toISOString().split('T');
  const [attendance] = await airtable.findAttendance({ 'Date of Attendance': today });
  if (attendance) {
    return attendance;
  }
  const created = await airtable.createAttendance({ 'Date of Attendance': today, 'Person': [] });
  return created;
};

/**
 * Given a person record from Planning Center, mark attendance for this newcomer.
 *
 * @param {*} person                The person record returned from Planning Center.
 * @param {string} phonerOrEmail    The phone number or email address belonging to this person.
 */
const markAttendance = async (person, phonerOrEmail) => {
  const attendance = await getOrCreateAttendance();
  const airtablePerson = await getOrCreatePerson(person, phonerOrEmail);
  await airtable.updateAttendance({
    ...attendance,
    'Person': _.uniq([
      ...(attendance.Person || []),
      airtablePerson['Record ID']
    ])
  });
};

export default markAttendance;
