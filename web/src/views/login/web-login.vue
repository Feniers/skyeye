<template>
    <div class="center-container">
        <div class="shell">

            <div class="container a-container" id="a-container">
                <el-form ref="regRef" :model="regForm" :rules="regFormRules" class="form" id="a-form">
                    <h2 class="form_title title">创建账号</h2>
                    <input type="text" class="form_input" placeholder="Name" v-model="regForm.name">
                    <input type="text" class="form_input" placeholder="NickName" v-model="regForm.nickname">
                    <input type="text" class="form_input" placeholder="Email" v-model="regForm.email">
                    <input type="text" class="form_input" placeholder="Phone" v-model="regForm.phone">
                    <input type="password" class="form_input" placeholder="Password" v-model="regForm.pwd">
                    <input type="password" class="form_input" placeholder="Confirm Your Password" v-model="regForm.cpwd">
                    <el-button class="form_button button submit" @click="register">SIGN UP</el-button>
                </el-form>
            </div>

            <div class="container b-container" id="b-container">
                <el-form ref="pwdRef" :model="pwdLoginForm" :rules="pwdLoginFormRules" class="form" id="b-form">
                    <h2 class="form_title title">登入账号</h2>
                    <!-- <div class="form_icons">
                        <i class="iconfont el-icon-user"></i>
                        <i class="iconfont el-icon-phone"></i>
                        <i class="iconfont el-icon-message"></i>
                    </div> -->
                    <!-- <span class="form_span">选择登录方式</span> -->
                    <input type="text" class="form_input" placeholder="name" v-model="pwdLoginForm.name">
                    <input type="password" class="form_input" placeholder="Password" v-model="pwdLoginForm.password">
                    <!-- <a class="form_link">忘记密码？</a> -->
                    <el-button class="form_button button submit" @click="pwdLogin">SIGN IN</el-button>
                </el-form>
            </div>

            <div class="switch" id="switch-cnt">
                <div class="switch_circle"></div>
                <div class="switch_circle switch_circle-t"></div>
                <div class="switch_container" id="switch-c1">
                    <h2 class="switch_title title" style="letter-spacing: 0;">Welcome Back！</h2>
                    <p class="switch_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
                    <button class="switch_button button switch-btn">SIGN IN</button>
                </div>

                <div class="switch_container is-hidden" id="switch-c2">
                    <h2 class="switch_title title" style="letter-spacing: 0;">Hello Friend！</h2>
                    <p class="switch_description description">去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！</p>
                    <button class="switch_button button switch-btn">SIGN UP</button>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { addUser } from '@/api/register'

export default {
    name: 'LoginPage',
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

        return {
            pwdLoginForm: {
                name: 'gxc',
                password: 'qwe123123',
            },
            pwdLoginFormRules: {
                name: [{ required: true, message: '请输入你的账号', trigger: 'blur', validator: validateUsername }],
                // 验证密码是否合法
                password: [{ required: true, message: '请输入你的密码', trigger: 'blur', validator: validatePassword }]
            },

            regForm: {
                name: '元一份',
                nickname: 'yyf',
                email: '2728455509@qq.com',
                phone: '18787566829',
                pwd: '123456q',
                cpwd: '123456q',
            },
            
            regFormRules: {
                name: [{ required: true, type: 'string', message: '请输入姓名', trigger: 'blur' }],
                nickname: [{ required: true, type: 'string', message: '请输入昵称', trigger: 'blur' }],
                email: [{ required: true, type: 'email', message: '请输入邮箱', trigger: 'blur' }],
                phone: [{ required: true, message: '确认密码', trigger: 'blur' }],
                pwd: [
                    { required: true, message: '创建密码', trigger: 'blur' },
                    {
                        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
                        message: '密码必须同时包含数字与字母,且长度为 6-20位'
                    }],
                cpwd: [
                    { required: true, message: '确认密码', trigger: 'blur' },
                    {
                        validator: (rule, value, callback) => {
                            if (value === '') {
                                callback(new Error('请再次输入密码'))
                            } else if (value !== this.ruleForm.pwd) {
                                callback(new Error('两次输入密码不一致'))
                            } else {
                                callback()
                            }
                        },
                        trigger: 'blur'
                    }],
            },
        }
    },
    methods: {
        register() {
            // debugger
            this.$refs.regRef.validate((valid) => {
                if (valid) {
                    console.log(this.regForm.name)

                    const user = {
                        name: this.regForm.name,
                        nickname: this.regForm.nickname,
                        email: this.regForm.email,
                        phone: this.regForm.phone,
                        password: this.regForm.pwd,
                        // cpwd: this.regForm.
                    }
                    const userIN = {
                        name: this.regForm.name,
                        password: this.regForm.pwd,
                    }
                    addUser(user).then(res => {
                        // debugger
                        console.log(res)
                        this.$message({
                            showClose: true,
                            message: '注册成功，正在跳转到主界面...',
                            type: 'success'
                        })
                        setTimeout(() => {
                            //跳转
                            this.$store.dispatch('user/login', userIN).then(
                                () => {
                                    // alert("登录成功!")
                                    this.$router.push('/home')
                                }).catch(
                                    () => {

                                    })
                        }, 2000)
                    }).catch(err => {
                        console.log(err)
                        this.$message.error(err)

                    })
                }
            })
        },

        pwdLogin() {

            // alert(this.pwdLoginForm.name+this.pwdLoginForm.password)
            // debugger
            // 首先执行表单验证逻辑
            this.$refs.pwdRef.validate(valid => {
                if (valid) {
                    // debugger
                    // 表单验证通过，执行登录逻辑
                    this.$store.dispatch('user/login', this.pwdLoginForm).then(
                        () => {
                            alert("登录成功!")
                            // this.$router.push('/main')
                            this.$router.push('/home')
                            // console.log('跳转后的路由地址:', this.$route.fullPath)
                            // this.loading = false
                        }).catch(
                            () => {
                                // this.loading = false
                            })
                } else {
                    // 表单验证不通过，执行相应的逻辑（如显示错误信息等）
                    console.log('error submit!!')
                    return false
                }
            });
        }


    },
    mounted() {
        let switchCtn = document.querySelector("#switch-cnt");
        let switchC1 = document.querySelector("#switch-c1");
        let switchC2 = document.querySelector("#switch-c2");
        let switchCircle = document.querySelectorAll(".switch_circle");
        let switchBtn = document.querySelectorAll(".switch-btn");
        let aContainer = document.querySelector("#a-container");
        let bContainer = document.querySelector("#b-container");
        let allButtons = document.querySelectorAll(".submit");

        let getButtons = (e) => e.preventDefault()
        let changeForm = (e) => {
            // 修改类名
            switchCtn.classList.add("is-gx");
            setTimeout(function () {
                switchCtn.classList.remove("is-gx");
            }, 1500)
            switchCtn.classList.toggle("is-txr");
            switchCircle[0].classList.toggle("is-txr");
            switchCircle[1].classList.toggle("is-txr");

            switchC1.classList.toggle("is-hidden");
            switchC2.classList.toggle("is-hidden");
            aContainer.classList.toggle("is-txl");
            bContainer.classList.toggle("is-txl");
            bContainer.classList.toggle("is-z");
        }

        // 点击切换
        let shell = (e) => {
            for (var i = 0; i < allButtons.length; i++)
                allButtons[i].addEventListener("click", getButtons);
            for (var i = 0; i < switchBtn.length; i++)
                switchBtn[i].addEventListener("click", changeForm)
        }

        shell();
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* 字体无法选中 */
    user-select: none;
    /* align-items: center; */
    /* justify-content: center; */
}

