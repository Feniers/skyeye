import { login, logout, getInfo, checkToken } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import getters from '../getters'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
    return {
        token: getToken(),
        id:'',
        name: '',
        enable: '',
        avatar: '',
        right:[]
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: (state) => {
        alert(重置状态)
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_ENABLE: (state, enable) => {
        state.enable = enable
        console.log("enable" + enable)
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ID: (state, id) => {
        state.id = id
    },
    SET_RIGHT: (state, right) => {
        state.right = right
    }
}

const actions = {
    //user login
    login({ commit }, userInfo) {
        //解构赋值获取值
        const { name, password } = userInfo
        // debugger
        return new Promise((resolve, reject) => {
            //使用 trim() 方法来去除用户名前后的空格，避免进一步处理中出现空格导致的问题。
            login({ name: name.trim(), password: password }).then(response => {
                // debugger
                // console.log(getToken())
                // removeToken();

                const { data } = response
                commit('SET_ID',data.userId)
                commit('SET_TOKEN', data.token)
                commit('SET_RIGHT',data.role_list)

                // console.log("data.role_list",data.role_list)
                // console.log("right",getters.right)

                setToken(data.token)

                console.log("gettoken  ",getToken())

                resolve(data)

            }).catch(error => {
                reject(error)
            })
        })
    },

    // get user info
    // getInfo({ commit, state }) {
    //     return new Promise((resolve, reject) => {
    //         getInfo(state.token).then(response => {
    //             const { data } = response
    //             if (!data) {
    //                 return reject('Verification failed, please Login again.')
    //             }
    //             const { username, userface, enabled } = data
    //             console.log(enabled)
    //             // console.log(data)
    //             commit('SET_NAME', username)
    //             commit('SET_ENABLE', enabled)
    //             commit('SET_AVATAR', userface)
    //             console.log("Avator" + userface)
    //             resolve(data)
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // },

    // user logout
    logout({ commit }) {
        // debugger
        return new Promise((resolve, reject) => {
            logout().then(() => {
                removeToken() // must remove  token  first
                // resetRouter()
                commit('RESET_STATE')
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
