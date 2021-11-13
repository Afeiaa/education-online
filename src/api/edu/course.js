import request from '@/utils/request'


export default {
    deleteCourse(courseId) {
        return request({
            url: `/eduservice/course/deleteCourse/${courseId}`,
            method: 'delete'
        })
    },

    getCourseList(current, limit, course) {
        return request({
            url: `/eduservice/course/list/${current}/${limit}`,
            method: 'post',
            data: course
        })
    },

    saveCourseInfo(courseInfo) {
        return request({
            url: `/eduservice/course/addCourseInfo`,
            method: 'post',
            data: courseInfo
        })
    },

    getCourseInfoById(id) {
        return request({
            url: `/eduservice/course/getCourseInfo/${id}`,
            method: 'get'
        })
    },

    updateCourseInfoById(courseInfo) {
        return request({
          url: `/eduservice/course/updateCourseInfo`,
          method: 'post',
          data: courseInfo
        })
    },

    // 获取最终发布课程信息
    getCoursePublishInfoById(courseId) {
        return request({
            url: `/eduservice/course/getPublishCourse/${courseId}`,
            method: 'get'
        })
    },

    // 最终发布课程
    publishCourse(courseId) {
        return request({
            url: `/eduservice/course/publishCourse/${courseId}`,
            method: 'post'
        })
    },

}