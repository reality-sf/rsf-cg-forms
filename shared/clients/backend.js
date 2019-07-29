import axios from "axios";
import qs from "qs";

// const BACKEND_URL = "https://staging-rsf-airtable-proxy.herokuapp.com";
const BACKEND_URL = "http://localhost:3050";

const http = axios.create({
  baseURL: BACKEND_URL,
  paramsSerializer: (params) => qs.stringify(params)
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token === null) {
    return config;
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/**
 * The backend for managing community group interaction.
 */
class BackendApi {

  /**
   * Sends the user an email containing a login link back to the community group management form. This is meant for
   * Community Group leaders to be able to manage their groups.
   *
   * @param {string} email 
   */
  async sendEmailLink (email) {
    const { data } = await http.post(`/email_login_link`, { email });
    return data;
  }

  /**
   * The login link generates a one-time-use token that must be exchanged for a JSON Web Token (JWT). The JWT is used
   * as the authentication header.
   *
   * @param {string} token  The one-time-use token
   */
  async login (token) {
    if (!token) {
      return Promise.reject(new Error('Token not found'));
    }
    const { data } = await http.put(`/login`, { token });
    localStorage.setItem('jwt', data.jwt);
  }

  /**
   * Return the current user. This returns successfully if:
   * 1. There is a JSON Web Token present in localStorage
   * 2. The JWT is valid (not expired, signed correctly, not malformed)
   */
  async getMe () {
    const { data } = await http.get('/me');
    return data;
  }

  /**
   * List all community groups. This will only return groups that this user is a leader of.
   */
  async listCommunityGroups () {
    const { data } = await http.get(`/community_groups`);
    return data;
  }

  /**
   * Updates Community Group details.
   */
  async updateCommunityGroup (group) {
    const { data } = await http.put(`/community_groups/${group['Record ID']}`, group);
    return data;
  }

  async listNeighborhoods () {
    const { data } = await http.get(`/neighborhoods`);
    return data;
  }

  async getConfigs () {
    const { data } = await http.get('/configs');
    return data;
  }

  async findPerson (params) {
    const { data } = await http.get('/planning_center/people', { params });
    return data;
  }
}

export default new BackendApi();
