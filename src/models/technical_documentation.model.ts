import { Model, DataTypes } from "sequelize";
import { ConnectionDB } from "../config/database/connection-db.config";

export class DocumentacionTecnica extends Model {
  id_tipo_manual!: number;
  tipo_manual!: string;
  manual!: string;
  codigo!: string;
  status!: boolean;
  created_at!: Date;
  updated_at!: Date;
}

DocumentacionTecnica.init(
  {
    id_tipo_manual: {
      type: DataTypes.DOUBLE,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    tipo_manual: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    manual: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    codigo: {
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
    modelName: "documentacion_tecnica",
    createdAt: false,
    updatedAt: false,
  }
);
