<template>
  <div class="roles">
    <a-breadcrumb>
      <a-breadcrumb-item><a href="#/home">首页</a></a-breadcrumb-item>
      <a-breadcrumb-item><a href="#/roles">权限管理</a></a-breadcrumb-item>
      <a-breadcrumb-item><a>角色管理</a></a-breadcrumb-item>
    </a-breadcrumb>
    <a-card>
      <!-- 添加角色按钮 -->
      <a-row>
        <a-col>
          <a-button type="primary">添加角色</a-button>
        </a-col>
      </a-row>
      <a-table></a-table>
    </a-card>
  </div>
</template>
 
<script>
export default {
  name: 'roles',
  data() {
    return {
      //所有角色列表
      roleList: [],
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      } else {
        this.roleList = res.data
        this.$message.success('获取角色列表成功')
      }
    },
  },
}
</script>
 
<style scoped lang = "scss">
</style>