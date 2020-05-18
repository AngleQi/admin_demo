<template>
    <div class="flexList_mian">
<!--        瀑布流布局flex-->
        <div class="waterfall">
            <div class="item">
                <div class="item-content">
                    <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
                </div>
            </div>
            <div class="item">
                <div class="item-content">
                    <img src="https://img.yzcdn.cn/vant/apple-4.jpg" alt="">
                </div>
            </div>
            <div class="item">
                <div class="item-content">
                    <img src="https://img.yzcdn.cn/vant/apple-1.jpg" alt="">
                </div>
            </div>
            <div class="item">
                <div class="item-content">
                    <img src="https://img.yzcdn.cn/vant/apple-2.jpg" alt="">
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "flexList"
    }
</script>

<style scoped lang="less">
.flexList_mian{
    .waterfall {
        width: 750px;
        margin: 0 auto;
        column-count: 2;
        column-gap: 0;
        .item {
            box-sizing: border-box;
            break-inside: avoid;
            padding: 10px 5px;
            .item-content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img {
                    width: 100%;
                }
            }
        }
    }
}
</style>
