<template>
  <div class="container">
    <div class="header">
      <h1>修改密码</h1>
      <el-divider></el-divider>
    </div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
    >
      <el-form-item label="原密码" prop="oldPassword">
        <el-input
          type="password"
          v-model="ruleForm.oldPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          type="password"
          v-model="ruleForm.newPassword"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userApi from '@/api/user'
import { removeToken } from '@/utils/token'
export default {
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const checkPassword = (rule, value, cb) => {
      const passwordReg =
        /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
      if (passwordReg.test(value)) {
        return cb()
      }
      cb(
        new Error(
          '密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符'
        )
      )
    }
    return {
      ruleForm: {},
      rules: {
        oldPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' },
        ],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm() {
        userApi.updatePassword(this.ruleForm).then((res) => {
            removeToken()
            this.$router.push({
                path: '/login'
            })
        })
    },
    resetForm() {
        this.$refs['ruleForm'].resetFields();
        this.ruleForm = {}
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  padding: 50px 20px 20px 20px;
  width: 95%;
  .el-form {
    width: 50%;
  }
}
</style>