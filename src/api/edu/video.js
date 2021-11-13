import request from '@/utils/request'


export default {
    removeById(videoId) {
        return request({
          url: `/eduservice/video/deleteVideo/${videoId}`,
          method: 'delete'
        })
      },
    
    save(video) {
        return request({
            url: `/eduservice/video/addVideo`,
            method: 'post',
            data: video
        })
    },
       
    updateById(video) {
        return request({
            url: `/eduservice/video/updateVideo`,
            method: 'post',
            data: video
        })
    },

    getById(videoId) {
        return request({
            url: `/eduservice/video/getVideoInfo/${videoId}`,
            method: 'get'
        })
    },

}