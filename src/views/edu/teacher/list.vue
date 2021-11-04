<template>
    <div id="app-container">
        讲师列表
    </div>
</template>



<script>

import teacher from '@/api/edu/teacher'

export default{
    data() {
        return {
             list: null,
        page: 1,
        limit: 10,
        teacherQuery: {}
        }
    },

    created() {
        this.getList()
    },

    methods: {
        getList() {
            teacher.getTeacherListPage(this.page, this.limit, this.teacherQuery)
                .then(response => {
                    console.log(response);
                })
        }
    }
    
}

</script>