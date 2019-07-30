import http from "./http";

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
}

export default new Airtable();
