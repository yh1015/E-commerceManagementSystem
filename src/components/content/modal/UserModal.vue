<template>
  <el-dialog
  :title="title"
  :visible.sync="dialogVisible"
  :before-close="handleClose"
  @close="handleClose"
  :top="top"
  :width="width">
  <slot name="center"></slot>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancel">取 消</el-button>
    <el-button type="primary" @click="onSubmit">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  name: "UserModal",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "30%",
    },
    title: {
      type: String,
      default: "新增",
    },
    top: {
      type: String,
      default: "15vh",
    },
  },
  methods: {
    handleClose() {
      this.$emit("cancel");
    },
    cancel() {
      this.$emit("cancel");
    },
    onSubmit() {
      this.$emit("onSubmit");
    },
  },
};
</script>

<style scoped>
</style>
