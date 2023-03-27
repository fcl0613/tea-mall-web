<template>
  <div class="container">
    <div class="goods-base-info">
      <div class="pic-area">
        <div class="main-pic">
          <el-image v-if="curImageUrl"
            style="width: 380px; height: 380px"
            :src="baseImageUrl + curImageUrl"
            fit="fit"
          ></el-image>
        </div>
        <div class="pic-list">
          <ul>
            <li
              v-for="(item, index) in goodsInfo.goodsCoverList"
              :key="index"
              @mouseenter="enterEvent(item)"
              @mouseleave="leaveEvent(item)"
            >
              <el-image
                style="width: 50px; height: 50px"
                :src="baseImageUrl + item"
                fit="fit"
              ></el-image>
            </li>
          </ul>
        </div>
      </div>
      <div class="goods-info">
        <div class="goods-name">{{ goodsInfo.goodsName }}</div>
        <div class="goods-des">{{ goodsInfo.subtitle }}</div>
        <div class="goods-price">
          <strong>￥<span>{{ goodsInfo.price }}</span></strong>
        </div>
        <div class="goods-count">
          <span>数 量:</span>
          <el-input-number
            v-model="goodsCount"
            @change="handleChange"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </div>
        <div class="btn-group">
          <div class="has-stock">
            <el-button type="primary">立即购买</el-button>
            <el-button>加入购物车</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="goods-detail-area">
      <el-tabs type="border-card">
        <el-tab-pane label="商品详情">
          <div class="detail">
            <el-divider><h2>商品介绍</h2></el-divider>
            <div class="detail-pic-list">
              <el-image
                v-for="(item, index) in goodsInfo.goodsDetailList"
                :key="index"
                :src="baseImageUrl + item"
                fit="fit"
              ></el-image>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="评价详情">
          <div class="detail">
            <el-divider><h2>商品评价</h2></el-divider>
            <div class="comment-list">
              <div class="comment-item">
                <div class="comment-left">
                  <el-avatar
                    :size="50"
                    src="http://wx.qlogo.cn/mmopen/vi_32/rh2ib1iat8EXh3Z4PzsPLTVGdFS7YCribnDsydz22kPAxQdQAiaicXFniczMl6XQR5t3XY7oYnX7qg46zyaGsHOh0fPQ/0"
                  ></el-avatar>
                </div>
                <div class="comment-right">
                  <div class="right-header">
                    <div class="fl">152****2233</div>
                    <div class="fr">2023-03-10 12:51</div>
                  </div>
                  <div class="comment-content">dadawdwa</div>
                </div>
              </div>
            </div>
            <div class="page-area" v-if="commentCount > 5">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="commentCount"
              >
              </el-pagination>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import goodsApi from '@/api/goods'
import baseImageUrl from '@/utils/baseImageUrl'
export default {
  data() {
    return {
      goodsId: this.$route.query.id,
      goodsInfo: {},
      baseImageUrl: baseImageUrl.BASE_IMG_URL,
      goodsCount: 1,
      commentCount: 0,
      curImageUrl:'',
    }
  },
  created() {
      this.getGoodsInfo()
  },
  methods: {
    getGoodsInfo() {
      goodsApi.getGoodsInfo(this.goodsId).then((res) => {
        this.goodsInfo = res.data
        this.curImageUrl = this.goodsInfo.goodsCoverList[0]
      })
    },
    enterEvent(e) {
      console.log(e)
      this.curImageUrl = e
    },
    leaveEvent() {
      console.log('鼠标离开')
    },
    handleChange() {},
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  .goods-base-info {
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    border: 1px solid #dedede;
    background-color: #fff;
    .pic-area {
      padding: 10px;
      margin-right: 20px;
      .pic-list {
        margin-top: 10px;
        ul {
          width: 384px;
          overflow: hidden;
          li {
            border: 1px solid #ddd;
            margin: 0 4px 10px;
            padding: 2px;
            display: inline;
            float: left;
          }
          li:hover {
            border-color: #b0352f;
          }
          //   .current {
          //   }
        }
      }
    }
    .goods-info {
      padding: 50px 20px 20px 20px;
      border-left: 1px solid #dedede;
      width: 100%;
      .goods-name {
        font-size: 16px;
        font-weight: bold;
      }
      .goods-des {
        margin-top: 6px;
        color: #999;
        font-size: 12px;
      }
      .goods-price {
        margin-top: 10px;
        background-color: #b0352f;
        padding: 10px 0 10px 30px;
        strong {
          color: #fff;
          font-size: 38px;
        }
      }
      .goods-count {
        margin-top: 50px;
        span {
          margin-right: 30px;
        }
      }
      .btn-group {
        margin-top: 50px;
      }
    }
  }
  .goods-detail-area {
    margin-top: 20px;
    .detail {
      padding: 0 100px;
      .detail-pic-list {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
      }
      .comment-list {
        padding-top: 20px;
        .comment-item {
          margin-bottom: 20px;
          border-bottom: 1px solid #eee;
          padding-bottom: 20px;
          display: flex;
          //   justify-content: space-between;
          .comment-right {
            margin-left: 30px;
            width: 100%;
            padding-bottom: 5px;
            border-bottom: 1px dashed #eee;
            margin-bottom: 12px;
            color: #aaa;
            .right-header {
              display: flex;
              justify-content: space-between;
            }
            .comment-content {
              margin-top: 10px;
              color: #666;
              overflow: hidden;
            }
          }
        }
      }
      .page-area {
        float: right;
      }
    }
  }
}
</style>