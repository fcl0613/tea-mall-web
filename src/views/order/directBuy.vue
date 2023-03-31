<template>
  <div class="container">
    <div class="address-area">
      <div class="address-title">选择收货地址</div>
      <div class="address-list" v-if="addressList.length > 0">
        <div class="address-card" v-for="(item, index) in addressList" :key="index" :class="addressId === item.id ? 'hover' : ''" @click="changeAddressId(item.id)">
          <div class="name">{{ item.linkName }}</div>
          <div class="phone">{{ item.linkPhone }}</div>
          <div class="address">
            <span>{{ item.province }}</span>
            <span>{{ item.city }}</span>
            <span>{{ item.county }}</span>
            <span>{{ item.address }}</span>
            </div>
        </div>
      </div>
      <el-empty v-else description="暂无收货地址，请先添加收货地址"></el-empty>
      <div class="address-bottom">
        <el-button type="text" @click="toAddressPage">管理收货地址</el-button>
      </div>
    </div>
    <div class="order-area" v-if="orderList.length > 0">
      <div class="store-area" v-for="(item, index) in orderList" :key="index">
        <div class="store-name">店铺名称：{{ item.storeName }}</div>
        <div class="goods-list" v-if="item.goodsList.length > 0">
          <div class="goods-card" v-for="(element, index) in item.goodsList" :key="index">
            <div class="goods-pic">
              <el-image
                style="width: 60px; height: 60px"
                :src="baseUrl + element.goodsCover"
                fit="fit"
              ></el-image>
            </div>
            <div class="goods-name">{{ element.goodsName }}</div>
            <div class="goods-price"><span>{{ element.goodsPrice }}</span>元</div>
            <div class="goods-count">{{ element.goodsCount }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="order-bottom">
      <div class="box">
        <div class="total-price">实际付款<span>￥{{ totalPrice }}</span></div>
        <el-button type="primary" @click="subOrder">提交订单</el-button>
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
      addressId: 0,
      goodsId: this.$route.query.goodsId,
      goodsCount: this.$route.query.count,
      baseUrl: baseImageUrl.BASE_IMG_URL,
      addressList: [],
      orderList: [],
      totalPrice: 0,
    }
  },
  created() {
    this.getOrderConfirm()
  },
  methods: {
    getOrderConfirm() {
      orderApi.directConfirm(this.goodsId, this.goodsCount).then((res) => {
        this.addressList = res.data.addressList
        if(this.addressList.length > 0) {
          this.addressId = this.addressList[0].id
        }
        this.orderList = res.data.orderConfirmItemList
        this.totalPrice = res.data.totalPrice
      })
    },
    changeAddressId(id) {
      console.log(id)
      this.addressId = id
    },
    toAddressPage() {
      this.$router.push({
        path: '/home/myLayout/address'
      })
    },
    subOrder() {
      orderApi.directBuy(this.goodsId, this.goodsCount, this.addressId).then((res) => {
        this.$message.success('订单创建成功，请前往付款');
        this.$router.push({
          path: '/home/myLayout/myinfo'
        })
      })
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  .address-area {
    margin-top: 20px;
    .address-title {
      font-size: 20px;
      font-weight: bold;
    }
    .address-list {
      margin-top: 20px;
      display: flex;
      flex-flow: row wrap;
      .address-card {
        margin-bottom: 10px;
        margin-left: 20px;
        padding: 10px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 10px;
        div {
          margin: 6px 0;
          color: #666;
        }
        .name {
          font-size: 16px;
          font-weight: bold;
        }
      }
      .hover {
        border: 2px solid rgb(165, 25, 25);
      }
    }
    .address-bottom {
      display: flex;
      justify-content: flex-end;
      margin-right: 20px;
    }
  }
  .order-area {
    .store-area {
      padding: 10px 20px;
      margin-bottom: 20px;
      background-color: #fff;
      .goods-list {
        margin-top: 20px;
        .goods-card {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          padding: 0 100px;
          .goods-pic {
            margin-right: 30px;
          }
          .goods-name {
            overflow: hidden;
            margin-right: 30px;
            width: 220px;
          }
          .goods-price {
            margin-right: 30px;
          }
        }
      }
    }
  }
  .order-bottom {
    display: flex;
    justify-content: flex-end;
    .box {
      padding: 10px 20px;
      background-color: #fff;
      border: 2px solid rgb(255, 0, 54);
      .total-price {
        margin-bottom: 20px;
        span {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>