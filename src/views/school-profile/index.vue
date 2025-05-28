<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>School Profile</span>
      </div>
      
      <el-form v-loading="loading" :model="schoolProfile" :rules="rules" ref="schoolProfileForm" label-position="top">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="school-logo">
              <img v-if="schoolProfile.logoUrl" :src="schoolProfile.logoUrl" class="logo-image" />
              <div v-else class="logo-placeholder">
                <i class="el-icon-picture-outline" />
                <span>No Logo</span>
              </div>
              <div class="upload-btn">
                <el-upload
                  action="#"
                  :http-request="uploadLogo"
                  :show-file-list="false"
                  :before-upload="beforeLogoUpload"
                >
                  <el-button size="small" type="primary">
                    {{ schoolProfile.logoUrl ? 'Change Logo' : 'Upload Logo' }}
                  </el-button>
                </el-upload>
              </div>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="School Name" prop="name">
              <el-input v-model="schoolProfile.name" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="NPSN" prop="npsn">
              <el-input v-model="schoolProfile.npsn" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="NSM" prop="nsm">
              <el-input v-model="schoolProfile.nsm" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Address" prop="address">
              <el-input type="textarea" v-model="schoolProfile.address" :rows="4" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="Village" prop="village">
                  <el-input v-model="schoolProfile.village" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="District" prop="district">
                  <el-input v-model="schoolProfile.district" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="City" prop="city">
                  <el-input v-model="schoolProfile.city" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Province" prop="province">
                  <el-input v-model="schoolProfile.province" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Postal Code" prop="postalCode">
              <el-input v-model="schoolProfile.postalCode" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Phone" prop="phone">
              <el-input v-model="schoolProfile.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Email" prop="email">
              <el-input v-model="schoolProfile.email" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Website" prop="website">
              <el-input v-model="schoolProfile.website" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="School Type" prop="schoolType">
              <el-select v-model="schoolProfile.schoolType" placeholder="Select School Type" style="width: 100%">
                <el-option label="SD - Primary School" value="SD" />
                <el-option label="MI - Islamic Primary School" value="MI" />
                <el-option label="SMP - Junior High School" value="SMP" />
                <el-option label="MTs - Islamic Junior High School" value="MTs" />
                <el-option label="SMA - Senior High School" value="SMA" />
                <el-option label="MA - Islamic Senior High School" value="MA" />
                <el-option label="SMK - Vocational High School" value="SMK" />
                <el-option label="Other" value="other" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="School Status" prop="schoolStatus">
              <el-radio-group v-model="schoolProfile.schoolStatus">
                <el-radio label="public">Public</el-radio>
                <el-radio label="private">Private</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="left">Principal Information</el-divider>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="Principal Name" prop="principalName">
              <el-input v-model="schoolProfile.principalName" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Principal ID Number" prop="principalIdNumber">
              <el-input v-model="schoolProfile.principalIdNumber" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Principal Signature" prop="principalSignaturePath">
              <div class="signature-preview">
                <img v-if="schoolProfile.principalSignatureUrl" :src="schoolProfile.principalSignatureUrl" class="signature-image" />
                <div v-else class="signature-placeholder">
                  <i class="el-icon-edit" />
                  <span>No Signature</span>
                </div>
              </div>
              <el-upload
                action="#"
                :http-request="uploadSignature"
                :show-file-list="false"
                :before-upload="beforeSignatureUpload"
              >
                <el-button size="small" type="primary">
                  {{ schoolProfile.principalSignatureUrl ? 'Change Signature' : 'Upload Signature' }}
                </el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider content-position="left">Additional Information</el-divider>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="Accreditation" prop="accreditation">
              <el-select v-model="schoolProfile.accreditation" placeholder="Select Accreditation" style="width: 100%">
                <el-option label="A" value="A" />
                <el-option label="B" value="B" />
                <el-option label="C" value="C" />
                <el-option label="Not Accredited" value="none" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Foundation Name" prop="foundationName">
              <el-input v-model="schoolProfile.foundationName" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Decree Number" prop="decreeNumber">
              <el-input v-model="schoolProfile.decreeNumber" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Decree Date" prop="decreeDate">
              <el-date-picker 
                v-model="schoolProfile.decreeDate" 
                type="date" 
                placeholder="Select Date"
                style="width: 100%" 
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="Operational Permit" prop="operationalPermit">
              <el-input v-model="schoolProfile.operationalPermit" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Founded Year" prop="foundedYear">
              <el-input-number v-model="schoolProfile.foundedYear" :min="1900" :max="2100" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Land Area (m²)" prop="landArea">
              <el-input-number v-model="schoolProfile.landArea" :precision="2" :step="100" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Building Area (m²)" prop="buildingArea">
              <el-input-number v-model="schoolProfile.buildingArea" :precision="2" :step="50" :min="0" style="width: 100%" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="submitting">Save Profile</el-button>
          <el-button @click="resetForm">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getSchoolProfile, updateSchoolProfile, uploadSchoolLogo, uploadPrincipalSignature } from '@/api/school-profile'

