<script lang="ts" setup>
import BaseTable from '@/components/Table/index.vue'
import DialogModal from '@/components/DialogModal/index.vue'
import { columnOptions } from './config/classRoomConfig'
import { useTrain } from './hooks/useTrain'

const { list, total, query, initList, replaceCoverUrl, handleSizeChange, handleCurrentChange } =
  useTrain(1)

initList()

const dialogModelRef = ref<InstanceType<typeof DialogModal>>()
const ButtonType = ref<'cancel' | 'close'>('cancel')
const uploadResource = () => {
  ButtonType.value = 'cancel'
  dialogModelRef.value?.open('上传资源')
}

const viewResource = () => {
  ButtonType.value = 'close'
  dialogModelRef.value?.open('查看资源')
}

const handleCancel = (close: Function) => {
  close()
}
const handleSubmit = (close: Function) => {
  close()
}
</script>
<template>
  <div class="classroom-wrapper">
    <el-card>
      <BaseTable
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
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
              <el-button link type="primary" @click="uploadResource">上传资源</el-button>
            </el-col>
            <el-col style="margin-top: 10px">
              <el-button link type="danger">删除</el-button>
              <el-button link type="danger" @click="viewResource">查看资源</el-button>
            </el-col>
          </el-row>
        </template>
      </BaseTable>
    </el-card>

    <DialogModal
      @cancel="handleCancel"
      @submit="handleSubmit"
      :type="ButtonType"
      no-submit
      ref="dialogModelRef"
    ></DialogModal>
  </div>
</template>

<style scoped lang="scss"></style>
