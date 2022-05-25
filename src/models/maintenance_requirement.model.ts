import { Model, DataTypes } from "sequelize";
import { ConnectionDB } from "../config/database/connection-db.config";

export class RequerimientoMantenimiento extends Model {
  id_requerimiento_mantenimiento!: number;
  periodo!: Date;
  status!: boolean;
  created_at!: Date;
  updated_at!: Date;
}

RequerimientoMantenimiento.init(
  {
    id_requerimiento_mantenimiento: {
      type: DataTypes.DOUBLE,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    periodo: {
      type: DataTypes.DATE,
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
    modelName: "requerimiento_mantenimiento",
    createdAt: false,
    updatedAt: false,
  }
);
