<script lang="ts" setup>
import BaseTable from '@/components/Table/index.vue'
import { columnOptions } from './config/index'
import { getRoleList } from '@/api/role'
import type { ListType, RoleParamsType } from '@/api/types/roleType'
import { formatTime } from '@/utils/formatTime'
const tableData = ref<ListType[]>([])
const total = ref<number>(0)

const roleSearchParams = reactive<RoleParamsType>({
  pageNum: 1,
  pageSize: 10
})

const initRoleList = async () => {
  try {
    const res = await getRoleList(roleSearchParams)
    console.log('Res=>', res)
    tableData.value = res.data.list
    total.value = res.data.total
  } catch (error) {
    console.log(error)
  }
}

initRoleList()

const handleCurrentChange = (pageNum: number) => {
  roleSearchParams.pageNum = pageNum
  initRoleList()
}

const handleSizeChange = (pageSize: number) => {
  roleSearchParams.pageSize = pageSize
  initRoleList()
}
</script>
<template>
  <div class="role-wrapper">
    <el-card>
      <BaseTable
        :pagination="true"
        v-if="tableData.length > 0"
        :data="tableData"
        :background="true"
        :columnOptions="columnOptions"
        @handle-current-change="handleCurrentChange"
        @handle-size-change="handleSizeChange"
        :total="total"
      >
        <template #createdAt="{ scope }">
          {{ formatTime(scope.row.createdAt) }}
        </template>
        <template #action="{ scope }">
          <el-button type="primary">授权</el-button>
          <el-button type="primary">删除</el-button>
        </template>
      </BaseTable>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
