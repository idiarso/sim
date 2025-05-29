<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <h1>Selamat Datang di Garuda CBT</h1>
      <p>Sistem Manajemen Sekolah dan Computer-Based Test</p>
    </div>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="hover" class="dashboard-card">
          <div slot="header" class="clearfix">
            <span>Data Siswa</span>
          </div>
          <div class="card-panel-icon-wrapper">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Total Siswa</div>
            <count-to :start-val="0" :end-val="totalStudents" :duration="2600" class="card-panel-num" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="hover" class="dashboard-card">
          <div slot="header" class="clearfix">
            <span>Data Guru</span>
          </div>
          <div class="card-panel-icon-wrapper">
            <svg-icon icon-class="user" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Total Guru</div>
            <count-to :start-val="0" :end-val="totalTeachers" :duration="2600" class="card-panel-num" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="hover" class="dashboard-card">
          <div slot="header" class="clearfix">
            <span>Data Kelas</span>
          </div>
          <div class="card-panel-icon-wrapper">
            <svg-icon icon-class="tree" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Total Kelas</div>
            <count-to :start-val="0" :end-val="totalClasses" :duration="2600" class="card-panel-num" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="hover" class="dashboard-card">
          <div slot="header" class="clearfix">
            <span>Ujian Aktif</span>
          </div>
          <div class="card-panel-icon-wrapper">
            <svg-icon icon-class="form" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">Ujian Hari Ini</div>
            <count-to :start-val="0" :end-val="activeExams" :duration="2600" class="card-panel-num" />
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>Jadwal Ujian Mendatang</span>
          </div>
          <el-table :data="upcomingExams" style="width: 100%" v-loading="loading">
            <el-table-column prop="exam_name" label="Nama Ujian" />
            <el-table-column prop="subject" label="Mata Pelajaran" />
            <el-table-column prop="date" label="Tanggal" />
            <el-table-column prop="time" label="Waktu" />
            <el-table-column prop="status" label="Status">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 'Siap' ? 'success' : 'warning'">
                  {{ scope.row.status }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>Aktivitas Terbaru</span>
          </div>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in recentActivities"
              :key="index"
              :timestamp="activity.timestamp"
              :type="activity.type"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header" class="clearfix">
            <span>Menu Cepat</span>
          </div>
          <el-row :gutter="20">
            <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4" v-for="(menu, index) in quickMenus" :key="index">
              <div class="quick-menu-item" @click="navigateTo(menu.path)">
                <svg-icon :icon-class="menu.icon" class-name="quick-menu-icon" />
                <div class="quick-menu-text">{{ menu.title }}</div>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  name: 'Dashboard',
  components: {
    CountTo
  },
  data() {
    return {
      loading: false,
      totalStudents: 1250,
      totalTeachers: 85,
      totalClasses: 42,
      activeExams: 3,
      upcomingExams: [
        {
          exam_name: 'Ujian Tengah Semester',
          subject: 'Matematika',
          date: '2025-06-15',
          time: '08:00 - 10:00',
          status: 'Siap'
        },
        {
          exam_name: 'Ujian Tengah Semester',
          subject: 'Bahasa Indonesia',
          date: '2025-06-15',
          time: '10:30 - 12:30',
          status: 'Siap'
        },
        {
          exam_name: 'Ujian Tengah Semester',
          subject: 'Bahasa Inggris',
          date: '2025-06-16',
          time: '08:00 - 10:00',
          status: 'Persiapan'
        },
        {
          exam_name: 'Ujian Tengah Semester',
          subject: 'IPA',
          date: '2025-06-16',
          time: '10:30 - 12:30',
          status: 'Persiapan'
        }
      ],
      recentActivities: [
        {
          content: 'Admin menambahkan jadwal ujian baru',
          timestamp: '2025-05-28 14:30',
          type: 'primary'
        },
        {
          content: 'Guru Matematika mengupload materi baru',
          timestamp: '2025-05-28 11:20',
          type: 'success'
        },
        {
          content: 'Siswa kelas XII-A telah menyelesaikan ujian',
          timestamp: '2025-05-28 10:15',
          type: 'info'
        },
        {
          content: 'Admin memperbarui data siswa',
          timestamp: '2025-05-27 16:45',
          type: 'warning'
        },
        {
          content: 'Guru BK menambahkan catatan konseling',
          timestamp: '2025-05-27 13:30',
          type: 'success'
        }
      ],
      quickMenus: [
        { title: 'Data Master', icon: 'documentation', path: '/master' },
        { title: 'Jadwal Pelajaran', icon: 'table', path: '/schedule' },
        { title: 'Bank Soal', icon: 'form', path: '/question-banks' },
        { title: 'Jadwal Ujian', icon: 'calendar', path: '/exam-schedules' },
        { title: 'Kehadiran', icon: 'peoples', path: '/attendance' },
        { title: 'Nilai', icon: 'chart', path: '/grades' },
        { title: 'Materi', icon: 'education', path: '/learning-materials' },
        { title: 'Tugas', icon: 'clipboard', path: '/assignments' }
      ]
    }
  },
  created() {
    // Fetch data from API when component is created
    this.fetchDashboardData()
  },
  methods: {
    fetchDashboardData() {
      // In a real implementation, this would fetch data from the API
      this.loading = true
      setTimeout(() => {
        // Simulate API response
        this.loading = false
      }, 1000)
    },
    navigateTo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    text-align: center;
    margin-bottom: 30px;
  }
}

.dashboard-card {
  height: 108px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
  border-color: rgba(0, 0, 0, .05);
  
  &:hover {
    .card-panel-icon-wrapper {
      color: #fff;
    }
    .icon-people {
      background: #40c9c6;
    }
    .icon-message {
      background: #36a3f7;
    }
    .icon-money {
      background: #f4516c;
    }
    .icon-shopping {
      background: #34bfa3;
    }
  }
}

.card-panel-icon-wrapper {
  float: left;
  margin: 14px 0 0 14px;
  padding: 16px;
  transition: all 0.38s ease-out;
  border-radius: 6px;
}

.card-panel-icon {
  float: left;
  font-size: 48px;
}

.card-panel-description {
  float: right;
  font-weight: bold;
  margin: 26px 26px 0 0;
  
  .card-panel-text {
    line-height: 18px;
    color: rgba(0, 0, 0, 0.45);
    font-size: 16px;
    margin-bottom: 12px;
  }
  
  .card-panel-num {
    font-size: 20px;
  }
}

.quick-menu-item {
  text-align: center;
  padding: 15px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;
  
  &:hover {
    background-color: #f5f7fa;
  }
  
  .quick-menu-icon {
    font-size: 32px;
    margin-bottom: 8px;
  }
  
  .quick-menu-text {
    font-size: 14px;
  }
}
</style>
