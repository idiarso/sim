# Integrating vue-element-admin with Garuda CBT

This guide explains how to set up and integrate the vue-element-admin frontend framework with the Garuda CBT Node.js backend.

## Overview

[vue-element-admin](https://github.com/PanJiaChen/vue-element-admin) is a production-ready frontend solution for admin interfaces. It's based on Vue.js and uses Element UI. It includes:

- Login/logout with JWT authentication
- Permission validation
- Dynamic sidebar
- Rich text editor
- Excel export/import
- Responsive layout
- Many ready-to-use components

## Setup Instructions

### 1. Clone the vue-element-admin Repository

Create a new directory for the frontend project alongside your backend:

```bash
# Navigate to the parent directory of your backend project
cd c:\AAA\
# Create a directory for the frontend
mkdir garuda-cbt-frontend
cd garuda-cbt-frontend
# Clone vue-element-admin
git clone https://github.com/PanJiaChen/vue-element-admin.git .
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure API Connection

Edit `.env.development` to point to your backend API:

```
# .env.development
VUE_APP_BASE_API = 'http://localhost:3000/api/v1'
```

### 4. Create API Services

Create API service files for each endpoint in `src/api/`. For example:

```javascript
// src/api/teacher-journal.js
import request from '@/utils/request'

export function getTeacherJournals(params) {
  return request({
    url: '/teacher-journals',
    method: 'get',
    params
  })
}

export function createTeacherJournal(data) {
  return request({
    url: '/teacher-journals',
    method: 'post',
    data
  })
}

export function updateTeacherJournal(id, data) {
  return request({
    url: `/teacher-journals/${id}`,
    method: 'put',
    data
  })
}

export function deleteTeacherJournal(id) {
  return request({
    url: `/teacher-journals/${id}`,
    method: 'delete'
  })
}
```

### 5. Adapt Authentication

Modify the authentication system to work with Garuda CBT's JWT authentication:

```javascript
// src/utils/auth.js
import Cookies from 'js-cookie'

const TokenKey = 'garuda_cbt_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
```

Modify the login logic:

```javascript
// src/store/modules/user.js
import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

// Modify the login action to match Garuda CBT's auth API
login({ commit }, userInfo) {
  const { username, password } = userInfo
  return new Promise((resolve, reject) => {
    login({ username: username.trim(), password: password })
      .then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      })
      .catch(error => {
        reject(error)
      })
  })
}
```

### 6. Customize Permission Roles

Adapt the permission system to match Garuda CBT's roles (admin, teacher, student):

```javascript
// src/store/modules/permission.js
// Define role-based routes for Garuda CBT
```

### 7. Create Views for Garuda CBT

Create Vue components for each menu item listed in the CHECKLIST.md file. For example:

```javascript
// src/views/teacher-journal/index.vue
<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- Search and filter controls -->
    </div>
    
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading..."
      border
      fit
      highlight-current-row
    >
      <!-- Table columns for teacher journals -->
      <el-table-column label="Date" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      
      <!-- More columns... -->
      
      <el-table-column label="Actions" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- Pagination -->
    <pagination 
      v-show="total>0" 
      :total="total" 
      :page.sync="listQuery.page" 
      :limit.sync="listQuery.limit" 
      @pagination="getList" 
    />
    
    <!-- Dialog for creating/editing -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px">
        <!-- Form fields -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getTeacherJournals, createTeacherJournal, updateTeacherJournal, deleteTeacherJournal } from '@/api/teacher-journal'
import Pagination from '@/components/Pagination'

export default {
  name: 'TeacherJournal',
  components: { Pagination },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        teacher_id: undefined,
        class_id: undefined,
        subject_id: undefined
      },
      temp: {
        id: undefined,
        teacher_id: '',
        class_id: '',
        subject_id: '',
        date: '',
        start_time: '',
        end_time: '',
        material_topic: '',
        activity_description: '',
        learning_methods: '',
        notes: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: {
        // Form validation rules
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      getTeacherJournals(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.meta.total
        this.listLoading = false
      })
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        teacher_id: '',
        class_id: '',
        subject_id: '',
        date: '',
        start_time: '',
        end_time: '',
        material_topic: '',
        activity_description: '',
        learning_methods: '',
        notes: ''
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createTeacherJournal(this.temp).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row)
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
          updateTeacherJournal(tempData.id, tempData).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
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
        deleteTeacherJournal(row.id).then(() => {
          this.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      })
    }
  }
}
</script>
```

### 8. Update Router Configuration

Add all the new routes in `src/router/index.js`:

```javascript
// src/router/index.js

// Teacher Journal routes
{
  path: '/teacher-journals',
  component: Layout,
  redirect: '/teacher-journals/list',
  name: 'TeacherJournals',
  meta: {
    title: 'Teacher Journals',
    icon: 'edit',
    roles: ['admin', 'teacher']
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/teacher-journal/index'),
      name: 'TeacherJournalList',
      meta: { title: 'Journal List' }
    },
    {
      path: 'create',
      component: () => import('@/views/teacher-journal/create'),
      name: 'CreateTeacherJournal',
      meta: { title: 'Create Journal', roles: ['teacher'] }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/teacher-journal/edit'),
      name: 'EditTeacherJournal',
      meta: { title: 'Edit Journal', noCache: true, roles: ['teacher'] },
      hidden: true
    }
  ]
}

// Add similar route configurations for all Garuda CBT menu items
```

### 9. Update the Main Menu Configuration

Modify the sidebar to match Garuda CBT's menu structure in `src/layout/components/Sidebar/index.vue`.

### 10. Run the Frontend

```bash
npm run dev
```

## Component Development Roadmap

Follow the development order recommended in the CHECKLIST.md file:

1. Authentication and User Management
2. School Profile and System Settings
3. Master Data (Classes, Students, Teachers)
4. Basic Learning Management (Materials, Assignments)
5. Exam Management
6. Report Cards and Grading
7. Attendance and Analytics
8. Specialized Features

## Advanced Integration Features

### File Uploads

Modify the upload component to work with Garuda CBT's file upload endpoints:

```javascript
// src/components/Upload/SingleImage.vue
// Update to work with Garuda CBT API
```

### Rich Text Editor for Learning Materials

```javascript
// src/views/learning-material/components/MaterialEditor.vue
// Implement rich text editor for learning materials
```

### Exam Builder Interface

Create a specialized interface for building exam questions with various question types:

```javascript
// src/views/question-bank/components/QuestionBuilder.vue
// Implement drag-and-drop question builder
```

## Deployment Considerations

When deploying to production:

1. Build the frontend: `npm run build:prod`
2. Serve the built files from the backend or a static file server
3. Update CORS settings in the backend to allow access from the frontend domain

## Resources

- [vue-element-admin Documentation](https://panjiachen.github.io/vue-element-admin-site/)
- [Element UI Components](https://element.eleme.io/#/en-US/component/installation)
- [Vue.js Documentation](https://vuejs.org/guide/introduction.html)
