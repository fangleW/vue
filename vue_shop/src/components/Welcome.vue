<template>
  <div class="welcome">
    <!-- <h1>欢迎</h1> -->
    <a-card>
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        layout="inline"
        :rules="rules"
        ref="ruleForm"
      >
        <a-form-model-item label="手机号" prop="phone">
          <a-input v-model="form.phone" />
        </a-form-model-item>
        <a-form-model-item label="身份证号" prop="Id">
          <a-input v-model="form.Id" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" :disabled="!show">提交</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>
 
<script>
export default {
  name: 'vueName',
  data() {
    var reg = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
    let validatePass1 = (rule, value, callback) => {
      if (value.length < 11) {
        this.flag1 = false
        callback(new Error('手机号码长度不正确'))
      } else {
        this.flag1 = true
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (!reg.test(value)) {
        this.flag2 = false
        callback(new Error('身份证不正确'))
      } else {
        this.flag2 = true
      }
    }

    return {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
      form: {
        phone: '',
        id: '',
      },
      flag1: false,
      flag2: false,
      rules: {
        phone: [{ validator: validatePass1, trigger: 'blur' }],
        Id: [{ validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  computed: {
    show() {
      return this.flag1 && this.flag2
    },
  },
}
</script>
 
<style scoped lang = "scss">
</style>