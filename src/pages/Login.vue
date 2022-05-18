<template>
  <div class="login-wrap">
    <div class="bigTitle">教育系统西部音乐周展演团队登记</div>
    <div class="ms-login">
      <div class="ms-title">节目报送系统</div>
      <el-form
        ref="login"
        label-width="0px"
        class="ms-content"
        :model="form"
      >
        <el-form-item prop="accountNum">
          <el-select
            v-model="form.account"
            placeholder="请输入账号"
            style="width:290px"
            filterable
          >
            <el-option
              v-for="item in options"
              :key="item.account"
              :label="item.account"
              :value="item.account"
            >
            </el-option>
          </el-select>
          <!-- <el-input
            placeholder="请输入账号"
            v-model="form.account"
            @blur="validateEmpty(form.account)"
          >
          </el-input> -->
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
            @blur="validateEmpty(form.password)"
          >
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button @click="login">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { handleError } from "./../http/api";
import { Login, queryAccount } from "../http/user";
import { useStore } from "vuex";
import { validateEmpty } from "../utils/validateEmpty";
export default {
  setup() {
    interface message {
      account: string;
      password: string | number;
    }
    const store = useStore();
    let options = ref([]);

    const router = useRouter();

    let form: message = reactive({
      account: "",
      password: "",
    });

    // onMounted(async function() {
    //   const data = await queryAccount().catch(handleError);
    //   console.log(data);
    //   if(data.code == 200) {
    //     options.value=data.data
    //   }
    // })

    const queryInput = async () => {
      const data = await queryAccount().catch(handleError);
      options.value = data.data;
    };
    queryInput();

    const login = async () => {
      const data = await Login(form).catch(handleError);
      if (data.code == 200) {
        sessionStorage.setItem("token", data.data.token);
        sessionStorage.setItem("account", form.account);
        router.push("/home");
      }
      
    };
    return {
      form,
      login,
      validateEmpty,
      options,
    };
  },
};
</script>

<style scoped>
.bigTitle {
  width: 100%;
  text-align: center;
  font-size: 45px;
  color: #fff;
  margin: 50px 0;
}
.el-button {
  border-radius: 20px;
  font-weight: 550;
  color: #fff;
  background-color: #d23427;
}
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background: url("http://cool.gumpxd.cn/file/1638327363339.png") no-repeat;
  background-size: cover;
  padding-bottom: 7%;
  padding-top: 10px;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(187, 185, 185, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
