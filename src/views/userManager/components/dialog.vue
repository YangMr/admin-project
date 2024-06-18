<script lang="ts" setup>
import { ref } from 'vue'
import { getRoleList } from '@/api/role'
import type { ListType } from '@/api/types/roleType'
import type { UpdateUserType } from '@/api/types/userType'
import { updateUser } from '@/api/user'
import { ElMessage } from 'element-plus'

const dialogVisilb = ref(false)
const dialogTitle = ref('新增')
const dialogType = ref<string>('')

const dialogForm = ref<UpdateUserType>({
  age: '',
  gender: 1,
  grade: '',
  id: 0,
  num: '',
  phone: '',
  province: '',
  roleId: 0,
  school: ''
})

type DialogDataType = {
  type: string
  title: string
  row?: any
}
const openDialog = (data: DialogDataType) => {
  dialogVisilb.value = true
  dialogTitle.value = data.title
  dialogType.value = data.type

  if (dialogType.value === 'edit') {
    console.log('row', data.row)
    const form = data.row
    dialogForm.value = {
      age: form.age.toString(),
      gender: form.gender,
      grade: form.grade,
      id: form.id,
      num: form.num.toString(),
      phone: form.phone,
      province: form.province,
      roleId: form.role.id,
      school: form.school
    }
  }

  initRoleList()
}

const closeDialog = () => {
  dialogVisilb.value = false
}

const roleList = ref<ListType[]>([])
const initRoleList = async () => {
  try {
    const res = await getRoleList({
      pageNum: 1,
      pageSize: 10
    })
    roleList.value = res.data.list
  } catch (error) {
    console.log(error)
  }
}

const emits = defineEmits(['refresh'])
const handleSubmit = async () => {
  // 验证表单是否通过
  if (dialogType.value === 'edit') {
    try {
      await updateUser(dialogForm.value)
      ElMessage({ type: 'success', message: '成功' })
      emits('refresh')
    } catch (error) {
      console.log(error)
    }
  }

  // 验证当前是新增/编辑 dialogType
  closeDialog()
}

const options = [
  {
    label: '小学',
    value: 0,
    children: [
      { label: '一年级', value: 0 },
      { label: '二年级', value: 1 },
      { label: '三年级', value: 2 },
      { label: '四年级', value: 3 },
      { label: '五年级', value: 4 },
      { label: '六年级', value: 5 }
    ]
  },
  {
    label: '中学',
    value: 1,
    children: [
      { label: '七年级', value: 6 },
      { label: '八年级', value: 7 },
      { label: '九年级', value: 8 }
    ]
  },
  {
    label: '高中',
    value: 2,
    children: [
      { label: '高一', value: 9 },
      { label: '高二', value: 10 },
      { label: '高三', value: 11 }
    ]
  }
]

defineExpose({
  openDialog,
  closeDialog
})
</script>
<template>
  <el-drawer
    :close-on-click-modal="false"
    v-model="dialogVisilb"
    :title="dialogTitle"
    direction="rtl"
    :before-close="closeDialog"
  >
    <el-form :model="dialogForm" ref="dialogFormRef">
      <el-form-item label="序号">
        <el-input v-model="dialogForm.num" placeholder="修改序号"></el-input>
      </el-form-item>
      <el-form-item label="城市">
        <el-input v-model="dialogForm.province" placeholder="请输入城市"></el-input>
      </el-form-item>
      <el-form-item label="学校">
        <el-input v-model="dialogForm.school" placeholder="请输入学校"></el-input>
      </el-form-item>
      <el-form-item label="家长电话">
        <el-input v-model="dialogForm.phone" placeholder="请输入家长电话"></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="性别">
            <el-select v-model="dialogForm.gender" placeholder="请选择性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄">
            <el-input v-model="dialogForm.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="年级">
        <el-cascader v-model="dialogForm.grade" :options="options" placeholder="请选择年级" />
      </el-form-item>
      <el-form-item label="角色分配">
        <el-select v-model="dialogForm.roleId" placeholder="请选择角色">
          <el-option
            v-for="(item, index) in roleList"
            :key="index"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button @click="handleSubmit" type="primary">确定</el-button>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss"></style>
