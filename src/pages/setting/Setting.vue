<template>
  <div class="home">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>节目查看</span>
        </div>
      </template>
      <el-table
        :data="tableData"
        stripe
        border
        style="width:90%;margin:20px 5% 60px"
      >
        <el-table-column
          label="序号"
          type="index"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column
          label="展演团队"
          prop="pro_team"
          align="center"
          width="120px"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="领队姓名"
          prop="pro_name"
          align="center"
          width="100px"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="参赛组别"
          prop="pro_group"
          align="center"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="参赛类别"
          prop="pro_type"
          align="center"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="作品链接"
          prop="pro_url"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="300px"
        >
          <template #default="scope">
            <el-button
              type="primary"
              size="mini"
              @click="look(scope.row.id)"
            >查看</el-button>
            <el-button
              type="warning"
              size="mini"
              @click="modify(scope.row.id)"
            >修改</el-button>
            <el-button
              type="danger"
              size="mini"
              @click="remove(scope.row.id)"
            >删除</el-button>
            <el-button
              type="success"
              size="mini"
              @click="educe(scope.row.id)"
            >导出</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      v-model="dialogVisible"
      width="800px"
      title="查看节目填报信息"
    >
      <el-form
        label-width="100px"
        label-position="right"
        :v-model="form"
        :style="{margin:'-5px 20px'}"
      >
        <el-form-item label="展演团队：">
          {{form.pro_team}}
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="领队姓名：">
              {{form.pro_name}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式：">
              {{form.pro_phone}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="参赛组别：">
              {{form.pro_group}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="参赛类别：">
              {{form.pro_type}}
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="展演曲目：">
          {{form.pro_song}}
        </el-form-item>

        <el-form-item
          label="作品链接："
          v-if="form.pro_url!==null"
        >
          {{form.pro_url}}
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="正式队员：">
              {{form.pro_num1}}
              <span>人</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预备队员：">
              {{form.pro_num2}}
              <span>人</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注：">
          {{form.pro_remarks}}
        </el-form-item>
        <el-form-item label="指导老师：">
          <br>

          <el-table
            :data="form.teacher"
            border
            style="width:90%"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="60px"
            >

            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="idcard"
              label="身份证号"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="year"
              label="年龄"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系方式"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="正式队员：">
          <br>

          <el-table
            :data="form.stu"
            border
            style="width:90%"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="60px"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="idcard"
              label="身份证号"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="year"
              label="年龄"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系方式"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="instrument"
              label="乐器（管乐队）"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="choir"
              label="声部（合唱队）"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="预备队员：">
          <br>

          <el-table
            :data="form.studen"
            border
            style="width:90%"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="60px"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="idcard"
              label="身份证号"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="year"
              label="年龄"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              align="center"
            >
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系方式"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="instrument"
              label="乐器（管乐队）"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="choir"
              label="声部（合唱队）"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { getTable } from "../../http/panel";
import { getDetail } from "../../http/panel";
import { exportPdf } from "../../http/panel";
import { removeData } from "../../http/panel";
import { ElMessage, ElMessageBox } from "element-plus";

export default defineComponent({
  components: {},
  data() {
    return {
      tableData: [],
      form: {},
      dialogVisible: false,
    };
  },
  created() {
    this.getTable();
  },
  methods: {
    async getTable() {
      const data = await getTable();
      if (data.code == 200) {
        this.tableData = data.data;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].pro_group === "1") {
            this.tableData[i].pro_group = "小学";
          } else if (this.tableData[i].pro_group === "2") {
            this.tableData[i].pro_group = "中学";
          } else if (this.tableData[i].pro_group === "3") {
            this.tableData[i].pro_group = "大学";
          } else if (this.tableData[i].pro_group === "4") {
            this.tableData[i].pro_group = "教师";
          }
        }
      }
    },
    async look(id) {
      this.dialogVisible = true;
      const data = await getDetail(id);
      if (data.code == 200) {
        this.form = data.data[0];
        if (this.form.pro_group === "1") {
          this.form.pro_group = "小学";
        } else if (this.form.pro_group === "2") {
          this.form.pro_group = "中学";
        } else if (this.form.pro_group === "3") {
          this.form.pro_group = "大学";
        } else if (this.form.pro_group === "4") {
          this.form.pro_group = "教师";
        }
      }
    },
    modify(id) {
      //this.dialogVisible1=true;s
      this.$router.push({
        path: "/modify",
        name: "modify",
        params: { id: id },
      });
    },
    remove(id) {
      ElMessageBox.confirm(`您确定删除该节目信息吗？`, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        callback: (action) => {
          if (action === "confirm") {
            const handleClose = async (done) => {
              const data = await removeData(id);
              if (data.code == 200) {
                ElMessage.success("删除成功！");
                this.getTable();
              }
            };
            handleClose();
          }
        },
      });
    },
    educe(id) {
      const token = sessionStorage.getItem("token");
      const url = `http://scs-music.isekko.cn/api/program/pdf?id=${id}&token=${token}`;
      window.location.href = url;
    },
  },
});
</script>

<style scoped>
.box-card {
  width: 85%;
  margin: 10px 7%;
}
</style>
