import { Model, DataTypes } from "sequelize";
import { ConnectionDB } from "../config/database/connection-db.config";

export class TipoEquipo extends Model {
  id_tipo_equipo!: number;
  tipo!: string;
  status!: boolean;
  created_at!: Date;
  updated_at!: Date;
}

TipoEquipo.init(
  {
    id_tipo_equipo: {
      type: DataTypes.DOUBLE,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: ConnectionDB.sequelize,
    modelName: "tipo_equipo",
    createdAt: false,
    updatedAt: false,
  }
);