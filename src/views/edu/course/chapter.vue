<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="最终发布"/>
    </el-steps>

    <el-button type="text" @click="openChapterDialog()">添加章节</el-button>
    <!-- 章节 -->
    <ul class="chanpterList">
        <li
            v-for="chapter in chapterVideoList"
            :key="chapter.id">
            <p>
                {{ chapter.title }}

                <span class="acts">
                    <el-button style="" type="text" @click="openVideo(chapter.id)">添加小节</el-button>
                    <el-button style="" type="text" @click="openEditChatper(chapter.id)">编辑</el-button>
                    <el-button type="text" @click="removeChapter(chapter.id)">删除</el-button>
                </span>
            </p>

            <!-- 视频 -->
            <ul class="chanpterList videoList">
                <li
                    v-for="video in chapter.children"
                    :key="video.id">
                    <p>{{ video.title }}

                <span class="acts">
                    
                    <el-button style="" type="text" @click="openEditVideo(video.id)">编辑</el-button>
                    <el-button type="text" @click="removeVideo(video.id)">删除</el-button>
                </span>
                    </p>
                </li>
            </ul>
        </li>
    </ul>
    <div>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>

    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
        <el-form :model="chapter" label-width="120px">
            <el-form-item label="章节标题">
                <el-input v-model="chapter.title"/>
            </el-form-item>
            <el-form-item label="章节排序">
                <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.free">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <!-- TODO -->
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import chapterApi from '@/api/edu/chapter'
import videoApi from '@/api/edu/video'

export default {
  data() {
    return {
      saveBtnDisabled: false, // 保存按钮是否禁用
      saveVideoBtnDisabled: false,
      courseId: '', // 所属课程
      chapterVideoList: [], // 章节嵌套课时列表
      dialogChapterFormVisible: false, //是否显示章节表单
      dialogVideoFormVisible: false,
      chapter: {// 章节对象
        title: '',
        courseId: '',
        sort: 0
      },
      // chapterId: '',
      video: {// 课时对象
        title: '',
        sort: 0,
        free: 0,
        videoSourceId: ''
      },
    }
  },

  created() {
      console.log('chapter created')
      this.init()
  },

  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        // 根据id获取课程基本信息
        this.getChapterVideo()
      }
    },

    // 获取章节和小结信息
    getChapterVideo() {
      chapterApi.getAallChapterVideo(this.courseId).then(response => {
        this.chapterVideoList = response.data.allChapterVideo
      })
    },

    /***********************************小节操作***********************************/
    openVideo(chapterId) {
        this.dialogVideoFormVisible = true
        // this.chapterId = chapterId
        this.video.chapterId = chapterId
    },

    saveOrUpdateVideo() {
      if (!this.video.id) {
        this.save()
      }
      this.update()
    },

    save() {
      this.video.courseId = this.courseId
      // this.video.chapterId = this.chapterId
      videoApi.save(this.video).then(() => {
        this.$message({
          type: 'success',
          message: '添加小节成功!'
        })
        this.dialogVideoFormVisible = false
        // this.chapterId = ''
        this.getChapterVideo()
      })
    },

    // 点击确认，修改小节
    update() {
      this.video.courseId = this.courseId
      videoApi.updateById(this.video).then(() => {
        this.$message({
          type: 'success',
          message: '修改小节成功!'
        })
        this.dialogVideoFormVisible = false
        this.getChapterVideo()
      })
    },

    //编辑小节
    openEditVideo(videoId) {
      this.dialogVideoFormVisible = true
      videoApi.getById(videoId).then(res => {
        this.video = res.data.videoInfo
      })
    },

    removeVideo(videoId) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        videoApi.removeById(videoId).then(() => {
          this.$message({
            type: 'success',
            message: '删除小节成功!'
          })
          this.getChapterVideo()
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.message
          })
        }
      })
    },


    /***********************************章节操作***********************************/
    // 添加章节
    addChapter() {
      this.chapter.courseId = this.courseId
      chapterApi.save(this.chapter).then(() => {
        this.$message({
          type: 'success',
          message: '添加章节成功!'
        })
        this.dialogChapterFormVisible = false
        this.getChapterVideo()
      })
    },
    // 修改章节
    updateChapter() {
      this.chapter.courseId = this.courseId
      chapterApi.updateById(this.chapter).then(() => {
        this.$message({
          type: 'success',
          message: '修改章节成功!'
        })
        this.dialogChapterFormVisible = false
        this.getChapterVideo()
      })
    },
    // 添加和修改章节
    saveOrUpdate() {
      if (!this.chapter.id) {
        // save
        this.addChapter()
      }
      // update
      this.updateChapter()
     
    },

    // 添加章节弹框
    openChapterDialog() {
        this.dialogChapterFormVisible = true
        this.chapter = { // 章节对象清空
          title: '',
          courseId: '',
          sort: 0
        }
    },

    // 修改章节
    openEditChatper(chapterId) {
      this.dialogChapterFormVisible = true
      chapterApi.getById(chapterId).then(res => {
          this.chapter = res.data.chapter
      })
    },

    // 删除章节
    removeChapter(chapterId) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        chapterApi.removeById(chapterId).then(() => {
          this.getChapterVideo()// 刷新列表
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.message
          })
        }
      })
    },

    previous() {
      console.log('previous')
      this.$router.push({ path: `/course/info/${this.courseId}` })
    },

    next() {
      console.log('next')
      this.$router.push({ path: `/course/publish/${this.courseId}` })
    }
  }
}
</script>


<style scoped>
.chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {
    float: right;
    font-size: 14px;
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>