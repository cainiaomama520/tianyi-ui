<template>
  <div class="wordBox">
      <el-form ref="form" class="pass-box" :model="form" label-width="80px" :rules="editFormRules">
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="newPassword">
          <el-input v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>
<script>
import { changePassword } from '@/api/admin'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.newPassword !== '') {
          this.$refs.form.validateField('newPassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {},
      editFormRules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '请输入6-20位字符', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur', required: true }
        ]
      },
    }
  },
  mounted () {

  },
  methods: {
    onSubmit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          changePassword(this.form.password, this.form.newPassword).then(res => {
            if (res.code == 0) {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            }
          })
        }
      })
    }
  }
}
</script>
<style>
.pass-box {
  margin: 100px 50px 0;
}
.wordBox{
	width: 500px;
    overflow: hidden;
	border: 1px solid #ddd;
	margin: 50px auto;
}
</style>


