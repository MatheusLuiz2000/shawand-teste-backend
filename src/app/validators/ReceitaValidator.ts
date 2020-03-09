import { validate } from 'cnpj';
import * as Yup from 'yup';

export default async (req, res, next) => {
  const { cnpj } = req.body;

  const CadastroSchema = Yup.object().shape({
    cnpj: Yup.string()
      .min(14, 'CNPJ com formato inválido.')
      .max(19, 'CNPJ com tamanhao não permitido')
      .required('Campo CNPJ obrigatório.'),
  });

  CadastroSchema.validate(req.body)
    .then(() => {
      const validarCnpj = validate(cnpj);

      if (!validarCnpj) {
        return res
          .status(400)
          .json({ mensagem: 'CNPJ Incorreto ou Inexistente' });
      }

      return next();
    })
    .catch(err => {
      return res.status(400).json({ mensagem: err.message });
    });
};
