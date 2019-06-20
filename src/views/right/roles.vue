 <template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin-top: 15px;">
      <el-button type="success" plain @click="showAddDialog">添加角色</el-button>
    </div>
    <!-- 添加角色 -->
    <el-dialog title="添加角色" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm">
        <el-form-item label="角色名称">
          <el-input v-model="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addForm.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 展开行效果展示 -->
    <el-table :data="roleList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="first in scope.row.children" :key="first.id">
            <el-col :span="4">
              <div class="grid-content bg-purple" style="margin-top:10px">
                <el-tag
                  v-for="tag in tags"
                  :key="tag.name"
                  closable
                  :type="'success'"
                >{{first.authName}}</el-tag>
              </div>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id">
                <el-col :span="8">
                  <div class="grid-content bg-purple" style="margin-top:10px">
                    <el-tag
                      v-for="tag in tags"
                      :key="tag.name"
                      closable
                      :type="'info'"
                    >{{second.authName}}</el-tag>
                  </div>
                </el-col>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light">
                    <el-tag
                      closable
                      :type="'warning'"
                      v-for="thirdly in second.children"
                      :key="thirdly.id"
                      @close="removeSingleRight(scope.row,thirdly.id)"
                      style="margin-top:10px;margin-right:5px;"
                    >{{thirdly.authName}}</el-tag>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 索引列 -->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" prop="desc">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle @click='text(scope.row)'></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="授权" placement="top">
            <el-button type="success" icon="el-icon-share" circle @click="showaccbox(scope.row)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="10"></el-pagination>
    <!-- 授权对话框 -->
<el-dialog title="收货地址" :visible.sync="accboxshow">
  <el-tree
  :data="data"
  show-checkbox
  node-key="id"
  ref="tree"
  :default-expanded-keys='selectedKeys'
  :default-checked-keys="selectedKeys"
  :props="defaultProps">
</el-tree>
  <div slot="footer" class="dialog-footer">
    <el-button @click="accboxshow=false">取 消</el-button>
    <el-button type="primary" @click="grantRoleSubmit ">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>
import {
  getAllRoleList,
  removeRightByUserId,
  addFormVisible,
  getAllRightList
  // accRoleByList
} from '@/api/rights_index.js'
export default {
  data () {
    return {
      roleId: '',
      // 角色数据
      roleList: [],
      // 设置标签
      tags: [{}],
      addDialogFormVisible: false,
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      // 授权
      // 当前树形控件中默认被选择节点数组，这个数组中的每一个值都是对应的权限id
      selectedKeys: [],
      accboxshow: false,
      data: [{ id: 0, label: 0 }],
      keys: [],

      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  mounted () {
    this.getRoleList()
  },
  methods: {
    // 点击授权按钮
    showaccbox (row) {
      this.accboxshow = true
      getAllRightList('tree').then((reslut) => {
        this.data = reslut.data.data
        this.selectedKeys = []
        // console.log(row.children)
        row.children.forEach(first => {
          // console.log(element)
          // console.log(first.children)
          first.children.forEach(second => {
            // console.log(second.children)
            second.children.forEach(third => {
              this.selectedKeys.push(third.id)
            })
          })
        })
      })
    },
    // 点击确定提交默认数据
    async grantRoleSubmit  () {
      // console.log(this.$refs.tree.getCheckedKeys())
      // 可以获取一个数组，里面就包含着当前被选中的节点对象
      let allNodes = this.$refs.tree.getCheckedKeys()
      let halfNodes = this.$refs.tree.getHalfCheckedKeys()
      allNodes = [...allNodes, ...halfNodes]
      allNodes.map(value => {
        console.log(value)
      })
    },
    // 编辑
    text () {
      // console.log(obj)
    },
    // 获取所有角色列表-角色的权限在这个返回数据中能够获取到
    async getRoleList () {
      let result = await getAllRoleList()
      // console.log(result)
      this.roleList = result.data
      // console.log(this.roleList)
    },
    // 页面中调用接口方法实现数据的删除
    async removeSingleRight (row, rightId) {
      let router = await removeRightByUserId(row.id, rightId)
      // console.log(router)
      //  局部刷新
      row.children = router.data.data
      // console.log(row)
    },
    // 打开添加角色的对话框
    showAddDialog () {
      this.addDialogFormVisible = true
    },
    async addRole () {
      let result = await addFormVisible(this.addForm)
      console.log(result)
      if (result.data.meta.status === 201) {
        this.$message({
          message: result.data.meta.msg,
          type: 'success'
        })
        // 成功后隐藏对话框
        this.addDialogFormVisible = false
        // 刷新数据
        this.getRoleList()
      } else {
        this.$message.error(result.data.meta.msg)
      }
    }
  }
}
</script>

<style>
</style>
