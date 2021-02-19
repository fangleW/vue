<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!-- 登陆表单区域 -->
      <a-form-model
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
        ref="loginFormRef"
      >
        <!-- 用户名 -->
        <a-form-model-item prop="username">
          <a-input v-model="loginForm.username">
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-model-item>
        <!-- 密码 -->
        <a-form-model-item prop="password">
          <a-input v-model="loginForm.password" type="password">
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-model-item>
        <!-- 按钮区域 -->
        <a-form-model-item class="btns">
          <a-button type="primary" @click="login">登陆</a-button>
          <a-button type="default" @click="resetLoginForm">重置</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "login",
  data() {
    return {
      //这是登陆表单的数据绑定对象
      loginForm: {
        username: "admin",
        password: "123456",
      },
      loginFormRules: {
        //验证用户名
        username: [
          { required: true, message: "请输入登陆名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        //验证密码
        password: [
          { required: true, message: "请输入登陆密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        console.log(res);
        if (res.meta.status !== 200)
          return this.$message.error("登陆失败", 1.5);
        this.$message.success("登陆成功", 1.5);
        window.sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      });
    },
  },
};
</script>
 
<style scoped lang = "scss">
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      background-color: #fff;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #eee;
      }
    }
    .btns {
      display: flex;
      justify-content: flex-end;
    }
    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
    }
  }
}
</style>