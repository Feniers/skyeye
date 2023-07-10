<template>
    <div class="login_container">
        <div class="login_logo">
            <img />
        </div>
        <div class="login_box">
            <!-- 登录表单区域 -->
            <el-tabs :stretch="true">
                <el-tab-pane label="账号密码登录">
                    <!-- 账号密码登录表单 -->
                    <el-form ref="pwdLoginFormRef" :model="pwdLoginForm" :rules="pwdLoginFormRules">
                        <!-- 用户名 -->
                        <el-form-item prop="username">
                            <el-input placeholder="用户名/邮箱/手机号" clearable prefix-icon="el-icon-user-solid"
                                v-model="pwdLoginForm.username">
                            </el-input>
                        </el-form-item>
                        <!-- 密码 -->
                        <el-form-item prop="password">
                            <el-input placeholder="密码" type="password" show-password prefix-icon="el-icon-lock"
                                v-model="pwdLoginForm.password">
                            </el-input>
                        </el-form-item>
                        <!-- 按钮区域 -->
                        <el-form-item class="login_btns">
                            <el-button type="primary" @click="pwdLogin" :loading="loading">登录</el-button>
                            <el-button type="primary" @click='toRegister'>注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="邮箱验证登录">
                    <!-- 邮箱验证登录表单 -->
                    <el-form ref="emailLoginFormRef" :model="emailLoginForm" :rules="emailLoginFormRules">
                        <!-- 邮箱 -->
                        <el-form-item prop="email">
                            <el-input placeholder="邮箱" clearable prefix-icon="el-icon-message"
                                v-model="emailLoginForm.email">
                            </el-input>
                        </el-form-item>
                        <!-- 邮箱验证码 -->
                        <el-form-item prop="emailCode">
                            <el-input placeholder="验证码" prefix-icon="el-icon-key" v-model="emailLoginForm.emailCode">
                                <template #append>
                                    <el-button :disabled="disabled" @click="getEmailValidateCode">{{ buttonText }}
                                    </el-button>
                                </template>
                            </el-input>
                        </el-form-item>
                        <!-- 按钮区域 -->
                        <el-form-item class="login_btns">
                            <el-button type="primary" @click="emailLogin">登录</el-button>
                            <el-button type="primary" @click='toRegister'>注册</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

            </el-tabs>
        </div>
        <div class="login_footer">
            登录即表示您已阅读并同意
            <a href="#">服务条款</a>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import store from '@/store'
import axios from 'axios'

