<script lang="ts" setup>
// 接受父组件传递的参数
withDefaults(
  defineProps<{
    type?: 'cancel' | 'close'
    noSubmit?: boolean
    slot?: string
  }>(),
  {
    noSubmit: false
  }
)

// 控制弹窗的显示与隐藏
const dialogFormVisible = ref(false)

// 弹窗的表格
const title = ref<string | undefined>('')

// 打开弹窗的方法
const open = (value?: string) => {
  title.value = value
  dialogFormVisible.value = true
}

// 关闭弹窗的方法
const close = () => {
  dialogFormVisible.value = false
}

const emits = defineEmits(['submit', 'cancel'])

// 取消/关闭触发的方法
const cancel = () => {
  emits('cancel', close)
}

const submit = () => {
  emits('submit', close)
}

// 导出组件内部的方法
defineExpose({
  open,
  close,
  cancel,
  submit
})
</script>
<template>
  <el-dialog v-model="dialogFormVisible" :title="title" v-bind="$attrs">
    <slot name="content"></slot>
    <template #footer>
      <div class="dialog-footer">
        <div v-if="!slot">
          <el-button v-if="type == 'cancel'" @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit" v-if="type == 'cancel' && noSubmit">
            确定
          </el-button>
          <el-button type="primary" @click="cancel" v-if="type === 'close'"> 关闭 </el-button>
        </div>
        <div v-else>
          <slot :name="slot"></slot>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
