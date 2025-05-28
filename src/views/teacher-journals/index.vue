<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.search"
        placeholder="Search by topic"
        style="width: 200px;"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        :picker-options="pickerOptions"
        @change="handleDateRangeChange"
        class="filter-item"
      />
      <el-select
        v-model="listQuery.class_id"
        placeholder="Class"
        clearable
        style="width: 180px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-select
        v-model="listQuery.subject_id"
        placeholder="Subject"
        clearable
        style="width: 180px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option v-for="item in subjectList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-plus"
        @click="handleCreate"
      >
        Add
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        Export
      </el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Date" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ formatDate(scope.row.date) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Class" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.class ? scope.row.class.name : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Subject" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.subject ? scope.row.subject.name : '' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Time" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ formatTime(scope.row.start_time) }} - {{ formatTime(scope.row.end_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Material Topic" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.material_topic }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Learning Methods" min-width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.learning_methods }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Attendance" width="120" align="center">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div>
              <p>Present: {{ getAttendanceCount(scope.row.id, 'present') }}</p>
              <p>Absent: {{ getAttendanceCount(scope.row.id, 'absent') }}</p>
              <p>Sick: {{ getAttendanceCount(scope.row.id, 'sick') }}</p>
              <p>Permission: {{ getAttendanceCount(scope.row.id, 'permission') }}</p>
            </div>
            <el-button slot="reference" size="mini" type="info" plain>
              View
            </el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{ row }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button type="success" size="mini" @click="handleAttendance(row)">
            Attendance
          </el-button>
          <el-button v-if="row.status != 'deleted'" size="mini" type="danger" @click="handleDelete(row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="150px"
        style="width: 500px; margin-left:50px;"
      >
        <el-form-item label="Date" prop="date">
          <el-date-picker
            v-model="temp.date"
            type="date"
            placeholder="Select date"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="Class" prop="class_id">
          <el-select
            v-model="temp.class_id"
            class="filter-item"
            placeholder="Please select class"
            style="width: 100%"
          >
            <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Subject" prop="subject_id">
          <el-select
            v-model="temp.subject_id"
            class="filter-item"
            placeholder="Please select subject"
            style="width: 100%"
          >
            <el-option v-for="item in subjectList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="Start Time" prop="start_time">
          <el-time-picker
            v-model="temp.start_time"
            format="HH:mm"
            placeholder="Start time"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="End Time" prop="end_time">
          <el-time-picker
            v-model="temp.end_time"
            format="HH:mm"
            placeholder="End time"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="Material Topic" prop="material_topic">
          <el-input v-model="temp.material_topic" />
        </el-form-item>
        <el-form-item label="Activity Description" prop="activity_description">
          <el-input type="textarea" :rows="4" v-model="temp.activity_description" />
        </el-form-item>
        <el-form-item label="Learning Methods" prop="learning_methods">
          <el-input v-model="temp.learning_methods" />
        </el-form-item>
        <el-form-item label="Notes" prop="notes">
          <el-input type="textarea" :rows="2" v-model="temp.notes" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog title="Attendance" :visible.sync="attendanceDialogVisible" width="800px">
      <div v-loading="attendanceLoading">
        <div style="margin-bottom: 20px;">
          <span class="journal-info">
            Class: <strong>{{ currentJournal.class ? currentJournal.class.name : '' }}</strong> |
            Date: <strong>{{ formatDate(currentJournal.date) }}</strong> |
            Topic: <strong>{{ currentJournal.material_topic }}</strong>
          </span>
        </div>
        <el-table
          :data="studentList"
          border
          style="width: 100%"
        >
          <el-table-column label="Student ID" prop="student_number" width="120" align="center" />
          <el-table-column label="Name" prop="name" min-width="150" />
          <el-table-column label="Status" width="180" align="center">
            <template slot-scope="scope">
              <el-select 
                v-model="scope.row.attendance_status" 
                placeholder="Status"
                style="width: 100%"
              >
                <el-option label="Present" value="present" />
                <el-option label="Absent" value="absent" />
                <el-option label="Sick" value="sick" />
                <el-option label="Permission" value="permission" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="Notes" min-width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.notes" placeholder="Notes" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="attendanceDialogVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="saveAttendance">
          Save Attendance
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createJournal, updateJournal, deleteJournal } from '@/api/teacher-journal'
import { fetchClassList } from '@/api/class'
import { fetchSubjectList } from '@/api/subject'
import { fetchStudentsByClass, fetchAttendance, saveAttendance } from '@/api/attendance'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'TeacherJournals',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        search: '',
        class_id: undefined,
        subject_id: undefined,
        start_date: undefined,
        end_date: undefined,
        sort: '+id'
      },
      dateRange: [],
      pickerOptions: {
        shortcuts: [
          {
            text: 'Last week',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Last month',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setMonth(start.getMonth() - 1)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: 'Last 3 months',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setMonth(start.getMonth() - 3)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      classList: [],
      subjectList: [],
      dialogFormVisible: false,
      attendanceDialogVisible: false,
      attendanceLoading: false,
      studentList: [],
      currentJournal: {},
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      temp: {
        id: undefined,
        date: new Date(),
        class_id: undefined,
        subject_id: undefined,
        start_time: new Date(new Date().setHours(8, 0, 0, 0)),
        end_time: new Date(new Date().setHours(9, 30, 0, 0)),
        material_topic: '',
        activity_description: '',
        learning_methods: '',
        notes: ''
      },
      rules: {
        date: [{ required: true, message: 'Date is required', trigger: 'change' }],
        class_id: [{ required: true, message: 'Class is required', trigger: 'change' }],
        subject_id: [{ required: true, message: 'Subject is required', trigger: 'change' }],
        start_time: [{ required: true, message: 'Start time is required', trigger: 'change' }],
        end_time: [{ required: true, message: 'End time is required', trigger: 'change' }],
        material_topic: [{ required: true, message: 'Material topic is required', trigger: 'blur' }],
        activity_description: [{ required: true, message: 'Activity description is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
    this.getClasses()
    this.getSubjects()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    getClasses() {
      fetchClassList().then(response => {
        this.classList = response.data
      })
    },
    getSubjects() {
      fetchSubjectList().then(response => {
        this.subjectList = response.data
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDateRangeChange(value) {
      if (value) {
        this.listQuery.start_date = value[0]
        this.listQuery.end_date = value[1]
      } else {
        this.listQuery.start_date = undefined
        this.listQuery.end_date = undefined
      }
      this.handleFilter()
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        date: new Date(),
        class_id: undefined,
        subject_id: undefined,
        start_time: new Date(new Date().setHours(8, 0, 0, 0)),
        end_time: new Date(new Date().setHours(9, 30, 0, 0)),
        material_topic: '',
        activity_description: '',
        learning_methods: '',
        notes: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createJournal(this.temp).then(response => {
            this.list.unshift(response.data)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Journal created successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateJournal(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Journal updated successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleDelete(row) {
      this.$confirm('This will permanently delete the journal. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        deleteJournal(row.id).then(() => {
          this.$notify({
            title: 'Success',
            message: 'Journal deleted successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        })
      })
    },
    formatDate(date) {
      return parseTime(date, '{y}-{m}-{d}')
    },
    formatTime(time) {
      return parseTime(time, '{h}:{i}')
    },
    handleAttendance(row) {
      this.currentJournal = Object.assign({}, row)
      this.attendanceDialogVisible = true
      this.attendanceLoading = true
      
      // Get students for this class
      fetchStudentsByClass(row.class_id).then(response => {
        this.studentList = response.data.map(student => {
          return {
            ...student,
            attendance_status: 'present',
            notes: ''
          }
        })
        
        // Get existing attendance data if available
        fetchAttendance({
          journal_id: row.id,
          class_id: row.class_id
        }).then(attendanceResponse => {
          if (attendanceResponse.data && attendanceResponse.data.length > 0) {
            // Update student list with existing attendance data
            attendanceResponse.data.forEach(attendance => {
              const studentIndex = this.studentList.findIndex(s => s.id === attendance.student_id)
              if (studentIndex > -1) {
                this.studentList[studentIndex].attendance_status = attendance.status
                this.studentList[studentIndex].notes = attendance.notes
              }
            })
          }
          this.attendanceLoading = false
        }).catch(() => {
          this.attendanceLoading = false
        })
      }).catch(() => {
        this.attendanceLoading = false
        this.$message.error('Failed to load students')
      })
    },
    saveAttendance() {
      const attendanceData = {
        journal_id: this.currentJournal.id,
        attendances: this.studentList.map(student => {
          return {
            student_id: student.id,
            status: student.attendance_status,
            notes: student.notes
          }
        })
      }
      
      this.attendanceLoading = true
      saveAttendance(attendanceData).then(() => {
        this.attendanceLoading = false
        this.attendanceDialogVisible = false
        this.$notify({
          title: 'Success',
          message: 'Attendance saved successfully',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
        this.attendanceLoading = false
        this.$message.error('Failed to save attendance')
      })
    },
    getAttendanceCount(journalId, status) {
      // This would normally be calculated from the attendance data
      // For now, just return a random number for demonstration
      return Math.floor(Math.random() * 10)
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['ID', 'Date', 'Class', 'Subject', 'Start Time', 'End Time', 'Material Topic', 'Learning Methods', 'Activity Description', 'Notes']
        const filterVal = ['id', 'date', 'class_name', 'subject_name', 'start_time', 'end_time', 'material_topic', 'learning_methods', 'activity_description', 'notes']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'teacher-journals'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'date') {
          return this.formatDate(v[j])
        } else if (j === 'start_time' || j === 'end_time') {
          return this.formatTime(v[j])
        } else if (j === 'class_name') {
          return v.class ? v.class.name : ''
        } else if (j === 'subject_name') {
          return v.subject ? v.subject.name : ''
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style scoped>
.filter-container {
  padding-bottom: 10px;
}

.filter-item {
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 10px;
  margin-right: 10px;
}

.journal-info {
  font-size: 14px;
}
</style>
