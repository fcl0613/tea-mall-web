<template>
  <div class="container">
    <div class="header">
      <h1>个人信息</h1>
      <el-divider></el-divider>
    </div>
    <div class="content">
      <div class="left">
        <div class="avatar" v-if="avatar">
          <el-avatar size="large" :src="baseImageUrl + avatar"></el-avatar>
          <el-button type="text" @click="showAvatarDialog">更换头像</el-button>
        </div>
      </div>
      <div class="right">
        <el-descriptions v-if="userInfo">
          <el-descriptions-item label="昵称">{{
            userInfo.nickName
          }}</el-descriptions-item>
          <el-descriptions-item label="手机号">{{
            userInfo.phone
          }}</el-descriptions-item>
          <el-descriptions-item label="生日">{{
            userInfo.birthday ? userInfo.birthday : '暂无信息'
          }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{
            showSex
          }}</el-descriptions-item>
        </el-descriptions>
        <el-button type="text" @click="showEditDialog">编辑</el-button>
      </div>
    </div>

    <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
      <el-form
        :model="userInfoForm"
        ref="ruleForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="昵称" prop="nickName">
          <el-input
            v-model="userInfoForm.nickName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="userInfoForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            v-model="userInfoForm.birthday"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="userInfoForm.sex" :label="0">保密</el-radio>
          <el-radio v-model="userInfoForm.sex" :label="1">男</el-radio>
          <el-radio v-model="userInfoForm.sex" :label="2">女</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="subForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="上传头像" :visible.sync="dialogAvatarVisible" width="30%">
      <el-upload
        action=""
        :show-file-list="false"
        :http-request="detailPicUpload"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="avatar" :src="baseImageUrl + avatar" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer">
        <el-button @click="dialogAvatarVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateAvatar">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import userApi from '@/api/user'
import baseImageUrl from '@/utils/baseImageUrl'
import fileUploadApi from '@/api/fileUpload'
export default {
  computed: {
    showSex() {
      if (this.userInfo) {
        if (this.userInfo.sex === 0) return '未知'
        if (this.userInfo.sex === 1) return '男'
        if (this.userInfo.sex === 2) return '女'
      }
    },
  },
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
      userInfo: {},
      userInfoForm: {},
      baseImageUrl: baseImageUrl.BASE_IMG_URL,
      avatar: '',
      dialogFormVisible: false,
      rules: {
        nickName: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' },
        ],
      },
      dialogAvatarVisible: false,
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      userApi.getInfo().then((res) => {
        this.userInfo = res.data
        this.userInfoForm = JSON.parse(JSON.stringify(this.userInfo))
        this.avatar = res.data.avatar
        // console.log(this.userInfo === this.userInfoForm)
      })
    },
    showEditDialog() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
    cancel() {
      this.userInfoForm = JSON.parse(JSON.stringify(this.userInfo))
      this.dialogFormVisible = !this.dialogFormVisible
    },
    subForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return
        userApi.updateInfo(this.userInfoForm).then((res) => {
          this.$message.success(res.msg)
          this.userInfo = JSON.parse(JSON.stringify(this.userInfoForm))
        })
      })
    },
    updateAvatar() {
      userApi.updateAvatar(this.avatar).then((res) => {
        this.$message.success(res.msg)
        this.dialogAvatarVisible = !this.dialogAvatarVisible
      })
    },
    handleAvatarSuccess() {},
    beforeAvatarUpload() {},
    detailPicUpload(options) {
      let file = options.file
      let formData = new FormData()
      formData.append('file', file)
      fileUploadApi.fileUpload(formData).then((response) => {
        let res = response.data
        if (res.code == 200) {
          console.log(res)
          let imageName = res.data
          this.avatar = imageName
          this.$message.success('文件上传成功')
        } else {
          this.$message.error('文件上传失败')
        }
      })
    },
    showAvatarDialog() {
      this.dialogAvatarVisible = !this.dialogAvatarVisible
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  padding: 50px 20px 20px 20px;
  width: 95%;
  .content {
    display: flex;
    justify-content: space-between;
    .left {
      width: 20%;
      display: flex;
      justify-content: center;
      align-items: center;
      .avatar {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    .right {
      width: 75%;
    }
  }
}
</style>