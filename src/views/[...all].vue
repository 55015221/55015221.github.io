<!-- <route>
{
    name: 'notFound',
    meta: {
        title: "找不到页面",
        layout: false
    }
}
</route> -->

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {onBeforeRouteLeave, useRouter} from 'vue-router'

const router = useRouter()

const state = ref({
    inter: null,
    countdown: 5
})

onMounted(() => {
    state.value.inter = setInterval(() => {
        state.value.countdown--
        if (state.value.countdown == 0) {
            clearInterval(state.value.inter)
            goBack()
        }
    }, 1000)
})

onBeforeRouteLeave(() => {
    clearInterval(state.value.inter)
})

const goBack = () => router.push('/')
</script>

<template>
    <div class="notfound">
<!--        <svg-icon name="404" class="icon"/>-->
        <div class="content">
            <h1>404</h1>
            <div class="desc">抱歉，你访问的页面不存在</div>
            <el-button type="primary" @click="goBack">{{ state.countdown }} 秒后，返回首页</el-button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.notfound {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 700px;
    @include position-center(xy);

    .el-image {
        width: 400px;
        height: 400px;
    }

    .content {
        h1 {
            margin: 0;
            font-size: 72px;
            color: var(--el-text-color-primary);
        }

        .desc {
            margin: 20px 0 30px;
            font-size: 20px;
            color: var(--el-text-color-secondary);
        }
    }
}
</style>
