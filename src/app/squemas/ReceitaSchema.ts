import mongoose from 'mongoose';
import { Json } from 'sequelize/types/lib/utils';

const Receita = new mongoose.Schema(
  {
    cliente_id: {
      type: Number
    },
    json_receita: {
      type: Object
    },
  },
  {
    timestamps: true
  }
);

export default Receita;
