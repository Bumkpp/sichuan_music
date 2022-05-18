import { ElMessage } from "element-plus";

export function validateEmpty(data: any) {
    if (typeof data === "string") {
        if (data === "") {
            ElMessage.error("该数据不能为空");
            return false;
        }
    }
    else {
        try {
            Object.values(data).forEach((item: any) => {
                if (item.length === 0) {
                    ElMessage.error("您还有数据未填写");
                    throw new Error("您还有数据未填写");
                }
            });
        } catch (err) { }
    }
}