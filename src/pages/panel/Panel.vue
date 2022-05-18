<template>
  <div class="home">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <p>节目填报</p>
        </div>
      </template>
      <el-form
        label-width="100px"
        label-position="right"
        :model="form"
        ref="formRef"
        :rules="formRules"
        :hide-required-asterisk="true"
      >
        <el-form-item
          label="展演团队："
          prop="pro_team"
        >
          <el-input
            style="width: 300px"
            v-model="form.pro_team"
          ></el-input>
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="领队姓名："
              prop="pro_name"
            >
              <el-input
                style="width: 300px"
                v-model="form.pro_name"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="联系方式："
              prop="pro_phone"
            >
              <el-input
                style="width: 300px"
                v-model="form.pro_phone"
                maxlength="11"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="参赛组别："
              prop="pro_group"
            >
              <el-radio-group v-model="form.pro_group">
                <el-radio :label="1">小学</el-radio>
                <el-radio :label="2">中学</el-radio>
                <el-radio :label="3">大学</el-radio>
                <el-radio :label="4">教师</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="参赛类别："
              prop="pro_type"
            >
              <el-select
                v-model="form.pro_type"
                placeholder="请选择参赛类别"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          label="展演曲目："
          prop="pro_song"
        >
          <el-input
            style="width: 300px"
            v-model="form.pro_song"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="视频上传："
          prop="pro_url"
        >
          <el-upload
            action
            :http-request="Upload"
            :before-upload="beforeAvatarUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :on-exceed="handleExceed"
            drag
            :limit="limit"
            :file-list="fileList"
            v-model="form.pro_url"
          >
            <el-icon class="el-icon--upload">
              <upload-filled />
            </el-icon>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                各地市州教师合唱团视频录制采用MPG2 格式（压缩带宽不低于 10M，分辦率1920x1080）
              </div>
              <div style="font-size: 12px;color: red">
                注：若为教师合唱团需上传视频
              </div>
            </template>
          </el-upload>
          <!-- <div style="font-size: 12px;  color: red">
            视频上传完成后,请点击确认视频上传
          </div> -->
          <el-progress
            v-show="showProgress"
            :text-inside="true"
            :stroke-width="15"
            :percentage="progress"
          ></el-progress>

        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item
              label="正式队员："
              prop="pro_num1"
            >
              <el-input
                style="width: 100px"
                v-model.number="form.pro_num1"
                maxlength="3"
              ></el-input>
              <span style="padding: 15px">人</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="预备队员："
              prop="pro_num2"
            >
              <el-input
                style="width: 100px"
                maxlength="2"
                v-model.number="form.pro_num2"
              ></el-input>
              <span style="padding: 15px">人</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注：">
          <el-input
            type="textarea"
            style="width: 300px"
            v-model="form.pro_remarks"
            :autosize="{ minRows: 2, maxRows: 4 }"
            placeholder="请输入内容"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          label="指导老师："
          prop="teacher"
        >
          <br />
          <el-row :gutter="16">
            <el-col :span="2">
              <el-upload
                class="upload-demo"
                action=""
                :on-change="handleChange1"
                :on-remove="handleRemove1"
                :on-exceed="handleExceed1"
                :limit="limitUpload"
                :show-file-list="true"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                :auto-upload="false"
              >
                <el-button type="text">批量导入</el-button>
              </el-upload>
            </el-col>
            <el-col :span="2">
              <el-button
                type="text"
                @click="uploadT"
              >下载模板</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                type="text"
                @click="addRow"
              >添加一行</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                type="text"
                @click="resetTable1"
              >清空</el-button>
            </el-col>
          </el-row>
          <el-table
            :data="form.teacher"
            border
            style="width: 90%"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="80px"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
              width="120px"
            >
              <template #default="scope">
                <el-input
                  v-model="scope.row.name"
                  @blur="validateEmpty(scope.row.name)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="idcard"
              label="身份证号"
              align="center"
            >
              <template #default="scope">
                <el-input
                  v-model="scope.row.idcard"
                  maxlength="18"
                  @blur="validateIdcard(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="year"
              label="年龄"
              align="center"
              width="120px"
            >
              <template #default="scope">
                <el-input
                  v-model="scope.row.year"
                  :readonly="true"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              align="center"
              width="120px"
            >
              <template #default="scope">
                <el-input
                  v-model="scope.row.sex"
                  :readonly="true"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系方式"
              align="center"
            >
              <template #default="scope">
                <el-input
                  v-model="scope.row.phone"
                  maxlength="11"
                  @blur="validatePhone(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="90px"
            >
              <template #default="scope">
                <el-button
                  type="danger"
                  size="small"
                  @click="removeData1(scope.row, scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item
          label="正式队员："
          prop="stu"
        >
          <br />
          <el-row :gutter="12">
            <el-col :span="2">
              <el-upload
                class="upload-demo"
                action=""
                :on-change="handleChange2"
                :on-remove="handleRemove2"
                :on-exceed="handleExceed2"
                :limit="limitUpload"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                :auto-upload="false"
                :show-file-list="true"
              >
                <el-button type="text">批量导入</el-button>
              </el-upload>
            </el-col>
            <el-col :span="2">
              <el-button
                type="text"
                @click="uploadT1"
              >下载模板</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                type="text"
                @click="addRow1"
                :disabled="disabled1"
              >添加一行</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                type="text"
                @click="resetTable2"
              >清空</el-button>
            </el-col>
          </el-row>
          <el-table
            :data="form.stu"
            border
            style="width: 90%"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="80px"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
              width="120px"
            >
              <template #default="scope">
                <el-input
                  v-model="scope.row.name"
                  @blur="validateEmpty(scope.row.name)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="idcard"
              label="身份证号"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template #default="scope">
                <el-input
                  v-model="scope.row.idcard"
                  maxlength="18"
                  @blur="validateIdcard(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="year"
              label="年龄"
              width="80px"
              align="center"
            >
              <template #default="scope">
                <el-input
                  v-model="scope.row.year"
                  :readonly="true"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              align="center"
              width="80px"
            >
              <template #default="scope">
                <el-input
                  v-model="scope.row.sex"
                  :readonly="true"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系方式"
              align="center"
              width="150px"
              :show-overflow-tooltip="true"
            >
              <template #default="scope">
                <el-input
                  v-model="scope.row.phone"
                  maxlength="11"
                  @blur="validatePhone(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="instrument"
              label="乐器（管乐队）"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template #default="scope">
                <el-input v-model="scope.row.instrument"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="choir"
              label="声部（合唱队）"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template #default="scope">
                <el-input v-model="scope.row.choir"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="90px"
            >
              <template #default="scope">
                <el-button
                  type="danger"
                  size="small"
                  @click="removeData2(scope.row, scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item
          label="预备队员："
          prop="studen"
        >
          <br />
          <el-row :gutter="12">
            <el-col :span="2">
              <el-upload
                class="upload-demo"
                action=""
                :on-change="handleChange3"
                :on-remove="handleRemove3"
                :on-exceed="handleExceed3"
                :limit="limitUpload"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                :auto-upload="false"
                :show-file-list="true"
              >
                <el-button type="text">批量导入</el-button>
              </el-upload>
            </el-col>
            <el-col :span="2">
              <el-button
                type="text"
                @click="uploadT2"
              >下载模板</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                type="text"
                @click="addRow2"
                :disabled="disabled2"
              >添加一行</el-button>
            </el-col>
            <el-col :span="2">
              <el-button
                type="text"
                @click="resetTable3"
              >清空</el-button>
            </el-col>
          </el-row>
          <el-table
            :data="form.studen"
            border
            style="width: 90%"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="80px"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
              width="120px"
            >
              <template #default="scope">
                <el-input
                  v-model="scope.row.name"
                  @blur="validateEmpty(scope.row.name)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="idcard"
              label="身份证号"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template #default="scope">
                <el-input
                  v-model="scope.row.idcard"
                  maxlength="18"
                  @blur="validateIdcard(scope.row)"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="year"
              label="年龄"
              align="center"
              width="80px"
            >
              <template #default="scope">
                <el-input
                  v-model="scope.row.year"
                  :readonly="true"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              align="center"
              width="80px"
            >
              <template #default="scope">
                <el-input
                  v-model="scope.row.sex"
                  :readonly="true"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系方式"
              align="center"
              :show-overflow-tooltip="true"
              width="150px"
            >
              <template #default="scope">
                <el-form-item prop="phone">
                  <el-input
                    v-model="scope.row.phone"
                    maxlength="11"
                    @blur="validatePhone(scope.row)"
                  ></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column
              prop="instrument"
              label="乐器（管乐队）"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template #default="scope">
                <el-input v-model="scope.row.instrument"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="choir"
              label="声部（合唱队）"
              align="center"
              :show-overflow-tooltip="true"
            >
              <template #default="scope">
                <el-input v-model="scope.row.choir"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="90px"
            >
              <template #default="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="removeData3(scope.row, scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button
          type="primary"
          @click="submitForm"
        >提交</el-button>
        <el-button
          type="warning"
          @click="storageBtn"
        >暂存</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";
