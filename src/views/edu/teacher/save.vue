<template>
    <div class = "app-container">
        <el-form label-width="120px">
            <el-form-item label="讲师名称">
                <el-input v-model="teacher.name"/>
            </el-form-item>
            <el-form-item label="讲师排序">
                <el-input-number v-model="teacher.sort" controls-position="right" min="0"/>
            </el-form-item>
            <el-form-item label="讲师头衔">
                <el-select v-model="teacher.level" clearable placeholder="请选择">
                <!--
                    数据类型一定要和取出的json中的一致，否则没法回填
                    因此，这里value使用动态绑定的值，保证其数据类型是number
                -->
                <el-option :value="1" label="高级讲师"/>
                <el-option :value="2" label="首席讲师"/>
                </el-select>
            </el-form-item>
            <el-form-item label="讲师资历">
                <el-input v-model="teacher.career"/>
            </el-form-item>
            <el-form-item label="讲师简介">
                <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
            </el-form-item>

            <!-- 讲师头像：TODO -->

            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate()">保存</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>



<script>
import teacher from '@/api/edu/teacher'

export default ({
    data() {
        return {
            teacher: {
                id: "",
                name: "",
                sort: 0,
                level: 1,
                career: "",
                intro: "",
                avatar: "" ,   
            },
            saveBtnDisabled: false // 保存按钮是否禁用,
        }
    },

    created() {
       this.init()
    },
    
    watch: {
        $route() {
            this.init()
        }
    },

    methods: {
        init() {
             // console.log(this.$route.params)
            // 获取路由取出id， null不渲染
            if (this.$route.params && this.$route.params.id) {
                this.getTeacherInfo(this.$route.params.id)    
            } else {
                this.teacher = {}
            }
        },

        saveOrUpdate() {
           // 保存
           if (this.teacher.id) {
               this.updateTeacher()
           } else {
               this.saveTeacher()
           }
        },

        saveTeacher() {
             // 保存新的讲师
            teacher.addTeacher(this.teacher).then(() => {
                return this.$message({
                    type: 'success',
                    message: '保存成功!'
                })
            }).then(() => {
                this.$router.push({path: "/teacher/table"})
            }).catch(() => {
                return this.$message({
                    type: 'error',
                    message: '保存失败!'
                })
            })
        },

        getTeacherInfo(id) {
            teacher.getTeacherInfo(id).then(response => {
                console.log(response)
                this.teacher = response.data.info
                // console.log(this.teacher)
            })
        },

        updateTeacher() {
            teacher.updateTeacher(this.teacher).then(() => {
                return this.$message({
                    type: 'success',
                    message: '修改成功!'
                })
            }).then(() => {
                this.$router.push({path: "/teacher/table"})
            }).catch(() => {
                 return this.$message({
                    type: 'error',
                    message: '修改失败!'
                })
            })
        }

    }

})
</script>

