<template>
  <user-modal
    title="添加商品"
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
      <el-form-item label="父级分类">
        <el-cascader
          expand-trigger="hover"
          :options="options"
          :props="cascaderProps"
          v-model="selectKeys"
          @change="parentCatChange"
          clearable
        >
        </el-cascader>
      </el-form-item>
    </el-form>
  </user-modal>
</template>

<script>
import UserModal from "components/content/modal/UserModal";
import {addParentCategory} from "network/goods/category";

export default {
  name: "AddCategory",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    cascaderProps: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      selectKeys: [],
      ruleForm: {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0,
      },
      rules: {
        cat_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    cancel() {
      this.$refs.ruleForm.resetFields();
      this.selectKeys = [];
      this.ruleForm.cat_pid = 0;
      this.ruleForm.cat_level = 0;
      this.$emit("cancel");
    },
    onSubmit() {
      this.$refs.ruleForm.validate(vaild => {
        if(!vaild) return
        addParentCategory(this.ruleForm).then(res => {
          if (res.meta.status !== 201) {
          return this.$message.error("添加商品分类失败！");
        } else {
          this.$message.success("添加商品分类成功！");
          this.$emit("onSubmit");
        }
        })
      })
    },
    parentCatChange() {
      if(this.selectKeys.length > 0) {
        this.ruleForm.cat_pid = this.selectKeys[this.selectKeys.length -1];
        this.ruleForm.cat_level = this.selectKeys.length
      }else{
        this.ruleForm.cat_pid = 0
        this.ruleForm.cat_level = 0
      }
    }
  },
  components: {
    UserModal,
  },
};
</script>

<style scoped>
.el-cascader {
  width: 100%;
}
</style>
