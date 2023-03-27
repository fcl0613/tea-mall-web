<template>
  <div class="container">
    <div class="nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="goods-list" v-if="goodsList.length > 0">
      <div class="goods-card" v-for="(item, index) in goodsList" :key="index">
        <el-card>
          <div class="pro-img">
            <el-image
              style="width: 200px; height: 200px"
              :src="baseImageUrl + item.goodsCover"
              fit="fit"
            ></el-image>
          </div>
          <div class="title">{{ item.goodsName }}</div>
          <div class="btm">
            <div class="price">
              ￥<span>{{ item.price }}</span>
            </div>
            <div class="btn">
              <el-button @click="goToGoodsInfoPage(item.id)"
                >立即购买</el-button
              >
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="no-data" v-else>
      <el-empty description="暂无数据"></el-empty>
    </div>
    <div class="page-area" v-if="total > 20">
      <el-pagination background layout="prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import goodsApi from '@/api/goods'
import baseImageUrl from '@/utils/baseImageUrl'
export default {
  data() {
    return {
      categoryId: this.$route.query.categoryId,
      baseImageUrl: baseImageUrl.BASE_IMG_URL,
      keyword: this.$route.query.keyword,
      pageNum: 1,
      pageSize: 20,
      total: 0,
      goodsList: [],
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      goodsApi
        .getGoodsList(
          this.categoryId,
          this.keyword,
          this.pageNum,
          this.pageSize
        )
        .then((res) => {
          this.goodsList = res.data.list
          this.total = res.total
        })
    },
    goToGoodsInfoPage(id) {
      this.$router.push({
        path: '/goodsInfo',
        query: {
          id,
        },
      })
    },
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
  .goods-list {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .goods-card {
      width: 230px;
      margin-bottom: 10px;
      margin-right: 10px;
      .pro-img {
        // padding: 15px 0;
        padding-bottom: 8px;
        margin-bottom: 6px;
        border-bottom: 1px solid #f0f0f0;
      }
      .title {
        color: #605046;
        font-size: 14px;
        height: 30px;
        line-height: 24px;
        overflow: hidden;
      }
      .btm {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
          color: #c3625d;
          span {
            font-size: 20px;
          }
        }
      }
    }
  }
  .page-area {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>