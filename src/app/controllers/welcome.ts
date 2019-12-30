// eslint-disable-next-line no-unused-vars
import { Request, Response } from 'express';

class Welcome {
  hello = async (req: Request, res: Response) => {
    const rnd = Math.round(Math.random() * 10);

    // Retorna uma resposta para a requisição
    if (rnd > 5) return res.status(200).json({ msg: 'Hello World' });

    // Simula um erro durante a requisição
    throw new Error('Simulação de erro');
  };
}

export default new Welcome();
