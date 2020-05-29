import axios from 'axios';

export default async function receita(cnpj) {
  cnpj = cnpj.replace(/\D/gm, '');
  try {
    const response = await axios({
      method: 'get',
      url: `https://www.receitaws.com.br/v1/cnpj/${cnpj}/days/30`,
      headers: {
        Authorization: `Bearer ac4c6cd88befb569350b22b3112ef27f48e732f101cd2c14e0bf8b26e9dd6b8c`
      }
    });

    return { status: response.status, data: response.data };
  } catch (err) {
    if (err.response)
      return { status: err.response.status, data: err.response.data };

    if (err.request) return { status: 303, data: err.request };

    return { status: 500, data: err };
  }
}
