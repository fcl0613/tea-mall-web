<template>
  <div id="app" class="app">
    <router-view></router-view>
    <el-backtop target=".app">
      <div
        style="
           {
            height: 100%;
            width: 100%;
            background-color: #f2f5f6;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
            text-align: center;
            line-height: 40px;
            color: #1989fa;
          }
        "
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
.app {
  height: 100vh;
  overflow-x: hidden;
}
</style>

