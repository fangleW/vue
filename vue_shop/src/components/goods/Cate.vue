<template>
  <div class="cate">
    <a-breadcrumb>
      <a-breadcrumb-item><a href="#/home">首页</a></a-breadcrumb-item>
      <a-breadcrumb-item><a href="#/users">商品管理</a></a-breadcrumb-item>
      <a-breadcrumb-item><a>商品分类</a></a-breadcrumb-item>
    </a-breadcrumb>
    <!-- 卡片视图区域 -->
    <a-card>
      <a-row>
        <a-col>
          <a-button type="primary">添加分类</a-button>
        </a-col>
      </a-row>
      <!-- 表格 -->
      <tree-table
        class="treetable"
        :data="cateList"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="#"
        border
        :show-row-hover="false"
      >
        <template slot="isok" slot-scope="scope">
          <a-icon
            type="check-circle"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen"
          />
          <a-icon type="close-circle" style="color: red" v-else />
        </template>
        <template slot="order" slot-scope="scope">
          <a-tag color="#2db7f5" v-if="scope.row.cat_level === 0">一级</a-tag>
          <a-tag color="#87d068" v-else-if="scope.row.cat_level === 1"
            >二级</a-tag
          >
          <a-tag color="#f50" v-else-if="scope.row.cat_level === 2">三级</a-tag>
        </template>
        <template slot="opt" slot-scope="scope">
          <a-button icon="edit" type="primary" @click="edit(scope)"></a-button>
          <a-button icon="delete" type="danger"></a-button>
        </template>
      </tree-table>
      <!-- 分页 -->
      <a-pagination
        size="small"
        :total="total"
        :current="queryInfo.pagenum"
        :page-size.sync="queryInfo.pagesize"
        show-size-changer
        show-quick-jumper
        :show-total="(total) => `共 ${total} 条`"
        @change="handleSizeChange"
        @showSizeChange="handleCurrentChange"
        :pageSizeOptions="['3', '5', '10', '15']"
      />
    </a-card>
  </div>
</template>
 
<script>
export default {
  name: 'cate',
  data() {
    return {
      cateList: [], //商品分类的数据列表,
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      total: 0, //总数据条数
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
        },
        {
          label: '是否有效',
          type: 'template', //将当前列定义为模板列
          template: 'isok', //当前这一列使用的模板名称
        },
        {
          label: '排序',
          type: 'template', //将当前列定义为模板列
          template: 'order', //当前这一列使用的模板名称
        },
        {
          label: '操作',
          type: 'template', //将当前列定义为模板列
          template: 'opt', //当前这一列使用的模板名称
        },
      ], //为table指定列
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.queryInfo,
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品失败')
      }
      console.log(res)
      this.cateList = res.data.result
      this.total = res.data.total
    },
    handleSizeChange(page, pageSize) {
      //监听pagesize改变
      this.queryInfo.pagesize = pageSize
      this.getCateList()
    },
    handleCurrentChange(current, size) {
      this.queryInfo.pagenum = size
      this.getCateList()
    },
  },
}
</script>
 
<style scoped lang = "scss">
.treetable {
  margin: 16px 0;
}
</style>