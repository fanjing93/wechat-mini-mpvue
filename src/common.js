import $ajax from './http/index'
import api from './http/api'

getTheme () {
  return new Promise((resolve, reject) => {
    $ajax({
      url: api.query_theme,
      method: 'get',
      noToken: true,
      data: {
        scene_type: 1
      },
      success: res => {
        if (res.code == 0 && res.data) {

        } else if (res.code == 3011) {

        } else {

        }
        resolve()
      },
      fail: res => {

        reject()
      }
    })
  })
}

export default getTheme
