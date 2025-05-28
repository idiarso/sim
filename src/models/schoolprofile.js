module.exports = (sequelize, DataTypes) => {
  const SchoolProfile = sequelize.define('SchoolProfile', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    npsn: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'National School Identification Number'
    },
    nsm: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'School Statistical Number'
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true
    },
    village: {
      type: DataTypes.STRING,
      allowNull: true
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true
    },
    logo_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    principal_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    principal_id_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    principal_signature_path: {
      type: DataTypes.STRING,
      allowNull: true
    },
    school_type: {
      type: DataTypes.ENUM('SD', 'MI', 'SMP', 'MTs', 'SMA', 'MA', 'SMK', 'other'),
      allowNull: false
    },
    school_status: {
      type: DataTypes.ENUM('public', 'private'),
      allowNull: false,
      defaultValue: 'public'
    },
    foundation_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    accreditation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    decree_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    decree_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    operational_permit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    founded_year: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    land_area: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'In square meters'
    },
    building_area: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'In square meters'
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'school_profiles',
    timestamps: false
  });

  return SchoolProfile;
};
