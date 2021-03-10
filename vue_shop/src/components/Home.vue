<template>
  <div class="home">
    <a-layout class="home-container">
      <!-- 头部区域 -->
      <a-layout-header>
        <div>
          <img src="../assets/heima.png" alt="" />
          <span>后台管理系统</span>
        </div>
        <a-button type="info" @click="logout">退出</a-button>
      </a-layout-header>
      <!-- 主体区域 -->
      <a-layout>
        <!-- 左侧侧边栏 -->
        <a-layout-sider v-model="collapsed" :collapsible="true">
          <!-- <div class="toogle-button" @click="toogleCoollapse">
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'"></a-icon>
          </div> -->
          <a-menu
            mode="inline"
            :open-keys="openKeys"
            :theme="theme"
            @openChange="onOpenChange"
            :inline-collapsed="collapsed"
          >
            <a-sub-menu v-for="item in menuList" :key="item.id">
              <!-- @click="handleClick(item.path)" -->
              <span slot="title">
                <!-- <a-icon type="menu" /> -->
                <i :class="iconsObj[item.id]" />
                <span v-show="!collapsed">{{ item.authName }}</span>
              </span>
              <a-menu-item
                v-for="ele in item.children"
                :key="ele.id"
                @click="handleClick(ele.path)"
              >
                <a-icon type="menu" />
                <span>{{ ele.authName }}</span>
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <!-- 主体 -->
        <a-layout-content class="content"
          ><router-view></router-view
        ></a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
 
<script>
export default {
  name: 'home',
  data() {
    return {
      collapsed: false,
      theme: 'dark',
      // 左侧菜单
      menuList: [],
      iconsObj: {
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao',
      },
      rootSubmenuKeys: [125, 103, 101, 102, 145],
      openKeys: [],
    }
  },
  created() {
    this.getMenuList()
    // this.selectedKeys
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    handleClick(data) {
      window.sessionStorage.setItem('activePath', data)
      this.$router.push('/' + data)
    },
    // 获取所有菜单
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      // console.log(res)
    },
    onOpenChange(openKeys) {
      // console.log(openKeys)
      const latestOpenKey = openKeys.find(
        (key) => this.openKeys.indexOf(key) === -1
      )
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    //菜单的折叠与展开
    toogleCoollapse() {
      this.collapsed = !this.collapsed
    },
  },
}
</script>
 
<style lang = "scss" scoped>
.home {
  height: 100%;
}
.toogle-button {
  background-color: #4a504a;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.ant-layout-header {
  background-color: #001529;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  font-size: 20px;
  color: #fff;
  span {
    margin-left: 15px;
  }
}
.ant-layout-sider {
  background: #001529;
}
.ant-layout-content {
  background: #eaedf1;
}
.home-container {
  height: 100%;
}
.iconfont {
  margin-right: 10px;
}
.content {
  margin-left: 15px;
  margin-top: 15px;
  margin-right: 15px;
}
</style>