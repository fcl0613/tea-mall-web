<template>
  <div class="container">
    <div class="header">
      <div class="logo" @click="toHomePage">茶易网</div>
      <h2>购物车</h2>
    </div>
    <div class="content">
      <div class="cart-area">
        <el-table
          ref="multipleTable"
          :data="cartList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="goodsName" label="商品" width="120">
          </el-table-column>
          <el-table-column label="商品图片" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-image
                style="width: 100px; height: 100px"
                :src="baseImageUrl + scope.row.goodsCover"
                fit="fit"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="单价" width="150">
          </el-table-column>
          <el-table-column label="数量" width="200">
            <template slot-scope="scope">
              <el-input-number
                v-model="scope.row.goodsCount"
                @change="handleChange(scope.row)"
                :min="1"
                :max="10"
                size="small"
                label="描述文字"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="removeCart(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="total-area">
        <div class="left">
          <el-button type="text" @click="removeBatch">删除</el-button>
        </div>
        <div class="right">
          <div class="total-price">
            总计：<span>￥</span><span v-text="computedTotalPrice"></span>
          </div>
          <el-button type="primary" @click="toPay">去结算</el-button>
        </div>
      </div>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyFooter from '@/components/MyFooter'
import cartApi from '@/api/cart'
import baseImageUrl from '@/utils/baseImageUrl'
export default {
  components: {
    MyFooter,
  },
  computed: {
    computedTotalPrice() {
      let totalPrice = 0
      for (const item of this.cartList) {
        if (this.checkCartIds.indexOf(item.id) !== -1) {
          let temp = item.price * item.goodsCount
          totalPrice += temp
        }
      }
      return totalPrice
    },
  },
  data() {
    return {
      cartList: [],
      baseImageUrl: baseImageUrl.BASE_IMG_URL,
      checkCartIds: [],
    }
  },
  created() {
    this.getCartList()
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
      let list = []
      for (let item of val) {
        list.push(item.id)
      }
      this.checkCartIds = list
    },
    getCartList() {
      cartApi.getCartList().then((res) => {
        this.cartList = res.data
      })
    },
    handleChange(row) {
      console.log(row)
    },
    removeCart(id) {
      this.$confirm('确定要删除该商品嘛?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          cartApi.deleteCart(id).then((res) => {
            this.$message.success(res.msg)
            this.getCartList()
          })
        })
        .catch(() => {})
    },
    toPay() {},
    removeBatch() {
      if (this.checkCartIds.length === 0) {
        this.$message.error('请选择删除的商品')
        return
      }
      this.$confirm('确定要删除这些商品嘛?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let obj = { list: this.checkCartIds }
          cartApi.deleteCartBatch(obj).then((res) => {
            this.$message.success(res.msg)
            this.getCartList()
          })
        })
        .catch(() => {})
    },
    toHomePage() {
      this.$router.push({
        path: '/home',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  .header {
    height: 90px;
    display: flex;
    justify-content: baseline;
    // align-items: center;
    width: 1200px;
    margin: 0 auto;
    .logo {
      margin-top: 20px;
      font-size: 40px;
      font-weight: bold;
      cursor: pointer;
    }
    h2 {
      margin: 0 20px;
      line-height: 110px;
    }
  }
  .content {
    width: 1200px;
    margin: 0 auto;
    .total-area {
      display: flex;
      justify-content: space-between;
      // margin-top: 10px;
      padding-left: 20px;
      border: 1px solid #ddd;
      background-color: #fff;
      .right {
        display: flex;
        .total-price {
          margin-right: 50px;
          text-align: 40px;
          line-height: 40px;
          font-size: 20px;
          span {
            font-size: 30px;
            color: red;
          }
        }
        .el-button {
          width: 150px;
        }
      }
    }
  }
}
</style>