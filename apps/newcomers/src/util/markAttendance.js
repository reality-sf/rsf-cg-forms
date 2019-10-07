import airtable from "../shared/clients/airtable";
import _ from "lodash";

/**
 * Update a person's details, unless their first name, last name and email already match.
 */
const updatePersonIfNeeded = async (airtablePerson, planningCenterPerson) => {
  if (airtablePerson['First Name'] === planningCenterPerson.attributes.first_name &&
    airtablePerson['Last Name'] === planningCenterPerson.attributes.last_name &&
    airtablePerson['Email'] === planningCenterPerson.emails[0].attributes.address) {
      return;
  }
  await airtable.updatePerson({
    ...airtablePerson,
    'First Name': planningCenterPerson.attributes.first_name,
    'Last Name': planningCenterPerson.attributes.last_name,
    'Email': planningCenterPerson.emails[0].attributes.address
  });
}

const getOrCreatePerson = async (planningCenterPerson) => {
  const [airtablePerson] = await airtable.findPerson({ 'Planning Center ID': planningCenterPerson.id });
  if (airtablePerson) {
    return airtablePerson;
  }
  const createdPerson = await airtable.createPerson({
    'First Name': planningCenterPerson.attributes.first_name,
    'Last Name': planningCenterPerson.attributes.last_name,
    'Email': planningCenterPerson.emails[0].attributes.address,
    'Planning Center ID': planningCenterPerson.id
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
 * Given a person record from Planning Center, mark attendance for this newcomer. This will upsert a person into
 * airtable if they don't already exist.
 *
 * @param {*} planningCenterPerson                The person record returned from Planning Center.
 * @param {string} email            The email address belonging to this person.
 */
const markAttendance = async (planningCenterPerson, email) => {
  const attendance = await getOrCreateAttendance();
  const airtablePerson = await getOrCreatePerson(planningCenterPerson, email);
  // Update this person in case any details don't match
  await updatePersonIfNeeded(airtablePerson, planningCenterPerson);
  await airtable.updateAttendance({
    ...attendance,
    'Person': _.uniq([
      ...(attendance.Person || []),
      airtablePerson['Record ID']
    ])
  });
};

export default markAttendance;
