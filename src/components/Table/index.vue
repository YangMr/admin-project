<script lang="ts" setup>
import type { TableOptionsType } from './types/index'

const props = withDefaults(
  defineProps<{
    data: any[]
    columnOptions: TableOptionsType[]
    pagination?: boolean
    layout?: string
    pageSizes?: any
    currentPage?: number
    pageSize?: number
    paginationMargin?: number | string
    paginationAlign?: 'left' | 'center' | 'right'
    total?: number
  }>(),
  {
    pagination: false,
    layout: 'total, sizes, prev, pager, next, jumper',
    pageSizes: [100, 200, 300, 400],
    currentPage: 1,
    pageSize: 10,
    paginationMargin: '20px 0 0 0',
    paginationAlign: 'center',
    total: 0
  }
)

const justifyContent = computed(() => {
  const position = props.paginationAlign
  console.log('position', position)
  const obj = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end'
  }

  return obj[position]
})

const actionsOptions = computed(() => {
  return props.columnOptions.find((item: any) => item.action)
})

const tableColumnOptions = computed(() => {
  return props.columnOptions.filter((item: any) => !item.action)
})

const emits = defineEmits(['handleSizeChange', 'handleCurrentChange'])
const handleSizeChange = (size: number) => {
  emits('handleSizeChange', size)
}
const handleCurrentChange = (page: number) => {
  emits('handleCurrentChange', page)
}
</script>
<template>
  <el-table v-bind="$attrs" :data="data">
    <!-- 渲染的是非操作项 -->
    <template v-for="(item, index) in tableColumnOptions" :key="index">
      <el-table-column
        v-if="item.type === 'index'"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        type="index"
      />
      <el-table-column
        v-else-if="item.type === 'selection'"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        type="selection"
      />
      <el-table-column
        v-else-if="item.type === 'expand'"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        type="expand"
      />
      <el-table-column
        v-else-if="item.slot"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
      >
        <template #default="scope">
          <slot v-if="item.slot" :name="item.slot" :scope="scope"></slot>
          <span v-else>{{ scope.row[item.prop!] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        v-else
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        :formatter="item.formatter"
      ></el-table-column>
    </template>

    <!-- 渲染的是操作项 -->
    <el-table-column
      v-if="actionsOptions"
      :prop="actionsOptions!.prop"
      :label="actionsOptions!.label"
      :width="actionsOptions!.width"
      :align="actionsOptions.align"
    >
      <template #default="scope">
        <slot name="action" :scope="scope"></slot>
      </template>
    </el-table-column>
  </el-table>

  <div
    class="pagination"
    v-if="pagination"
    :style="{ margin: paginationMargin, justifyContent: justifyContent }"
  >
    <el-pagination
      v-bind="$attrs"
      :modelValue:current-page="currentPage"
      :modelValue:page-size="pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
}
</style>
