<template>
  <div class="container">
    <div class="content">
      <div class="tab-bar">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部订单" name="0"></el-tab-pane>
          <el-tab-pane label="待支付" name="1"></el-tab-pane>
          <el-tab-pane label="待发货" name="2"></el-tab-pane>
          <el-tab-pane label="待收货" name="3"></el-tab-pane>
          <el-tab-pane label="已完成" name="4"></el-tab-pane>
          <el-tab-pane label="已取消" name="5"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="order-list-area">
        <div class="order-list" v-if="orderList.length > 0">
          <div
            class="order-area"
            v-for="(item, index) in orderList"
            :key="index"
          >
            <div class="status">{{ item.statusStr }}</div>
            <div class="info">
              <div class="info-left">
                <span>{{ item.createTime }}</span>
                <span> | </span>
                <span>收货人: {{ item.deliveryName }}</span>
                <span> | </span>
                <span>订单号：{{ item.orderId }}</span>
              </div>
              <div class="info-right">
                金额：
                <span>{{ item.totalPrice }}</span>
                元
              </div>
            </div>
            <el-divider></el-divider>
            <div class="goods-list-area">
              <div class="goods-list" v-if="item.goodsList.length > 0">
                <div class="goods-area">
                  <div
                    class="goods-card"
                    v-for="(item, index) in item.goodsList"
                    :key="index"
                  >
                    <div class="goods-pic">
                      <el-image
                        style="width: 100px; height: 100px"
                        :src="baseUrl + item.goodsCover"
                        fit="fit"
                      ></el-image>
                    </div>
                    <div class="goods-info">
                      <p>{{ item.goodsName }}</p>
                      <p>
                        <span>{{ item.goodsPrice }}</span> ×
                        <span>{{ item.goodsCount }}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="btn-group">
                  <el-button v-if="item.status === 1">去付款</el-button>
                  <el-button
                    v-if="item.status === 1"
                    @click="cancelOrder(item.orderId)"
                    >取消订单</el-button
                  >
                  <el-button
                    v-if="item.status === 2 || item.status === 3"
                    @click="determineOrder(item.orderId)"
                    >确认收货</el-button
                  >
                  <el-button @click="toDetailPage(item.orderId)">订单详情</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-area">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageNum"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import orderApi from '@/api/order'
import baseImageUrl from '@/utils/baseImageUrl'
export default {
  data() {
    return {
      activeName: '0',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      orderList: [],
      baseUrl: baseImageUrl.BASE_IMG_URL,
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    handleClick() {
      this.pageNum = 1
      this.pageSize = 10
      this.getOrderList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getOrderList()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getOrderList()
    },
    getOrderList() {
      let obj = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: parseInt(this.activeName),
      }
      orderApi.getOrderList(obj).then((res) => {
        this.orderList = res.data.orderList
        this.total = res.data.total
      })
    },
    cancelOrder(id) {
      this.$confirm('确定取消该订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          orderApi.cancelOrder(id).then((res) => {
            this.$message.success(res.msg)
            this.getOrderList()
          })
        })
        .catch(() => {})
    },
    determineOrder(id) {
      this.$confirm('确定收到货了吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          orderApi.determineOrder(id).then((res) => {
            this.$message.success(res.msg)
            this.getOrderList()
          })
        })
        .catch(() => {})
    },
    toDetailPage(id) {
      this.$router.push({
        path: '/home/myLayout/orderdetail',
        query: {
          id:id
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  //   padding: 20px;
  width: 100%;
  .content {
    padding: 20px;
    .order-list-area {
      margin-top: 10px;
      .order-list {
        .order-area {
          margin-bottom: 10px;
          padding: 10px 20px;
          border: 1px solid #b0b0b0;
          .status {
            margin-bottom: 10px;
            font-size: 16px;
            color: #8c8c8c;
          }
          .info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            color: #757575;
            .info-right {
              span {
                font-size: 20px;
                color: #a10000;
              }
            }
          }
          .goods-list-area {
            .goods-list {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .goods-area {
                margin-bottom: 10px;
                .goods-card {
                  display: flex;
                  .goods-info {
                    margin-left: 30px;
                    p {
                      font-size: 12px;
                      color: #666;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    .page-area {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>