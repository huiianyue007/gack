<template>
    <div class="mui-table" v-loading.body="loadingBody">
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item>
                        <i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                    <el-breadcrumb-item>基础表格</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="handle-box">
                <el-select v-model="select_cate" placeholder="筛选省份" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="1"></el-option>
                    <el-option key="2" label="湖南省" value="2"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search">搜索</el-button>
                <el-button type="primary" @click='handleAdd'>
                <i class="el-icon-plus el-icon--right"></i> 新建
                </el-button>
                  <el-button type="primary" @click='windowForm'>
                 打开新页面
                </el-button>
                  <el-button type="primary" @click='routerForm'>
                  路由整体跳转
                </el-button>
            </div>
            <el-table :data="stotsTableData" border style="width: 100%" ref="multipleTable" @select-all='selectBox' @select='selectBox'>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="sex" label="性别" :formatter="formatSex" width="100">
                </el-table-column>
                <el-table-column prop="age" label="年龄" sortable width="100">
                </el-table-column>
                <el-table-column prop="date" label="日期" sortable width="150">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="small" @click='handleEdit(scope.$index,scope.row)'>编辑</el-button>
                        <el-button size="small" @click='handleDel(scope.$index,scope.row)' type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-button type="danger" style="float:left" @click="batchRemove" :disabled="isbatchRemove">批量删除</el-button>
                <el-pagination @size-change="handleSizeChange" style="float:right;margin:2px 0" @current-change="handleCurrentChange" :page-size='pagesize' :current-page="currentPage" layout="prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>
    
        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editRules" ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="editForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model.number="editForm.age" :min="0" :max="200"></el-input-number>
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="editForm.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    
        <!--新增界面-->
        <el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addRules" ref="addForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="addForm.sex">
                        <el-radio class="radio" :label="1">男</el-radio>
                        <el-radio class="radio" :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model.number="addForm.age"></el-input>
                    <!--<el-input-number v-model.number="addForm.age" :min="0" :max="200"></el-input-number>-->
                </el-form-item>
                <el-form-item label="生日">
                    <el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input type="textarea" v-model="addForm.addr"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import $ from 'jquery'

