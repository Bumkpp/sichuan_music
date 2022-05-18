import { ElMessage } from "element-plus";

export function validatePhone(item: any) {
  const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
  if (!reg.test(item.phone)) {
    ElMessage.error("请输入正确的手机号码");
  }
}