import Vue from "vue";
import axios from "axios";
import { client, getFileNameUUID } from "../../utils/ali-oss"; //前面的ali-js文件内的两个封装函数
import { defineComponent } from "vue";
import { ElMessage } from "element-plus";
import { UploadFilled } from "@element-plus/icons";
import XLSX from "xlsx";
import { toRaw } from "vue";
import { getForm } from "../../http/panel";
import { handleError } from "../../http/api";
import { validateEmpty } from "../../utils/validateEmpty";
import { validateIdcard } from "../../utils/validateIdcard";
import { validatePhone } from "../../utils/validatePhone";
import { exportJson2Excel } from "../../vendor/excel";
import { formatJson } from "../../vendor/formatJson";
export default defineComponent({
  props: {
    limit: {
      type: Number,
      default: 1,
    },
  },
  components: {
    UploadFilled,
  },
  data() {
    var checkMobile = (rule, value, cb) => {
      const regMobile =
        /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      options: [
        {
          value: "管乐",
          label: "管乐",
        },
        {
          value: "合唱",
          label: "合唱",
        },
      ],
      validateEmpty,
      validateIdcard,
      validatePhone,
      // 视频
      fileList: [], //文件列
      showProgress: false, //进度条的显示
      dataObj: {}, //存签名信息
      progress: 0, //进度条数据
      form: {
        pro_team: "",
        pro_name: "",
        pro_phone: "",
        pro_group: "",
        pro_type: "",
        pro_song: "",
        pro_url: "",
        pro_num1: "",
        pro_num2: "",
        pro_remarks: "",
        teacher: [],
        stu: [],
        studen: [],
      },
      formRules: {
        name: [
          {
            required: true,
            message: "123",
            trigger: "blur",
          },
        ],
        pro_team: [
          { required: true, message: "请输入展演团队", trigger: "blur" },
        ],
        pro_name: [
          { required: true, message: "请输入领队姓名", trigger: "blur" },
        ],
        pro_phone: [{ validator: checkMobile, trigger: "blur" }],
        pro_group: [
          { required: true, message: "请选择参赛组别", trigger: "blur" },
        ],
        pro_type: [
          { required: true, message: "请选择参赛类别", trigger: "blur" },
        ],
        pro_song: [
          { required: true, message: "请输入展演曲目", trigger: "blur" },
        ],
        pro_num1: [
          { required: true, message: "请输入正式队员人数", trigger: "blur" },
        ],
        pro_num2: [
          { required: true, message: "请输入预备队员人数", trigger: "blur" },
        ],
        teacher: [
          { required: true, message: "请填写表格信息", trigger: "blur" },
        ],
        stu: [{ required: true, message: "请填写表格信息", trigger: "blur" }],
        studen: [
          { required: true, message: "请填写表格信息", trigger: "blur" },
        ],
      },
      limitUpload: 1,
      fileTemp: null,
      file: null,
      len: "",
      showList: true,
      disabled1: false,
      disabled2: false,
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.showStorageData();
    });
  },
  methods: {
    // 回显页面数据
    showStorageData() {
      const data = localStorage.getItem("form");
      if (data !== null) {
        let a = JSON.parse(localStorage.getItem("form"));
        this.form = a;
      }
    },
    submitForm() {
      toRaw(this.$refs.formRef.validate)(async (valid) => {
        if (!valid) return ElMessage.error("您还有数据未填写完整！");

        // console.log("pro_url", pro_url);

        var value = toRaw(this.form);
        
        const data = await getForm(value);

        if (data.code == 200) {
          ElMessage.success("提交成功");
          this.form = {};
          this.showList = false;
          this.$router.push("/setting");
          localStorage.clear();
        } else {
          ElMessage.error("提交失败！");
        }
      });
    },
    // 暂存页面
    storageBtn() {
      const values = toRaw(this.form);
      localStorage.setItem("form", JSON.stringify(values));
      ElMessage.info("已成功暂存！");
    },
    // 文件上传成功时
    handleSuccess(response) {
      ElMessage.success("上传成功");
      this.form.pro_url = response.data;
    },
    // 文件上传失败
    handleError(res) {
      ElMessage.error("上传失败");
    },
    uploadT() {
      const tHeader = ["姓名", "身份证号", "年龄", "性别", "联系方式"];
      const filterVal = ["name", "idcard", "year", "sex", "phone"];
      const list = this.form.teacher;
      const data = formatJson(filterVal, list);
      const filename = "dateTemplate";
      const autoWidth = true;
      const bookType = "xlsx";
      exportJson2Excel(
        tHeader,
        data,
        filename,
        undefined,
        undefined,
        autoWidth,
        bookType
      );
    },
    uploadT1() {
      const tHeader = [
        "姓名",
        "身份证号",
        "年龄",
        "性别",
        "联系方式",
        "乐器（管乐队）",
        "声部（合唱队）",
      ];
      const filterVal = [
        "name",
        "idcard",
        "year",
        "sex",
        "phone",
        "instrument",
        "choir",
      ];
      const list = this.form.stu;
      const data = formatJson(filterVal, list);
      const filename = "dateTemplate";
      const autoWidth = true;
      const bookType = "xlsx";
      exportJson2Excel(
        tHeader,
        data,
        filename,
        undefined,
        undefined,
        autoWidth,
        bookType
      );
    },
    uploadT2() {
      const tHeader = [
        "姓名",
        "身份证号",
        "年龄",
        "性别",
        "联系方式",
        "乐器（管乐队）",
        "声部（合唱队）",
      ];
      const filterVal = [
        "name",
        "idcard",
        "year",
        "sex",
        "phone",
        "instrument",
        "choir",
      ];
      const list = this.form.studen;
      const data = formatJson(filterVal, list);
      const filename = "dateTemplate";
      const autoWidth = true;
      const bookType = "xlsx";
      exportJson2Excel(
        tHeader,
        data,
        filename,
        undefined,
        undefined,
        autoWidth,
        bookType
      );
    },
    addRow() {
      if (this.form.teacher == undefined) {
        this.form.teacher = new Array();
      }
      let row = {
        name: "",
        idcard: "",
        year: "",
        sex: "",
        phone: "",
      };
      this.form.teacher.push(row);
    },
    addRow1() {
      // if(this.form.stu.length+1 === this.form.pro_num1) {
      //   this.disabled1 = true;
      // }
      if (this.form.stu == undefined) {
        this.form.stu = new Array();
      }
      let row = {
        name: "",
        idcard: "",
        year: "",
        sex: "",
        phone: "",
        instrument: "",
        choir: "",
      };
      this.form.stu.push(row);
    },
    addRow2() {
      // if(this.form.studen.length+1 === this.form.pro_num2) {
      //   this.disabled2 = true;
      // }
      if (this.form.studen == undefined) {
        this.form.studen = new Array();
      }
      let row = {
        name: "",
        idcard: "",
        year: "",
        sex: "",
        phone: "",
        instrument: "",
        choir: "",
      };
      this.form.studen.push(row);
    },
    resetTable1() {
      this.form.teacher = [];
    },
    resetTable2() {
      this.form.stu = [];
    },
    resetTable3() {
      this.form.studen = [];
    },
    removeData1(row, index) {
      this.form.teacher.splice(index, 1);
    },
    removeData2(row, index) {
      this.form.stu.splice(index, 1);
    },
    removeData3(row, index) {
      this.form.studen.splice(index, 1);
    },
    // 导入excel1
    handleChange1(file, fileList) {
      this.fileTemp = file.raw;
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.import1(this.fileTemp);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！",
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！",
        });
      }
    },
    handleExceed1() {
      this.$message({
        type: "warning",
        message: "超出最大上传文件数量的限制！",
      });
      return;
    },
    handleRemove1(file, fileList) {
      this.fileTemp = null;
    },
    import1(obj) {
      let _this = this;
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据

      this.file = event.currentTarget.files[0];

      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;

      var reader = new FileReader();

      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西

          //此处可对数据进行处理
          let arr = [];
          outdata.map((v) => {
            let obj = {};
            obj.name = v["姓名"];
            obj.idcard = v["身份证号"];
            obj.year = v["年龄"];
            obj.sex = v["性别"];
            obj.phone = v["联系方式"];
            arr.push(obj);
          });
          _this.form.teacher = arr;
          _this.len = arr.length;
          return arr;
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    // 导入excel2
    handleChange2(file, fileList) {
      this.fileTemp = file.raw;
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.import2(this.fileTemp);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！",
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！",
        });
      }
    },
    handleExceed2() {
      this.$message({
        type: "warning",
        message: "超出最大上传文件数量的限制！",
      });
      return;
    },
    handleRemove2(file, fileList) {
      this.fileTemp = null;
    },
    import2(obj) {
      let _this = this;
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据

      this.file = event.currentTarget.files[0];

      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;

      var reader = new FileReader();

      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西

          //此处可对数据进行处理
          let arr = [];
          outdata.map((v) => {
            let obj = {};
            obj.name = v["姓名"];
            obj.idcard = v["身份证号"];
            obj.year = v["年龄"];
            obj.sex = v["性别"];
            obj.phone = v["联系方式"];
            obj.instrument = v["乐器（管乐队）"];
            obj.choir = v["声部（合唱队）"];
            arr.push(obj);
          });
          _this.form.stu = arr;
          _this.len = arr.length;
          return arr;
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    // 导入excel3
    handleChange3(file, fileList) {
      this.fileTemp = file.raw;
      if (this.fileTemp) {
        if (
          this.fileTemp.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          this.fileTemp.type == "application/vnd.ms-excel"
        ) {
          this.import3(this.fileTemp);
        } else {
          this.$message({
            type: "warning",
            message: "附件格式错误，请删除后重新上传！",
          });
        }
      } else {
        this.$message({
          type: "warning",
          message: "请上传附件！",
        });
      }
    },
    handleExceed3() {
      this.$message({
        type: "warning",
        message: "超出最大上传文件数量的限制！",
      });
      return;
    },
    handleRemove3(file, fileList) {
      this.fileTemp = null;
    },
    import3(obj) {
      let _this = this;
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据

      this.file = event.currentTarget.files[0];

      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;

      var reader = new FileReader();

      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西

          //此处可对数据进行处理
          let arr = [];
          outdata.map((v) => {
            let obj = {};
            obj.name = v["姓名"];
            obj.idcard = v["身份证号"];
            obj.year = v["年龄"];
            obj.sex = v["性别"];
            obj.phone = v["联系方式"];
            obj.instrument = v["乐器（管乐队）"];
            obj.choir = v["声部（合唱队）"];
            arr.push(obj);
          });
          _this.form.studen = arr;
          _this.len = arr.length;
          return arr;
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },

    //上传视频
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.warning(`每次只能上传 ${this.limit} 个文件`);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {},
    // 删除文件之前的钩子
    // beforeRemove(file, fileList) {
    //   return this.$confirm(`确定移除 ${file.name}？`);
    // },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {},
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList) {
      this.fileList = fileList;
    },
    //文件上传前的校验
    beforeAvatarUpload(file) {
      const isLt100M =
        file.size / 1024 / 1024 > 0 && file.size / 1024 / 1024 < 2024;
      const isLt30 = file.name.length < 30;
      
      // if (!isLt100M) {
      //   this.$message.error("上传视频大小要在10MB~1GB之间哦!");
      //   return false;
      // }
      // if (!isLt30) {
      //   this.$message.error("上传视频文件名称长度必须要小于30个文字哦!");
      //   return false;
      // }
      // 请求后台接口拿配置参数
      // return new Promise((resolve, reject) => {
      //   this.$http
      //     .post("http://vehsihihi.wzhyuming.top/api/oss")
      //     .then((res) => {
      //       this.dataObj = res.data.data; //接口返回配置参数
      //       console.log(res.data);
      //       resolve(true);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //       reject(false);
      //     });
      // });
    },

    // http-request属性来覆盖默认的上传行为（即action="url"），自定义上传的实现
    Upload(file) {
      const that = this;
      async function multipartUpload() {
        let temporary = file.file.name.lastIndexOf(".");
        let fileNameLength = file.file.name.length;
        let fileFormat = file.file.name.substring(
          temporary + 1,
          fileNameLength
        );
        let fileName = getFileNameUUID() + "." + fileFormat;
        client(that.dataObj)
          .multipartUpload(`videoTest/${fileName}`, file.file, {
            progress: function (p) {
              //p进度条的值
              // console.log(p);
              that.showProgress = true;
              that.progress = Math.floor(p * 100);
            },
          })
          .then((result) => {
            let url = result.res.requestUrls[0];

            let index = 0;
            for (let i = 0; i < url.length; i++) {
              if (url[i] === "?") {
                index = i;
              }
            }
            let r = url.slice(0, index);
            that.form.pro_url = r;
          })
          .catch((err) => {
            console.log("err:", err);
          });
      }
      multipartUpload();
    },
  },
});
</script>

<style scoped>
.box-card {
  width: 85%;
  margin: 10px 7%;
}
.el-row {
  margin-bottom: 5px;
}
.btn {
  margin-left: 42% !important;
  width: 180px;
}
.upload-demo /deep/ .el-upload--text {
  width: unset;
  border: none;
  height: unset; /* 去掉这个属性,首选继承父级的属性，然后再选择继承本身属性值。即：inherit>initial */
  background-color: transparent;
}
.upload-demo /deep/ .el-upload-list__item:first-child {
  margin-top: 0;
}
.upload-demo /deep/ .el-upload-list__item {
  width: 200px;
}
.video_button {
  margin-top: 10px;
}
</style>
