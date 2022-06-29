import {
  Model,
  Table,
  AllowNull,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { DataTypes, Op } from 'sequelize';
import { SessionModal } from './sessions';

@Table({
  tableName: 'profiling',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
class Profiling extends Model<Profiling> {
  @AllowNull(false)
  @Column({
    type: DataTypes.STRING,
  })
  @ForeignKey(() => SessionModal)
  session_id!: number;

  @Column({
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataTypes.STRING,
  })
  cpu!: string;

  @Column({
    type: DataTypes.STRING,
  })
  memory!: string;

  @Column({
    type: DataTypes.STRING,
  })
  total_cpu_used!: string;

  @Column({
    type: DataTypes.STRING,
  })
  total_memory_used!: string;

  @Column({
    type: DataTypes.STRING,
  })
  raw_cpu_log!: string;

  @Column({
    type: DataTypes.STRING,
  })
  raw_memory_log!: string;

  @Column({
    type: DataTypes.DATE,
  })
  timestamp!: Date;

  @BelongsTo(() => SessionModal, { foreignKey: 'id' })
  session!: SessionModal;
}

export { Profiling };
