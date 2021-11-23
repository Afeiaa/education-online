import request from '@/utils/request'



export default {

  createStatistics(day) {
    return request({
      url: `/staservice/statistics/registerCount/${day}`,
      method: 'post'
    })
  },
  showChart(searchObj) {
    return request({
        url: `/staservice/statistics/getChartData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
        method: 'post'
    })
}
}