.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.body {
    position: relative;
    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    background-color: #ecf0f3;
    color: #a0a5a8;
}

.shell {
    position: relative;
    width: 1000px;
    min-width: 1000px;
    min-height: 600px;
    height: 600px;
    padding: 25px;
    background-color: #ecf0f3;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
    overflow: hidden;
}

/* 设置响应式 */
@media (max-width: 1200px) {
    .shell {
        transform: scale(0.7);
    }
}

@media (max-width: 1000px) {
    .shell {
        transform: scale(0.6);
    }
}

@media (max-width: 800px) {
    .shell {
        transform: scale(0.5);
    }
}

@media (max-width: 600px) {
    .shell {
        transform: scale(0.4);
    }
}

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 600px;
    height: 100%;
    padding: 25px;
    background-color: #ecf0f3;
    transition: 1.25s;
}

.form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

.iconfont {
    margin: 0 5px;
    border: rgba(0, 0, 0, 0.5) 2px solid;
    border-radius: 50%;
    font-size: 25px;
    padding: 3px;
    opacity: 0.5;
    transition: 0.1s;
}

.iconfont:hover {
    opacity: 1;
    transition: 0.15s;
    cursor: pointer;
}

.form_input {
    width: 350px;
    height: 40px;
    margin: 4px 0;
    padding-left: 25px;
    font-size: 13px;
    letter-spacing: 0.15px;
    border: none;
    outline: none;
    background-color: #ecf0f3;
    transition: 0.25s ease;
    border-radius: 8px;
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
}

.form_input:focus {
    box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
}

.form_span {
    margin-top: 30px;
    margin-bottom: 12px;
}

.form_link {
    color: #181818;
    font-size: 15px;
    margin-top: 25px;
    border-bottom: 1px solid #a0a5a8;
    line-height: 2;
}

.title {
    font-size: 34px;
    font-weight: 700;
    line-height: 3;
    color: #181818;
    letter-spacing: 10px;
}

.description {
    font-size: 14px;
    letter-spacing: 0.25px;
    text-align: center;
    line-height: 1.6;
}

.button {
    width: 180px;
    height: 50px;
    border-radius: 25px;
    margin-top: 50px;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1.15px;
    background-color: #4B70E2;
    color: #f9f9f9;
    box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
    border: none;
    outline: none;
}

.a-container {
    z-index: 100;
    left: calc(100% - 600px);
}

.b-container {
    left: calc(100% - 600px);
    z-index: 0;
}

.switch {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 400px;
    padding: 50px;
    z-index: 200;
    transition: 1.25s;
    background-color: #ecf0f3;
    overflow: hidden;
    box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
}

.switch_circle {
    position: absolute;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background-color: #ecf0f3;
    box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
    bottom: -60%;
    left: -60%;
    transition: 1.25s;
}

.switch_circle-t {
    top: -30%;
    left: 60%;
    width: 300px;
    height: 300px;
}

.switch_container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    width: 400px;
    padding: 50px 55px;
    transition: 1.25s;
}

.switch_button {
    cursor: pointer;
}

.switch_button:hover,
.submit:hover {
    box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
    transform: scale(0.985);
    transition: 0.25s;
}

.switch_button:active,
.switch_button:focus {
    box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
    transform: scale(0.97);
    transition: 0.25s;
}

.is-txr {
    left: calc(100% - 400px);
    transition: 1.25s;
    transform-origin: left;
}

.is-txl {
    left: 0;
    transition: 1.25s;
    transform-origin: right;
}

.is-z {
    z-index: 200;
    transition: 1.25s;
}

.is-hidden {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    transition: 1.25s;
}

.is-gx {
    animation: is-gx 1.25s;
}

@keyframes is-gx {

    0%,
    10%,
    100% {
        width: 400px;
    }

    30%,
    50% {
        width: 500px;
    }
}
</style>