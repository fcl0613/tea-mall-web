<template>
  <div class="container">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="left">
        <ul>
          <li
            v-for="item in menu"
            :key="item.index"
            :class="item.index === curIndex ? 'active' : ''"
            @click="changeMenu(item)"
          >
            {{ item.name }}
          </li>
          <li v-if="userInfo.role === 0" @click="dialogFormVisible = true">申请入驻</li>
        </ul>
      </div>
      <div class="right">
        <div class="right-layout">
          <router-view></router-view>
        </div>
      </div>
    </div>

    <el-dialog title="申请信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺名称">
          <el-input v-model="form.storeName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subForm"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import userApi from '@/api/user'
export default {
  data() {
    return {
      menu: [
        { index: 1, name: '个人信息', path: '/home/myLayout/myinfo' },
        { index: 2, name: '地址管理', path: '/home/myLayout/address' },
        { index: 3, name: '修改密码', path: '/home/myLayout/updatePassword' },
        { index: 4, name: '我的订单', path: '/home/myLayout/orderList' },
        { index: 5, name: '我的购物车', path: '/cart' },
        { index: 6, name: '待评价商品', path: '/home/myLayout/commentGoods' },
      ],
      curIndex: 1,
      dialogFormVisible: false,
      userInfo: {},
      form: {}
    }
  },
  created(){
    this.getInfo()
  },
  methods: {
    changeMenu(item) {
      if (this.curIndex === item.index) return
      this.curIndex = item.index
      this.$router.push({
        path: item.path,
      })
    },
    getInfo() {
      userApi.getInfo().then((res) => {
        this.userInfo = res.data
      })
    },
    subForm() {
      userApi.storeApply(this.subForm).then((res) => {
        this.$message.success('申请成功')
        this.dialogFormVisible = false
      })
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  .nav {
    margin-top: 20px;
  }
  .content {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      justify-content: center;
      width: 150px;
      border: 1px solid #ddd;
      background-color: #fff;
      height: 300px;
      ul {
        li {
          letter-spacing: 2px;
          color: #757575;
          margin: 20px 0;
          cursor: pointer;
        }
        .active {
          color: #a10000;
        }
      }
    }
    .right {
      .right-layout {
        width: 1000px;
        border: 1px solid #ddd;
        background-color: #fff;
      }
    }
  }
}
</style>