<template>
    <div class="vueCropperList_main">
        <img v-if="coverUrl" :src="coverUrl" alt="" class="content-img">
        <el-upload class="add-avatar-uploader" action="#" :limit="1" ref="coverUrl" accept="image/png,image/jpg,image/jpeg,image/gif"
                   :auto-upload="false" :show-file-list="false" :on-change='changeUpload'>
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <!-- vueCropper 剪裁图片实现-->
        <el-dialog title="图片剪裁" :visible.sync="cropperVisible" append-to-body width="75%" center @close="clearFn">
            <div class="cropper-content">
                <div class="cropper" style="text-align:center">
                    <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType"
                                :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox"
                                :original="option.original" :autoCrop="option.autoCrop" :fixed="option.fixed"
                                :centerBox="option.centerBox" :infoTrue="option.infoTrue" :fixedBox="option.fixedBox" @realTime="realTime">
                    </vueCropper>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="clearFn">取 消</el-button>
                <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "vueCropperList",
        data () {
            return {
                coverUrl: '',
                // 防止重复提交
                loading: false,
                coverUrlList: [],
                cropperVisible: false, //  图片剪裁弹框
                // 图片文件分辨率的宽度
                width: {
                    type: Number,
                    default: 300
                },
                // 图片文件分辨率的高度
                height: {
                    type: Number,
                    default: 150
                },
                // 裁剪组件的基础配置option
                option: {
                    img: '', // 裁剪图片的地址
                    info: true, // 裁剪框的大小信息
                    outputSize: 0.8, // 裁剪生成图片的质量
                    outputType: 'jpeg || png', // 裁剪生成图片的格式
                    canScale: false, // 图片是否允许滚轮缩放
                    autoCrop: true, // 是否默认生成截图框
                    autoCropWidth: this.width, // 默认生成截图框宽度
                    autoCropHeight: this.height, // 默认生成截图框高度
                    fixedBox: true, // 固定截图框大小 不允许改变
                    fixed: false, // 是否开启截图框宽高固定比例
                    full: false, // 是否输出原图比例的截图
                    canMoveBox: false, // 截图框能否拖动
                    original: false, // 上传图片按照原始比例渲染
                    centerBox: false, // 截图框是否被限制在图片里面
                    infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
                },
                previews: {},
                fileinfo: {}
            }
        },
        methods: {
            changeUpload (file, fileList) {
                const isLt2M = file.size / 1024 < 100
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 100kB!')
                    this.$refs.coverUrl.clearFiles()
                    return false
                }
                // this.coverUrl = file
                let url = URL.createObjectURL(file.raw)
                console.log(file)
                this.coverUrlList.push({
                    name: file.name,
                    file: file,
                    url: url
                })
                // 上传成功后将图片地址赋值给裁剪框显示图片
                this.$nextTick(() => {
                    this.option.img = url
                    this.cropperVisible = true
                })
            },
            clearFn () {
                this.cropperVisible = false
                this.$refs.coverUrl.clearFiles()
            },
            // 点击裁剪，这一步是可以拿到处理后的地址
            finish () {
                this.$refs.cropper.getCropBlob((data) => {
                    console.log(this.coverUrlList)
                    this.coverUrlList.forEach( e => {
                        this.coverUrl = e.url
                    })
                    this.cropperVisible = false
                    // let coverfile = ''
                    // let map = {
                    //     'image/jpg': '.jpg',
                    //     'image/png': '.png',
                    //     'image/jpeg': '.jpeg',
                    //     'image/gif': '.gif'
                    // }
                    // for (let i = 0; i < this.coverUrlList.length; i++) {
                    //     let file = this.coverUrlList[i].file
                    //     console.log(file)
                    //     coverfile = getFileNameUUID() + map[file.raw.type]
                    //     this.coverUrlList[i].name = coverfile
                    // }
                    // this.loading = true
                    // // 上传阿里云服务器
                    // put(coverfile, data).then(result => {
                    //     this.cropperVisible = false
                    //     console.log(result)
                    //     this.InfoForm.coverUrl = result.url
                    // }).catch(err => {
                    //     this.$refs.coverUrl.clearFiles()
                    //     this.loading = false
                    // })
                })
            },
            // 实时预览函数
            realTime (data) {
                this.previews = data
            },
        }
    }
</script>

<style scoped lang="less">
.vueCropperList_main{
}
</style>
