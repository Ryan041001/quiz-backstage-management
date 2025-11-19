<template>
    <el-container class="container">
        <el-header class="header">
            <span>Quiz后台管理</span>
            <el-button type="danger" size="small" icon="el-icon-switch-button" @click="handleLogout"
                style="margin-left: auto;">退出登录</el-button>
        </el-header>
        <el-container>
            <el-aside width="220px" class="aside">
                <el-menu :default-openeds="['1']" class="el-menu-vertical-demo" :default-active="$route.path" router>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-setting"></i><span>管理选项</span></template>
                        <el-menu-item index="/user">
                            <i class="el-icon-user"></i>
                            <span slot="title">用户管理</span>
                        </el-menu-item>
                        <el-menu-item index="/question">
                            <i class="el-icon-question"></i>
                            <span slot="title">题目管理</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main class="main">
                <!-- 顶部查询表单 -->
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>用户筛选</span>
                    </div>
                    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
                        <el-form-item label="用户名">
                            <el-input v-model="queryForm.username" placeholder="请输入用户名"
                                @keyup.enter.native="loadUsers"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="loadUsers" icon="el-icon-search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="showAddDialog" icon="el-icon-plus">添加用户</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>

                <!-- 显示的table -->
                <el-card class="box-card" style="margin-top: 20px;">
                    <div slot="header" class="clearfix">
                        <span>用户列表</span>
                    </div>
                    <el-table :data="tableData" style="width: 100%" v-loading="loading">
                        <el-table-column label="ID" prop="id" width="80"></el-table-column>
                        <el-table-column label="用户名" prop="username" width="200"></el-table-column>
                        <el-table-column label="创建时间" prop="createTime" width="200"></el-table-column>
                        <el-table-column label="更新时间" prop="updateTime" width="200"></el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
                                    icon="el-icon-delete">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <br>
                    <!-- 分页 -->
                    <el-pagination background layout="prev, pager, next, total" :total="total" :page-size="pageSize"
                        :current-page="currentPage" @current-change="handlePageChange" style="text-align: center;">
                    </el-pagination>
                </el-card>

                <!-- 添加用户对话框 -->
                <el-dialog title="添加新用户" :visible.sync="dialogFormVisible" width="35%" custom-class="beautify-dialog">
                    <el-form :model="userForm" :rules="formRules" ref="userForm">
                        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                            <el-input v-model="userForm.username" autocomplete="off"
                                prefix-icon="el-icon-user-solid"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                            <el-input v-model="userForm.password" type="password" autocomplete="off"
                                prefix-icon="el-icon-lock" show-password></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false" icon="el-icon-close">取 消</el-button>
                        <el-button type="primary" @click="handleAddUser" icon="el-icon-check">确 定</el-button>
                    </div>
                </el-dialog>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            dialogFormVisible: false,
            formLabelWidth: '80px',
            userForm: {
                username: '',
                password: '',
            },
            formRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
                ]
            },
            queryForm: {
                username: ''
            },
            tableData: [],
            loading: false,
            currentPage: 1,
            pageSize: 5,
            total: 0
        }
    },
    mounted() {
        this.loadUsers();
    },
    methods: {
        // 加载用户列表
        async loadUsers() {
            this.loading = true;
            try {
                const response = await this.$http.get('/users', {
                    params: {
                        page: this.currentPage,
                        pageSize: this.pageSize,
                        username: this.queryForm.username || undefined
                    }
                });
                this.tableData = response.data.rows;
                this.total = response.data.total;
            } catch (error) {
                console.error('加载用户列表失败:', error);
            } finally {
                this.loading = false;
            }
        },
        // 显示添加对话框
        showAddDialog() {
            this.userForm = { username: '', password: '' };
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs.userForm.clearValidate();
            });
        },
        // 添加用户
        handleAddUser() {
            this.$refs.userForm.validate(async (valid) => {
                if (valid) {
                    try {
                        await this.$http.post('/user', this.userForm);
                        this.$message.success('添加用户成功');
                        this.dialogFormVisible = false;
                        this.loadUsers();
                    } catch (error) {
                        console.error('添加用户失败:', error);
                    }
                }
            });
        },
        // 删除用户
        handleDelete(row) {
            this.$confirm('确定要删除该用户吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                try {
                    await this.$http.delete('/deleteById', {
                        params: { id: row.id }
                    });
                    this.$message.success('删除用户成功');
                    this.loadUsers();
                } catch (error) {
                    console.error('删除用户失败:', error);
                }
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        // 分页切换
        handlePageChange(page) {
            this.currentPage = page;
            this.loadUsers();
        },
        // 退出登录
        handleLogout() {
            this.$confirm('确定要退出登录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                localStorage.removeItem('token');
                this.$message.success('已退出登录');
                this.$router.push('/login');
            }).catch(() => { });
        }
    }
}
</script>

