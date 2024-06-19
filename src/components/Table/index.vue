<script lang="ts" setup>
import type { TableOptionsType } from './types/index'

defineProps<{
  data: any[]
  columnOptions: TableOptionsType[]
}>()
</script>
<template>
  <el-table :data="data" style="width: 100%">
    <template v-for="item in columnOptions" :key="index">
      <el-table-column :prop="item.prop" :label="item.label" width="180" />
    </template>
  </el-table>
</template>

<style scoped lang="scss"></style>
