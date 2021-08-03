import Vue from 'vue'
import axios from 'axios'


axios.defaults.baseURL = 'http://127.0.0.1:5000/api'
// axios.defaults.baseURL = '/api'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.withCredentials = true


export default{
    getproduct(){
        return ajax('/product','get')
    },
    getpositionproduct(params){
        return ajax('/product','get',{
            params:{
                position:params
            }
        })
    },
    addproduct(data){
        return ajax('/product','post',{
            data
        })
    },
    deleteproduct(params){
        return ajax('/product','delete',{
            data:{
                id:params
            }
        })
    },
    modifyproduct(data){
        return ajax('/product','put',{
            data
        })
    },
    getmap(){
        return ajax('/map','get')
    }
}

function ajax(url, method, options) {
    if (options !== undefined) {
        var {
            params = {}, data = {}
        } = options
    } else {
        params = data = {}
    }
    if (method === "get") {
        return new Promise((resolve, reject) => {
            axios({
                url,
                method,
                params,
                data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(
                res => {
                    if (res.data.error !== null && res.data.error !== undefined) {
                        reject(res)
                        console.log(res, data.error)
                    }
                    else {
                        resolve(res)
                    }
                }, res => {
                    reject(res)
                }
            )
        })
    }
    else {
        return new Promise((resolve, reject) => {
            axios({
                url,
                method,
                params,
                data
            }).then(res => {
                // API正常返回(status=20x), 是否错误通过有无error判断
                if (res.data.error !== null && res.data.error !== undefined) {
                    //this.$error(res.data.data)
                    resolve(res)
                } else {
                    resolve(res)

                }
            }, res => {
                reject(res)

            })
        })
    }
}