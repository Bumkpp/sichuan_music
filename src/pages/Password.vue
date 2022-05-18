<template>
  <div class="home">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>修改密码</span>
        </div>
      </template>
      <div class="content">
        <el-form
          label-width="100px"
          label-position="right"
          :model="form"
          ref="formRef"
          :rules="formRules"
          :hide-required-asterisk="true"
        >
          <el-form-item label="用户单位：">{{account}}</el-form-item>
          <el-form-item
            label="新密码："
            prop="newpassword"
          >
            <el-input
              style="width:400px"
              v-model="form.newpassword"
              type="password"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="确认新密码："
            prop="newpasswordagain"
          >
            <el-input
              style="width:400px"
              v-model="form.newpasswordagain"
              type="password"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          style="width:180px;margin-top:25px"
          @click="savePassword"
        >保存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { ElMessage, ElMessageBox } from "element-plus";
import { toRaw } from "vue";
import { changPassword } from "./../http/panel";
import { handleError } from "./../http/api";
var account = sessionStorage.getItem("account");
export default {
  data() {
    return {
      account: account,
      form: {
        newpassword: "",
        newpasswordagain: "",
      },
      formRules: {
        newpassword: [
          {
            required: true,
            message: "请输入您要修改的新密码！",
            trigger: "blur",
          },
        ],
        newpasswordagain: [
          {
            required: true,
            message: "请再输入一次新的密码用于确认！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    savePassword() {
      toRaw(this.$refs.formRef.validate)((valid) => {
        if (!valid) return ElMessage.error("密码不能为空！");
        else if (this.form.newpassword !== this.form.newpasswordagain) {
          ElMessage.error("前后密码不一致！");
        } else {
          ElMessageBox.confirm(`您确定修改为当前密码吗？`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
            callback: (action) => {
              if (action === "confirm") {
                const handleClose = async (done) => {
                  const value = toRaw(this.form);
                  const data = await changPassword(value).catch(handleError);
                  if (data.code == 200) {
                    ElMessage.success("修改密码成功！即将跳转到登录页面...");
                    this.form = {};
                    let _this=this
                    setTimeout(function() {
                        _this.$router.push('/login')
                        sessionStorage.clear()
                    },3000)
                  }
                };
                handleClose();
              }
            },
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.box-card {
  width: 85%;
  margin: 10px 7%;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
</style>