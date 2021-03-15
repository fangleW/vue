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
            v-model="queryInfo.query"
            allowClear
            @search="onSearch"
          />
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="addModalVisible = true"
            >添加用户</a-button
          >
        </a-col>
      </a-row>
      <!-- 表格区域 -->
      <a-table
        :columns="columns"
        :data-source="userList"
        :rowKey="() => Math.random(0, 1)"
        bordered
        :pagination="false"
      >
        <span slot="num" slot-scope="text, record, index">
          {{
            (queryInfo.pagenum - 1) * queryInfo.pagesize + parseInt(index) + 1
          }}
        </span>
        <span slot="type" slot-scope="text, record">
          <a-switch
            v-model="record.mg_state"
            @change="userStateChange(record)"
          ></a-switch>
        </span>
        <span slot="action" slot-scope="text, record">
          <a-button
            icon="edit"
            type="primary"
            @click="showEditModel(record)"
          ></a-button>
          <a-button
            icon="delete"
            type="danger"
            style="margin: 0 15px"
            @click="deleteUser(record)"
          ></a-button>
          <a-tooltip placement="top">
            <template slot="title">
              <span>分配角色</span>
            </template>
            <a-button icon="setting" @click="setRole(record)"></a-button>
          </a-tooltip>
        </span>
      </a-table>
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
        :pageSizeOptions="['2', '3', '4', '5']"
      />
    </a-card>

    <!-- 添加用户 -->
    <a-modal
      v-model="addModalVisible"
      title="添加用户"
      @ok="addUserOk"
      @cancel="addUserCancel"
    >
      <!-- 内容主体区域 -->
      <a-form-model
        ref="addForm"
        :model="addForm"
        :rules="addFormRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="用户名" prop="username">
          <a-input v-model="addForm.username" />
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input v-model="addForm.password" />
        </a-form-model-item>
        <a-form-model-item label="邮箱" prop="email">
          <a-input v-model="addForm.email" />
        </a-form-model-item>
        <a-form-model-item label="手机" prop="mobile">
          <a-input v-model="addForm.mobile" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <!-- 编辑用户 -->
    <a-modal
      v-model="editModalVisible"
      title="编辑用户"
      @ok="editUserOk"
      @cancel="editUserCancel"
    >
      <!-- 内容主体区域 -->
      <a-form-model
        ref="editForm"
        :model="editForm"
        :rules="editFormRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="用户名">
          <a-input v-model="editForm.username" disabled />
        </a-form-model-item>
        <a-form-model-item label="邮箱" prop="email">
          <a-input v-model="editForm.email" />
        </a-form-model-item>
        <a-form-model-item label="手机" prop="mobile">
          <a-input v-model="editForm.mobile" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-modal
      v-model="setRoleVisible"
      title="分配权限"
      @ok="setRoleOk"
      @cancel="setRoleCancel"
    >
      <p>当前的用户:{{ userInfo.username }}</p>
      <p>当前的角色:{{ userInfo.role_name }}</p>
      <p>
        分配新角色:
        <a-select
          placeholder="请选择"
          style="width: 120px"
          v-model="selectRoleId"
          @change="handleChange"
        >
          <a-select-option
            v-for="item in roleList"
            :key="item.id"
            :value="item.id"
            >{{ item.roleName }}</a-select-option
          >
        </a-select>
      </p>
    </a-modal>
  </div>
</template>
 
