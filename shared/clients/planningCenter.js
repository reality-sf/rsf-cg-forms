import http from "./http";

/**
 * A client that interacts with Planning Center, through our backend proxy.
 */
class PlanningCenter {

  async findPerson(params) {
    const { data } = await http.get('/planning_center/people', { params });
    return data;
  }

  /**
   * Create a person.
   *
   * @param {object} payload 
   * @param {string=} payload.given_name
   * @param {string=} payload.first_name
   * @param {string=} payload.nickname
   * @param {string=} payload.middle_name
   * @param {string=} payload.last_name
   * @param {string=} payload.birthdate
   * @param {string=} payload.anniversary
   * @param {string=} payload.gender
   * @param {string=} payload.grade
   * @param {string=} payload.child
   * @param {string=} payload.school_type
   * @param {string=} payload.graduation_year
   * @param {string=} payload.site_administrator
   * @param {string=} payload.accounting_administrator
   * @param {string=} payload.people_permissions
   * @param {string=} payload.membership
   * @param {string=} payload.inactivated_at
   * @param {string=} payload.status
   * @param {string=} payload.medical_notes
   * @param {string=} payload.avatar
   * @param {string=} payload.primary_campus_id
   * @param {string=} payload.remote_id
   */
  async createPerson(payload) {
    const { data } = await http.post('/planning_center/people', payload);
    return data;
  }

  /**
   * Create an email address, belonging to a person
   *
   * @param {string} personId
   * @param {object} payload
   * @param {string} payload.address
   * @param {string=} payload.location
   * @param {boolean=} payload.primary
   */
  async createPersonEmail(personId, payload) {
    const { data } = await http.post(`/planning_center/people/${personId}/email`, payload);
    return data;
  }

  /**
   * List email addresses for a person.
   *
   * @param {string} personId 
   */
  async listPersonEmail(personId) {
    const { data } = await http.get(`/planning_center/people/${personId}/email`);
    return data;
  }

  /**
   * Create a phone number, belonging to a person
   *
   * @param {string} personId 
   * @param {object} payload
   * @param {string} payload.number
   * @param {string=} payload.carrier
   * @param {string=} payload.location
   * @param {string=} payload.primary
   */
  async createPersonPhoneNumber(personId, payload) {
    const { data } = await http.post(`/planning_center/people/${personId}/phone_numbers`, payload);
    return data;
  }


  /**
   * List phone numbers for a person.
   *
   * @param {string} personId
   */
  async listPersonPhoneNumber(personId) {
    const { data } = await http.get(`/planning_center/people/${personId}/phone_numbers`);
    return data;
  }
}

export default new PlanningCenter();
