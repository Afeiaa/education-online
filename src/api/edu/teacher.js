import request from '@/utils/request'


export default {
    getTeacherListPage(current, limit, teacherQuery) {
        return request({
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            data: teacherQuery
        })
    }
}


// export function getList(params) {
//     return request({
//         url: '/table/list',
//         method: 'get',
//         params
//     })
// }