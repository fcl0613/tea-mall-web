<template>
  <div class="container">
    <div class="series-list" v-if="proObj.categoryName">
      <div class="category-info">
        <strong><a class="phr" href="#">{{ proObj.categoryName }}</a></strong>
        <span>
          <a href="#" v-for="(item, index) in proObj.children" :key="index">{{ item.categoryName }}</a>
        </span>
      </div>
      <div class="pro-list">
        <div class="pro-card" v-for="(item, index) in proObj.goodsList" :key="index">
          <el-card>
            <div class="pro-img">
              <el-image
                style="width: 250px; height: 250px"
                :src="baseImageUrl + item.goodsCover"
                fit="fit"
              ></el-image>
            </div>
            <div class="title">{{ item.goodsName }}</div>
            <div class="btm">
              <div class="price">￥<span>{{ item.price }}</span></div>
              <div class="btn"><el-button>立即购买</el-button></div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import baseImageUrl from '@/utils/baseImageUrl'
export default {
  props: {
    proObj: {
      type: Object,
      default: function() {return {}}
    }
  },
  data() {
    return {
      baseImageUrl: baseImageUrl.BASE_IMG_URL
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  .series-list {
    margin-bottom: 20px;
    .category-info {
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
      .phr {
        color: #605046;
      }
      span {
        a {
          margin-left: 10px;
          color: #605046;
          font-size: 12px;
        }
      }
    }
    .pro-list {
      width: 1200px;
      margin-top: 10px;
      display: flex;
      flex-flow: row wrap;
      // display: -webkit-flex;
      .pro-card {
        width: 290px;
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
  }
}
</style>