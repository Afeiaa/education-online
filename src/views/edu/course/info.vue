<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-form label-width="120px">

        <el-form-item label="课程标题">
            <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
        </el-form-item>

        <!-- 所属分类：级联下拉列表 -->
        <!-- 一级分类 -->
        <el-form-item label="课程类别">
          <el-select
            v-model="courseInfo.subjectParentId"
            placeholder="一级分类"
            @change="subjectLevelOneChanged">
            <el-option
              v-for="subject in oneSubjectList"
              :key="subject.id"
              :label="subject.title"
              :value="subject.id"/>
          </el-select>

          <!-- 二级分类 -->
          <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
            <el-option
              v-for="subject in twoSubjectList"
              :key="subject.id"
              :label="subject.title"
              :value="subject.id"/>
          </el-select>

        </el-form-item>

        <!-- 课程讲师 TODO -->
        <!-- 课程讲师 -->
        <el-form-item label="课程讲师">
          <el-select
            v-model="courseInfo.teacherId"
            placeholder="请选择">
            <el-option
              v-for="teacher in teacherList"
              :key="teacher.id"
              :label="teacher.name"
              :value="teacher.id"/>
          </el-select>
        </el-form-item>


        <el-form-item label="总课时">
            <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
        </el-form-item>

        <!-- 课程简介 TODO -->
        <el-form-item label="课程简介">
            <el-input v-model="courseInfo.description"/>
            <!-- <tinymce :height="300" v-model="courseInfo.description"/> -->
        </el-form-item>

        <!-- 课程封面-->
        <el-form-item label="课程封面">

          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :action="BASE_API+'/eduoss/fileoss/avatar'"
            class="avatar-uploader">
            <img :src="courseInfo.cover">
          </el-upload>

        </el-form-item>

        <el-form-item label="课程价格">
            <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
        </el-form-item>
    </el-form>

  </div>
</template>



<script>
import course from '@/api/edu/course'
import teacherApi from '@/api/edu/teacher'
import subjectApi from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce'


const defaultForm = {
  title: '',
  subjectId: '',
  subjectParentId: '',
  teacherId: '',
  lessonNum: 0,
  description: '',
  cover: '',
  price: 0,
  cover: "/static/3.jpg",
}

export default {
  components: { Tinymce },

  data() {
    return {
      courseInfo: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用
      teacherList: [],
      oneSubjectList: [],
      twoSubjectList: [],
      courseId: '',
      BASE_API: process.env.BASE_API // 接口API地址
    }
  },

  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getInfo()
      this.initTeacherList()
      console.log(this.oneSubjectList)
      console.log(this.twoSubjectList)
    } else {
      this.init()
      this.courseInfo = defaultForm
    }
  },

  methods: {
    init() {
      this.initTeacherList()
      this.initOneSubjectList()
    },

    getInfo() {
      course.getCourseInfoById(this.courseId).then(res => {
        this.courseInfo = res.data.curseInfo
        subjectApi.getNestedTreeList().then(res => {
          this.oneSubjectList = res.data.list
          console.log(res.data.list)
          for (let i = 0; i < this.oneSubjectList.length; i++) {
              var oneSubject = this.oneSubjectList[i]
              if (oneSubject.id === this.courseInfo.subjectParentId) {
                  this.twoSubjectList = oneSubject.children 
              }
          }

        })

      })
    },
    
    initTeacherList() {
      teacherApi.getAllTeacher().then((res) => {
        this.teacherList = res.data.items
      })
    },

    initOneSubjectList() {
      subjectApi.getNestedTreeList().then(res => {
        this.oneSubjectList = res.data.list
      })
    },

    // 根据一级分类的选择，初始化二级分类
    subjectLevelOneChanged(value) {
      console.log(value)
      for (let i = 0; i < this.oneSubjectList.length; i++) {
          if (this.oneSubjectList[i].id === value) {
              this.twoSubjectList = this.oneSubjectList[i].children 
              this.courseInfo.subjectId = ''
          }
      }
    },

    next() {
      console.log('next')
      this.saveOrUpdate()
    },

    addCourse() {
        course.saveCourseInfo(this.courseInfo)
          .then(response => {
            //提示
            this.$message({
              type: 'success',
              message: '添加课程信息成功!'
            });
            //跳转到第二步
            this.$router.push({path:'/course/chapter/'+response.data.courseId})
        })
    },
  //修改课程
  updateCourse() {
      course.updateCourseInfoById(this.courseInfo)
        .then(() => {
              //提示
            this.$message({
              type: 'success',
              message: '修改课程信息成功!'
            });
            //跳转到第二步
            this.$router.push({path:'/course/chapter/'+this.courseId})
        })
  },
  saveOrUpdate() {
      //判断添加还是修改
      if(!this.courseInfo.id) {
          //添加
          this.addCourse()
      } else {
          this.updateCourse()
      }
  },

    handleAvatarSuccess(res, file) {
      console.log(res)// 上传响应
      console.log(URL.createObjectURL(file.raw))// base64编码
      this.courseInfo.cover = res.data.url
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

  }
}
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>