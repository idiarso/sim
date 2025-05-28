const db = require('../models');
const SchoolProfile = db.SchoolProfile;

// Get school profile
exports.getProfile = async (req, res) => {
  try {
    // There should only be one active school profile in the system
    const schoolProfile = await SchoolProfile.findOne({
      where: { is_active: true }
    });
    
    if (!schoolProfile) {
      return res.status(404).json({
        success: false,
        message: 'School profile not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'School profile retrieved successfully',
      data: schoolProfile
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve school profile',
      error: error.message
    });
  }
};

// Create school profile
exports.createProfile = async (req, res) => {
  try {
    // Check if an active profile already exists
    const existingProfile = await SchoolProfile.findOne({
      where: { is_active: true }
    });
    
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: 'An active school profile already exists'
      });
    }
    
    const schoolProfile = await SchoolProfile.create(req.body);
    
    return res.status(201).json({
      success: true,
      message: 'School profile created successfully',
      data: schoolProfile
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create school profile',
      error: error.message
    });
  }
};

// Update school profile
exports.updateProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await SchoolProfile.update(req.body, {
      where: { id: id }
    });
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `School profile with id ${id} not found`
      });
    }
    
    const updatedProfile = await SchoolProfile.findByPk(id);
    
    return res.status(200).json({
      success: true,
      message: 'School profile updated successfully',
      data: updatedProfile
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update school profile',
      error: error.message
    });
  }
};

// Upload school logo
exports.uploadLogo = async (req, res) => {
  try {
    // This would handle the file upload logic
    // In a real implementation, you would process the uploaded file
    // and save the file path to the database
    
    const id = req.params.id;
    const logoPath = req.file ? req.file.path : null;
    
    if (!logoPath) {
      return res.status(400).json({
        success: false,
        message: 'No logo file uploaded'
      });
    }
    
    const [updated] = await SchoolProfile.update(
      { logo_path: logoPath },
      { where: { id: id } }
    );
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `School profile with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'School logo uploaded successfully',
      data: { logo_path: logoPath }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to upload school logo',
      error: error.message
    });
  }
};

// Upload principal signature
exports.uploadSignature = async (req, res) => {
  try {
    // This would handle the file upload logic
    // In a real implementation, you would process the uploaded file
    // and save the file path to the database
    
    const id = req.params.id;
    const signaturePath = req.file ? req.file.path : null;
    
    if (!signaturePath) {
      return res.status(400).json({
        success: false,
        message: 'No signature file uploaded'
      });
    }
    
    const [updated] = await SchoolProfile.update(
      { principal_signature_path: signaturePath },
      { where: { id: id } }
    );
    
    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `School profile with id ${id} not found`
      });
    }
    
    return res.status(200).json({
      success: true,
      message: 'Principal signature uploaded successfully',
      data: { principal_signature_path: signaturePath }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to upload principal signature',
      error: error.message
    });
  }
};
