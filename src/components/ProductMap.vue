<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="center">
          <div
            id="productmap"
            style="width: 70%; height: 600px; margin: 0 auto"
          ></div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <div style="float:left">
      <el-button @click="addproductcontrol = true" type="success"
        >增加产品</el-button
      >
      <el-button @click="begin()">显示全部</el-button>
      </div>
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
      >
        <!-- <el-table-column prop="id" label="序号" width="60" fixed>
        </el-table-column> -->
        <el-table-column
          prop="productname"
          label="移动端名称"
          width="150"
          fixed
        >
        </el-table-column>
        <el-table-column prop="position" label="位置" width="80">
        </el-table-column>
        <el-table-column prop="company" label="所属机构" width="100">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="80"> </el-table-column>
        <el-table-column prop="cloudfirm" label="云厂商" width="150">
        </el-table-column>
        <el-table-column prop="firsttime" label="最早发布" width="100">
        </el-table-column>
        <el-table-column prop="newtime" label="最新更新" width="100">
        </el-table-column>
        <el-table-column prop="downcount" label="下载量" width="120">
        </el-table-column>

        <el-table-column prop="gzh" label="公众号" width="80">
        </el-table-column>
        <el-table-column prop="xcx" label="小程序" width="80">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
        <el-table-column prop="info" label="介绍"> </el-table-column>
      </el-table>
    </el-row>

    <!-- 增加信息弹窗 -->
    <el-dialog title="增加产品信息" :visible.sync="addproductcontrol">
      <el-form :model="addproductform" :rules="addrules" ref="addproductform">
        <el-form-item
          label="移动端名称"
          prop="productname"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addproductform.productname"
            autocomplete="off"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="位置"
          prop="position"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="addproductform.position"
            clearable
            placeholder="请选择位置"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属机构"
          prop="company"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addproductform.company"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
          <el-input
            v-model="addproductform.type"
            autocomplete="off"
            style="width: 150px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="云厂商"
          prop="cloudfirm"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addproductform.cloudfirm"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="最早发布"
          prop="firsttime"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="addproductform.firsttime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="最新更新"
          prop="newtime"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="addproductform.newtime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="年下载量"
          prop="downcount"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addproductform.downcount"
            autocomplete="off"
            style="width: 100px"
          ></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="info" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            maxlength="100"
            show-word-limit
            v-model="addproductform.info"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="公众号名称"
          prop="gzh"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addproductform.gzh"
            autocomplete="off"
            style="width: 150px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="小程序名称"
          prop="xcx"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addproductform.xcx"
            autocomplete="off"
            style="width: 150px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addproductcontrol = false">取 消</el-button>
        <el-button type="primary" @click="addproduct('addproductform')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog title="修改产品信息" :visible.sync="modifyproductcontrol">
      <el-form
        :model="modifyproductform"
        :rules="addrules"
        ref="modifyproductform"
      >
        <el-form-item
          label="移动端名称"
          prop="productname"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="modifyproductform.productname"
            autocomplete="off"
            style="width: 200px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="位置"
          prop="position"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="modifyproductform.position"
            clearable
            placeholder="请选择位置"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="所属机构"
          prop="company"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="modifyproductform.company"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type" :label-width="formLabelWidth">
          <el-input
            v-model="modifyproductform.type"
            autocomplete="off"
            style="width: 150px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="云厂商"
          prop="cloudfirm"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="modifyproductform.cloudfirm"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="最早发布"
          prop="firsttime"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="modifyproductform.firsttime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="最新更新"
          prop="newtime"
          :label-width="formLabelWidth"
        >
          <el-date-picker
            v-model="modifyproductform.newtime"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item
          label="下载量"
          prop="downcount"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="modifyproductform.downcount"
            autocomplete="off"
            style="width: 100px"
          ></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="info" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="modifyproductform.info"
            maxlength="100"
            show-word-limit
          >
          </el-input>
        </el-form-item>

        <el-form-item
          label="公众号名称"
          prop="gzh"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="modifyproductform.gzh"
            autocomplete="off"
            style="width: 100px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="小程序名称"
          prop="xcx"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="modifyproductform.xcx"
            style="width: 100px"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyproductcontrol = false">取 消</el-button>
        <el-button type="primary" @click="modifyproduct('modifyproductform')"
          >确 定</el-button
        >
      </div>
    </el-dialog>

<div class="page">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pagesize"
      layout="total, prev, pager, next, jumper"
      :total="this.alltotal"
    >
    </el-pagination>
</div>
  </div>
