<template>
  <div class="user">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="query" class="searchBox">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <el-button type="danger" round>成功按钮</el-button>
    </div>
    <!-- 数据展示区域 -->
    <el-table :data="userList" border style="width: 100%; margin:15px 0">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle @click="showEditDialog(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.id)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button
              type="success"
              icon="el-icon-share"
              circle
              @click="showGrantRoleDialog(scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑对话框 -->
    <el-dialog title="收货地址" :visible.sync="editDialogFormVisible" :rules="rules">
      <el-form :model="editForm" ref="editForm">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <!-- <el-input v-model="editForm.username" autocomplete="off"></el-input> -->
          <el-input
            placeholder="editForm.username"
            v-model="editForm.username"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog title="分配用户" :visible.sync="allotDialogFormVisible">
      <el-form :model="ruleForm" label-width="80px">
        <el-form-item label="用户名" style="width:300px">
          <el-input v-model="ruleForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="region">
          <el-select v-model="ruleForm.rid" placeholder="请选择">
            <el-option
              v-for="item in rightsList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="allotDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotSubmit(ruleForm.id)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <!-- <div class="fenye" style="background:#F5F5F5">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="100"
    ></el-pagination>
    </div>-->
  </div>
</template>asds

<script>
import { getUserList, editUser, delUser, updateRole } from '@/api/index.js'
import { getAllRoleList } from '@/api/rights_index.js'
export default {
  data () {
    return {
      // 用户搜索关键字
      query: '',
      // 当前页码
      pagenum: 1,
      //   每页显示条数
      pagesize: 10,
      userList: [],
      // 设置编辑对话框是否显示，默认隐藏
      editDialogFormVisible: false,
      // 设置表单元素对应的lable的宽度
      formLabelWidth: '120px',
      // 分页背景
      background: true,
      // 编辑操作对应所对应的双向绑定数据对象
      editForm: {
        username: '',
        mobile: '',
        email: ''
      },
      allotDialogFormVisible: false,
      ruleForm: {},
      // 编辑操作验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
      },
      // 分配角色列表
      input: '',
      rightsList: []
    }
  },
  methods: {
    // 刷新
    init () {
      // 获取用户列表
      getUserList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(result => {
        // console.log(result)
        this.userList = result.data.users
      })
    },
    // 显示编辑对话框,并且展示默认数据
    showEditDialog (data) {
      // console.log(data)
      // 让对话框显示
      this.editDialogFormVisible = true
      // 为表单元素的双向数据绑定赋值
      this.editForm.id = data.id
      this.editForm.username = data.username
      this.editForm.mobile = data.mobile
      this.editForm.email = data.email
    },
    // 实现提交编辑
    editSubmit () {
      // 实现数据的再次验证
      // validate:可以实现指定表单的数据验证
      // 这个方法验证完毕之后，会调用回调函数，这个回调有一个参数valid,它就是是否通过验证的标识
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 实现编辑提交请求
          editUser(this.editForm).then(result => {
            console.log(result)
            this.editDialogFormVisible = false
            // 刷新
            this.init()
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
          })
        } else {
          this.$message({
            message: '输入不合法',
            type: 'warning'
          })
        }
      })
    },
    // 根据id删除用户
    del (id) {
      // console.log(id)
      this.$confirm(`此操作将永久删除id${id}的用户?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // 如果单击确定就会触发then中的回调
        .then(() => {
          // 确认之后再进行删除操作
          delUser(id).then(result => {
            // console.log(result)
            if (result.meta.status === 200) {
              // 删除成功
              this.$message({
                type: 'success',
                message: result.meta.msg
              })
              // 刷新
              this.init()
            } else {
              // 删除失败
              this.$message.error(result.meta.msg)
            }
          })
        })
        .catch(() => {
          // 点击取消进行的操作
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 分配角色
    async showGrantRoleDialog (row) {
      let result = await getAllRoleList()
      this.allotDialogFormVisible = true
      this.ruleForm = row
      this.rightsList = result.data
    },
    // 分配提交
    async allotSubmit (id) {
      // 获取角色对应的id，用户名对应的id是参数
      var rid = this.ruleForm.rid
      let allotId = await updateRole(id, rid)
      updateRole(allotId).then(result => {
        if (allotId.meta.status === 200) {
          this.$message({
            type: 'success',
            message: allotId.meta.msg
          })
          this.allotDialogFormVisible = false
          this.init()
        } else {
          this.$message.error(allotId.meta.msg)
        }
      })
        .catch(() => {
          // 点击取消进行的操作
          this.$message({
            type: 'info',
            message: '已取消分配角色'
          })
        })
    }
  },
  mounted () {
    // 获取用户列表
    this.init()
  }
}
</script>

<style lang="less" scoped>
.searchBox {
  width: 300px;
  margin-right: 10px;
}
</style>
