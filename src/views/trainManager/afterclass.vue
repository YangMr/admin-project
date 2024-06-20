<script lang="ts" setup>
import BaseTable from '@/components/Table/index.vue'
import { columnOptions } from './config/classRoomConfig'
import { useTrain } from './hooks/useTrain'

const { list, total, query, initList, replaceCoverUrl, handleSizeChange, handleCurrentChange } =
  useTrain(2)

initList()
</script>
<template>
  <div class="afterclass-wrapper">
    <el-card>
      <BaseTable
        @handle-current-change="handleCurrentChange"
        @handle-size-change="handleSizeChange"
        :column-options="columnOptions"
        :data="list"
        :pagination="true"
        :current-page="query.pageNum as number"
        :page-size="query.pageSize as number"
        :total="total"
      >
        <template #cover="{ scope }">
          <img :src="replaceCoverUrl(scope.row.cover)" alt="" width="40" />
        </template>
        <template #action="{ scope }">
          <el-row>
            <el-col>
              <el-button link type="primary">编辑</el-button>
              <el-button link type="primary">上传资源</el-button>
            </el-col>
            <el-col style="margin-top: 10px">
              <el-button link type="danger">删除</el-button>
              <el-button link type="danger">查看资源</el-button>
            </el-col>
          </el-row>
        </template>
      </BaseTable>
    </el-card>
  </div>
</template>

<style scoped lang="scss"></style>
