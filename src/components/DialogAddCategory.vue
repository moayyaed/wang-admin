<template>
  <el-dialog
      :title="type === 'add' ? '添加分类' : '修改分类'"
      v-model="visible"
      width="400px">
    <el-form
        :model="ruleForm"
        :rules="rules"
        ref="formRef"
        label-width="100px"
        class="good-form">
      <el-form-item label="商品名称" prop="name">
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="排序值" prop="rank">
        <el-input type="number" min="0" v-model="ruleForm.rank"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useRoute } from "vue-router"
import axios from '@/utils/axios'
import { ElMessage } from 'element-plus'
export default {
  name: "DialogAddCategory",
  props: {
    type: String,
    reload: Function
  },
  setup(props) {
    const formRef = ref(null)
    const route = useRoute()
    const state = reactive({
      visible: false,
      categoryLevel: 1,
      parentId: 0,
      ruleForm: {
        name: '',
        rank: ''
      },
      rules: {
        name: [
          { required: 'true', message: '名称不能为空', trigger: ['change'] }
        ],
        rank: [
          { required: 'true', message: '排序不能为空', trigger: ['change'] }
        ]
      },
      id: ''
    })
    const getDetail = (id) => {
      axios.get(`/categories/${id}`).then(res => {
        const { categoryName: name, categoryRank: rank, parentId, categoryLevel } = res
        state.ruleForm = {
          name,
          rank
        }
        state.parentId = parentId
        state.categoryLevel = categoryLevel
      })
    }
    const openDialog = (id) => {
      state.visible = true
      if (id) {
        state.id = id
        getDetail(id)
      } else {
        const { level = 1, parent_id = 0 } = route.query
        state.ruleForm = {
          name: '',
          rank: ''
        }
        state.parentId = parent_id
        state.categoryLevel = level
      }
    }
    const closeDialog = () => {
      state.visible = false
      state.ruleForm = {
        name: '',
        rank: ''
      }
    }
    const submitForm = () => {
      formRef.value.validate(valid => {
        if (valid) {
          const data = {
            categoryLevel: state.categoryLevel,
            parentId: state.parentId,
            categoryName: state.ruleForm.categoryName,
            categoryRank: state.ruleForm.categoryRank
          }
          props.type === 'add' ? data.categoryId = state.id : ''
          if (props.type === 'add') {
            axios.post('/categories', data).then(() => {
              ElMessage.success('添加成功')
              state.visible = false
              if (props.reload) props.reload()
            })
          } else {
            axios.put('/categories', data).then(() => {
              ElMessage.success('修改成功')
              state.visible = false
              if (props.reload) props.reload()
            })
          }
        }
      })
    }
    return {
      ...toRefs(state),
      openDialog,
      closeDialog,
      formRef,
      submitForm
    }
  }
}
</script>

<style scoped>

</style>