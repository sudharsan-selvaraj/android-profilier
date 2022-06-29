import { AllowNull, Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { v4 as uuid } from 'uuid';

@Table({
  tableName: 'sessions',
  timestamps: true,
  underscored: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
})
export class SessionModal extends Model<SessionModal> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  })
  id!: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.UUIDV4,
    unique: true,
    defaultValue: uuid,
  })
  uuid!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.TEXT,
  })
  name!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.TEXT,
  })
  device_name!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.TEXT,
  })
  device_udid!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.INTEGER,
  })
  device_total_cpu!: number;

  @AllowNull(false)
  @Column({
    type: DataTypes.TEXT,
  })
  device_total_ram!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.TEXT,
  })
  device_version!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.TEXT,
  })
  app_bundle_id!: string;

  @AllowNull(false)
  @Column({
    type: DataTypes.BOOLEAN,
  })
  is_real_device!: boolean;

  @AllowNull(false)
  @Column({
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  })
  completed!: boolean;

  @Column({
    type: DataTypes.DATE,
    defaultValue: false,
  })
  start_time!: Date;

  @Column({
    type: DataTypes.DATE,
    defaultValue: false,
  })
  end_time!: Date;
}
