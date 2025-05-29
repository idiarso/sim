<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>E-Learning</span>
      </div>
      <div class="dashboard-text">
        <p>Selamat datang di panel E-Learning Garuda CBT</p>
        <p>Silakan pilih kategori e-learning yang ingin dikelola dari menu navigasi atau dari daftar di bawah ini.</p>
      </div>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover" class="elearning-card">
            <div slot="header" class="clearfix">
              <span>Jadwal Pelajaran</span>
            </div>
            <div class="card-content">
              <p>Kelola jadwal pelajaran untuk semua kelas</p>
              <el-button type="primary" @click="navigateTo('/schedule')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="elearning-card">
            <div slot="header" class="clearfix">
              <span>Materi</span>
            </div>
            <div class="card-content">
              <p>Kelola materi pembelajaran untuk siswa</p>
              <el-button type="primary" @click="navigateTo('/learning-materials')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="elearning-card">
            <div slot="header" class="clearfix">
              <span>Tugas</span>
            </div>
            <div class="card-content">
              <p>Kelola tugas dan penilaian untuk siswa</p>
              <el-button type="primary" @click="navigateTo('/assignments')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="8">
          <el-card shadow="hover" class="elearning-card">
            <div slot="header" class="clearfix">
              <span>Jadwal Materi/Tugas</span>
            </div>
            <div class="card-content">
              <p>Kelola jadwal publikasi materi dan tugas</p>
              <el-button type="primary" @click="navigateTo('/schedule/materials')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ELearning',
  data() {
    return {
      
    }
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.dashboard-text {
  font-size: 14px;
  line-height: 22px;
  padding-bottom: 20px;
}
.elearning-card {
  height: 180px;
  margin-bottom: 18px;
}
.card-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100px;
}
</style>