<script>
export default {
  name: 'user',
  data() {
    // 验证邮箱的规则
    let checkEmail = (rule, value, callback) => {
      const regEmail = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if (regEmail.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法邮箱'))
    }
    // 验证手机号的规则
    let checkMobile = (rule, value, callback) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return callback()
      }
      callback(new Error('请输入合法手机号'))
    }
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      userList: [],
      total: 0,
      //对话框
      addModalVisible: false,
      editModalVisible: false,
      columns: [
        {
          title: '#',
          scopedSlots: { customRender: 'num' },
          dataIndex: 'num',
          key: 'num',
        },
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
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      //添加表单的数据
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      //编辑用户
      editForm: {},
      //添加表单的验证规则
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '密码的长度在6~15个字符之间',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
      //编辑表单的验证规则
      editFormRules: {
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入用户手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
      //分配角色
      setRoleVisible: false,
      //需要被分配角色的用户信息
      userInfo: {},
      //角色数据列表
      roleList: [],
      //选择的角色
      selectRoleId: '',
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
    //用户搜索
    onSearch() {
      this.getUserList()
    },
    //监听switch开关
    async userStateChange(data) {
      const { data: res } = await this.$http.put(
        `users/${data.id}/state/${data.mg_state}`
      )
      if (res.meta.status !== 200) {
        data.mg_state = !data.mg_state
        return this.$message.error('更新用户状态失败!')
      }
      this.$message.success('更新用户状态成功')
    },
    handleSizeChange(page, pageSize) {
      this.queryInfo.pagenum = page
      this.getUserList()
    },
    handleCurrentChange(current, size) {
      this.queryInfo.pagesize = size
      this.getUserList()
    },
    addUserOk() {
      this.$refs.addForm.validate(async (valid) => {
        if (valid) {
          //发起添加用户请求
          const { data: res } = await this.$http.post('users', this.addForm)
          if (res.meta.status !== 201) {
            return this.$message.error('添加用户失败')
          }
          this.$message.success('添加用户成功')
          this.addModalVisible = false
          this.$refs.addForm.resetFields()
          this.getUserList()
        }
      })
    },
    //添加用户对话框的关闭事件
    addUserCancel() {
      this.$refs.addForm.resetFields()
    },
    //展示编辑用户
    showEditModel(data) {
      this.editForm = JSON.parse(JSON.stringify(data))
      this.editModalVisible = true
    },
    editUserOk() {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          //发起修改请求
          const { data: res } = await this.$http.put(
            'users/' + this.editForm.id,
            { email: this.editForm.email, mobile: this.editForm.mobile }
          )
          if (res.meta.status !== 200) {
            return this.$message.error('修改用户信息失败')
          } else {
            // 关闭对话框
            this.editModalVisible = false
            //刷新列表
            this.getUserList()
            //提示成功
            this.$message.success('修改用户信息成功')
          }
        }
      })
    },
    editUserCancel() {
      this.$refs.editForm.resetFields()
    },
    //删除用户
    deleteUser(data) {
      var userId = data.id
      var _this = this
      this.$confirm({
        title: '提示',
        content: '确认删除当前用户吗',
        async onOk() {
          const { data: res } = await _this.$http.delete('users/' + userId)
          if (res.meta.status !== 200) {
            return _this.$message.error('删除用户失败')
          } else {
            _this.$message.success('删除用户成功')
            _this.getUserList()
          }
        },
        onCancel() {
          _this.$message.info('已经取消了删除')
        },
      })
    },
    //展示分配角色
    async setRole(data) {
      console.log('data', data)
      //获取所有角色列表
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      }
      this.roleList = res.data
      this.setRoleVisible = true
      this.userInfo = data
    },
    async setRoleOk() {
      if (!this.selectRoleId) {
        return this.$message.error('请选择要分配的角色')
      }
      const { data: res } = await this.$http.put(
        `users/${this.userInfo.id}/role`,
        {
          rid: this.selectRoleId,
        }
      )
      if (res.meta.status !== 200) {
        return this.$message.error('更新角色失败！')
      }
      this.$message.success('更新角色成功')
      this.getUserList()
      this.setRoleVisible = false
    },
    //关对话框
    setRoleCancel() {
      this.selectRoleId = ''
      this.userInfo = {}
      this.setRoleVisible = false
    },
    //分配新角色
    handleChange(value) {
      // this.selectRoleId = value
    },
  },
}
</script>
 
<style scoped lang = "scss">
</style>