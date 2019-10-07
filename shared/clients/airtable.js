import http from "./http";

/**
 * @typedef {Object} Attendance
 * @property {string} `Record ID`           The record id
 * @property {string} `Date of Attendance`  The date of attendance
 * @property {string[]} `Person`            The people in attendance.
 */

/**
 * A client that interacts with Airtable records, through our backend proxy.
 */
class Airtable {
  /**
   * List all community groups. This will only return groups that this user is a leader of.
   */
  async listCommunityGroups() {
    const { data } = await http.get(`/airtable/community_groups`);
    return data;
  }

  /**
   * Updates Community Group details.
   */
  async updateCommunityGroup(group) {
    const { data } = await http.put(`/airtable/community_groups/${group['Record ID']}`, group);
    return data;
  }

  async listNeighborhoods() {
    const { data } = await http.get(`/airtable/neighborhoods`);
    return data;
  }

  async createPerson(person) {
    const { data } = await http.post(`/airtable/people`, person);
    return data;
  }

  /**
   * Find a person by email or phone number.
   *
   * @param {object} params 
   * @param {string=} params.Email
   * @param {string=} params['Phone Number']
   * @param {string=} params['Planning Center ID']
   */
  async findPerson(params) {
    const { data } = await http.get(`/airtable/people`, { params });
    return data;
  }

  async updatePerson(person) {
    const { data } = await http.put(`/airtable/people/${person['Record ID']}`, person);
    return data;
  }

  /**
   * Create an attendance
   *
   * @param {Attendance} params                 Array of Person record id's.
   */
  async createAttendance(params) {
    const { data } = await http.post(`/airtable/attendance`, params);
    return data;
  }

  /**
   * Find an attendance.
   *
   * @param {object} params
   * @param {string} params['Date of Attendance']     The date of attendance.
   */
  async findAttendance(params) {
    const { data } = await http.get(`/airtable/attendance`, { params });
    return data;
  }

  /**
   * Update an attendance.
   *
   * @param {Attendance} attendance
   */
  async updateAttendance(attendance) {
    const { data } = await http.put(`/airtable/attendance/${attendance['Record ID']}`, attendance);
    return data;
  }
}

export default new Airtable();
