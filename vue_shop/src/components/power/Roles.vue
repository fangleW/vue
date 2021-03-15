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
      <a-table
        :columns="columns"
        :data-source="roleList"
        bordered
        :rowKey="() => Math.random()"
        :pagination="false"
        childrenColumnName=""
      >
        <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
          <!-- <pre>{{record}}</pre> -->
          <a-row
            v-for="(item1, key1) in record.children"
            :key="key1"
            :class="['bdbottom', key1 === 0 ? 'bdtop' : '', 'vcenter']"
          >
            <!-- 渲染一级 -->
            <a-col :span="5">
              <a-tag
                color="#2db7f5"
                @close="removeRight"
                closable
                :afterClose="() => removeRightById(record, item1.id)"
                >{{ item1.authName }}</a-tag
              ><a-icon type="caret-right" />
            </a-col>
            <!-- 渲染二级和三级 -->
            <a-col :span="19">
              <!-- 渲染二级权限 -->
              <a-row
                v-for="(item2, key2) in item1.children"
                :key="key2"
                :class="[key2 == 0 ? '' : 'bdtop', 'vcenter']"
              >
                <a-col :span="6">
                  <a-tag
                    closable
                    color="#87d068"
                    @close="removeRight"
                    :afterClose="() => removeRightById(record, item2.id)"
                    >{{ item2.authName }}</a-tag
                  >
                  <a-icon type="caret-right" />
                </a-col>
                <a-col :span="18">
                  <a-tag
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    color="#f50"
                    closable
                    @close="removeRight"
                    :afterClose="() => removeRightById(record, item3.id)"
                    >{{ item3.authName }}</a-tag
                  >
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </p>
        <span slot="action" slot-scope="text, record">
          <a-row :gutter="0">
            <a-col :span="4">
              <a-button
                @click="editRoles(record)"
                icon="edit"
                type="primary"
              ></a-button>
            </a-col>
            <a-col :span="4">
              <a-button
                @click="deleteRoles(record)"
                icon="delete"
                type="danger"
              ></a-button>
            </a-col>
            <a-col :span="4">
              <a-button
                @click="settingRoleRights(record)"
                icon="setting"
                type="info"
              ></a-button>
            </a-col>
          </a-row>
        </span>
      </a-table>
      <!-- 展示分配权限对话框 -->
      <a-modal
        title="分配权限"
        :visible="setRightModalVisible"
        :confirm-loading="setRightOkLoading"
        @ok="setRightModalOk"
        @cancel="setRightModalCancel"
      >
        <a-tree
          :tree-data="rightsList"
          checkable
          :replaceFields="replaceFields"
          :defaultExpandAll="true"
          :defaultCheckedKeys="defKeys"
          @check="checkArr"
        />
        <!-- :checkedKeys="checkKeys" -->
      </a-modal>
    </a-card>
  </div>
</template>
 
<script>
const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    key: 'roleName',
  },
  {
    title: '角色描述',
    dataIndex: 'roleDesc',
    key: 'roleDesc',
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    key: 'action',
  },
]
export default {
  name: 'roles',
  data() {
    return {
      roleId: '',
      //所有角色列表
      roleList: [],
      rightsList: [],
      columns,
      //对话框
      setRightModalVisible: false,
      setRightOkLoading: false,
      replaceFields: { children: 'children', title: 'authName', key: 'id' },
      //默认选中的节点
      defKeys: [],
      checkKeys: [],
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
    removeRight(e) {
      e.preventDefault()
    },
    removeRightById(role, rightId) {
      // 弹框提示是否删除
      const _this = this
      this.$confirm({
        title: '确认删除此权限？',
        content: '此操作将永久删除此权限，请谨慎操作!',
        async onOk() {
          const { data: res } = await _this.$http.delete(
            `roles/${role.id}/rights/${rightId}`
          )
          if (res.meta.status !== 200) {
            return _this.$message.error('删除权限失败')
          }
          role.children = res.data
          _this.getRoleList()
        },
        onCancel() {
          _this.$message.info('取消了删除!')
        },
      })
    },
    //分配权限
    async settingRoleRights(role) {
      console.log('role', role)
      this.roleId = role.id
      //获取所有权限数据
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取数据列表失败')
      }
      this.rightsList = res.data
      //获取三级节点权限
      this.getLeafkeys(role, this.defKeys)
      console.log('defKey', this.defKeys)
      this.setRightModalVisible = true
    },
    async setRightModalOk() {
      const idStr = this.defKeys.join(',')
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        {
          rids: idStr,
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('分配权限失败')
      }
      //this.$message.success('分配权限成功')
      this.getRoleList()
      this.setRightModalVisible = false
    },
    setRightModalCancel() {
      this.defKeys = []
      this.setRightModalVisible = false
    },
    //通过递归获取角色下的三层权限的id
    getLeafkeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach((item) => {
        this.getLeafkeys(item, arr)
      })
    },
    checkArr(checkedKeys, e) {
      this.defKeys = [...checkedKeys, ...e.halfCheckedKeys]
    },
  },
}
</script>
 
<style scoped lang = "scss">
.ant-tag {
  margin: 10px;
}
.bdtop {
  border-top: 1px solid #ccc;
}
.bdbottom {
  border-bottom: 1px solid #ccc;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>