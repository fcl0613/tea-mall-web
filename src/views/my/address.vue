<template>
  <div class="conatiner">
    <div class="content">
      <el-card class="add-area">
        <div class="card-area" @click="showAddAddressDialog">
          <i class="el-icon-circle-plus"></i>
          <p>添加地址</p>
        </div>
      </el-card>
      <el-card
        class="list-area"
        v-for="(item, index) in addressList"
        :key="index"
      >
        <div class="address-area" v-if="item">
          <div class="link-name">{{ item.linkName }}</div>
          <div class="info-area">
            <p>{{ item.phone }}</p>
            <p>{{ item.province + item.city + item.county }}</p>
            <p>{{ item.address }}</p>
          </div>
          <div class="btn-group">
            <el-button type="text" @click="showUpdateAddressDialog(item.id)"
              >修改</el-button
            >
            <el-button type="text" style="color: #b0352f" @click="removeAddress(item.id)">删除</el-button>
          </div>
        </div>
      </el-card>
    </div>

    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      label-width="120px"
      width="30%"
    >
      <el-form :model="addressForm">
        <el-form-item label="联系人">
          <el-input v-model="addressForm.linkName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="addressForm.linkPhone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-cascader
            placement="bottom"
            :options="options"
            v-model="selectedOptionsCode"
            ref="addressCascader"
            @change="addressChoose"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="addressForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="subForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from 'element-china-area-data'
import addressApi from '@/api/address'
export default {
  data() {
    return {
      title: '添加地址',
      dialogFormVisible: false,
      addressForm: {},
      options: regionData,
      selectedOptionsCode: [],
      selectedOptionsName: [],
      addressList: [],
      curAddress: {},
    }
  },
  created() {
    this.getAddressList()
  },
  methods: {
    showAddAddressDialog() {
      this.title = '添加地址'
      this.dialogFormVisible = !this.dialogFormVisible
    },
    showUpdateAddressDialog(id) {
      this.title = '修改地址'
      this.dialogFormVisible = !this.dialogFormVisible
      this.getDetail(id)
    },
    addressChoose(val) {
      console.log(val)
      let ref = this.$refs['addressCascader']
      // console.log(ref.getCheckedNodes()[0].pathLabels)
      this.selectedOptionsName = ref.getCheckedNodes()[0].pathLabels
    },
    cancel() {
      this.addressForm = {}
      this.dialogFormVisible = !this.dialogFormVisible
    },
    subForm() {
      this.addressForm.provinceCode = this.selectedOptionsCode[0]
      this.addressForm.cityCode = this.selectedOptionsCode[1]
      this.addressForm.countyCode = this.selectedOptionsCode[2]
      this.addressForm.province = this.selectedOptionsName[0]
      this.addressForm.city = this.selectedOptionsName[1]
      this.addressForm.county = this.selectedOptionsName[2]
      if (this.addressForm.id) {
        this.updateAddress()
      } else {
        this.addAddress()
      }
    },
    getAddressList() {
      addressApi.getAddressList().then((res) => {
        this.addressList = res.data
      })
    },
    getDetail(id) {
      addressApi.getDetail(id).then((res) => {
        this.addressForm = res.data
        this.selectedOptionsCode = [
          this.addressForm.provinceCode,
          this.addressForm.cityCode,
          this.addressForm.countyCode,
        ]
      })
    },
    addAddress() {
      addressApi.addAddress(this.addressForm).then((res) => {
        this.$message.success(res.msg)
        this.dialogFormVisible = !this.dialogFormVisible
        this.addressForm = {}
        this.getAddressList()
      })
    },
    updateAddress() {
      addressApi.updateAddress(this.addressForm).then((res) => {
        this.$message.success(res.msg)
        this.dialogFormVisible = !this.dialogFormVisible
        this.addressForm = {}
        this.getAddressList()
      })
    },
    removeAddress(id) {
      this.$confirm('确定要删除这些商品嘛?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let obj = { list: this.checkCartIds }
          addressApi.removeAddress(id).then((res) => {
            this.$message.success(res.msg)
            this.getAddressList()
          })
        })
        .catch(() => {})
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  .content {
    display: flex;
    justify-content: space-between;
    padding: 20px 100px;
    flex-flow: wrap row;
    .el-card {
      margin-top: 20px;
      margin-right: 20px;
      width: 300px;
      height: 200px;
    }
    .add-area {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .card-area {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        i {
          font-size: 30px;
        }
      }
    }
    .list-area {
      .address-area {
        .link-name {
          font-size: 20px;
        }
        .info-area {
          margin-top: 10px;
          p {
            margin: 5px 0;
          }
        }
      }
    }
  }
}
.el-dialog {
  .el-form {
    .el-form-item {
      .el-input {
        width: 200px;
      }
      .el-cascader {
        width: 200px;
      }
    }
  }
}
</style>