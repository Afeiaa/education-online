import request from '@/utils/request'


export default {
    getAallChapterVideo(courseId) {
        return request({
            url: `/eduservice/chapter/getChapterVideo/${courseId}`,
            method: 'get'
        })
    },

    removeById(courseId) {
        return request({
          url: `/eduservice/chapter/deleteChapter/${courseId}`,
          method: 'delete'
        })
      },
    
    save(chapter) {
        return request({
            url: `/eduservice/chapter/addChapter`,
            method: 'post',
            data: chapter
        })
    },
    
    getById(chapterId) {
        return request({
            url: `/eduservice/chapter/getChapter/${chapterId}`,
            method: 'get'
        })
    },
    
    updateById(chapter) {
        return request({
            url: `/eduservice/chapter/updateChapter`,
            method: 'post',
            data: chapter
        })
    }

}