export default {
    name: 'LoginIndex',
    data() {
        const validateUsername = (rule, value, callback) => {
            if (!value) {
                callback(new Error('Please enter the correct user name'))
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('The password can not be less than 6 digits'))
            } else {
                callback()
            }
        }
        var validateEmail = (rule, value, cb) => {
            // 验证邮箱的正则表达式
            const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
            if (regEmail.test(value)) {
                // 合法的邮箱
                return cb()
            }
            cb(new Error('请输入合法的邮箱'))
        }

        return {
            pwdLoginForm: {
                username: 'gxc',
                password: 'qwe123123'
            },
            pwdLoginFormRules: {
                username: [{ required: true, message: '请输入你的账号', trigger: 'blur', validator: validateUsername }],
                // 验证密码是否合法
                password: [{ required: true, message: '请输入你的密码', trigger: 'blur', validator: validatePassword }]
            },

            emailLoginForm: {
                email: '',
                emailCode: ''
            },
            emailLoginFormRules: {
                email: [{required: true, message: '请输入你的邮箱', trigger: 'blur', validator: validateEmail}],
                emailCode: [{required: true,message: '请输入你获取到的验证码',trigger: 'blur'}]
            },

            loading: false,

            // 控制获取验证码
            buttonText: '获取验证码',
            disabled: false,
            duration: 60,
            timer: null
        }

    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        pwdLogin() {
            // debugger
            // console.log(this.pwdLoginForm.username)
            //表单验证
            this.$refs.pwdLoginFormRef.validate(valid => {
                //将username保存到 Vue 实例的原型对象上，以便在其他组件中访问
                Vue.prototype.$userName = this.pwdLoginForm.username;
                if (valid) {
                    // debugger
                    //在这里使用axio与后端对接,获得账号密码键值对,然后匹配,查看是否能够登录
                    if (this.pwdLoginForm.password == 'qwe123123') {
                        this.loading = true
                        Vue.prototype.$userName = this.pwdLoginForm.username;
                        //store中的逻辑
                        this.$store.dispatch('user/login', this.pwdLoginForm).then(
                            () => {
                                alert("登录成功")
                                // this.$router.push({ path: this.redirect || '/' })
                                this.$router.push('/layout')
                                console.log('跳转后的路由地址:', this.$route.fullPath)
                                this.loading = false
                            }
                        ).catch(
                            () => {
                                this.loading = false
                            }
                        )
                    }
                    else {
                        this.loading = true
                        this.$store.dispatch('user/login', this.pwdLoginForm).then(
                            () => {
                                alert("登录成功!")
                                this.$router.push('/layout')
                                console.log('跳转后的路由地址:', this.$route.fullPath)
                                this.loading = false
                            }).catch(
                                () => {
                                    this.loading = false
                                })
                    }
                }
                //invaild
                else {
                    console.log('error submit!!')
                    return false
                }
            })
        },

        emailLogin(){},
        
        // 获取邮箱验证码
        getEmailValidateCode(){
            this.$refs.emailLoginFormRef.validate(valid => {
                //将username保存到 Vue 实例的原型对象上，以便在其他组件中访问
                // Vue.prototype.$userName = this.pwdLoginForm.username;
                if (valid) {
                    //在这里使用axio与后端对接,获得账号密码键值对,然后匹配,查看是否能够登录
                    
                }
                //invaild
                else {
                    console.log('error submit!!')
                    return false
                }
            })
        },


        toRegister() {
            this.$router.push('/register')
        },
    }
}
</script>

<style lang="scss" scoped>
.login_container {
    width: 100%;
    height: 100%;
    background: url(../assets/loginbg.jpeg);
    position: fixed;
    background-size: 100% 100%;
}

.login_box {
    width: 395px;
    height: 435px;
    background-color: rgba(225, 225, 225, 0);
    border: 1px solid rgba(225, 225, 225, 0);
    box-shadow: 2px 3px 3px #aaaaaa;
    border-radius: 5px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.login_btns {
    text-align: center;
}

.login_footer {
    position: absolute;
    left: 50%;
    top: 70%;
    transform: translate(-50%, -50%);
    border: 1px solid #ffffff;
    width: 395px;
    height: 30px;
    text-align: center;
}
</style>

<style scoped>
.login_box {
    backdrop-filter: blur(15px);
    box-shadow: 0 0 5px #fff;
}

.el-tabs>>>.el-tabs__header {
    padding: 5% 10% 0 10%;
}

.el-tabs>>>.el-tabs__item:hover {
    color: #fff;
    /**这里改变鼠标移至选中项后颜色变化：黑-》白 */
    cursor: pointer;
}

.el-tabs>>>.el-tabs__item.is-active {
    /**这里用来改变登录页头选中后颜色变化 黑-》紫 */
    color: #c915e5;
}

.el-form {
    text-align: center;
}

.el-form-item>>>.el-form-item__error {
    left: 10%;
}

.el-input {
    width: 80%;
}

.el-input {
    --el-input-font-color: black;
}

.el-input>>>.el-input__inner {
    background-color: rgba(225, 225, 225, 0);
    /**这里改变输入框底色 */
    box-shadow: 0 0 2px #fff;
    border: 1px solid #fff;
}

.el-button {
    border-radius: 10px;
}

.el-button--primary {
    --el-button-font-color: #409e40;
    --el-button-background-color: #ffffff;
    --el-button-border-color: #409eff;
    --el-button-hover-color: #66b1ff;
    --el-button-active-font-color: #e6e6e6;
    --el-button-active-background-color: #0d84ff;
    --el-button-active-border-color: #0d84ff;
}
</style>