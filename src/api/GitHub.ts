import axios from 'axios';

class GitHub {
  token: string;

  constructor() {
    this.token = process.env.GITHUB_KEY;
  }

  public async getUsers(since) {
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.github.com/users?since=${since}&per_page=10`,
        headers: {
          Authorization: `token ${this.token}`
        }
      });

      return { status: response.status, data: response.data };
    } catch (err) {
      if (err.response)
        return { status: err.response.status, data: err.response.data };

      if (err.request) return { status: 404, data: err.request };

      return { status: 500, data: err };
    }
  }

  public async getUser(username) {
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.github.com/users/${username}`,
        headers: {
          Authorization: `token ${this.token}`
        }
      });

      return { status: response.status, data: response.data };
    } catch (err) {
      if (err.response)
        return { status: err.response.status, data: err.response.data };

      if (err.request) return { status: 404, data: err.request };

      return { status: 500, data: err };
    }
  }

  public async getRepositoyByUserName(username, page) {
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.github.com/users/${username}/repos?&per_page=10&page=${page}`,
        headers: {
          Authorization: `token ${this.token}`
        }
      });

      return { status: response.status, data: response.data };
    } catch (err) {
      if (err.response)
        return { status: err.response.status, data: err.response.data };

      if (err.request) return { status: 404, data: err.request };

      return { status: 500, data: err };
    }
  }
}

export default new GitHub();
