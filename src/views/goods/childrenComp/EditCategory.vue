<template>
  <user-modal
    title="编辑商品"
    :dialogVisible="dialogVisible"
    @cancel="cancel"
    @onSubmit="onSubmit"
    width="50%"
  >
  <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      slot="center"
    >
      <el-form-item label="分类名称" prop="cat_name">
        <el-input v-model="ruleForm.cat_name"></el-input>
      </el-form-item>
  </el-form>
  </user-modal>
</template>

<script>
import UserModal from "components/content/modal/UserModal";

export default {
  name: 'EditCategory',
  props: {
    ruleForm: {
      type: Object,
      default() {
        return {cat_name: ''}
      }
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
    }
  },
  methods: {
    cancel() {
      this.$refs.ruleForm.resetFields();
      this.$emit("cancel");
    },
    onSubmit() {
      this.$refs.ruleForm.validate(vaild => {
        console.log(vaild)
        if(!vaild) return
        this.$emit("onSubmit");
      })
    },
  },
  components: {
    UserModal
  }
}
</script>

<style scoped>

</style>
