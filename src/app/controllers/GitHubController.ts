import { Request, Response } from 'express';
import GitHub from '../../api/GitHub';
import urlUsers from '../helpers/urlUsers';

class GitHubController {
  listUsers = async (req, res) => {
    const { query } = req;

    if (!query.since || isNaN(query.since)) {
      return res.status(400).json('Since must have a number');
    }

    const get = await GitHub.getUsers(query.since);

    return res.status(get.status).json({
      data: get.data,
      link: urlUsers(parseInt(query.since, 10) + 1)
    });
  };

  listUser = async (req, res) => {
    const { params } = req;

    const get = await GitHub.getUser(params.username);

    return res.status(get.status).json(get.data);
  };

  listRepository = async (req, res) => {
    const { query, params } = req;

    const get = await GitHub.getRepositoyByUserName(
      params.username,
      query.page
    );

    return res.status(get.status).json(get.data);
  };
}

export default new GitHubController();
