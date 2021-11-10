import request from '@/utils/request'


export default {
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
      }

}