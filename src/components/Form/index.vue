<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash'

const formRef = ref<FormInstance | null>()
const props = defineProps<{
  options: any[]
}>()

const model = ref<any>(null)

const initForm = () => {
  if (props.options && props.options.length > 0) {
    let m: any = {}

    props.options.forEach((item: any) => {
      m[item.prop!] = item.value
    })

    model.value = cloneDeep(m)
  }
}
onMounted(() => {
  initForm()
})

const resetForm = () => {
  nextTick(() => {
    // for (let key in model.value) {
    //   model.value[key] =
    // }
    // formRef.value?.resetFields()
    initForm()
  })
}

watch(
  () => props.options,
  () => {
    initForm()
  },
  {
    deep: true,
    immediate: true
  }
)
</script>
<template>
  <el-form v-bind="$attrs" ref="formRef" :model="model">
    <template v-for="(item, index) in options">
      <el-form-item :label="item.label" v-if="!item.children || !item.children.length">
        <component
          :key="index"
          :is="`el-${item.type}`"
          v-model="model[item.prop!]"
          :placeholder="item.placeholder"
          :style="item.style"
          v-bind="item.attrs"
          :prop="item.prop!"
        ></component>
      </el-form-item>
      <el-form-item :label="item.label" v-if="item.children && item.children.length > 0">
        <component
          :key="index"
          v-model="model[item.prop!]"
          :is="`el-${item.type}`"
          :placeholder="item.placeholder"
          :style="item.style"
          v-bind="item.attrs"
          :prop="item.prop!"
        >
          <template v-for="(child, childIndex) in item.children" :key="childIndex">
            <component
              v-bind="child.attrs"
              :is="`el-${child.type}`"
              :label="child.label"
              :value="child.value"
            >
            </component>
          </template>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :formRef="resetForm" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
