module.exports = (sequelize, DataTypes) => {
  const Announcement = sequelize.define('Announcement', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('general', 'exam', 'academic', 'event'),
      allowNull: false,
      defaultValue: 'general'
    },
    target_audience: {
      type: DataTypes.ENUM('all', 'teachers', 'students', 'parents'),
      allowNull: false,
      defaultValue: 'all'
    },
    publish_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    expiry_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_pinned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
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
    tableName: 'announcements',
    timestamps: false
  });

  Announcement.associate = (models) => {
    Announcement.belongsTo(models.User, { foreignKey: 'created_by' });
  };

  return Announcement;
};
