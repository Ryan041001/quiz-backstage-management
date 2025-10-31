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
                        <span>题目筛选</span>
                    </div>
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <el-form-item label="题目">
                            <el-input v-model="formInline.user" placeholder="请输入题目关键词"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="onAddNewQuestion" icon="el-icon-plus">添加题目</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>

                <!-- 显示的table -->
                <el-card class="box-card" style="margin-top: 20px;">
                    <div slot="header" class="clearfix">
                        <span>题目列表</span>
                    </div>
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column label="序号" width="50">
                            <template slot-scope="scope">
                                <span style="margin-left: 10px">{{ scope.row.id }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="题目" width="450">
                            <template slot-scope="scope">
                                <span>{{ scope.row.question }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="选项" width="260">
                            <template slot-scope="scope">
                                <el-tag size="medium" type="primary" style="margin-right: 5px;">{{ scope.row.optionA
                                    }}</el-tag>
                                <br>
                                <el-tag size="medium" type="success" style="margin-right: 5px;">{{ scope.row.optionB
                                    }}</el-tag>
                                <br>
                                <el-tag size="medium" type="info" style="margin-right: 5px;">{{ scope.row.optionC
                                    }}</el-tag>
                                <br>
                                <el-tag size="medium" type="warning" style="margin-right: 5px;">{{ scope.row.optionD
                                    }}</el-tag>
                            </template>
                        </el-table-column> <el-table-column label="答案" width="180">
                            <template slot-scope="scope">
                                <el-tag size="medium" :type="getAnswerTagType(scope.row.answer)">{{ scope.row.answer
                                }}</el-tag>
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

                <!-- 添加题目对话框 -->
                <el-dialog title="添加新题目" :visible.sync="dialogFormVisible" width="40%" custom-class="beautify-dialog">
                    <el-form :model="form">
                        <el-form-item label="题目" :label-width="formLabelWidth">
                            <el-input v-model="form.question" autocomplete="off" type="textarea" :rows="2"
                                prefix-icon="el-icon-edit-outline"></el-input>
                        </el-form-item>
                        <el-form-item label="选项A" :label-width="formLabelWidth">
                            <el-input v-model="form.optionA" autocomplete="off"
                                prefix-icon="el-icon-tickets"></el-input>
                        </el-form-item>
                        <el-form-item label="选项B" :label-width="formLabelWidth">
                            <el-input v-model="form.optionB" autocomplete="off"
                                prefix-icon="el-icon-tickets"></el-input>
                        </el-form-item>
                        <el-form-item label="选项C" :label-width="formLabelWidth">
                            <el-input v-model="form.optionC" autocomplete="off"
                                prefix-icon="el-icon-tickets"></el-input>
                        </el-form-item>
                        <el-form-item label="选项D" :label-width="formLabelWidth">
                            <el-input v-model="form.optionD" autocomplete="off"
                                prefix-icon="el-icon-tickets"></el-input>
                        </el-form-item>
                        <el-form-item label="答案" :label-width="formLabelWidth">
                            <el-input v-model="form.answer" autocomplete="off" prefix-icon="el-icon-key"></el-input>
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
                question: '',
                optionA: '',
                optionB: '',
                optionC: '',
                optionD: '',
                answer: ''
            },
            formInline: {
                user: '',
                region: ''
            },
            tableData: [{
                id: "1",
                question: '以下哪个标签用于定义网页的导航部分？',
                optionA: 'A. <header>',
                optionB: 'B. <nav>',
                optionC: 'C. <section>',
                optionD: 'D. <aside>',
                answer: 'B. <nav>'
            }, {
                id: "2",
                question: '关于HTTP状态码,哪一个表示请求的资源未找到？',
                optionA: 'A. 200',
                optionB: 'B. 301',
                optionC: 'C. 404',
                optionD: 'D. 502',
                answer: 'C. 404'
            }, {
                id: "3",
                question: '下列哪种JavaScript声明方式可以创建不可重新赋值的变量？',
                optionA: 'A. var total = 0',
                optionB: 'B. let total = 0',
                optionC: 'C. const total = 0',
                optionD: 'D. function total() {}',
                answer: 'C. const total = 0'
            }, {
                id: "4",
                question: '在CSS中,哪条语句可以让元素水平居中？',
                optionA: 'A. margin: 0 auto;',
                optionB: 'B. text-align: left;',
                optionC: 'C. display: inline;',
                optionD: 'D. float: right;',
                answer: 'A. margin: 0 auto;'
            }]
        }
    },
    methods: {
        onAddNewQuestion() {
            this.dialogFormVisible = true;
        },
        onSubmit() {
            console.log('submit!');
        },
        getAnswerTagType(answer) {
            const prefix = (answer || '').trim().charAt(0).toUpperCase();
            const map = {
                A: 'primary',
                B: 'success',
                C: 'info',
                D: 'warning',
            };
            return map[prefix] || 'danger';
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

.beautify-dialog .el-input__inner,
.beautify-dialog .el-textarea__inner {
    border-radius: 15px;
}

.beautify-dialog .el-form-item__label {
    font-weight: bold;
}
</style>
