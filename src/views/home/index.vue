<template>
  <div class="container">
    <div class="top">
      <div class="top-bar">
        <div class="top-bar-user">
          <div v-if="!token">
            <span class="hr" @click="toLoginPage">登录</span>
            <span>|</span>
            <span class="hr" @click="toRegPage">注册</span>
          </div>
          <div v-else>
            <span>欢迎登录</span>
          </div>
        </div>
      </div>
    </div>
    <div class="header">
      <div class="header-main">
        <div class="logo">
          <h2>茶易网</h2>
        </div>
        <div class="search-area">
          <el-input placeholder="请输入内容" v-model="keyword">
            <el-button slot="append" icon="el-icon-search" @click="toGoodsListPage"></el-button>
          </el-input>
        </div>
        <div class="shoping-cart">
          <el-button icon="el-icon-shopping-cart-2">购物车</el-button>
        </div>
        <div class="header-des">
          <div class="hotline">
            订购热线 <br />
            <em>400-9993-512</em>
            <p>温馨提示：请您核对无误后拨出，谢谢！</p>
          </div>
        </div>
      </div>
      <div class="header-nav">
        <div class="banner-header">
          <ul class="sub-nav">
            <li><a href="/#/home">首页</a></li>
            <li><a href="/#/goodsList?categoryId=15">金骏眉</a></li>
            <li><a href="/#/goodsList?categoryId=23">牡丹王</a></li>
            <li><a href="/#/goodsList?categoryId=12">铁观音</a></li>
            <li><a href="/#/goodsList?categoryId=4">龙井</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view ref="child"></router-view>
    </div>
    <div class="footer">
      <div class="ft_txt">
        <p>Copyright 2016, 茶易网 TEA1.COM</p>
        <p>增值电信业务经营许可证：B1.B2-20160011 浙ICP备14011677号-2</p>
        <p>
          服务时间：08:30-21:00 客服热线:
          400-9993-513(温馨提示：请您核对无误后拨出，谢谢！)
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import homeApi from '@/api/home'
import { getToken } from '@/utils/token'
import HomeProList from '@/components/HomeProList'
export default {
  components: {
    HomeProList
  },
  data() {
    return {
      token: getToken(),
      keyword: '',
    }
  },
  methods: {
    toLoginPage() {
      this.$router.push({
        path: '/login',
      })
    },
    toRegPage() {
      this.$router.push({
        path: '/register',
      })
    },
    toGoodsListPage() {
      // console.log(this.$route.path)
      if(this.$route.path === '/goodsList') {
        // console.log(111)
        this.$refs['child'].pageNum = 1
        this.$refs['child'].pageSize = 20
        this.$refs['child'].categoryId = null
        this.$refs['child'].keyword = this.keyword
        this.$refs['child'].getGoodsList()
        return
      }
      this.$router.push({
        path: '/goodsList',
        query: {
          keyword: this.keyword
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  .top {
    height: 26px;
    background-color: #f0f0f0;
    .top-bar {
      width: 1200px;
      .top-bar-user {
        float: right;
        .hr {
          cursor: pointer;
        }
        span {
          font-size: 12px;
          color: #9e9e9e;
          margin-left: 10px;
        }
      }
    }
  }
  .header {
    background-color: #fff;
    .header-main {
      width: 1200px;
      height: 98px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .search-area {
        width: 400px;
      }
      .header-des {
        .hotline {
          font-size: 14px;
          color: #b5b5b5;
          em {
            font-size: 22px;
            color: #b0352f;
            font-weight: bold;
          }
          p {
            margin: 0;
            font-size: 12px;
          }
        }
      }
    }
    .header-nav {
      background-color: #605046;
      height: 42px;
      .banner-header {
        width: 1200px;
        margin: 0 auto;
        .sub-nav {
          float: left;
          padding-left: 200px;
          // display: flex;
          // justify-content: center;
          ul {
            margin: 0;
          }
          li {
            display: inline;
            float: left;
            height: 42px;
            overflow: hidden;
            font-size: 14px;
            padding-left: 0px;
            a {
              display: inline-block;
              height: 42px;
              line-height: 42px;
              overflow: hidden;
              width: 110px;
              text-align: center;
              color: #fff;
            }
          }
        }
      }
    }
  }
  // .content {
   
  // }
  .footer {
    border-top: 1px solid #efefef;
    background-color: #fff;
    padding: 10px 0 50px 0;
    margin-top: 20px;
    .ft_txt {
      width: 900px;
      margin: 0 auto;
      color: #838383;
      font-size: 10px;
    }
  }
}
</style>