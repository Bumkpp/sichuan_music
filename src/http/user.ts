import request from "./request";
const Login = async (params: any) => {
    return await request.post<string>("/api/user/login", JSON.stringify(params));
};

const queryAccount = async () => {
    return await request.post<string>("/api/user/selectusername");
};

export { Login,queryAccount };