import { ElMessage } from "element-plus";

export function validateIdcard(item: any) {
  const reg =
    /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (reg.test(item.idcard)) {
    // 身份证号码是否合法
    var org_birthday = item.idcard.substring(6, 14);
    var org_gender = item.idcard.substring(16, 17);
    var sex = org_gender % 2 == 1 ? "男" : "女";
    var birthday =
      org_birthday.substring(0, 4) +
      "-" +
      org_birthday.substring(4, 6) +
      "-" +
      org_birthday.substring(6, 8);
    var birthdays = new Date(birthday.replace(/-/g, "/"));
    let d = new Date();
    let year =
      d.getFullYear() -
      birthdays.getFullYear() -
      (d.getMonth() < birthdays.getMonth() ||
      (d.getMonth() == birthdays.getMonth() &&
        d.getDate() < birthdays.getDate())
        ? 1
        : 0);

    // 赋值给表格
    item.sex = sex;
    item.year = year;
  } else {
    ElMessage.error("请输入正确的身份证号码");
  }
}