import axios from "axios";

const AIRTABLE_PROXY_URL = "https://staging-rsf-airtable-proxy.herokuapp.com";

const http = axios.create({
  baseURL: AIRTABLE_PROXY_URL
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt');
  if (token === null) {
    return config;
  }
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

class AirtableProxyApi {
  async sendEmailLink (email) {
    const { data } = await http.post(`/email_login_link`, { email });
    return data;
  }

  async login (token) {
    if (!token) {
      return Promise.reject(new Error('Token not found'));
    }
    const { data } = await http.put(`/login`, { token });
    localStorage.setItem('jwt', data.jwt);
  }

  async getMe () {
    const { data } = await http.get('/me');
    return data;
  }

  async listCommunityGroups () {
    const { data } = await http.get(`/community_groups`);
    return data;
  }

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
}

export default new AirtableProxyApi();
