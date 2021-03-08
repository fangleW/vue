<template>
  <div class="user">
    <a-breadcrumb>
      <a-breadcrumb-item><a href="#/home">首页</a></a-breadcrumb-item>
      <a-breadcrumb-item><a href="#/users">用户列表</a></a-breadcrumb-item>
      <a-breadcrumb-item><a>用户管理</a></a-breadcrumb-item>
    </a-breadcrumb>
    <!-- 卡片视图 -->
    <a-card>
      <!-- 搜索与添加区 -->
      <a-row :gutter="20">
        <a-col :span="7">
          <a-input-search
            placeholder="请输入搜索内容"
            enter-button
            @search="onSearch"
          />
        </a-col>
        <a-col :span="4">
          <a-button type="primary">添加用户</a-button>
        </a-col>
      </a-row>
      <!-- 表格区域 -->
      <a-table
        :columns="columns"
        :data-source="userList"
        :rowKey="() => Math.random(0, 1)"
        bordered
      >
        <span slot="type" slot-scope="record"></span>
        <span slot="action" slot-scope="record"></span>
      </a-table>
    </a-card>
  </div>
</template>
 
<script>
export default {
  name: 'user',
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      userList: [],
      total: 0,
      columns: [
        {
          title: '姓名',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: '电话',
          dataIndex: 'mobile',
          key: 'mobile',
        },
        {
          title: '角色',
          dataIndex: 'role_name',
          key: 'role_name',
        },
        {
          title: '状态',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' },
        },
        {
          title: '操作',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
        },
      ],
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('users', {
        params: this.queryInfo,
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败!')
      }
      this.userList = res.data.users
      this.total = res.data.total
    },
    onSearch() {},
  },
}
</script>
 
<style scoped lang = "scss">
</style>