<template>
    <div id="app">
        <!-- <user-view></user-view> -->
        <!-- <question-view></question-view> -->
        <router-view></router-view>
    </div>
</template>

<script>
// import UserView from './views/elment/UserView.vue';
// import QuestionView from './views/elment/QuestionView.vue';
export default {
    components: {},
    data() {
        return {
            message: 'Hello World',
        };
    },
    methods: {

    },
};
</script>

<style>
body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #f5f7fa;
    /* 浅灰背景，更现代 */
    font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#app {
    min-height: 100vh;
    width: 100%;
}
</style>