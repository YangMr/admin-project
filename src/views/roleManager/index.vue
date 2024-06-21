<script lang="ts" setup>
import BaseTable from '@/components/Table/index.vue'
import { columnOptions } from './config/index'
import { getRoleList } from '@/api/role'
import type { ListType, RoleParamsType } from '@/api/types/roleType'
import { formatTime } from '@/utils/formatTime'

import BaseForm from '@/components/Form/index.vue'
import DialogModal from '@/components/DialogModal/index.vue'

const tableData = ref<ListType[]>([])
const total = ref<number>(0)

const roleSearchParams = reactive<RoleParamsType>({
  pageNum: 1,
  pageSize: 10,
  rolename: ''
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

const formOptions = [
  {
    type: 'input',
    placeholder: '输入角色搜索',
    prop: 'name',
    value: ''
  }
]

const handleSearch = (model: any) => {
  console.log(model)
  roleSearchParams.rolename = model.name
  initRoleList()
}

const dialogModalRef = ref<InstanceType<typeof DialogModal>>()
const handleRole = () => {
  dialogModalRef.value?.open('分配权限')
}
const cancel = (close: Function) => {
  close()
}
const submit = (close: Function) => {
  close()
}
</script>
<template>
  <div class="role-wrapper">
    <el-card>
      <BaseForm inline :options="formOptions">
        <template #action="{ formRef, model }">
          <el-button type="primary" @click="handleSearch(model)">查询</el-button>
        </template>
      </BaseForm>
    </el-card>

    <el-card style="margin-top: 20px">
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
          <el-button type="primary" link @click="handleRole">授权</el-button>
          <el-button type="primary" link>删除</el-button>
        </template>
      </BaseTable>
    </el-card>

    <DialogModal @cancel="cancel" @submit="submit" type="cancel" no-submit ref="dialogModalRef">
    </DialogModal>
  </div>
</template>

<style scoped lang="scss"></style>
