<template>
  <div class="rights">
    <a-breadcrumb>
      <a-breadcrumb-item><a href="#/home">首页</a></a-breadcrumb-item>
      <a-breadcrumb-item><a href="#/rights">权限管理</a></a-breadcrumb-item>
      <a-breadcrumb-item><a>权限列表</a></a-breadcrumb-item>
    </a-breadcrumb>
    <a-card>
      <a-table
        :columns="columns"
        :data-source="rightsLsit"
        :pagination="false"
        :rowKey="() => Math.random()"
        bordered
      >
        <span slot="level" slot-scope="text, record">
          <a-tag color="#f50" v-if="record.level == '0'">一级</a-tag>
          <a-tag color="#2db7f5" v-else-if="record.level == '1'">二级</a-tag>
          <a-tag color="#87d068" v-else-if="record.level == '2'">三级</a-tag>
        </span>
      </a-table>
    </a-card>
  </div>
</template>
 
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '权限名称',
    dataIndex: 'authName',
    key: 'authName',
  },
  {
    title: '路径',
    dataIndex: 'path',
    key: 'path',
  },
  {
    title: '权限等级',
    dataIndex: 'level',
    scopedSlots: { customRender: 'level' },
    key: 'level',
  },
]
export default {
  name: 'rights',
  data() {
    return {
      //所有的权限列表
      rightsLsit: [],
      columns,
    }
  },
  created() {
    this.getRightsLsit()
  },
  methods: {
    async getRightsLsit() {
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败')
      } else {
        this.rightsLsit = res.data
        console.log(this.rightsLsit)
      }
    },
  },
}
</script>
 
<style scoped lang = "scss">
</style>