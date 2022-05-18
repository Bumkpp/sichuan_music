<template>
  <div class="headers">
    <div
      class="logo"
      :style="{ backgroundColor: '#fff' }"
    >
      <span>教育系统西部音乐周</span><br>
      <span>展演团队登记</span>
    </div>
    <div class="header_middle"></div>
    <div class="header_right">
      <div
        @click="logout"
        style="
            width: 140px
            display: flex;
            cursor: pointer;
          "
      >
        <span class="user">退出登录</span>
      </div>
      <!-- <el-dropdown>
        <div style="
            width: 140px
            display: flex;
            cursor: pointer;
          ">
          <span class="user">修改信息</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改信息</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Edit, Expand, Fold } from "@element-plus/icons";
import bus from "../assets/ts/bus";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    Edit,
    Expand,
    Fold,
  },
  setup(props, context) {
    let fullscreen = ref(false);
    let show = ref(false);

    const handleFullScreen = () => {
      let element = document.documentElement;
      if (fullscreen.value) {
        document.exitFullscreen();
        fullscreen.value = !fullscreen.value;
      } else {
        element.requestFullscreen();
        fullscreen.value = !fullscreen.value;
      }
    };

    const router = useRouter();

    const logout = () => {
      router.push("/login");
      sessionStorage.clear();
    };

    const isShow = () => {
      show.value = !show.value;
      sendShow(show.value);
      bus.$emit("sendShow", show.value);
    };

    const sendShow = (data: boolean) => {
      context.emit("changeMenu", data);
    };

    return {
      handleFullScreen,
      fullscreen,
      show,
      isShow,
      logout,
    };
  },
});
</script>

<style scoped>
.headers {
  width: 100%;
  height: 70px;
  font-size: 22px;
  /* color: #fff; */
  margin: 0 !important;
  padding: 0 !important;
  display: flex;
  background-color: #e51a14 !important;
  position: relative;
  display: flex;
}
.headers .logo {
  font-size: 16px;
  width: 199px;
  line-height: 30px;
  text-align: center;
  color: #e51a14;
  margin-left: -20px;
  padding: 5px 0px;
  font-weight: 800;
}

.header_right {
  position: absolute;
  background-color: #a90109;
  right: 0px;
  height: 70px;
  display: flex;
  margin-right: -20px;
  display: flex;
  text-align: center;
  align-items: center;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  flex: 1;
  margin: 0 10px;
}
.user {
  font-size: 16px;
  line-height: 50px !important;
  color: #fff;
}
</style>
