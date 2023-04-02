<template>
  <div class="container">
    <div class="content">
      <h2>待评价商品</h2>
      <div class="goods-list-area">
        <div class="goods-list" v-if="goodsList.length > 0">
          <div
            class="goods-area"
            v-for="(item, index) in goodsList"
            :key="index"
          >
            <div class="goods-card">
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
            <el-button @click="showForm(item.id)">去评价</el-button>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title="收货地址"
      :visible.sync="dialogFormVisible"
      @close="resetForm"
    >
      <el-form :model="form">
        <el-form-item label="评价内容" label-width="100px">
          <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="subForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import orderApi from '@/api/order'
import baseImageUrl from '@/utils/baseImageUrl'
import commentAPi from '@/api/comment'
export default {
  data() {
    return {
      goodsList: [],
      baseUrl: baseImageUrl.BASE_IMG_URL,
      dialogFormVisible: false,
      form: {
        id: 0,
      },
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList() {
      orderApi.getCommentGoods().then((res) => {
        this.goodsList = res.data
      })
    },
    resetForm() {
      this.form = {}
    },
    showForm(id) {
      this.form.id = id
      this.dialogFormVisible = !this.dialogFormVisible
    },
    subForm() {
      if (this.form.content === '') {
        this.$message.warning('请输入评价内容')
        return
      }

      commentAPi.createComment(this.form).then((res) => {
        this.dialogFormVisible = !this.dialogFormVisible
        this.$message.success(res.msg)
        this.getGoodsList()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  .content {
    padding: 0 20px 20px 20px;
    .goods-list-area {
      .goods-list {
        .goods-area {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: 1px solid #ddd;
          padding-right: 20px;
          .goods-card {
            padding: 20px;
            display: flex;

            .goods-pic {
              margin-right: 30px;
            }
            .goods-info {
              margin-right: 30px;
            }
          }
        }
      }
    }
  }
}
</style>