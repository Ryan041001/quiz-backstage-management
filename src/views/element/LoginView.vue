<template>
    <div class="login-container">
        <el-card class="login-card">
            <div slot="header" class="login-header">
                <h2>Quiz后台管理系统</h2>
                <p>欢迎登录</p>
            </div>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="80px">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock"
                        placeholder="请输入密码" show-password @keyup.enter.native="handleLogin"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%" :loading="loading" @click="handleLogin">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "LoginView",
    data() {
        return {
            loginForm: {
                username: "",
                password: "",
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" },
                    { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" },
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 4, max: 20, message: "长度在 4 到 20 个字符", trigger: "blur" },
                ],
            },
            loading: false,
        };
    },
    methods: {
        handleLogin() {
            this.$refs.loginForm.validate(async (valid) => {
                if (valid) {
                    this.loading = true;
                    try {
                        // 添加 isAdmin 标识
                        const loginData = {
                            ...this.loginForm,
                            isAdmin: true
                        };
                        const response = await this.$http.post("/user/login", loginData);

                        // 保存token
                        localStorage.setItem("token", response.data);
                        localStorage.setItem("username", this.loginForm.username);

                        this.$message.success("登录成功");

                        // 跳转到原本要访问的页面，或默认跳转到用户管理页
                        const redirect = this.$route.query.redirect || "/user";
                        this.$router.push(redirect);
                    } catch (error) {
                        console.error("登录失败:", error);
                        this.$message.error(error.message || "登录失败，请检查用户名和密码");
                    } finally {
                        this.loading = false;
                    }
                }
            });
        },
    },
};
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-card {
    width: 420px;
    padding: 40px 30px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);
    color: #4a4a4a;
}

.login-header {
    text-align: center;
    margin-bottom: 30px;
}

.login-header h2 {
    font-size: 26px;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 10px;
    letter-spacing: 1px;
}

.login-header p {
    font-size: 14px;
    color: #7f8c8d;
    margin: 0;
}

::v-deep .el-form-item__label {
    color: #34495e;
    font-weight: 600;
}

::v-deep .el-input__inner {
    background-color: rgba(255, 255, 255, 0.5) !important;
    border-radius: 12px !important;
    border: 1px solid rgba(255, 255, 255, 0.6) !important;
    color: #2c3e50;
    height: 45px;
    line-height: 45px;
    transition: all 0.3s;
}

::v-deep .el-input__inner:focus {
    background-color: #fff !important;
    border-color: #409EFF !important;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

::v-deep .el-input__prefix .el-input__icon {
    line-height: 45px;
    color: #909399;
}

.el-button--primary {
    width: 100%;
    height: 45px;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 1px;
    box-shadow: 0 4px 15px rgba(118, 75, 162, 0.3);
    transition: all 0.3s ease;
    margin-top: 10px;
}

.el-button--primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(118, 75, 162, 0.4);
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

.el-button--primary:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(118, 75, 162, 0.2);
}
</style>
