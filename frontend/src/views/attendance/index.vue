<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Sistem Absensi</span>
      </div>
      <div class="dashboard-text">
        <p>Selamat datang di panel Absensi Garuda CBT</p>
        <p>Silakan pilih kategori absensi yang ingin dikelola dari menu navigasi atau dari daftar di bawah ini.</p>
      </div>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover" class="attendance-card">
            <div slot="header" class="clearfix">
              <span>Kehadiran Harian</span>
            </div>
            <div class="card-content">
              <p>Kelola absensi harian siswa per kelas</p>
              <el-button type="primary" @click="navigateTo('/class-attendance')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="attendance-card">
            <div slot="header" class="clearfix">
              <span>Kehadiran Bulanan</span>
            </div>
            <div class="card-content">
              <p>Lihat dan cetak rekap absensi bulanan</p>
              <el-button type="primary" @click="navigateTo('/class-attendance/monthly')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="attendance-card">
            <div slot="header" class="clearfix">
              <span>Absensi Sholat</span>
            </div>
            <div class="card-content">
              <p>Kelola absensi kegiatan sholat siswa</p>
              <el-button type="primary" @click="navigateTo('/prayer-attendance')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="8">
          <el-card shadow="hover" class="attendance-card">
            <div slot="header" class="clearfix">
              <span>PKL / Magang</span>
            </div>
            <div class="card-content">
              <p>Kelola absensi siswa di tempat PKL</p>
              <el-button type="primary" @click="navigateTo('/pkl-internships')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="attendance-card">
            <div slot="header" class="clearfix">
              <span>Jurnal PKL</span>
            </div>
            <div class="card-content">
              <p>Kelola jurnal kegiatan siswa PKL</p>
              <el-button type="primary" @click="navigateTo('/jurnal-pkl')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="attendance-card">
            <div slot="header" class="clearfix">
              <span>Absensi QR</span>
            </div>
            <div class="card-content">
              <p>Kelola absensi dengan sistem QR Code</p>
              <el-button type="primary" @click="navigateTo('/attendance-qr')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AttendanceDashboard',
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
.attendance-card {
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
