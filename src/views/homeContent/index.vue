<template>
  <div class="container" v-if="homeContent">
    <div class="index-banner">
      <el-carousel height="460px">
        <el-carousel-item v-for="(item, index) in homeContent.bannerList" :key="index">
          <el-image
            :src="baseImageUrl + item.bannerUrl"
            fit="contain"
          ></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="series-box">
      <h2>分类推荐</h2>
      <HomeProList v-for="(item, index) in homeContent.categoryList" :key="index" :proObj="item"></HomeProList>
    </div>
  </div>
</template>

<script>
import HomeProList from '@/components/HomeProList'
import homeApi from '@/api/home'
import baseImageUrl from '@/utils/baseImageUrl'
export default {
  components: {
    HomeProList,
  },
  data() {
    return {
      homeContent: {},
      baseImageUrl: baseImageUrl.BASE_IMG_URL
    }
  },
  created() {
    this.getHomeContent()
  },
  methods: {
    getHomeContent() {
      homeApi.getHomeContent().then((res) => {
        this.homeContent = res.data
      }) 
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  .index-banner {
    width: 1200px;
    height: 460px;
    margin: 0 auto;
  }
  .series-box {
    width: 1200px;
    margin: 0 auto;
  }
}
</style>