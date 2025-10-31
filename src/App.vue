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
    margin: 0;   padding: 0;
    box-sizing: border-box;
}
</style>