<style scoped>
/* 全局容器：使用柔和的浅色渐变背景 */
.container {
    height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
    overflow: hidden;
    /* 防止双滚动条 */
}

/* 顶栏：高斯模糊 + 玻璃质感 */
.header {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    color: #2c3e50;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
    z-index: 10;
    /* 确保阴影在内容之上 */
    padding: 0 40px;
}

/* 侧边栏：与顶栏呼应，更通透 */
.aside {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-right: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.02);
    transition: all 0.3s ease;
}

/* 菜单项样式优化 */
.el-menu {
    border-right: none;
    background: transparent;
}

.el-menu-item,
.el-submenu__title {
    color: #505050;
    font-weight: 500;
    margin: 8px 10px;
    border-radius: 12px;
    transition: all 0.3s;
}

.el-menu-item:hover,
.el-submenu__title:hover {
    background-color: rgba(255, 255, 255, 0.5);
    color: #409EFF;
    transform: translateX(5px);
}

.el-menu-item.is-active {
    background: linear-gradient(90deg, #409EFF, #a0cfff);
    color: white;
    box-shadow: 0 4px 15px rgba(64, 158, 255, 0.3);
}

.el-menu-item i,
.el-submenu__title i {
    color: inherit;
}

.main {
    padding: 30px;
    /* 增加滚动条美化 */
    overflow-y: auto;
}

/* 卡片：悬浮感 + 磨砂玻璃 */
.box-card {
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.65);
    backdrop-filter: blur(25px);
    -webkit-backdrop-filter: blur(25px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.box-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.12);
}

.clearfix span {
    font-weight: 700;
    font-size: 18px;
    color: #2c3e50;
    position: relative;
    padding-left: 12px;
}

/* 标题前的装饰竖线 */
.clearfix span::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 18px;
    background: #409EFF;
    border-radius: 2px;
}

/* 输入框和按钮的拟态/现代风格 */
::v-deep .el-input__inner {
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.5);
    box-shadow: inset 2px 2px 8px rgba(0, 0, 0, 0.02);
    transition: all 0.3s;
}

::v-deep .el-input__inner:focus {
    background: #fff;
    border-color: #409EFF;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

::v-deep .el-button {
    border-radius: 20px;
    border: none;
    font-weight: 600;
    transition: all 0.3s;
}

/* 按钮特定样式 */
::v-deep .el-button--primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 15px rgba(118, 75, 162, 0.3);
}

::v-deep .el-button--primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(118, 75, 162, 0.4);
}

::v-deep .el-button--success {
    background: linear-gradient(135deg, #2af598 0%, #009efd 100%);
    box-shadow: 0 4px 15px rgba(0, 158, 253, 0.3);
}

::v-deep .el-button--danger {
    background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
    background: linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%);
    /* 更鲜艳一点的红 */
    box-shadow: 0 4px 15px rgba(255, 117, 140, 0.3);
}

/* 表格样式优化 */
::v-deep .el-table {
    background-color: transparent !important;
}

::v-deep .el-table th,
::v-deep .el-table tr {
    background-color: transparent !important;
}

::v-deep .el-table th {
    color: #5e6d82;
    font-weight: 600;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
}

::v-deep .el-table td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.03) !important;
}

::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: rgba(64, 158, 255, 0.08) !important;
}

/* 标签 Tag 样式 */
.el-tag {
    border-radius: 8px;
    border: none;
    padding: 0 12px;
    height: 28px;
    line-height: 28px;
}

/* 分页样式 */
::v-deep .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #409EFF;
    box-shadow: 0 4px 10px rgba(64, 158, 255, 0.4);
}

::v-deep .el-pagination.is-background .el-pager li {
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 8px;
}

/* 对话框美化 */
::v-deep .el-dialog {
    border-radius: 20px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(30px);
    -webkit-backdrop-filter: blur(30px);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.5);
}

::v-deep .el-dialog__header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 20px 30px;
}

::v-deep .el-dialog__footer {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding: 20px 30px;
}
</style>
