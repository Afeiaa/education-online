import request from '@/utils/request'


export default {
    removeVideo(videoId) {
        return request({
          url: `/eduvod/video/deleteVideo/${videoId}`,
          method: 'delete'
        })
    },
}