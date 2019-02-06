import axios from "axios";

const AIRTABLE_PROXY_URL = "https://rsf-airtable-proxy.herokuapp.com";

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
    const { data } = await http.put(`/login`);
    localStorage.setItem('jwt', data.jwt);
  }

  async getMe () {
    const { data } = await http.get('/me');
    return data;
  }
}

export default new AirtableProxyApi();
