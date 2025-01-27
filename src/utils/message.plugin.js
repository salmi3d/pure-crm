import * as M from 'materialize-css'

export default {
  install(Vue) {
    Vue.prototype.$message = html => {
      M.toast({
        html
      })
    }

    Vue.prototype.$error = html => {
      M.toast({
        html: `[ ERROR ]: ${html}`
      })
    }
  }
}
