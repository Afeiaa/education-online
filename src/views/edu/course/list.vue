<template>

    <div class="app-container">
        课程列表

        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="courseQuery.name" placeholder="课程名"/>
            </el-form-item>

            <el-form-item>
                <el-select v-model="courseQuery.status" clearable placeholder="发布状态">
                <el-option :value="'Normal'" label="已发布"/>
                <el-option :value="'Draft'" label="未发布"/>
                </el-select>
            </el-form-item>

            <el-form-item label="添加时间">
                <el-date-picker
                v-model="courseQuery.gmtCreate"
                type="datetime"
                placeholder="选择开始时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                />
            </el-form-item>
            <el-form-item>
                <el-date-picker
                v-model="courseQuery.gmtModified"
                type="datetime"
                placeholder="选择截止时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="00:00:00"
                />
            </el-form-item>

            <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
            <el-button type="default" @click="resetData()">清空</el-button>
        </el-form>

        <!-- 表格 -->
        <el-table
        :data="list"
        border
        fit
        highlight-current-row>

            <el-table-column
                label="序号"
                width="70"
                align="center">
                <template slot-scope="scope">
                {{ (page - 1) * limit + scope.$index + 1 }}
                </template>
            </el-table-column>

            <el-table-column prop="title" label="课程" width="120" />

            <el-table-column label="状态" width="80">
                <template slot-scope="scope">
                {{ scope.row.status==='Normal'?'已发布':'未发布' }}
                </template>
            </el-table-column>

            <el-table-column prop="lessonNum" label="课时数" />

            <!-- <el-table-column prop="lessonNum" label="课时数" width="60" />
            <el-table-column prop="subjectLevelOne" label="一级分类" width="60" />
            <el-table-column prop="subjectLevelTwo" label="二级分类" width="60" />
            <el-table-column prop="teacherName" label="讲师" width="60" /> -->

            <!-- <el-table-column prop="description" label="课程简介" /> -->

            <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

            <el-table-column prop="subjectLevelOne" label="浏览数量" width="60" />

            <el-table-column label="操作" width="200" align="center">
                <template slot-scope="scope">
                <router-link :to="'/course/info/'+scope.row.id">
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateDataById(scope.row.id)">修改课程</el-button>
                </router-link>
                <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
        :current-page="page"
        :page-size="limit"
        :total="total"
        style="padding: 30px 0; text-align: center;"
        layout="total, prev, pager, next, jumper"
        @current-change="getList"
        />

    </div>

</template>



<script>
import courseApi from '@/api/edu/course'

export default{
    data() {
        return {
            list: null,
            page: 1,
            limit: 10,
            total: 0,
            courseQuery: {}
        }
    },

    created() {
        this.getList()
    },

    methods: {
        removeDataById(courseId) {
             this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                courseApi.deleteCourse(courseId).then(res => {
                     this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.getList()  
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
                        message: '删除失败'
                    })
                }
            })
            
        },

        updateDataById(courseId) {
            courseApi.getCourseInfoById(courseId).then(res => {
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

        getList(page = 1) {
            this.page = page
            courseApi.getCourseList(this.page, this.limit, this.courseQuery)
                .then(response => {
                    this.list = response.data.list
                    this.total = response.data.total
                })
        },

        resetData() {
            // 清空条件
            this.courseQuery = {}
            // 查询全部teacher
            this.getList()
        },


    }

}

</script>