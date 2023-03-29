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
          <li v-for="item in menu" :key="item.index" :class="item.index === curIndex ? 'active': ''" @click="changeMenu(item)">{{ item.name }}</li>
        </ul>
      </div>
      <div class="right">
        <div class="right-layout">
            <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      menu: [
        {index: 1, name: '个人信息', path: '/home/myLayout/myinfo'},
        {index: 2, name: '地址管理', path: '/home/myLayout/address'},
        {index: 3, name: '修改密码', path: '/home/myLayout/updatePassword'},
        {index: 4, name: '我的订单', path: ''},
        {index: 5, name: '我的购物车', path: '/cart'},
        {index: 6, name: '待评价商品', path: ''}
      ],
      curIndex: 1
    }
  },
  methods: {
    changeMenu(item) {
      if(this.curIndex === item.index) return
      this.curIndex = item.index
      this.$router.push({
        path: item.path
      })
    }
  }
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