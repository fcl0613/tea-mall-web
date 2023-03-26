<template>
  <div class="container">
    <el-container>
      <el-header>
        <div class="header">
          <div class="left">
            <h2>茶易网</h2>
            <span @click="toHomePage">首页</span>
          </div>
          <div class="right">热线：400-9993-513</div>
        </div>
      </el-header>
      <el-main>
        <div class="main">
          <img src="../../assets/image/login-box-bg.jpg" alt="" />
          <div class="form-area">
            <el-card class="box-card">
              <div class="title">
                <h3>登录</h3>
                <span>没有账号<a href="/#/register">点击注册</a></span>
              </div>
              <el-form
                :model="regForm"
                :rules="rules"
                ref="ruleForm"
                label-width="70px"
              >
                <el-form-item label="用户名" prop="username">
                  <el-input
                    v-model="regForm.username"
                    placeholder="请输入用户名"
                  ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input
                    v-model="regForm.password" type="password"
                    placeholder="请输入密码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm"
                    >登录</el-button
                  >
                  <el-button @click="resetForm">重置</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </div>
        </div>
      </el-main>
      <el-footer>
          <div class="ft_txt">
              <p>Copyright 2016, 茶易网 TEA1.COM</p>
              <p>增值电信业务经营许可证：B1.B2-20160011         浙ICP备14011677号-2</p>
              <p>服务时间：08:30-21:00 客服热线: 400-9993-513(温馨提示：请您核对无误后拨出，谢谢！)</p>
          </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import userApi from '@/api/user'
import {setToken} from '@/utils/token'
export default {
  data() {
    const checkPhone = (rule, value, cb) => {
      const PhoneReg =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
      if (PhoneReg.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的手机号'))
    }
    return {
      regForm: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // { validator: checkPhone, trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return
        userApi.login(this.regForm.username, this.regForm.password).then((res) => {
            this.$message.success('登录成功')
            setToken(res.data.token)
            this.$router.push({
                path: '/home'
            })
        })
      })
    },
    resetForm() {
      this.$refs['ruleForm'].resetFields()
    },
    toHomePage() {
      this.$router.push({
        path: '/home'
      })
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  .el-header {
    padding: 0;
    background-color: #222;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      width: 900px;
      .left {
        display: flex;
        justify-content: baseline;
        align-items: center;
        h2 {
          color: #fff;
        }
        span {
          margin-left: 10px;
          color: #fff;
        }
      }
      .right {
        color: #fff;
      }
    }
  }
  .el-main {
    .main {
      width: 900px;
      margin: 20px auto;
      display: flex;
      justify-content: space-between;
      .form-area {
        width: 40%;
        .box-card {
          .title {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            h3 {
              margin: 0;
            }
            span {
              font-size: 14px;
            }
          }
        }
      }
    }
  }
  .el-footer {
      background-color: #fff;
      border-top: 1px solid #838390;
      .ft_txt {
          width: 900px;
          margin: 0 auto;
          color: #838383;
          font-size: 10px;
      }
  }
}
</style>