</template>
<script>
import $ from "jquery";
import * as echarts from "echarts";
import api from "@/api/api";
export default {
  data() {
    return {
      currentPage: 1, //初始页
      pagesize: 5, //每页显示几个
      alltotal:0, //一共几个
      tableData: [],
      addproductcontrol: false,
      modifyproductcontrol: false,
      formLabelWidth: "100px",
      addproductform: {
        productname: "",
        company: "",
        type: "",
        cloudfirm: "",
        firsttime: "",
        newtime: "",
        downcount: "",
        info: "",
        gzh: "",
        xcx: "",
      },
      modifyproductform: {
        productname: "",
        company: "",
        type: "",
        cloudfirm: "",
        firsttime: "",
        newtime: "",
        downcount: "",
        info: "",
        gzh: "",
        xcx: "",
      },
      mapwidth: {},
      options: [
        { value: "中央", label: "中央" },
        { value: "北京", label: "北京" },
        { value: "天津", label: "天津" },
        { value: "上海", label: "上海" },
        { value: "重庆", label: "重庆" },
        { value: "黑龙江", label: "黑龙江" },
        { value: "吉林", label: "吉林" },
        { value: "辽宁", label: "辽宁" },
        { value: "内蒙古", label: "内蒙古" },
        { value: "河北", label: "河北" },
        { value: "河南", label: "河南" },
        { value: "山东", label: "山东" },
        { value: "山西", label: "山西" },
        { value: "陕西", label: "陕西" },
        { value: "宁夏", label: "宁夏" },
        { value: "甘肃", label: "甘肃" },
        { value: "湖南", label: "湖南" },
        { value: "湖北", label: "湖北" },
        { value: "江苏", label: "江苏" },
        { value: "安徽", label: "安徽" },
        { value: "浙江", label: "浙江" },
        { value: "福建", label: "福建" },
        { value: "江西", label: "江西" },
        { value: "四川", label: "四川" },
        { value: "贵州", label: "贵州" },
        { value: "云南", label: "云南" },
        { value: "广东", label: "广东" },
        { value: "广西", label: "广西" },
        { value: "青海", label: "青海" },
        { value: "新疆", label: "新疆" },
        { value: "西藏", label: "西藏" },
        { value: "海南", label: "海南" },
      ],
      value: "",
      addrules: {
        productname: [
          {
            required: true,
            message: "此项必填",
            trigger: "blur",
          },
        ],
        firsttime: [
          {
            required: true,
            message: "此项必填，未知请随意写一个日后再改！",
            trigger: "blur",
          },
        ],
        newtime: [
          {
            required: true,
            message: "此项必填，未知请随意写一个日后再改！",
            trigger: "blur",
          },
        ],
        downcount: [
          {
            required: true,
            message: "此项必填，未知请随意写一个日后再改！",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 开始加载 地图和表格数据
    begin() {
      api.getproduct().then((res) => {
        this.tableData = res.data.data;
        this.alltotal = res.data.total
      });
      api.getmap().then((res) => {
        this.productmapdata(res.data);
      });
    },
    // 渲染地图
    productmapdata(index) {
      var myChart = this.$echarts.init(document.getElementById("productmap"));
      var option;
      myChart.showLoading();
      $.getJSON("/static/bigmap.json", function (getjsonres) {
        myChart.hideLoading();
        echarts.registerMap("total", getjsonres);
        myChart.setOption(
          (option = {
            title: {
              text: "产品地图",
              subtext: "移动端产品",
            },
            tooltip: {
              trigger: "item",
              formatter: "{b}<br/>{c}",
              formatter: "{b}",
            },
            toolbox: {
              show: true,
              orient: "vertical",
              left: "right",
              top: "center",
              feature: {
                // dataView: { readOnly: false },
                restore: {},
                saveAsImage: {},
              },
            },
            visualMap: {
              min: 0,
              max: 10,
              text: ["High", "Low"],
              realtime: false,
              calculable: true,
              inRange: {
                color: ["lightskyblue", "yellow", "orangered"],
              },
            },
            series: [
              {
                name: "产品地图",
                type: "map",
                mapType: "total",
                label: {
                  show: true,
                },
                data: index,
              },
            ],
          })
        );
      });
      window.addEventListener("resize", function () {
        myChart.resize();
      });
      var that = this;
      myChart.on("click", function (pararms) {
        api.getpositionproduct(pararms.name).then((res) => {
          that.tableData = res.data.data;
          console.log(this.tableData);
        });
      });
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api.deleteproduct(row.id).then((res) => {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            this.begin();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 增加
    addproduct(formname) {
      this.$refs[formname].validate((valid) => {
        if (!valid) {
          this.$message({
            message: "请填写必选项！",
            type: "error",
          });
        } else {
          this.addproductcontrol = false;
          this.addproductform.downcount = parseInt(
            this.addproductform.downcount
          );
          this.addproductform.firsttime = this.dataformat(
            this.addproductform.firsttime
          );
          this.addproductform.newtime = this.dataformat(
            this.addproductform.newtime
          );

          api.addproduct(Object.assign(this.addproductform)).then((res) => {
            console.log(res.data);
            if (res.data.message == "添加成功") {
              this.$message({
                message: "添加成功",
                type: "success",
              });
              this.begin();
            } else {
              this.$message({
                message: "添加失败",
                type: "error",
              });
            }
          });
        }
      });
    },
    // 编辑按钮
    handleEdit(index, row) {
      console.log(index, row);
      this.modifyproductcontrol = true;
      this.modifyproductform = row;
    },
    // 修改
    modifyproduct(modifyproductform) {
      this.$refs[modifyproductform].validate((valid) => {
        if (!valid) {
          this.$message({
            message: "请填写必选项！",
            type: "error",
          });
        } else {
          this.modifyproductcontrol = false;
          this.modifyproductform.downcount = parseInt(
            this.modifyproductform.downcount
          );
          this.modifyproductform.firsttime = this.dataformat(
            this.modifyproductform.firsttime
          );
          this.modifyproductform.newtime = this.dataformat(
            this.modifyproductform.newtime
          );
          api
            .modifyproduct(Object.assign(this.modifyproductform))
            .then((res) => {
              console.log(res);
              if (res.data.message == "修改成功") {
                this.$message({
                  message: "修改成功",
                  type: "success",
                });
              } else {
                this.$message({
                  message: "修改失败，请重新刷新界面获取最新列表信息",
                  type: "error",
                });
              }
            });
        }
      });
    },
    // 转化时间
    dataformat(datedata) {
      var date = new Date(datedata);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      const time = y + "-" + m + "-" + d;
      const strtime = time.toString();
      return strtime;
    },
    handleSizeChange(size) {
      this.pagesize = size;
      //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      //点击第几页
    },
  },
  // mounted() {
  //   this.productmapdata();
  // },
  created() {
    this.begin();
  },
};
</script>
<style>
.center {
  text-align: center;
}
.page{
  float: right;
}
</style>