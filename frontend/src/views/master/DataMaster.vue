<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Data Master</span>
      </div>
      <div class="dashboard-text">
        <p>Selamat datang di panel Data Master Garuda CBT</p>
        <p>Silakan pilih kategori data master yang ingin dikelola dari menu navigasi atau dari daftar di bawah ini.</p>
      </div>

      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover" class="master-card">
            <div slot="header" class="clearfix">
              <span>Tahun Pelajaran</span>
            </div>
            <div class="card-content">
              <p>Kelola data tahun pelajaran aktif dan arsip</p>
              <el-button type="primary" @click="navigateTo('/master/academic-years')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="master-card">
            <div slot="header" class="clearfix">
              <span>Jurusan</span>
            </div>
            <div class="card-content">
              <p>Kelola data jurusan dan program keahlian</p>
              <el-button type="primary" @click="navigateTo('/master/departments')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="master-card">
            <div slot="header" class="clearfix">
              <span>Mata Pelajaran</span>
            </div>
            <div class="card-content">
              <p>Kelola data mata pelajaran dan alokasi</p>
              <el-button type="primary" @click="navigateTo('/master/subjects')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="8">
          <el-card shadow="hover" class="master-card">
            <div slot="header" class="clearfix">
              <span>Ekstrakurikuler</span>
            </div>
            <div class="card-content">
              <p>Kelola data kegiatan ekstrakurikuler</p>
              <el-button type="primary" @click="navigateTo('/extracurricular')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="master-card">
            <div slot="header" class="clearfix">
              <span>Siswa</span>
            </div>
            <div class="card-content">
              <p>Kelola data siswa dan informasi pribadi</p>
              <el-button type="primary" @click="navigateTo('/student')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover" class="master-card">
            <div slot="header" class="clearfix">
              <span>Kelas / Rombel</span>
            </div>
            <div class="card-content">
              <p>Kelola data kelas dan rombongan belajar</p>
              <el-button type="primary" @click="navigateTo('/master/classes')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="8">
          <el-card shadow="hover" class="master-card">
            <div slot="header" class="clearfix">
              <span>Guru</span>
            </div>
            <div class="card-content">
              <p>Kelola data guru dan tenaga pendidik</p>
              <el-button type="primary" @click="navigateTo('/master/teachers')">Kelola</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'DataMaster',
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
.master-card {
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