export default {
  name: 'SchoolProfile',
  data() {
    return {
      loading: false,
      submitting: false,
      schoolProfile: {
        name: '',
        npsn: '',
        nsm: '',
        address: '',
        postalCode: '',
        village: '',
        district: '',
        city: '',
        province: '',
        phone: '',
        email: '',
        website: '',
        logoPath: '',
        logoUrl: '',
        principalName: '',
        principalIdNumber: '',
        principalSignaturePath: '',
        principalSignatureUrl: '',
        schoolType: '',
        schoolStatus: 'public',
        foundationName: '',
        accreditation: '',
        decreeNumber: '',
        decreeDate: null,
        operationalPermit: '',
        foundedYear: new Date().getFullYear(),
        landArea: 0,
        buildingArea: 0,
        isActive: true
      },
      rules: {
        name: [{ required: true, message: 'Please enter school name', trigger: 'blur' }],
        address: [{ required: true, message: 'Please enter school address', trigger: 'blur' }],
        city: [{ required: true, message: 'Please enter city', trigger: 'blur' }],
        province: [{ required: true, message: 'Please enter province', trigger: 'blur' }],
        schoolType: [{ required: true, message: 'Please select school type', trigger: 'change' }],
        schoolStatus: [{ required: true, message: 'Please select school status', trigger: 'change' }]
      }
    }
  },
  created() {
    this.fetchSchoolProfile()
  },
  methods: {
    fetchSchoolProfile() {
      this.loading = true
      getSchoolProfile()
        .then(response => {
          const profile = response.data
          
          // Transform backend model to frontend model
          this.schoolProfile = {
            id: profile.id,
            name: profile.name,
            npsn: profile.npsn,
            nsm: profile.nsm,
            address: profile.address,
            postalCode: profile.postal_code,
            village: profile.village,
            district: profile.district,
            city: profile.city,
            province: profile.province,
            phone: profile.phone,
            email: profile.email,
            website: profile.website,
            logoPath: profile.logo_path,
            logoUrl: profile.logo_path ? `${process.env.VUE_APP_BASE_API}/uploads/${profile.logo_path}` : '',
            principalName: profile.principal_name,
            principalIdNumber: profile.principal_id_number,
            principalSignaturePath: profile.principal_signature_path,
            principalSignatureUrl: profile.principal_signature_path ? `${process.env.VUE_APP_BASE_API}/uploads/${profile.principal_signature_path}` : '',
            schoolType: profile.school_type,
            schoolStatus: profile.school_status,
            foundationName: profile.foundation_name,
            accreditation: profile.accreditation,
            decreeNumber: profile.decree_number,
            decreeDate: profile.decree_date ? new Date(profile.decree_date) : null,
            operationalPermit: profile.operational_permit,
            foundedYear: profile.founded_year,
            landArea: profile.land_area,
            buildingArea: profile.building_area,
            isActive: profile.is_active
          }
        })
        .catch(error => {
          console.error('Error fetching school profile:', error)
          this.$message.error('Failed to load school profile')
        })
        .finally(() => {
          this.loading = false
        })
    },
    submitForm() {
      this.$refs.schoolProfileForm.validate(valid => {
        if (valid) {
          this.submitting = true
          
          // Transform frontend model to backend model
          const profileData = {
            id: this.schoolProfile.id,
            name: this.schoolProfile.name,
            npsn: this.schoolProfile.npsn,
            nsm: this.schoolProfile.nsm,
            address: this.schoolProfile.address,
            postal_code: this.schoolProfile.postalCode,
            village: this.schoolProfile.village,
            district: this.schoolProfile.district,
            city: this.schoolProfile.city,
            province: this.schoolProfile.province,
            phone: this.schoolProfile.phone,
            email: this.schoolProfile.email,
            website: this.schoolProfile.website,
            logo_path: this.schoolProfile.logoPath,
            principal_name: this.schoolProfile.principalName,
            principal_id_number: this.schoolProfile.principalIdNumber,
            principal_signature_path: this.schoolProfile.principalSignaturePath,
            school_type: this.schoolProfile.schoolType,
            school_status: this.schoolProfile.schoolStatus,
            foundation_name: this.schoolProfile.foundationName,
            accreditation: this.schoolProfile.accreditation,
            decree_number: this.schoolProfile.decreeNumber,
            decree_date: this.schoolProfile.decreeDate,
            operational_permit: this.schoolProfile.operationalPermit,
            founded_year: this.schoolProfile.foundedYear,
            land_area: this.schoolProfile.landArea,
            building_area: this.schoolProfile.buildingArea,
            is_active: this.schoolProfile.isActive
          }
          
          updateSchoolProfile(profileData)
            .then(response => {
              this.$message.success('School profile updated successfully')
              this.fetchSchoolProfile() // Refresh data
            })
            .catch(error => {
              console.error('Error updating school profile:', error)
              this.$message.error('Failed to update school profile')
            })
            .finally(() => {
              this.submitting = false
            })
        } else {
          this.$message.warning('Please correct the form errors')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.schoolProfileForm.resetFields()
      this.fetchSchoolProfile() // Reload original data
    },
    beforeLogoUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('Logo must be JPG or PNG format!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('Logo size cannot exceed 2MB!')
        return false
      }
      return true
    },
    beforeSignatureUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isJPG && !isPNG) {
        this.$message.error('Signature must be JPG or PNG format!')
        return false
      }
      if (!isLt1M) {
        this.$message.error('Signature size cannot exceed 1MB!')
        return false
      }
      return true
    },
    uploadLogo(options) {
      const formData = new FormData()
      formData.append('logo', options.file)
      
      this.loading = true
      uploadSchoolLogo(formData)
        .then(response => {
          this.schoolProfile.logoPath = response.data.logo_path
          this.schoolProfile.logoUrl = `${process.env.VUE_APP_BASE_API}/uploads/${response.data.logo_path}`
          this.$message.success('Logo uploaded successfully')
        })
        .catch(error => {
          console.error('Error uploading logo:', error)
          this.$message.error('Failed to upload logo')
        })
        .finally(() => {
          this.loading = false
        })
    },
    uploadSignature(options) {
      const formData = new FormData()
      formData.append('signature', options.file)
      
      this.loading = true
      uploadPrincipalSignature(formData)
        .then(response => {
          this.schoolProfile.principalSignaturePath = response.data.signature_path
          this.schoolProfile.principalSignatureUrl = `${process.env.VUE_APP_BASE_API}/uploads/${response.data.signature_path}`
          this.$message.success('Signature uploaded successfully')
        })
        .catch(error => {
          console.error('Error uploading signature:', error)
          this.$message.error('Failed to upload signature')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
}

.school-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  
  .logo-image {
    width: 150px;
    height: 150px;
    object-fit: contain;
    margin-bottom: 10px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 5px;
  }
  
  .logo-placeholder {
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f7fa;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
    margin-bottom: 10px;
    
    i {
      font-size: 40px;
      color: #909399;
      margin-bottom: 10px;
    }
    
    span {
      color: #909399;
    }
  }
}

.signature-preview {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  
  .signature-image {
    max-width: 150px;
    max-height: 60px;
    object-fit: contain;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 5px;
  }
  
  .signature-placeholder {
    width: 150px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f5f7fa;
    border: 1px dashed #dcdfe6;
    border-radius: 4px;
    
    i {
      font-size: 20px;
      color: #909399;
      margin-bottom: 5px;
    }
    
    span {
      color: #909399;
      font-size: 12px;
    }
  }
}
</style>
