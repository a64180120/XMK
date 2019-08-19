<template>
  <!-- <el-dialog
      append-to-body
      :data="setBuyDialog.data"
      :visible.sync="setBuyDialog.openDialog"
      width="750px"
      :close-on-click-modal="false"
    >
      <set-buy></set-buy>
  </el-dialog>-->
  <section class="setBuy">
    <div slot="title" class="dialog-title">
      <span style="float: left">集中采购</span>
    </div>
    <div>
      <el-row>
        <el-col :span="24">
          <span>采购内容：</span>
          <el-input v-model="data.FContent" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>采购目录：</span>
          <el-select v-model="data.FCatalogCode" size="small">
            <el-option v-for="(item,idx) in Catalogs" :label="item.FName" :key="idx" :value="item.FCode"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span class="pl-10">采购类型：</span>
          <el-select v-model="data.FTypeCode" size="small" style="float: left;padding: 0 2px">
            <el-option v-for="(item,idx) in Type" :label="item.FName" :key="idx" :value="item.FCode"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span class="pl-10">采购程序：</span>
          <el-select v-model="data.FProcedureCode" size="small">
            <el-option v-for="(item,idx) in Procedures" :label="item.FName" :key="idx" :value="item.FCode"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>采购数量：</span>
          <el-input v-model="data.FQty" size="small" ></el-input>
        </el-col>
        <el-col :span="8">
          <span class="pl-10">计量单位：</span>
          <el-input v-model="data.FMeasUnit" size="small"></el-input>
        </el-col>
        <el-col :span="8">
          <span class="pl-10">预计单价：</span>
          <el-input v-model="data.FPrice" size="small"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span style="line-height:normal;">技术参数及配置标准：</span>
          <el-input type="textarea"  show-word-limit maxlength="200" :rows="5" v-model="data.FSpecification" placeholder="限250字以内（必填）"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span style="line-height:normal;">备注：</span>
          <el-input type="textarea" show-word-limit maxlength="200" :rows="5" v-model="data.FRemark" placeholder="限250字以内（必填）"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <span>采购时间：</span>
          <el-date-picker  size="small" type="date" value-format="yyyy-MM-dd" v-model="data.FEstimatedPurTime" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <span>总计金额：</span>
          <el-input v-model="data.FAmount" disabled  size="small"></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>资金来源</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="get">
          <div class="list">
            <div class="listHead">
              <ul>
                <li>序号</li>
                <li>资金来源</li>
                <li>金额</li>
              </ul>
            </div>
          </div>
          <div class="list listBodyCon">
            <div class="listBody">
              <ul>
                <li>{{1}}</li>
                <li>{{suFund}}</li>
                <li>{{data.FAmount}}</li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
  import { mapState } from 'vuex'
export default {
  name: 'setBuy',
  components: {},
  props: {
    data: {
      type: Object
    },
    fund:{
      type: Array,
      default:function () {
        return []
      }
    }
  },
  data() {
    return {
      textarea: '',
      Type:[],//采购类型，
      Catalogs:[],//采购目录
      Procedures:[]//采购程序
    }
  },
  computed:{
    ...mapState({
      year: state => state.user.year,
      Orgid: state => state.user.orgid,
      UserCode: state => state.user.usercode,
      UserId: state => state.user.userid,
      OrgCode: state => state.user.orgcode
    }),
    //找出资金来源对应的名称
    suFund(){
      for (let i in this.fund){
        if (this.fund[i].DM === this.data.FSourceOfFunds) {
            return this.fund[i].MC
        }
      }
    }
  },
  mounted() {
    this.data
    this.getAboutProcurements()
  },
  methods: {
    //1、获取采购相关的列表
    getAboutProcurements(){
      let data= {
        orgid:this.Orgid,//组织id
        orgCode:this.OrgCode,//组织code
        ProcurType:4 //1-Catalog采购目录,2-Procedures采购程序,3-Type采购类型，4全部）

      }
        this.getAxios('/GQT/QTSysSetApi/GetAboutProcurements',data).then(res=>{
          if (res.Status ==='success'){
            this.Type = res.Types
            this.Catalogs = res.Catalogs
            this.Procedures = res.Procedures
            console.log(res)
          }else {
            this.$msgBox.error("请求出错")
          }
        }).catch(err=>{
          this.$msgBox.error("请求出错")
        })
    },

  },
}
</script>
<style lang="scss" scoped>
.setBuy {
  .dialog-title {
    overflow: hidden;
    > span {
      width: 100%;
      text-align: left;
      font-size: 0.16rem;
      border-bottom: 1px solid #eaeaea;
    }
  }
  .el-row {
    &:first-of-type {
      margin-top: 10px;
    }
  }
  .el-col {
    padding-left: 100px;
    margin-bottom: 10px;
    > span {
      position: relative;
      left: -100px;
      width: 100px;
      float: left;
      line-height: 40px;
      text-align: left;
      &.pl-10 {
        padding-left: 10px;
      }
    }
    > .el-input,
    > .el-textarea,
    > .el-date-editor,
    > .el-select{
      margin-left: -100px;
      width: 100%;
    }
    &.get {
      padding-left: 0;
      .list {
        position: relative;
        width: 100%;
        overflow: hidden;
        ul {
          width: 100%;
          > li {
            float: left;
            border: 1px solid $borderColor_ccc;
            border-width: 0 1px 1px 0;
            height: 40px;
            line-height: 40px;
            font-size: 0.16rem;
            &:first-of-type {
              width: 10%;
              border-left: 1px solid $borderColor_ccc;
            }
            &:nth-of-type(2) {
              width: 20%;
            }
            &:nth-of-type(3) {
              width: 70%;
            }

            > label {
              line-height: 40px;
              margin-right: 10px;
            }
            > .el-icon-setting {
              line-height: 40px;
              font-size: 0.17rem;
              color: $orgdisabled;
              cursor: not-allowed;
              &.canSetting {
                color: $btnColor;
                cursor: pointer;
              }
            }
          }
        }
        .listHead {
          font-size: 0.18rem;
          color: #fff;
          overflow: hidden;
          > ul {
            height: 100%;
            > li {
              float: left;
              background: $btnColor;
              border-top: 1px solid $borderColor_ccc;
            }
          }
        }
      }
      .listBodyCon {
        height: 100%;
        &:after {
          bottom: 38px;
        }
      }
      .listBody {
        ul li:not(:first-of-type) {
          // font-size: 0;
        }
      }
    }
  }
}
</style>
<style scoped>
  .tree-main {
    height: 300px;
    overflow-y:auto ;
  }
</style>


