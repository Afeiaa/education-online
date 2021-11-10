import request from '@/utils/request'


export default {
    getAallChapterVideo(courseId) {
        return request({
            url: `/eduservice/chapter/getChapterVideo/${courseId}`,
            method: 'get'
        })
    }
}