export default {
    data() {
        return {
            tableData: {
                "list": [{
                    "id": 0,
                    "date": "1997-11-11",
                    "name": "林丽",
                    "sex": '0',
                    age: 12,
                    "address": "吉林省 辽源市 龙山区"
                }, {
                    "id": 1,
                    "date": "1987-09-24",
                    "name": "文敏",
                    "sex": '1',
                    age: 12,
                    "address": "江西省 萍乡市 芦溪县"
                }, {
                    "id": 2,
                    "date": "1996-08-08",
                    "name": "杨秀兰",
                    "sex": '0',
                    age: 12,
                    "address": "黑龙江省 黑河市 五大连池市"
                }, {
                    "id": 3,
                    "date": "1978-06-18",
                    "name": "魏强",
                    "sex": '1',
                    age: 15,
                    "address": "广东省 韶关市 始兴县"
                }, {
                    "id": 4,
                    "date": "1977-07-09",
                    "name": "石秀兰",
                    "sex": '0',
                    age: 22,
                    "address": "江苏省 宿迁市 宿豫区"
                }, {
                    "id": 5,
                    "date": "1994-09-20",
                    "name": "朱洋",
                    "sex": '0',
                    age: 32,
                    "address": "海外 海外 -"
                }, {
                    "id": 6,
                    "date": "1980-01-22",
                    "name": "傅敏",
                    "sex": '0',
                    age: 33,
                    "address": "海外 海外 -"
                }, {
                    "id": 7,
                    "date": "1985-10-10",
                    "name": "毛明",
                    "sex": '0',
                    age: 35,
                    "address": "内蒙古自治区 包头市 九原区"
                }, {
                    "id": 8,
                    "date": "1975-09-08",
                    "name": "何静",
                    "sex": '0',
                    age: 10,
                    "address": "西藏自治区 阿里地区 普兰县"
                }, {
                    "id": 9,
                    "date": "1970-06-07",
                    "name": "郭秀英",
                    "sex": '0',
                    age: 32,
                    "address": "四川省 巴中市 恩阳区"
                }]
            },
            cur_page: 1,
            multipleSelection: [],
            select_cate: '',
            select_word: '',
            //编辑界面数据
            editForm: {
                id: 0,
                name: '',
                sex: 1,
                age: 0,
                birth: '',
                addr: ''
            },
            //编辑界面验证
            editRules: {
                name: [
                    {
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }, {
                        min: 2,
                        max: 20,
                        message: '长度在 2 到 20 个字符'
                    }
                ]
            },
            //新增界面数据
            addForm: {
                id: 0,
                name: '',
                sex: 1,
                age: 0,
                birth: '',
                addr: ''
            },
            addRules: {
                name: [
                    {
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }, {
                        min: 2,
                        max: 20,
                        message: '长度在 2 到 20 个字符'
                    }
                ],
                age: [
                    { required: true, message: '年龄不能为空' },
                    { type: 'number', message: '年龄必须为数字值' }
                ]
            },
            editFormVisible: false,
            editLoading: false,
            addFormVisible: false,
            addLoading: false,
            editIndex: 0,
            editId: 0,
            loadingBody: true,
            //批量删除
            isbatchRemove: true,
            //****分页组件***
            //默认每页数据量
            pagesize: 10,
            //默认高亮行数据id
            highlightId: -1,
            //当前页码
            currentPage: 1,
            //查询的页码
            start: 1,
            //默认数据总数
            totalCount: 100,
            //保存删除ID
            delID: '',

        }
    },
    computed: {
        //按照日期排序
        stotsTableData: function () {
            return sortByKey(this.tableData.list, 'date');
        }
    },
    created() {
        // 创建完成 异步加载数据

        //异步之后执行 loading关闭
        this.loadingBody = false;
    },
    mounted() {
        // mounted 被创建 可以执行jquery
        // let xs=[1,2,3].map(x => x * x);

        //换位子.
        // let values = [10, 8]  
        // var result = values.sort((a, b) => a - b);    //换位子.
        //console.log(result)  //换位子.

        //转换为数组
        //const numbers = (...nums) => nums;  
        //let arr = numbers(1, 2, 3, 4, 5);  
        //console.log(arr)


        //const s = new Set();
        //let arr =[2, 3, 5, 4, 5, 2, 2];
        //let newArr=[];
        //arr.forEach(x => s.add(x));
        //for (let i of s) {
        // 注意2被加入了两次
        // s.size // 2
        // console.log(s.size);
        // s.has(1) // true
        //s.has(2) // true
        //s.has(3) // false

        // s.delete(2);
        // s.has(2) // false
        // newArr.push(i);
        //}
        // console.log(newArr);

        //数组去重
        // const items = new Set([1, 2, 3, 4, 5,5,8,8,6,5,5]);
        //const array = Array.from(items);
        //console.log(array);
        
        //let arrayLike = {
           // '0': 'a',
           // '1': 'b',
           // '3': 'c',
           // length:3
       // };
       // let arr2 = Array.from(arrayLike);
       // console.log(arr2)
    },
    methods: {
        //性别显示转换
        formatSex(row, column) {
            return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
        },
        //编辑弹框
        handleEdit(index, row) {
            this.editLoading = false;
            this.editFormVisible = true;
            this.editIndex = index;
            this.tableData.list.filter((o) => {
                if (o.id === row.id) {
                    this.editId = row.id;
                    this.editForm.name = o.name;
                    this.editForm.sex = Number(o.sex);
                    this.editForm.age = o.age;
                    this.editForm.birth = o.date;
                    this.editForm.addr = o.address;
                }
            })
        },
        editSubmit() {


            this.$refs.editForm.validate((valid) => {
                if (valid) {
                    this.editLoading = true;
                    this.tableData.list.filter((o) => {
                        if (o.id === this.editId) {
                            o.id = this.editId;
                            o.name = this.editForm.name;
                            o.date = FormatDate(this.editForm.birth);
                            o.sex = this.editForm.sex;
                            o.age = this.editForm.age;
                            o.address = this.editForm.addr;
                        }
                    })
                    this.$message('编辑第' + (this.editIndex + 1) + '行');
                    this.editFormVisible = false;
                } else {
                    this.editLoading = false;
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //新增弹框
        handleAdd() {
            this.addLoading = false;
            this.addFormVisible = true;
        },
        addSubmit() {
            this.addLoading = true;
            this.$refs.addForm.validate((valid) => {
                if (valid) {
                    //关闭窗口
                    this.addFormVisible = false;
                    var newGoods = {
                        "date": FormatDate(this.addForm.birth),
                        "name": this.addForm.name,
                        "address": this.addForm.addr
                    };
                    this.tableData.list.push(newGoods);
                } else {
                    this.addLoading = false;
                    return false;
                }
            })
        },
        handleSizeChange(val) {
            //pagesize改变时候触发
            this.pagesize = val;

            // this.loadData(this.criteria, this.currentPage, this.pagesize);
        },
        handleCurrentChange(val) {
            //当前页改变时候触发
            this.pagesize = val;
            //参数1  查询条件 当前页码  当前页显示条数
            //this.loadData(this.criteria, this.currentPage, this.pagesize);
        },
        //删除
        handleDel(index, row) {
            this.$confirm('确认删除吗？', '提示', {}).then(() => {
                this.$message.error('成功删除第' + (index + 1) + '行');
                this.tableData.list = this.tableData.list.filter((o) => {
                    return o.id != row.id;
                })
            }).catch(() => {
                this.editLoading = false;
            })
        },
        selectBox(selection, row) {
            //遍历id拼接成字符串
            //es6 map循环
            let ids = selection.map(item => item.id).toString();

            if (ids != '') {
                this.isbatchRemove = false
            } else {
                this.isbatchRemove = true
            }
            this.delID = ids;
        },
        batchRemove() {
            //需要删除的id
        },
        windowForm(){
            window.location.href='http://www.baidu.com'
        },
        routerForm(){
            this.$router.push('/error');
        }
    }
}


//数组对象方法排序:
function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}
//时间格式
function FormatDate(strTime) {
    var date = new Date(strTime);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}
//数组去重
function dedupe(array) {
    return Array.from(new Set(array));
}
</script>

<style scoped>
.table {
    overflow: hidden;
}

.crumbs {
    height: auto;
    margin: 15px 0;
    margin-top: 15px;
    width: 100%;
}

.handle-box {
    margin-bottom: 20px;
}

.handle-del {
    border-color: #bfcbd9;
    color: #999;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}

.pagination {
    margin: 10px 0;
    overflow: hidden;
}
</style>