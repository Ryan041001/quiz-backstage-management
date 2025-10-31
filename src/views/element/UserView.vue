<template>
    <el-container class="container">
        <el-header class="header">Quiz后台管理</el-header>
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
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="用户名">
                            <el-input v-model="formInline.user" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="onAddNewUser" icon="el-icon-plus">添加用户</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>

                <!-- 显示的table -->
                <el-card class="box-card" style="margin-top: 20px;">
                    <div slot="header" class="clearfix">
                        <span>用户列表</span>
                    </div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column label="日期" width="180">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.date }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="姓名" width="180">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>姓名: {{ scope.row.name }}</p>
                                    <p>住址: {{ scope.row.address }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                                    icon="el-icon-edit">编辑</el-button>
                                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                                    icon="el-icon-delete">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <br>
                    <!-- 分页 -->
                    <el-pagination background layout="prev, pager, next" :total="1000" style="text-align: center;">
                    </el-pagination>
                </el-card>

                <!-- 添加用户对话框 -->
                <el-dialog title="添加新用户" :visible.sync="dialogFormVisible" width="35%" custom-class="beautify-dialog">
                    <el-form :model="form">
                        <el-form-item label="用户名" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"
                                prefix-icon="el-icon-user-solid"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" :label-width="formLabelWidth">
                            <el-input v-model="form.password" type="password" autocomplete="off"
                                prefix-icon="el-icon-lock" show-password></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" :label-width="formLabelWidth">
                            <el-input v-model="form.confirmPassword" type="password" autocomplete="off"
                                prefix-icon="el-icon-check" show-password></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false" icon="el-icon-close">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false" icon="el-icon-check">确
                            定</el-button>
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
            form: {
                name: '',
                password: '',
                confirmPassword: '',
            },
            formInline: {
                user: '',
                region: ''
            },
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods: {
        onAddNewUser() {
            this.dialogFormVisible = true;
        },
        onSubmit() {
            console.log('submit!');
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        }
    }
}
</script>

<style scoped>
.container {
    height: 100vh;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.header {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    background-color: #fff;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
}

.aside {
    background-color: #fff;
    border-right: 1px solid #e6e6e6;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
    border: none;
}

.main {
    background-color: #f4f4f5;
    padding: 20px;
}

.box-card {
    border-radius: 8px;
}

.beautify-dialog .el-input__inner {
    border-radius: 15px;
}

.beautify-dialog .el-form-item__label {
    font-weight: bold;
}
</style>
