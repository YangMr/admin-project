<script lang="ts" setup>
import BaseTable from '@/components/Table/index.vue'
import { columnOptions } from './config/index'
import { getRoleList } from '@/api/role'
import type { ListType, RoleParamsType } from '@/api/types/roleType'
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
</script>
<template>
  <div class="role-wrapper">
    <el-card>
      <BaseTable :data="tableData" :columnOptions="columnOptions"></BaseTable>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
