<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Computer-Based Test (CBT)</span>
      </div>
      <div class="dashboard-text">
        <p>Selamat datang di panel Ujian (CBT) Garuda CBT</p>
        <p>Silakan pilih kategori ujian yang ingin dikelola dari menu navigasi atau dari daftar di bawah ini.</p>
      </div>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover" class="exam-card">
            <div slot="header" class="clearfix">
              <span>Jenis Ujian</span>
            </div>
            <div class="card-content">
              <p>Kelola jenis-jenis ujian yang tersedia</p>
              <el-button type="primary" @click="navigateTo('/exam-types')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="exam-card">
            <div slot="header" class="clearfix">
              <span>Sesi</span>
            </div>
            <div class="card-content">
              <p>Kelola sesi ujian dan pembagian waktu</p>
              <el-button type="primary" @click="navigateTo('/exam-sessions')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="exam-card">
            <div slot="header" class="clearfix">
              <span>Ruang</span>
            </div>
            <div class="card-content">
              <p>Kelola ruang ujian dan kapasitas</p>
              <el-button type="primary" @click="navigateTo('/exam-rooms')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="8">
          <el-card shadow="hover" class="exam-card">
            <div slot="header" class="clearfix">
              <span>Atur Ruang dan Sesi</span>
            </div>
            <div class="card-content">
              <p>Kelola pengaturan ruang dan sesi ujian</p>
              <el-button type="primary" @click="navigateTo('/exam-room-sessions')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="exam-card">
            <div slot="header" class="clearfix">
              <span>Atur Nomor Peserta</span>
            </div>
            <div class="card-content">
              <p>Kelola nomor peserta ujian</p>
              <el-button type="primary" @click="navigateTo('/exam-participants')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="exam-card">
            <div slot="header" class="clearfix">
              <span>Bank Soal</span>
            </div>
            <div class="card-content">
              <p>Kelola bank soal dan pertanyaan ujian</p>
              <el-button type="primary" @click="navigateTo('/question-banks')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="8">
          <el-card shadow="hover" class="exam-card">
            <div slot="header" class="clearfix">
              <span>Jadwal</span>
            </div>
            <div class="card-content">
              <p>Kelola jadwal pelaksanaan ujian</p>
              <el-button type="primary" @click="navigateTo('/exam-schedules')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="exam-card">
            <div slot="header" class="clearfix">
              <span>Alokasi Waktu</span>
            </div>
            <div class="card-content">
              <p>Kelola alokasi waktu untuk setiap ujian</p>
              <el-button type="primary" @click="navigateTo('/exam-durations')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="exam-card">
            <div slot="header" class="clearfix">
              <span>Token</span>
            </div>
            <div class="card-content">
              <p>Kelola token akses ujian</p>
              <el-button type="primary" @click="navigateTo('/exam-tokens')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="8">
          <el-card shadow="hover" class="exam-card">
            <div slot="header" class="clearfix">
              <span>Pengumuman</span>
            </div>
            <div class="card-content">
              <p>Kelola pengumuman terkait ujian</p>
              <el-button type="primary" @click="navigateTo('/announcements')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="exam-card">
            <div slot="header" class="clearfix">
              <span>Hasil Ujian</span>
            </div>
            <div class="card-content">
              <p>Lihat dan kelola hasil ujian siswa</p>
              <el-button type="primary" @click="navigateTo('/exam-results')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="exam-card">
            <div slot="header" class="clearfix">
              <span>Analisis Soal</span>
            </div>
            <div class="card-content">
              <p>Analisis kualitas dan tingkat kesulitan soal</p>
              <el-button type="primary" @click="navigateTo('/question-analysis')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ExamDashboard',
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
.exam-card {
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
