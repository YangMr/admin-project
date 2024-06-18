<script lang="ts" setup>
import type { List, SearchUserParamsType } from '@/api/types/userType'
import { getUserList } from '@/api/user.ts'
import Dialog from './components/dialog.vue'
import dayjs from 'dayjs'

const searchForm = reactive<SearchUserParamsType>({
  username: '',
  pageNum: 1,
  pageSize: 10
})

const tableData = ref<List[]>([])
const total = ref<number>(0)

const initUserList = async () => {
  try {
    const res = await getUserList(searchForm)
    tableData.value = res.data.list
    total.value = res.data.total
  } catch (error) {
    console.log(error)
  }
}
initUserList()

const formatTime = (value: number | string | Date) => {
  return dayjs(value).format('YYYY-MM-DD HH:mm')
}

const handleSizeChange = (value: number) => {
  searchForm.pageSize = value
  initUserList()
}
const handleCurrentChange = (value: number) => {
  searchForm.pageNum = value
  initUserList()
}
const handleSearch = () => {
  initUserList()
}

const dialogRef = ref<InstanceType<typeof Dialog>>()

const handleAdd = () => {
  dialogRef.value?.openDialog({
    type: 'add',
    title: '新增用户'
  })
}
const handleEdit = (row: List) => {
  dialogRef.value?.openDialog({
    type: 'edit',
    title: '编辑用户',
    row
  })
}

const handleRefresh = () => {
  initUserList()
}
</script>
<template>
  <div class="user-wrapper">
    <el-card class="search">
      <el-form inline :model="searchForm" ref="searchFormRef">
        <el-form-item>
          <el-input v-model="searchForm.username" placeholder="输入姓名搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-table :data="tableData">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="username" label="用户姓名"></el-table-column>
        <el-table-column prop="id" label="用户id"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column prop="gender" label="性别">
          <template #default="{ row }">
            {{ row.gender === 1 ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="150"></el-table-column>
        <el-table-column prop="province" label="城市"></el-table-column>
        <el-table-column prop="school" label="学校"></el-table-column>
        <el-table-column prop="grade" label="年级"></el-table-column>
        <el-table-column prop="type" label="账号类型">
          <template #default="{ row }">
            {{ row.type === 1 ? '个人' : '机构' }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="账号状态">
          <template #default="{ row }">
            {{ row.status === 1 ? '启用' : '停用' }}
          </template>
        </el-table-column>
        <el-table-column label="机构企业">
          <template #default="{ row }">
            {{ row.firm.name }}
          </template>
        </el-table-column>
        <el-table-column prop="role" label="所属角色">
          <template #default="{ row }">
            {{ row.role.remark }}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="200">
          <template #default="{ row }">
            {{ formatTime(row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template #default="scope">
            <div>
              <el-button type="primary" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button type="danger">删除</el-button>
            </div>
            <div class="btn-group" style="margin-top: 10px">
              <el-button type="primary">重置密码</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div class="footer">
        <el-pagination
          v-model:current-page="searchForm.pageNum"
          v-model:page-size="searchForm.pageSize"
          background
          layout="prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <Dialog ref="dialogRef" @refresh="handleRefresh" />
  </div>
</template>

<style scoped lang="scss">
.user-wrapper {
  .search {
    margin-bottom: 20px;
  }

  .el-form-item {
    margin-bottom: 0;
  }
  .footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
