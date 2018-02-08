<template>
    <div class="commodity">
        <!--选择商品分类-->
        <div class="con1" v-if="type === '0'">
            <div class="crumbs">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                    <el-breadcrumb-item>服务商品</el-breadcrumb-item>
                    <el-breadcrumb-item>服务商品发布</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="nav">
                <ul>
                    <li>
                        <div class="li_box active">
                            <p class="order">1</p>
                            <p class="bt">选择商品分类</p>
                            <p class="ms">确定您的商品所属分类，选择最后一级分类进入下一步。</p>
                        </div>
                    </li>
                    <li>
                        <div class="li_box">
                            <p class="order">2</p>
                            <p class="bt">填写商品详情</p>
                            <p class="ms">填写商品名称、选择商品属性，上传商品图片以及相关信息</p>
                        </div>
                    </li>
                    <li>
                        <div class="li_box">
                            <p class="order">3</p>
                            <p class="bt">商品发布成功</p>
                            <p class="ms">完成商品发布，跳转界面</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="list">
                <ul>
                    <li>
                        <div class="box_li">
                            <ul>
                                <li v-for="(lis,index) in oneDirectory" :key="index" :class="{'active':classlis1[index]}" @click="fication1(lis,index)"> {{lis.serverName}} </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="box_li">
                            <ul>
                                <li v-for="(lis,index) in directory2" :key="index" :class="{'active':classlis2[index]}" @click="fication2(lis,index)">{{lis.serverName}}</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="box_li">
                            <ul>
                                <li v-for="(lis,index) in directory3" :key="index" :class="{'active':classlis3[index]}" @click="fication3(lis,index)">{{lis.serverName}}</li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div class="box_li">
                            <ul>
                                <li v-for="(lis,index) in directory4" :key="index" :class="{'active':classlis4[index]}" @click="fication4(lis,index)">{{lis.serverName}}</li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="splx">
                <b>您当前选择的商品类型是：</b> {{commodityType1}}
                <span v-if="commodityType2 !=''">＞</span> {{commodityType2}}
                <span v-if="commodityType3 !=''">＞</span> {{commodityType3}}
                <span v-if="commodityType4 !=''">＞</span> {{commodityType4}}
            </div>
            <div class="btn">
                <el-button type="primary" @click="changeState" :disabled="next">下一步，填写商品信息</el-button>
            </div>
        </div>
        <!--填写商品详情-->
        <div class="con1" v-if="type === '1'">
            <div class="crumbs">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                    <el-breadcrumb-item>服务商品</el-breadcrumb-item>
                    <el-breadcrumb-item>服务商品发布</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="nav">
                <ul>
                    <li>
                        <div class="li_box">
                            <p class="order">1</p>
                            <p class="bt">选择商品分类</p>
                            <p class="ms">确定您的商品所属分类，选择最后一级分类进入下一步。</p>
                        </div>
                    </li>
                    <li>
                        <div class="li_box active">
                            <p class="order">2</p>
                            <p class="bt">填写商品详情</p>
                            <p class="ms">填写商品名称、选择商品属性，上传商品图片以及相关信息</p>
                        </div>
                    </li>
                    <li>
                        <div class="li_box">
                            <p class="order">3</p>
                            <p class="bt">商品发布成功</p>
                            <p class="ms">完成商品发布，跳转界面</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="tab" v-if="detailsType === '0'">
                <p class="tab_title">商品基本信息</p>
                <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="150px" class="demo-ruleForm">
                    <el-form-item label="商品分类:">
                        {{commodityType1}}
                        <span v-if="commodityType2!='' ">＞</span> {{commodityType2}}
                        <span v-if="commodityType3!=''">＞</span> {{commodityType3}}
                        <span v-if="commodityType4!=''">＞</span>{{commodityType4}}
                        <el-button @click="changeState2">编辑</el-button>
                    </el-form-item>
                    <el-form-item label="商品名称：" prop="name">
                        <el-input v-model="ruleForm1.name" style="width:500px;" :maxlength="16"></el-input>
                    </el-form-item>
                    <el-form-item label="商品描述：" prop="brief">
                        <el-input v-model="ruleForm1.brief" style="width:500px;" :maxlength="33"></el-input>
                    </el-form-item>

                    <el-form-item label="商品价格：" prop="price">
                        <el-input placeholder="请输入金额" v-model="ruleForm1.price" style="width:220px;" :maxlength="11">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="company">
                        <el-select v-model="ruleForm1.company" placeholder="请选择">
                            <el-option v-for="item in ruleForm1.companyOptions" :key="item.id" :label="item.dictName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发票邮寄方式：" prop="mail">
                        <template>
                            <el-radio class="radio" v-model="ruleForm1.mail" label="1">包邮</el-radio>
                            <el-radio class="radio" v-model="ruleForm1.mail" label="2">货到付款</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="所属空间：" prop="roomId">
                        <el-select v-model="ruleForm1.roomId" placeholder="请选择">
                            <el-option v-for="item in ruleForm1.roomOptions" :key="item.id" :label="item.roomName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="空间工位库存：" prop="stock">
                        <el-input placeholder="请输入库存量" v-model="ruleForm1.stock" style="width:220px;" :maxlength="10">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品图片logo：" required>
                        <el-upload class="avatar-uploader" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess11">
                            <img v-if="ruleForm1.imageUrl1" :src="ruleForm1.imageUrl1" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span>上传商品默认主图，仅支持jpg、bmp、png、gif的图片格式，图片大小不能超过200KB，为了展示效果更加清晰，建议上传180*180的图片</span>
                    </el-form-item>
                    <el-form-item label="商品图片：" required>
                        <el-upload class="avatar-uploader comImg" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess1">
                            <img v-if="ruleForm1.imageUrl" :src="ruleForm1.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span>上传商品默认主图，仅支持jpg、bmp、png、gif的图片格式，图片大小不能超过200KB，为了展示效果更加清晰，建议上传750*416的图片</span>
                    </el-form-item>
                    <el-form-item label="工位类型：" class="quillcon" required>
                        <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm1.toolbar1' :uploadUrl="ruleForm1.uploadUrl" v-model="ruleForm1.introduce"></editor>
                    </el-form-item>
                    <el-form-item label="支付方式：" class="quillcon" required>
                        <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm1.toolbar2' :uploadUrl="ruleForm1.uploadUrl" v-model="ruleForm1.describe"></editor>
                    </el-form-item>
                    <el-form-item label="工位介绍：" class="quillcon" required>
                        <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm1.toolbar3' :uploadUrl="ruleForm1.uploadUrl" v-model="ruleForm1.case"></editor>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                        <el-button type="primary" @click="submitForm1()" :loading="submitLoading">提交发布商品</el-button>
                        <el-button type="primary" @click="dialogTableVisible = true">预览</el-button>
                    </el-form-item>

                    <!--预览弹窗-->
                    <el-dialog :visible.sync="dialogTableVisible">
                        <div class="cominfo">
                            <div class="img">
                                <img :src="ruleForm1.imageUrl" alt="" width="150" height="150">
                            </div>
                            <div class="info">
                                <ul>
                                    <li>{{ruleForm1.name}}</li>
                                    <li>{{ruleForm1.brief}}</li>
                                    <li>价格：
                                        <span>{{ruleForm1.price}}元</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="comdetails">
                            <p class="title">商品详情介绍</p>
                            <div>
                                <p>工位类型：</p>
                                <p v-html="ruleForm1.introduce"></p>
                            </div>
                            <div>
                                <p>支付方式：</p>
                                <p v-html="ruleForm1.describe"></p>
                            </div>
                            <div>
                                <p>工位介绍：</p>
                                <p v-html="ruleForm1.case"></p>
                            </div>
                        </div>
                    </el-dialog>
                </el-form>
            </div>
            <div class="tab" v-if="detailsType === '1'">
                <p class="tab_title">商品基本信息</p>
                <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="150px" class="demo-ruleForm">
                    <el-form-item label="商品分类：">
                        {{commodityType1}}
                        <span v-if="commodityType2!='' ">＞</span> {{commodityType2}}
                        <span v-if="commodityType3!=''">＞</span> {{commodityType3}}
                        <span v-if="commodityType4!=''">＞</span>{{commodityType4}}
                        <el-button @click="changeState2">编辑</el-button>
                    </el-form-item>
                    <el-form-item label="商品名称：" prop="name">
                        <el-input v-model="ruleForm2.name" style="width:500px;" :maxlength="16"></el-input>
                    </el-form-item>
                    <el-form-item label="商品描述：" prop="brief">
                        <el-input v-model="ruleForm2.brief" style="width:500px;" :maxlength="33"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格：" prop="price">
                        <el-input placeholder="请输入金额" v-model="ruleForm2.price" style="width:220px;" :maxlength="11">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="company">
                        <el-select v-model="ruleForm2.company" placeholder="请选择">
                            <el-option v-for="item in ruleForm2.companyOptions" :key="item.id" :label="item.dictName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发票邮寄方式：" prop="mail">
                        <template>
                            <el-radio class="radio" v-model="ruleForm2.mail" label="1">包邮</el-radio>
                            <el-radio class="radio" v-model="ruleForm2.mail" label="2">货到付款</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="报名人数限制：" prop="personNum">
                        <el-input placeholder="请输入报名人数" v-model="ruleForm2.personNum" style="width:220px;" :maxlength="50">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="报名时间范围：" required class="serverarea">
                        <el-col :span="6">
                            <el-form-item prop="datavalue1">
                                <el-date-picker v-model="ruleForm2.datavalue1" type="datetime" placeholder="选择日期时间"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="5">
                            <el-form-item prop="datavalue2">
                                <el-date-picker v-model="ruleForm2.datavalue2" type="datetime" placeholder="选择日期时间" @change="datavalue2"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="商品图片logo：" required>
                        <el-upload class="avatar-uploader" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess22">
                            <img v-if="ruleForm2.imageUrl1" :src="ruleForm2.imageUrl1" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span>上传商品默认主图，仅支持jpg、bmp、png、gif的图片格式，图片大小不能超过200KB，为了展示效果更加清晰，建议上传180*180的图片</span>
                    </el-form-item>
                    <el-form-item label="商品图片：" required>
                        <el-upload class="avatar-uploader comImg" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess2">
                            <img v-if="ruleForm2.imageUrl" :src="ruleForm2.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span>上传商品默认主图，仅支持jpg、bmp、png、gif的图片格式，图片大小不能超过200KB，为了展示效果更加清晰，建议上传750*416的图片</span>
                    </el-form-item>
                    <el-form-item label="商品介绍：" class="quillcon" required>
                        <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm2.toolbar2' :uploadUrl="ruleForm2.uploadUrl" v-model="ruleForm2.describe"></editor>
                    </el-form-item>
                    <el-form-item label="服务承诺：" class="quillcon" required>
                        <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm2.toolbar5' :uploadUrl="ruleForm2.uploadUrl" v-model="ruleForm2.promise"></editor>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                        <el-button type="primary" @click="submitForm2()" :loading="submitLoading">提交发布商品</el-button>
                        <el-button type="primary" @click="dialogTableVisible = true">预览</el-button>
                    </el-form-item>
                </el-form>
                <!--预览弹窗-->
                <el-dialog :visible.sync="dialogTableVisible">
                    <div class="cominfo">
                        <div class="img">
                            <img :src="ruleForm2.imageUrl" alt="" width="150" height="150">
                        </div>
                        <div class="info">
                            <ul>
                                <li>{{ruleForm2.name}}</li>
                                <li>{{ruleForm2.brief}}</li>
                                <li>价格：
                                    <span>{{ruleForm2.price}}元</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="comdetails">
                        <p class="title">商品详情介绍</p>
                        <div>
                            <p>商品介绍：</p>
                            <p v-html="ruleForm2.describe"></p>
                        </div>
                        <div>
                            <p>服务承诺：</p>
                            <p v-html="ruleForm2.promise"></p>
                        </div>
                    </div>
                </el-dialog>
            </div>
            <div class="tab" v-if="detailsType === '2'">
                <p class="tab_title">商品基本信息</p>
                <el-form :model="ruleForm3" :rules="rules" ref="ruleForm3" label-width="150px" class="demo-ruleForm">
                    <el-form-item label="商品分类:">
                        {{commodityType1}}
                        <span v-if="commodityType2!='' ">＞</span> {{commodityType2}}
                        <span v-if="commodityType3!=''">＞</span> {{commodityType3}}
                        <span v-if="commodityType4!=''">＞</span>{{commodityType4}}
                        <el-button @click="changeState2">编辑</el-button>
                    </el-form-item>
                    <el-form-item label="商品名称：" prop="name">
                        <el-input v-model="ruleForm3.name" style="width:500px;" :maxlength="16"></el-input>
                    </el-form-item>
                    <el-form-item label="商品描述：" prop="brief">
                        <el-input v-model="ruleForm3.brief" style="width:500px;" :maxlength="33"></el-input>
                    </el-form-item>
                    <el-form-item label="商品是否允许议价：" required>
                        <template>
                            <el-radio class="radio" v-model="ruleForm3.bargaining" label="1">是</el-radio>
                            <el-radio class="radio" v-model="ruleForm3.bargaining" label="2">否</el-radio>
                        </template>
                        <br>
                        <span>商品议价为线下与用户联系确定价格后在议价商品订单中修改。</span>
                    </el-form-item>
                    <el-form-item label="是否有地域限制：">
                        <template>
                            <el-radio class="radio" v-model="ruleForm3.region" label="1">有</el-radio>
                            <el-radio class="radio" v-model="ruleForm3.region" label="2">没有</el-radio>
                        </template>
                        <br>
                        <span>系统默认服务范围为“没有，即全国范围”，如您有地域限制，请勾选“有”后进行自主填写。</span>
                    </el-form-item>
                    <el-form-item label="商品价格：" prop="price" v-if="ruleForm3.bargaining == '1'">
                        <el-input placeholder="请输入金额" v-model="ruleForm3.price" style="width:220px;" :maxlength="11">
                            <template slot="append">元起</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品价格：" prop="nowPrice" v-if="ruleForm3.bargaining == '2' && ruleForm3.region=='2'">
                        <el-input placeholder="请输入金额" v-model="ruleForm3.nowPrice" style="width:220px;" :maxlength="11">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="是否促销：" v-if="ruleForm3.bargaining == '2' && ruleForm3.region=='2'">
                        <template>
                            <el-radio class="radio" v-model="ruleForm3.promotion" label="1">是</el-radio>
                            <el-radio class="radio" v-model="ruleForm3.promotion" label="2">否</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="商品促销价：" prop="promotionPrice" v-if="ruleForm3.bargaining == '2' && ruleForm3.region=='2' && ruleForm3.promotion == '1'">
                        <el-input placeholder="请输入金额" v-model="ruleForm3.promotionPrice" style="width:220px;" :maxlength="50">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="促销时间范围：" v-if="ruleForm3.bargaining == '2' && ruleForm3.region=='2' && ruleForm3.promotion == '1'">
                        <el-col :span="6">
                            <el-form-item prop="startTime" style="border:0!important">
                                <el-date-picker v-model="ruleForm3.startTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="6">
                            <el-form-item prop="endTime" style="border:0!important">
                                <el-date-picker v-model="ruleForm3.endTime" type="datetime" placeholder="选择日期时间" @change="endTime"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item v-for="(serviceArea, index) in ruleForm3.twoServiceAreas" :key="index" :label="'服务区域' + (index+1)+'：'" v-if="ruleForm3.region == '1' && ruleForm3.bargaining=='2'" class="serverarea" required>
                        <el-col :span="5">
                            <el-form-item>
                                <el-select v-model="serviceArea.value1" placeholder="请选择省" style="width:150px;margin-right:10px;" @change="provinceChange(serviceArea.value1,index,2)">
                                    <el-option v-for="(item,index) in serviceArea.options1" :key="item.name" :label="item.name" :value="item.id"></el-option>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">&nbsp;</el-col>
                        <el-col :span="5">
                            <el-form-item>
                                <el-select v-model="serviceArea.value2" placeholder="请选择市" style="width:150px; margin-right:10px;" @change="cityChange(serviceArea.value2,index,2)">
                                    <el-option v-for="item in serviceArea.options2" :key="item.name" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">&nbsp;</el-col>
                        <el-col :span="5">
                            <el-form-item>
                                <el-select v-model="serviceArea.value3" placeholder="请选择县/区" style="width:150px;margin-right:10px;">
                                    <el-option v-for="item in serviceArea.options3" :key="item.name" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="8">
                            <el-form-item label="商品价格：" label-width="120px" style="margin-top:20px;">
                                <el-input v-model="serviceArea.price" style="width:180px;" :maxlength="11"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item label="是否促销：" label-width="100px" style="margin-top:20px;">
                                <template>
                                    <el-radio class="radio" v-model="serviceArea.bargaining" label="1">是</el-radio>
                                    <el-radio class="radio" v-model="serviceArea.bargaining" label="2">否</el-radio>
                                </template>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" v-if="ruleForm3.twoServiceAreas[index].bargaining ==1">
                            <el-form-item label="促销价格：" label-width="120px" style="margin-top:20px;">
                                <el-input v-model="serviceArea.promotionPrice" style="width:180px;" :maxlength="11"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" v-if="ruleForm3.twoServiceAreas[index].bargaining ==1">
                            <el-form-item label="时间范围：" label-width="120px" style="margin-top:20px;">
                                <el-date-picker v-model="serviceArea.startTime" type="datetime" placeholder="选择日期时间" style="width:180px;"></el-date-picker>
                                <span style="padding: 0 20px;">-</span>
                                <el-date-picker v-model="serviceArea.endTime" type="datetime" placeholder="选择日期时间" style="width:180px;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-button @click.prevent="removeServiceArea2(serviceArea)" v-if="index != '0'">删除</el-button>
                        <el-button type="primary" @click="addServiceArea2(index)" v-if="index == '0'">增加</el-button>
                        <el-col :span="24">
                            <span>服务区域省、商品价格为必填，如果为促销商品，促销价格、促销时间为必填，促销结束时间且不可小于开始时间</span>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="商品单位：" prop="company">
                        <el-select v-model="ruleForm3.company" placeholder="请选择">
                            <el-option v-for="item in ruleForm3.companyOptions" :key="item.id" :label="item.dictName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品库存：" prop="stock">
                        <el-input v-model="ruleForm3.stock" style="width:220px;" :maxlength="10"></el-input>
                    </el-form-item>
                    <el-form-item label="发票邮寄方式:" prop="mail">
                        <template>
                            <el-radio class="radio" v-model="ruleForm3.mail" label="1">包邮</el-radio>
                            <el-radio class="radio" v-model="ruleForm3.mail" label="2">货到付款</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item v-for="(serviceArea, index) in ruleForm3.serviceAreas" :key='index' :label="'服务区域' + (index+1)+'：'" v-if="ruleForm3.region == '1' && ruleForm3.bargaining == '1'" class="serverarea" required>
                        <el-col :span="5">
                            <el-form-item>
                                <el-select v-model="serviceArea.value1" placeholder="请选择省" style="width:150px;margin-right:10px;" @change="provinceChange(serviceArea.value1,index,1)">
                                    <el-option v-for="(item,index) in serviceArea.options1" :key="item.name" :label="item.name" :value="item.id"></el-option>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="5">
                            <el-form-item>
                                <el-select v-model="serviceArea.value2" placeholder="请选择市" style="width:150px; margin-right:10px;" @change="cityChange(serviceArea.value2,index,1)">
                                    <el-option v-for="item in serviceArea.options2" :key="item.name" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">&nbsp;</el-col>
                        <el-col :span="5">
                            <el-form-item>
                                <el-select v-model="serviceArea.value3" placeholder="请选择县/区" style="width:150px;margin-right:10px;">
                                    <el-option v-for="item in serviceArea.options3" :key="item.name" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="1">&nbsp;</el-col>

                        <el-button @click.prevent="removeServiceArea(serviceArea)" v-if="index != '0'">删除</el-button>
                        <el-button type="primary" @click="addServiceArea()" v-if="index == '0'">增加</el-button>
                    </el-form-item>
                    <el-form-item label="商品图片logo：" required>
                        <el-upload class="avatar-uploader" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess33">
                            <img v-if="ruleForm3.imageUrl1" :src="ruleForm3.imageUrl1" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span>上传商品默认主图，仅支持jpg、bmp、png、gif的图片格式，图片大小不能超过200KB，为了展示效果更加清晰，建议上传180*180的图片</span>
                    </el-form-item>
                    <el-form-item label="商品图片：" required>
                        <el-upload class="avatar-uploader comImg" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess3">
                            <img v-if="ruleForm3.imageUrl" :src="ruleForm3.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span>上传商品默认主图，仅支持jpg、bmp、png、gif的图片格式，图片大小不能超过200KB，为了展示效果更加清晰，建议上传750*416的图片</span>
                    </el-form-item>
                    <el-form-item label="商品介绍：" class="quillcon" required>
                        <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm3.toolbar2' :uploadUrl="ruleForm3.uploadUrl" v-model="ruleForm3.describe"></editor>
                    </el-form-item>
                    <el-form-item label="服务承诺：" class="quillcon" required>
                        <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm3.toolbar5' :uploadUrl="ruleForm3.uploadUrl" v-model="ruleForm3.promise"></editor>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                        <el-button type="primary" @click="submitForm3()" :loading="submitLoading">提交发布商品</el-button>
                        <el-button type="primary" @click="yulan">预览</el-button>
                    </el-form-item>
                </el-form>
                <!--预览弹窗-->
                <el-dialog :visible.sync="dialogTableVisible" @open="yulanOpen">
                    <div class="cominfo">
                        <div class="img">
                            <img :src="ruleForm3.imageUrl" alt="" width="150" height="150">
                        </div>
                        <div class="info">
                            <ul>
                                <li>{{ruleForm3.name}}</li>
                                <li>{{ruleForm3.brief}}</li>
                                <li v-if="ruleForm3.bargaining=='1'">价格：
                                    <span>{{ruleForm3.price}}</span>元起
                                </li>
                                <li style="text-decoration:line-through" v-if="ruleForm3.bargaining=='2' && ruleForm3.region=='2' && ruleForm3.promotion=='1'">价格：{{ruleForm3.nowPrice}}元</li>
                                <li v-if="ruleForm3.bargaining=='2' && ruleForm3.region=='2' && ruleForm3.promotion=='2'">价格：{{ruleForm3.nowPrice}}元</li>
                                <li v-if="ruleForm3.bargaining=='2' && ruleForm3.region=='2' && ruleForm3.promotion=='1'">促销价：
                                    <span>{{ruleForm3.promotionPrice}}</span>元
                                </li>
                                <li class="yprice" v-if="ruleForm3.bargaining=='2' && ruleForm3.region=='1'"> 价格：{{yulanprice}}元 </li>
                                <li v-if="ruleForm3.bargaining=='2' && ruleForm3.region=='1'" class="ypromotion"> 促销价格：
                                    <span>{{yulanPromotionPrice}}</span>元 </li>
                                <li v-if="ruleForm3.region=='1'">
                                    <span style="color:#999;font-size:14px;">地区：</span>
                                    <el-select v-model="districtVal" placeholder="请选择" size="mini" @change="changeArea">
                                        <el-option v-for="item in districtOpation" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="comdetails">
                        <p class="title">商品详情介绍</p>
                        <div>
                            <p>商品介绍：</p>
                            <p v-html="ruleForm3.describe"></p>
                        </div>
                        <div>
                            <p>服务承诺:</p>
                            <p v-html="ruleForm3.promise"></p>
                        </div>
                    </div>
                </el-dialog>
            </div>
            <div class="tab" v-if="detailsType === '3'">
                <p class="tab_title">商品基本信息</p>
                <el-form :model="ruleForm4" :rules="rules" ref="ruleForm4" label-width="150px" class="demo-ruleForm">
                    <el-form-item label="分类:">
                        {{commodityType1}}
                        <span v-if="commodityType2!='' ">＞</span> {{commodityType2}}
                        <span v-if="commodityType3!=''">＞</span> {{commodityType3}}
                        <span v-if="commodityType4!=''">＞</span>{{commodityType4}}
                        <el-button @click="changeState2">编辑</el-button>
                    </el-form-item>
                    <el-form-item label="名称：" prop="name">
                        <el-input v-model="ruleForm4.name" style="width:500px;" :maxlength="16"></el-input>
                    </el-form-item>
                    <el-form-item label="服务描述：" prop="brief">
                        <el-input v-model="ruleForm4.brief" style="width:500px;" :maxlength="33"></el-input>
                    </el-form-item>
                    <el-form-item label="服务是否允许议价：" required>
                        <template>
                            <el-radio class="radio" v-model="ruleForm4.bargain" label="1">是</el-radio>
                            <el-radio class="radio" v-model="ruleForm4.bargain" label="2">否</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="价格是否面议：" v-if="ruleForm4.bargain==1">
                        <template>
                            <el-radio class="radio" v-model="ruleForm4.negotiable" label="1">是</el-radio>
                            <el-radio class="radio" v-model="ruleForm4.negotiable" label="2">否</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="价格是否促销：" v-if="ruleForm4.bargain==2">
                        <template>
                            <el-radio class="radio" v-model="ruleForm4.promotion" label="1">是</el-radio>
                            <el-radio class="radio" v-model="ruleForm4.promotion" label="2">否</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="服务价格：" prop="startPrice" v-if="ruleForm4.bargain==1 && ruleForm4.negotiable==2">
                        <el-input placeholder="请输入金额" v-model="ruleForm4.startPrice" style="width:220px;" :maxlength="11">
                            <template slot="append">元起</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="服务价格：" prop="price" v-if="ruleForm4.bargain==2">
                        <el-input placeholder="请输入金额" v-model="ruleForm4.price" style="width:220px;" :maxlength="11">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="服务促销价格：" prop="promotionPrice" v-if="ruleForm4.bargain==2  && ruleForm4.promotion ==1">
                        <el-input placeholder="请输入金额" v-model="ruleForm4.promotionPrice" style="width:220px;" :maxlength="11">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="促销时间范围：" class="serverarea" v-if="ruleForm4.bargain==2 && ruleForm4.promotion ==1">
                        <el-col :span="6">
                            <el-form-item prop="startTime">
                                <el-date-picker v-model="ruleForm4.startTime" type="datetime" placeholder="选择日期时间" @change="getStartDate"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col class="line" :span="1">-</el-col>
                        <el-col :span="5">
                            <el-form-item prop="endTime">
                                <el-date-picker v-model="ruleForm4.endTime" type="datetime" placeholder="选择日期时间" @change="getEndDate"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="服务单位：" prop="company">
                        <el-select v-model="ruleForm4.company" placeholder="请选择">
                            <el-option v-for="item in ruleForm4.companyOptions" :key="item.id" :label="item.dictName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发票邮寄方式：" prop="mail">
                        <template>
                            <el-radio class="radio" v-model="ruleForm4.mail" label="1">包邮</el-radio>
                            <el-radio class="radio" v-model="ruleForm4.mail" label="2">货到付款</el-radio>
                        </template>
                    </el-form-item>
                    <el-form-item label="服务logo：" required>
                        <el-upload class="avatar-uploader" name="companyLogo" action="https://apitest.gack.citic:8082/putImg" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess4">
                            <img v-if="ruleForm4.upImgUrl" :src="ruleForm4.upImgUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <span>上传商品默认主图，仅支持jpg、bmp、png、gif的图片格式，图片大小不能超过200KB，为了展示效果更加清晰，建议上传180*180的图片</span>
                    </el-form-item>
                    <el-form-item label="服务详情：" class="quillcon" required>
                        <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm4.toolbar1' :uploadUrl="ruleForm4.uploadUrl" v-model="ruleForm4.introduce"></editor>
                    </el-form-item>
                    <el-form-item style="text-align: center;">
                        <el-button type="primary" @click="submitForm4()" :loading="submitLoading">提交发布商品</el-button>
                        <el-button type="primary" @click="dialogTableVisible = true">预览</el-button>
                    </el-form-item>

                    <!--预览弹窗-->
                    <el-dialog :visible.sync="dialogTableVisible">
                        <div class="cominfo">
                            <div class="img">
                                <img :src="ruleForm4.upImgUrl" alt="" width="150" height="150">
                            </div>
                            <div class="info">
                                <ul>
                                    <li>{{ruleForm4.name}}</li>
                                    <li>{{ruleForm4.brief}}</li>
                                    <li>价格：
                                        <span>{{ruleForm4.price}}元</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="comdetails">
                            <p class="title">商品详情介绍</p>
                            <div>
                                <p>服务详情：</p>
                                <p v-html="ruleForm4.introduce"></p>
                            </div>
                        </div>
                    </el-dialog>
                </el-form>
            </div>

        </div>
        <!--商品发布成功-->
        <div class="con1" v-if="type === '2'">
            <div class="crumbs">
                <el-breadcrumb separator=">">
                    <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                    <el-breadcrumb-item>服务商品</el-breadcrumb-item>
                    <el-breadcrumb-item>服务商品发布</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="nav">
                <ul>
                    <li>
                        <div class="li_box">
                            <p class="order">1</p>
                            <p class="bt">选择商品分类</p>
                            <p class="ms">确定您的商品所属分类，选择最后一级分类进入下一步。</p>
                        </div>
                    </li>
                    <li>
                        <div class="li_box">
                            <p class="order">2</p>
                            <p class="bt">填写商品详情</p>
                            <p class="ms">填写商品名称、选择商品属性，上传商品图片以及相关信息</p>
                        </div>
                    </li>
                    <li>
                        <div class="li_box active">
                            <p class="order">3</p>
                            <p class="bt">商品发布成功</p>
                            <p class="ms">完成商品发布，跳转界面</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="box">
                <div class="check">
                    <i class="el-icon-check"></i>
                </div>
                <span class="suc">发布商品提交成功，审核会在1-3个工作日内完成</span>
                <p>您可以通过以下方式查询您的认证结果：</p>
                <p>人工查询电话：010-880-820-8820 </p>
            </div>
        </div>

    </div>
</template>
<script>

import editor from './editor.vue'

export default {
    name: 'commodity',
    data() {
        return {
            type: '0',
            // 商品详情
            detailsType: '2',
            serverType: '',
            businessid: '',//商户id
            submitLoading: false,
            // 四级联动数据
            oneDirectory: [
            ],
            twoDirectory: [
            ],
            threeDirectory: [
            ],
            fourDirectory: [
            ],
            directory2: [],
            directory3: [],
            directory4: [],
            // 切换状态
            classlis1: [],
            classlis2: [],
            classlis3: [],
            classlis4: [],
            // 下一步状态
            next: true,
            // 商品类型
            commodityType1: '',
            commodityType2: '',
            commodityType3: '',
            commodityType4: '',
            // 首选类型ID
            commodityTypeId: '',
            // 空间服务数据

            ruleForm1: {
                name: '',
                brief: '',
                space: '',
                spaceOptions: [],
                price: '',
                roomId: '',
                companyOptions: [],
                roomOptions: [],
                company: '',
                mail: '1',
                stock: '',
                // 商品图片上传
                imageUrl: '',
                upImgUrl: '',
                imageUrl1: '',
                upImgUrl1: '',
                // 介绍
                introduce: '',
                // 描述
                describe: '',
                // 案例
                case: '',
                // 流程
                process: '',
                // 承诺
                promise: '',
                uploadUrl: `${this.$config.back}/putImg`,
                toolbar1: 'toolbar1',
                toolbar2: 'toolbar2',
                toolbar3: 'toolbar3',
                toolbar4: 'toolbar4',
                toolbar5: 'toolbar5',
            },
            // 培训服务数据
            ruleForm2: {
                name: '',
                brief: '',
                price: '',
                companyOptions: [],
                company: '',
                mail: '1',
                personNum: '',
                //  报名时间范围：
                datavalue1: '',
                datavalue2: '',
                // 商品图片上传
                imageUrl: '',
                upImgUrl: '',
                imageUrl1: '',
                upImgUrl1: '',
                // 介绍
                introduce: '',
                // 描述
                describe: '',
                // 案例
                case: '',
                // 流程
                process: '',
                // 承诺
                promise: '',
                uploadUrl: `${this.$config.back}/putImg`,
                toolbar1: 'toolbar1',
                toolbar2: 'toolbar2',
                toolbar3: 'toolbar3',
                toolbar4: 'toolbar4',
                toolbar5: 'toolbar5',
            },
            // 其他服务数据
            ruleForm3: {
                // 商品名称
                name: '',
                // 商品描述
                brief: '',
                // 是否议价
                bargaining: '1',
                // 商品价格
                price: '',
                // 现价
                nowPrice: '',
                // 是否促销
                promotion: '1',
                // 促销价
                promotionPrice: '',
                // 促销开始时间
                startTime: null,
                // 促销结束时间
                endTime: null,
                // 库存
                stock: '',
                // 商品单位选择
                companyOptions: [],
                company: '',
                // 发票邮寄方式
                mail: '1',
                // 是否有地域限制
                region: '2',
                serviceAreas: [
                    {
                        options1: [],
                        value1: '',

                        options2: [],
                        value2: '',

                        options3: [],
                        value3: '',

                    }
                ],
                twoServiceAreas: [
                    {
                        options1: [],
                        value1: '',
                        options2: [],
                        value2: '',
                        options3: [],
                        value3: '',
                        price: '',
                        bargaining: '2',
                        promotionPrice: '',
                        startTime: null,
                        endTime: null

                    }
                ],
                // 商品图片上传
                imageUrl: '',
                upImgUrl: '',
                imageUrl1: '',
                upImgUrl1: '',
                // dialogVisible: false,
                // 介绍
                introduce: '',
                // 描述
                describe: '',
                // 案例
                case: '',
                // 流程
                process: '',
                // 承诺
                promise: '',
                uploadUrl: `${this.$config.back}/putImg`,
                toolbar1: 'toolbar1',
                toolbar2: 'toolbar2',
                toolbar3: 'toolbar3',
                toolbar4: 'toolbar4',
                toolbar5: 'toolbar5',
            },
            ruleForm4: {
                name: '',
                brief: '',
                bargain: '2',
                negotiable: '2',
                startPrice: '',
                price: '',
                promotion: '2',
                // 促销价
                promotionPrice: '',
                // 促销开始时间
                startTime: null,
                // 促销结束时间
                endTime: null,
                companyOptions: [],
                company: '',
                mail: '1',
                // 商品图片上传
                imageUrl: '',
                upImgUrl: '',
                // 介绍
                introduce: '',
                // 描述
                describe: '',
                uploadUrl: `${this.$config.back}/putImg`,
                toolbar1: 'toolbar1',
            },
            rules: {
                name: [
                    { required: true, message: '商品标题名称长度至少3个字符，最长16个汉字', trigger: 'blur' },
                    { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' },
                ],
                brief: [
                    { required: true, message: '一句话描述您的商品，字数限制为 33 个字', trigger: 'blur' },
                    { max: 33, message: '最长为33个字符', trigger: 'blur' },
                ],
                bargaining: [
                    { required: true, message: '请选择是否议价', trigger: 'change' }
                ],
                startPrice: [
                    { required: true, message: '请输入商品价格', trigger: 'change' },
                    {
                        pattern: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/,
                        message: '商品价格格式不正确',
                        trigger: 'blur'
                    }
                ],
                price: [
                    { required: true, message: '请输入商品价格', trigger: 'change' },
                    {
                        pattern: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/,
                        message: '商品价格格式不正确',
                        trigger: 'blur'
                    }
                ],
                nowPrice: [
                    { required: true, message: '请输入商品价格', trigger: 'blur' },
                    {
                        pattern: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/,
                        message: '商品价格格式不正确',
                        trigger: 'blur'
                    }
                ],
                promotionPrice: [
                    { required: true, message: '请输入商品促销价格', trigger: 'blur' },
                    {
                        pattern: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/,
                        message: '商品促销价格格式不正确',
                        trigger: 'blur'
                    }
                ],
                stock: [
                    { required: true, message: '请输入商品库存量', trigger: 'blur' },
                    {
                        pattern: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/,
                        message: '商品库存量格式不正确',
                        trigger: 'blur'
                    }
                ],
                mail: [
                    { required: true, message: '请选择发票邮寄方式', trigger: 'change' }
                ],
                roomId: [
                    { required: true, message: '请选择所属空间', trigger: 'change' }
                ],
                personNum: [
                    { required: true, message: '请输入培训人数', trigger: 'blur' },
                    {
                        pattern: /^[1-9]*[1-9][0-9]*$/,
                        message: '培训人数格式不正确',
                        trigger: 'blur'
                    }
                ],
                datavalue1: [
                    { type: 'date', required: true, message: '请输入开始报名时间', trigger: 'change' },
                ],
                datavalue2: [
                    { type: 'date', required: true, message: '请输入结束报名时间', trigger: 'change' },
                ],
                startTime: [
                    { type: 'date', required: true, message: '请输入促销开始时间', trigger: 'change' },
                ],
                endTime: [
                    { type: 'date', required: true, message: '请输入促销结束时间', trigger: 'change' },
                ],
                region: [
                    { required: true, message: '请选择是否有地域限制', trigger: 'change' }
                ],
                imageUrl1: [
                    { required: true, message: '请上传商品logo图', trigger: 'blur' },
                ],
                imageUrl: [
                    { required: true, message: '请上传商品默认主图', trigger: 'blur' },
                ],
                details: [
                    { required: true, message: '请输入此处详细信息' },
                ],
                province: [
                    { required: true, message: '请选择省份', trigger: 'change' },
                ],
                company: [
                    { required: true, message: '请选择商品单位', trigger: 'change' },
                ]

            },
            index: 0,
            // 弹窗
            dialogTableVisible: false,
            //最后一级id
            serverLastId: '',
            // 省
            province: [],
            // 市
            city: [],
            // 县
            area: [],
            // 预览地域
            districtOpation: [],
            districtVal: '',
            // 预览信息
            yulanprice: '',
            yulanPromotionPrice: '',
            priceArr: [],
            stateArr: [],
            promotionPriceArr: []
        }
    },
    components: {
        editor
    },
    created: function() {

        let businessid = this.$store.state.business;
        if (businessid) {
            this.businessid = businessid;
        }
        // 四级分类
        var reg = {
            businessId: this.businessid
        }
        var that = this;
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/serverClass/getServerClassByBusinessCon`, {}, {
            params: reg
        }).then(({ data }) => {
            if (data.status === 200) {
                that.oneDirectory = data.data.onePss;
                that.twoDirectory = data.data.twoPss;
                that.threeDirectory = data.data.threePss;
                that.fourDirectory = data.data.fourPss;
            } else {
                that.$message.warning(data.msg);
            }
        }).catch(function(err) {

        });

        // 商品单位
        var reg2 = {
            fatherID: 100
        }
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/dictionary/selectByfatheridList`, {}, {
            params: reg2
        }).then(({ data }) => {
            if (data.status === 200) {
                that.ruleForm4.companyOptions = data.data;
                that.ruleForm3.companyOptions = data.data;
                that.ruleForm2.companyOptions = data.data;
                that.ruleForm1.companyOptions = data.data;
            } else {
                that.$message.warning(data.msg);
            }
        }).catch(function(err) {

        });

        var rooms = {
            businessId: this.businessid,
            roomState: 2
        }
        //加载空间列表
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/room/selectRoomListStauts`, {}, {
            params: rooms
        }).then(({ data }) => {
            if (data.status === 200) {
                if (data.data.length > 0) {
                    that.ruleForm1.roomOptions = data.data;
                }

            } else {
                that.$message.warning(data.msg);
            }
        }).catch(function(err) {

        });


    },
    methods: {
        // 预览事件
        yulan() {
            this.dialogTableVisible = true
        },
        yulanOpen() {
            this.province = [];
            this.city = [];
            this.area = [];
            this.districtOpation = [];
            this.priceArr = [];
            this.stateArr = [];
            this.promotionPriceArr = [];

            if (this.ruleForm3.bargaining == '1') {
                for (var i = 0; i < this.ruleForm3.serviceAreas.length; i++) {
                    var province = this.ruleForm3.serviceAreas[i].options1.filter((o) => {
                        return o.id == this.ruleForm3.serviceAreas[i].value1;
                    })
                    var city = this.ruleForm3.serviceAreas[i].options2.filter((o) => {
                        return o.id == this.ruleForm3.serviceAreas[i].value2;
                    })
                    var area = this.ruleForm3.serviceAreas[i].options3.filter((o) => {
                        return o.id == this.ruleForm3.serviceAreas[i].value3;
                    })
                    if (city.length == 0) {
                        this.city.push('');
                    } else {
                        this.city.push(city[0].name)
                    }
                    if (area.length == 0) {
                        this.area.push('');
                    } else {
                        this.area.push(area[0].name)
                    }
                    this.province.push(province[0].name)
                }
            } else {
                for (var i = 0; i < this.ruleForm3.twoServiceAreas.length; i++) {
                    var province = this.ruleForm3.twoServiceAreas[i].options1.filter((o) => {
                        return o.id == this.ruleForm3.twoServiceAreas[i].value1;
                    })
                    var city = this.ruleForm3.twoServiceAreas[i].options2.filter((o) => {
                        return o.id == this.ruleForm3.twoServiceAreas[i].value2;
                    })
                    var area = this.ruleForm3.twoServiceAreas[i].options3.filter((o) => {
                        return o.id == this.ruleForm3.twoServiceAreas[i].value3;
                    })

                    if (city.length == 0) {
                        this.city.push('');
                    } else {
                        this.city.push(city[0].name)
                    }
                    if (area.length == 0) {
                        this.area.push('');
                    } else {
                        this.area.push(area[0].name)
                    }
                    if (province.length == 0) {
                        this.province.push('')
                    } else {
                        this.province.push(province[0].name)
                    }
                }


            }
            for (var i = 0; i < this.province.length; i++) {
                var str = this.province[i] + ' ' + this.city[i] + ' ' + this.area[i]
                var strs = { value: i, label: str }
                this.districtOpation.push(strs)
                this.priceArr.push(this.ruleForm3.twoServiceAreas[i].price)
                this.stateArr.push(this.ruleForm3.twoServiceAreas[i].bargaining)
                this.promotionPriceArr.push(this.ruleForm3.twoServiceAreas[i].promotionPrice)
            }
            this.yulanprice = this.priceArr[0]
            this.yulanPromotionPrice = this.promotionPriceArr[0]
            this.districtVal = this.districtOpation[0].label
            if (this.stateArr[0] == '1') {
                setTimeout(function() {
                    $('.yprice').css({ 'text-decoration': 'line-through', 'color': '#999999', 'font-size': '14px' });
                    $('.ypromotion').show()
                }, 50)
            } else {
                this.yulanPromotionPrice = "";
                setTimeout(function() {
                    $('.yprice').css({ 'text-decoration': 'none', 'color': '#c7000a', 'font-size': '16px' });
                    $('.ypromotion').hide()
                }, 50)
            }


        },
        changeArea() {
            this.yulanprice = this.priceArr[this.districtVal]
            this.yulanPromotionPrice = this.promotionPriceArr[this.districtVal]
            if (this.stateArr[this.districtVal] == '1') {
                setTimeout(function() {
                    $('.yprice').css({ 'text-decoration': 'line-through', 'color': '#999999', 'font-size': '14px' });
                    $('.ypromotion').show()
                }, 50)
            } else {
                this.yulanPromotionPrice = "";
                setTimeout(function() {
                    $('.yprice').css({ 'text-decoration': 'none', 'color': '#c7000a', 'font-size': '16px' });
                    $('.ypromotion').hide()
                }, 50)
            }


        },
        // 时间处理
        datavalue2() {
            if (this.ruleForm2.datavalue2.getTime() <= this.ruleForm2.datavalue1.getTime()) {
                this.ruleForm2.datavalue2 = '';
                this.$message.warning('结束时间应大于开始时间！');
            }
        },
        endTime() {
            if (this.ruleForm3.endTime.getTime() <= this.ruleForm3.startTime.getTime()) {
                this.ruleForm3.endTime = '';
                this.$message.warning('结束时间应大于开始时间！');
            }
        },

        //省列表
        getProvinceList(index, type) {
            var that = this;
            this.$htAjax.post(`${this.$config.back}/selectOprtorProvice`)
                .then(({ data }) => {
                    if (data.status === 200) {
                        if (type == 1) {
                            that.ruleForm3.serviceAreas[index].options1 = data.data;
                            that.ruleForm3.serviceAreas[index].id1 = data.data[0].id;
                        } else {
                            that.ruleForm3.twoServiceAreas[index].options1 = data.data;
                            that.ruleForm3.twoServiceAreas[index].id1 = data.data[0].id;
                        }
                    } else {
                        that.$message.error(data.msg);
                    }
                }).catch(function(err) {

                });

        },
        // 四级联动选择方法
        fication1(lis, index) {
            this.classlis1 = [];
            this.classlis2 = [];
            this.directory3 = [];
            this.directory4 = [];
            this.directory2 = this.twoDirectory;
            this.$set(this.classlis1, index, true);
            this.directory2 = this.directory2.filter((o) => {
                return o.parentServerId == lis.id;
            })
            this.commodityType1 = this.oneDirectory[index].serverName
            this.commodityTypeId = this.oneDirectory[index].id
            this.serverType = this.oneDirectory[index].serverType
            if (this.serverType == 1) {
                this.detailsType = '0';
            } else if (this.serverType == 3) {
                this.detailsType = '1';
            } else if (this.serverType == 2) {
                this.detailsType = '2';
            } else if (this.serverType == 4) {
                this.detailsType = '3';
            }
            this.commodityType2 = '';
            this.commodityType3 = '';
            this.commodityType4 = '';
            this.next = true;
        },
        fication2(lis, index) {
            this.classlis2 = [];
            this.classlis3 = [];
            this.directory4 = [];
            this.directory3 = this.threeDirectory;
            this.$set(this.classlis2, index, true);
            this.directory3 = this.directory3.filter((o) => {
                return o.parentServerId == lis.id;
            })
            if (this.directory3.length == 0) {
                this.next = false;
                this.serverLastId = lis.id
            } else {
                this.next = true;
            }
            this.commodityType2 = this.directory2[index].serverName
            this.commodityType3 = '';
            this.commodityType4 = '';
        },
        fication3(lis, index) {
            this.classlis3 = [];
            this.classlis4 = [];
            this.directory4 = this.fourDirectory;
            this.$set(this.classlis3, index, true);
            this.directory4 = this.directory4.filter((o) => {
                return o.parentServerId == lis.id;
            })
            if (this.directory4.length == 0) {
                this.next = false;
                this.serverLastId = lis.id
            } else {
                this.next = true;
            }

            this.commodityType3 = this.directory3[index].serverName
            this.commodityType4 = '';
        },
        fication4(lis, index) {
            this.classlis4 = [];
            this.$set(this.classlis4, index, true);
            this.commodityType4 = this.directory4[index].serverName;
            this.serverLastId = lis.id;
            this.next = false;
        },
        // 改变状态
        changeState() {
            if (this.serverType == 1 && this.ruleForm1.roomOptions.length == 0) {
                this.$message.warning('您还未发布空间，请您前往“空间设置”去发布空间才可发布空间商品');
                return false;
            }
            this.type = "1";
            this.getProvinceList(this.index, 1);

        },
        // 编辑跳转
        changeState2() {
            this.type = "0"
        },
        // 商品图片上传
        handleAvatarSuccess1(response, file, fileList) {
            this.ruleForm1.imageUrl = URL.createObjectURL(file.raw);
            this.ruleForm1.upImgUrl = response.data;
        },
        handleAvatarSuccess11(response, file, fileList) {
            this.ruleForm1.imageUrl1 = URL.createObjectURL(file.raw);
            this.ruleForm1.upImgUrl1 = response.data;
        },
        handleAvatarSuccess2(response, file, fileList) {
            this.ruleForm2.imageUrl = URL.createObjectURL(file.raw);
            this.ruleForm2.upImgUrl = response.data;

        },
        handleAvatarSuccess22(response, file, fileList) {
            this.ruleForm2.imageUrl1 = URL.createObjectURL(file.raw);
            this.ruleForm2.upImgUrl1 = response.data;
        },
        handleAvatarSuccess3(response, file, fileList) {
            this.ruleForm3.imageUrl = URL.createObjectURL(file.raw);
            this.ruleForm3.upImgUrl = response.data;
        },
        handleAvatarSuccess4(response, file, fileList) {
            this.ruleForm4.imageUrl = URL.createObjectURL(file.raw);
            this.ruleForm4.upImgUrl = response.data;
        },
        handleAvatarSuccess33(response, file, fileList) {
            this.ruleForm3.imageUrl1 = URL.createObjectURL(file.raw);
            this.ruleForm3.upImgUrl1 = response.data;
        },
        beforeAvatarUpload(file) {
            const isImg = file.type;
            var isJPG = false;
            if (isImg != 'image/jpeg' && isImg != 'image/png' && isImg != 'image/bmp' && isImg != 'image/gif') {
                this.$message.warning('上传图片只能是 JPG/PNG/BMP/GIF 格式!');
                isJPG = false;
            } else {
                isJPG = true;
            }
            const isLt2M = file.size / 1024 / 1024 < 0.2;

            if (!isLt2M) {
                this.$message.warning('上传图片大小不能超过 200kb!');
            }
            return isJPG && isLt2M;
        },
        // 删除
        removeServiceArea(item) {
            this.index--;
            var index = this.ruleForm3.serviceAreas.indexOf(item)
            if (index !== -1) {
                this.ruleForm3.serviceAreas.splice(index, 1)
            }
        },
        removeServiceArea2(item) {
            this.index--;
            var index = this.ruleForm3.twoServiceAreas.indexOf(item)
            if (index !== -1) {
                this.ruleForm3.twoServiceAreas.splice(index, 1)
            }
        },
        // 添加
        addServiceArea() {
            this.index++;
            var jsons = {
                options1: [],
                value1: '',
                options2: [],
                value2: '',
                options3: [],
                value3: '',
            };
            this.ruleForm3.serviceAreas.push(jsons);
            this.getProvinceList(this.index, 1);


        },
        addServiceArea2() {
            this.index++;
            var jsons = {
                options1: [],
                value1: '',
                options2: [],
                value2: '',
                options3: [],
                value3: '',
                price: '',
                bargaining: '2',
                promotionPrice: '',
                startTime: '',
                endTime: ''
            };
            this.ruleForm3.twoServiceAreas.push(jsons);
            this.getProvinceList(this.index, 2);
        },
        // 、提交验证
        submitForm1() {
            this.$refs.ruleForm1.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    var reg = {
                        commodityName: this.ruleForm1.name,
                        invoiceMail: this.ruleForm1.mail,
                        commodityPrice: this.ruleForm1.price,
                        commodity_bigimage: this.ruleForm1.upImgUrl,
                        commodity_smallimage: this.ruleForm1.upImgUrl1,
                        description: this.ruleForm1.describe,
                        commodityState: 1,
                        finalPrice: this.ruleForm1.price,
                        stock: this.ruleForm1.stock,
                        synopsis: this.ruleForm1.brief,
                        commodityCase: this.ruleForm1.case,
                        promise: this.ruleForm1.promise,
                        process: this.ruleForm1.process,
                        introduce: this.ruleForm1.introduce,
                        isTerritoryRestriction: '2',
                        isPromotion: '2',
                        type: this.serverType,
                        measurementUnit: {
                            id: this.ruleForm1.company
                        },
                        romm: {
                            id: this.ruleForm1.roomId
                        },
                        serviceType: {
                            id: this.serverLastId
                        },
                        providerBusiness: {
                            id: this.businessid
                        }
                    }
                    if ((reg.commodity_bigimage == null || reg.commodity_bigimage == '') || (reg.commodity_smallimage == null || reg.commodity_smallimage == '')) {
                        this.$message.warning('请上传商品logo图、商品主图');
                        this.submitLoading = false;
                        return false;
                    }

                    if ((reg.introduce == null || reg.introduce == '') || (reg.commodityCase == null || reg.commodityCase == '') || (reg.description == null || reg.description == '')) {
                        this.$message.warning('请仔细填写页面信息');
                        this.submitLoading = false;
                        return false;
                    } else {
                        var that = this;
                        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/addProvideCommodity`, reg)
                            .then(({ data }) => {
                                if (data.status == 200) {
                                    that.submitLoading = false;
                                    that.type = "2"
                                } else if (data.status === 300) {
                                    that.submitLoading = false;
                                    that.$message({
                                        type: 'warning',
                                        message: '所上架商品不在服务范围内!'
                                    });
                                } else if (data.status === 250) {
                                    that.submitLoading = false;
                                    that.$message({
                                        type: 'error',
                                        message: '发布失败!'
                                    });
                                    return;
                                } else if (data.status === 350) {
                                    that.submitLoading = false;
                                    that.$message({
                                        type: 'warning',
                                        message: '所属空间不存在或已下架!'
                                    });
                                }
                            }).catch(function(err) {
                                that.submitLoading = false;
                            });
                    }

                } else {
                    this.$message.warning('请仔细检查页面信息后，再次发布商品！');
                    this.submitLoading = false;
                    return false;
                }
            });

        },
        submitForm2() {
            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    var reg = {
                        commodityName: this.ruleForm2.name,
                        invoiceMail: this.ruleForm2.mail,
                        commodityPrice: this.ruleForm2.price,
                        finalPrice: this.ruleForm2.price,
                        registrationStartTime: this.ruleForm2.datavalue1,
                        registrationEndTime: this.ruleForm2.datavalue2,
                        populationRestriction: this.ruleForm2.personNum,
                        commodity_bigimage: this.ruleForm2.upImgUrl,
                        commodity_smallimage: this.ruleForm2.upImgUrl1,
                        isTerritoryRestriction: '2',
                        isPromotion: '2',
                        description: this.ruleForm2.describe,
                        commodityCase: this.ruleForm2.case,
                        promise: this.ruleForm2.promise,
                        process: this.ruleForm2.process,
                        introduce: this.ruleForm2.introduce,
                        commodityState: 1,
                        synopsis: this.ruleForm2.brief,
                        type: this.serverType,
                        measurementUnit: {
                            id: this.ruleForm2.company
                        },
                        serviceType: {
                            id: this.serverLastId
                        },
                        providerBusiness: {
                            id: this.businessid
                        }
                    }
                    if ((reg.commodity_bigimage == null || reg.commodity_bigimage == '') || (reg.commodity_smallimage == null || reg.commodity_smallimage == '')) {
                        this.$message.warning('请上传商品logo图、商品主图');
                        this.submitLoading = false;
                        return false;
                    }
                    if ((reg.description == null || reg.description == '') || (reg.promise == null || reg.promise == '')) {
                        this.$message.warning('请仔细填写页面信息');
                        this.submitLoading = false;
                        return false;
                    } else {
                        var that = this;
                        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/addProvideCommodity`, reg)
                            .then(({ data }) => {
                                if (data.status === 200) {
                                    that.submitLoading = false;
                                    that.type = "2";
                                } else if (data.status === 300) {
                                    that.submitLoading = false;
                                    that.$message({
                                        type: 'warning',
                                        message: '所上架商品不在服务范围内!'
                                    });
                                } else if (data.status === 250) {
                                    that.submitLoading = false;
                                    that.$message({
                                        type: 'error',
                                        message: '发布失败!'
                                    });
                                    return;
                                } else if (data.status === 350) {
                                    that.submitLoading = false;
                                    that.$message({
                                        type: 'warning',
                                        message: '所属空间不存在或已下架!'
                                    });
                                }
                            }).catch(function(err) {
                                that.submitLoading = false;
                            });
                    }

                } else {
                    this.$message.warning('请仔细检查页面信息后，再次发布商品！');
                    this.submitLoading = false;
                    return false;
                }
            });
        },
        submitForm3() {
            this.$refs.ruleForm3.validate((valid) => {
                var serviceRange = [];
                var price = 0.0;
                var isPromotions = '2';
                if (this.ruleForm3.bargaining == '1' && this.ruleForm3.region == '1') {
                    var length = this.ruleForm3.serviceAreas.length
                    price = this.ruleForm3.price;
                    isPromotions = this.ruleForm3.promotion;
                    for (var i = 0; i < length; i++) {
                        var service = {
                            area: {
                                id: null
                            },
                            city: {
                                id: null
                            },
                            province: {
                                id: null
                            },
                            isPromotion: 2,
                            commodityPrice: null,
                            commodityPricePromotion: null,
                            startTime: null,
                            endTime: null
                        }
                        if (this.ruleForm3.serviceAreas[i].value3 == "" || this.ruleForm3.serviceAreas[i].value3 == null) {
                            service.area.id = null;
                        } else {
                            service.area.id = this.ruleForm3.serviceAreas[i].value3;
                        }
                        if (this.ruleForm3.serviceAreas[i].value2 == "" || this.ruleForm3.serviceAreas[i].value2 == null) {
                            service.city.id = null;
                        } else {
                            service.city.id = this.ruleForm3.serviceAreas[i].value2;
                        }
                        if (this.ruleForm3.serviceAreas[i].value1 == "" || this.ruleForm3.serviceAreas[i].value1 == null) {
                            service.province.id = null;
                        } else {
                            service.province.id = this.ruleForm3.serviceAreas[i].value1;
                        }
                        serviceRange.push(service);
                    }

                } else if (this.ruleForm3.bargaining == '2' && this.ruleForm3.region == '1') {
                    var length = this.ruleForm3.twoServiceAreas.length
                    price = this.ruleForm3.twoServiceAreas[0].price;
                    isPromotions = '2';
                    for (var i = 0; i < length; i++) {
                        var service = {
                            province: {
                                id: null
                            },
                            city: {
                                id: null
                            },
                            area: {
                                id: null
                            },
                            isPromotion: 2,
                            commodityPrice: null,
                            commodityPricePromotion: null,
                            startTime: null,
                            endTime: null
                        }
                        if (this.ruleForm3.twoServiceAreas[i].value3 == "" || this.ruleForm3.twoServiceAreas[i].value3 == null) {
                            service.area.id = null;
                        } else {
                            service.area.id = this.ruleForm3.twoServiceAreas[i].value3;
                        }
                        if (this.ruleForm3.twoServiceAreas[i].value2 == "" || this.ruleForm3.twoServiceAreas[i].value2 == null) {
                            service.city.id = null;
                            this.$message.warning('请选择市！');
                        } else {
                            service.city.id = this.ruleForm3.twoServiceAreas[i].value2;
                        }
                        if (this.ruleForm3.twoServiceAreas[i].value1 == "" || this.ruleForm3.twoServiceAreas[i].value1 == null) {
                            service.province.id = null;

                        } else {
                            service.province.id = this.ruleForm3.twoServiceAreas[i].value1;
                        }
                        service.startTime = this.ruleForm3.twoServiceAreas[i].startTime;
                        service.endTime = this.ruleForm3.twoServiceAreas[i].endTime;
                        service.commodityPrice = this.ruleForm3.twoServiceAreas[i].price;
                        service.promotionPrice = this.ruleForm3.twoServiceAreas[i].promotionPrice;
                        service.commodityPricePromotion = this.ruleForm3.twoServiceAreas[i].promotionPrice;
                        service.isPromotion = this.ruleForm3.twoServiceAreas[i].bargaining;
                        serviceRange.push(service);
                    }

                } else if (this.ruleForm3.bargaining == '2' && this.ruleForm3.region == '2') {
                    price = this.ruleForm3.nowPrice;
                    isPromotions = this.ruleForm3.promotion;
                } else if (this.ruleForm3.bargaining == '1' && this.ruleForm3.region == '2') {
                    price = this.ruleForm3.price;
                    isPromotions = this.ruleForm3.promotion;
                }
                var startTime = ''
                if (this.ruleForm3.startTime == undefined) {
                    startTime = null;
                } else {
                    startTime = this.ruleForm3.startTime
                }
                var endTime = '';
                if (this.ruleForm3.endTime == undefined) {
                    endTime = null;
                } else {
                    endTime = this.ruleForm3.endTime
                }
                if (valid) {
                    this.submitLoading = true;
                    var reg = {
                        commodityName: this.ruleForm3.name,
                        isBargaining: this.ruleForm3.bargaining,
                        startingPrice: this.ruleForm3.price,
                        invoiceMail: this.ruleForm3.mail,
                        isTerritoryRestriction: this.ruleForm3.region,
                        isPromotion: isPromotions,
                        commodityPrice: this.ruleForm3.nowPrice,
                        finalPrice: price,
                        commodityPricePromotion: this.ruleForm3.promotionPrice,
                        startTime: startTime,
                        endTime: endTime,
                        commodity_bigimage: this.ruleForm3.upImgUrl,
                        commodity_smallimage: this.ruleForm3.upImgUrl1,
                        description: this.ruleForm3.describe,
                        commodityCase: this.ruleForm3.case,
                        promise: this.ruleForm3.promise,
                        process: this.ruleForm3.process,
                        introduce: this.ruleForm3.introduce,
                        commodityState: 1,
                        stock: this.ruleForm3.stock,
                        synopsis: this.ruleForm3.brief,
                        type: this.serverType,
                        measurementUnit: {
                            id: this.ruleForm3.company
                        },
                        serviceType: {
                            id: this.serverLastId
                        },
                        serviceRange: serviceRange,
                        providerBusiness: {
                            id: this.businessid
                        }
                    }
                    var regE = /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/
                    if (reg.isBargaining == '2' && reg.isTerritoryRestriction == '1') {
                        for (var i = 0; i < reg.serviceRange.length; i++) {
                            var element = reg.serviceRange[i];
                            if ((element.province.id != null) && (element.city.id != null)) {
                                if (element.commodityPrice != '') {
                                    if (!regE.test(element.commodityPrice)) {
                                        this.$message.warning('商品价格格式不正确！');
                                        this.submitLoading = false;
                                        return false;
                                    } else {
                                        if (element.isPromotion == '1') {
                                            if ((element.promotionPrice != '') && (element.startTime != undefined) && (element.endTime != undefined)) {
                                                if (!regE.test(element.promotionPrice)) {
                                                    this.$message.warning('促销价格格式不正确！');
                                                    this.submitLoading = false;
                                                    return false;
                                                }
                                                if (new Date(element.startTime).getTime() >= new Date(element.endTime).getTime()) {
                                                    this.$message.warning('开始时间应小于结束时间！');
                                                    this.submitLoading = false;
                                                    return false;
                                                }
                                            } else {
                                                this.$message.warning('请填写促销价格、促销时间!');
                                                this.submitLoading = false;
                                                return false;
                                            }
                                        }
                                    }
                                } else {
                                    this.$message.warning('请填写商品价格！');
                                    this.submitLoading = false;
                                    return false;
                                }
                            } else {
                                this.$message.warning('请选择省、市！');
                                this.submitLoading = false;
                                return false;
                            }
                        }

                    } else if (reg.isBargaining == '1' && reg.isTerritoryRestriction == '1') {

                        for (var i = 0; i < reg.serviceRange.length; i++) {
                            var element = reg.serviceRange[i];
                            if ((element.province.id == null) && (element.city.id == null)) {
                                this.$message.warning('请选择省、市！');
                                this.submitLoading = false;
                                return false;
                            }
                        }
                    }
                    if ((reg.commodity_bigimage == null || reg.commodity_bigimage == '') || (reg.commodity_smallimage == null || reg.commodity_smallimage == '')) {
                        this.$message.warning('请上传商品logo图、商品主图');
                        this.submitLoading = false;
                        return false;
                    }
                    if ((reg.description == '') || (reg.promise == '')) {
                        this.$message.warning('请仔细填写页面信息');
                        this.submitLoading = false;
                        return false;
                    } else {
                        var that = this
                        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/addProvideCommodity`, reg)
                            .then(({ data }) => {
                                if (data.status === 200) {
                                    that.submitLoading = false;
                                    that.type = "2";
                                } else if (data.status === 300) {
                                    that.submitLoading = false;
                                    that.$message({
                                        type: 'warning',
                                        message: '所上架商品不在服务范围内!'
                                    });
                                } else if (data.status === 250) {
                                    that.submitLoading = false;
                                    that.$message({
                                        type: 'error',
                                        message: '发布失败!'
                                    });
                                    return;
                                } else if (data.status === 350) {
                                    that.submitLoading = false;
                                    that.$message({
                                        type: 'warning',
                                        message: '所属空间不存在或已下架!'
                                    });
                                }

                            }).catch(function(err) {
                                that.submitLoading = false;
                            });
                    }

                } else {
                    this.submitLoading = false;
                    this.$message.warning('请仔细检查页面信息后，再次发布商品！');
                    return false;
                }
            });
        },
        submitForm4() {
            this.$refs.ruleForm4.validate((valid) => {
                var comType = '';
                var comPrice = '';
                var finalPrice = '';
                var commodityPricePromotion = '';
                var startTime = '';
                var endTime = '';
                var comTypeIndex = this.commodityType2.indexOf('需求')
                if (comTypeIndex > 0) {
                    comType = 4
                } else {
                    comType = 5
                }
                if (this.ruleForm4.negotiable == 1) {
                    comPrice = 0
                } else {
                    comPrice = this.ruleForm4.startPrice
                }
                if (this.ruleForm4.bargain == 1) {
                    if (this.ruleForm4.negotiable == 1) {
                        finalPrice = 0
                    } else {
                        finalPrice = this.ruleForm4.startPrice
                    }
                } else {
                    finalPrice = this.ruleForm4.price;
                }

                if (this.ruleForm4.promotion == 1) {
                    commodityPricePromotion = this.ruleForm4.promotionPrice;
                    if (this.ruleForm4.startTime == null) {
                        this.$message.warning('请选择促销开始时间');
                        return false;
                    } else {
                        startTime = this.ruleForm4.startTime;
                    }
                    if (this.ruleForm4.endTime == null) {
                        this.$message.warning('请选择促销结束时间');
                        return false;
                    } else {
                        endTime = this.ruleForm4.endTime
                    }
                } else {
                    commodityPricePromotion = null
                    startTime = null
                    endTime = null
                }
                if (valid) {
                    this.submitLoading = true;
                    var reg = {
                        commodityName: this.ruleForm4.name,
                        invoiceMail: this.ruleForm4.mail,
                        startingPrice: comPrice,
                        commodityPrice: this.ruleForm4.price,
                        commodity_bigimage: this.ruleForm4.upImgUrl,
                        commodity_smallimage: this.ruleForm4.upImgUrl,
                        isBargaining: this.ruleForm4.bargain,
                        commodityState: 1,
                        finalPrice: finalPrice,
                        synopsis: this.ruleForm4.brief,
                        introduce: this.ruleForm4.introduce,
                        isTerritoryRestriction: 2,
                        stock: 10000,
                        isPromotion: this.ruleForm4.promotion,
                        commodityPricePromotion: commodityPricePromotion,
                        startTime: startTime,
                        endTime: endTime,
                        type: comType,
                        measurementUnit: {
                            id: this.ruleForm4.company
                        },
                        serviceType: {
                            id: this.serverLastId
                        },
                        providerBusiness: {
                            id: this.businessid
                        }
                    }
                    if (reg.commodity_smallimage == null || reg.commodity_smallimage == '') {
                        this.$message.warning('请上传服务logo图');
                        this.submitLoading = false;
                        return false;
                    }

                    if (reg.introduce == null || reg.introduce == '') {
                        this.$message.warning('请仔细填写页面信息');
                        this.submitLoading = false;
                        return false;
                    }
                    var that = this;
                    this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/addProvideCommodity`, reg)
                        .then(({ data }) => {
                            if (data.status == 200) {
                                that.submitLoading = false;
                                that.type = "2"
                            } else if (data.status === 300) {
                                that.submitLoading = false;
                                that.$message({
                                    type: 'warning',
                                    message: '所上架服务不在服务范围内!'
                                });
                            } else if (data.status === 250) {
                                that.submitLoading = false;
                                that.$message({
                                    type: 'error',
                                    message: '发布失败!'
                                });
                                return;
                            }
                        }).catch(function(err) {
                            that.submitLoading = false;
                        });

                } else {
                    this.$message.warning('请仔细检查页面信息后，再次发布商品！');
                    this.submitLoading = false;
                    return false;
                }
            });

        },
        getStartDate() {
            var nowTime = new Date().getTime();
            if (nowTime - new Date(this.ruleForm4.startTime).getTime() > 1000) {
                this.ruleForm4.startTime = '';
                this.$message.warning('促销开始时间需应大于等于此刻时间');
                return false;
            }
        },
        getEndDate() {
            if (this.ruleForm4.startTime == null) {
                this.$message.warning('请先选择促销开始时间');
                this.ruleForm4.endTime = '';
                return false;
            }
            if (new Date(this.ruleForm4.startTime).getTime() > new Date(this.ruleForm4.endTime).getTime()) {
                this.$message.warning('促销开始时间需应小于促销结束时间');
                this.ruleForm4.endTime = '';
                return false;
            }
        },
        //省变化
        provinceChange(item, index, type) {
            var reg = {
                id: item
            }
            var that = this;
            this.$htAjax.post(`${this.$config.back}/selcityList3`, {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status === 200) {
                    if (type == 1) {
                        that.ruleForm3.serviceAreas[index].value2 = '';
                        that.ruleForm3.serviceAreas[index].value3 = '';
                        that.ruleForm3.serviceAreas[index].options2 = data.data;
                        that.ruleForm3.serviceAreas[index].id2 = data.data[0].id;
                        that.ruleForm3.serviceAreas[index].options3 = [];
                    } else {
                        that.ruleForm3.twoServiceAreas[index].value2 = '';
                        that.ruleForm3.twoServiceAreas[index].value3 = '';
                        that.ruleForm3.twoServiceAreas[index].options2 = data.data;
                        that.ruleForm3.twoServiceAreas[index].id2 = data.data[0].id;
                        that.ruleForm3.twoServiceAreas[index].options3 = [];
                    }
                } else {
                    that.$message.error(data.msg);
                }
            }).catch(function(err) {

            });

        },

        //市变化
        cityChange(item, index, type) {

            var reg = {
                id: item
            }
            var that = this;
            this.$htAjax.post(`${this.$config.back}/selAreaList2`, {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status === 200) {
                    if (type == 1) {
                        that.ruleForm3.serviceAreas[index].value3 = '';
                        var arr = [{ citycode: '', code: '', id: '', name: '无' }]
                        data.data.forEach(function(o) {
                            arr.push(o)
                        })
                        that.ruleForm3.serviceAreas[index].options3 = arr;
                        that.ruleForm3.serviceAreas[index].id3 = data.data[0].id;
                    } else {
                        that.ruleForm3.twoServiceAreas[index].value3 = '';
                        var arr = [{ citycode: '', code: '', id: '', name: '无' }]
                        data.data.forEach(function(o) {
                            arr.push(o)
                        })
                        that.ruleForm3.twoServiceAreas[index].options3 = arr;
                        that.ruleForm3.twoServiceAreas[index].id3 = data.data[0].id;
                    }
                } else {
                    that.$message.error(data.msg);
                }
            }).catch(function(err) {
                // that.$message.error('请求错误');
            });

        }
    },
    watch: {
        'ruleForm3.bargaining': function(newVal, oldVal) {
            if (newVal != oldVal) {
                this.index = 0;
                if (newVal == 1) {
                    this.ruleForm3.serviceAreas = [
                        {
                            options1: [],
                            value1: '',
                            options2: [],
                            value2: '',
                            options3: [],
                            value3: '',

                        }
                    ];
                    this.getProvinceList(this.index, 1);
                } else {
                    this.ruleForm3.twoServiceAreas = [
                        {
                            options1: [],
                            value1: '',
                            options2: [],
                            value2: '',
                            options3: [],
                            value3: '',
                            price: '',
                            bargaining: '2',
                            promotionPrice: '',
                            startTime: null,
                            endTime: null

                        }
                    ];
                    this.getProvinceList(this.index, 2);
                }
            }

        },
        type: function(newVal, oldVal) {
            if (newVal == '2') {
                var that = this;
                setTimeout(function() {
                    that.$store.state.stateId2 = '3';
                    that.$router.push('/manage');
                }, 3000)
            }
        }


    }
}
</script>
<style  scoped>
.quillcon {
    height: 280px!important;
}

.block {
    float: left;
}

.con1 {
    overflow: hidden;
}

.crumbs {
    height: auto;
    margin: 15px 0;
    margin-top: 15px;
    width: 100%;
}

.nav {
    width: 99%;
    height: 100px;
}

.nav ul {
    width: 100%;
    height: 100px;
}

.nav ul li {
    float: left;
    width: 33%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding-right: 10px;
}

.nav ul li .li_box {
    width: 100%;
    height: 100%;
    background-color: #F4CCCE;
    border-radius: 8px;
    position: relative;
}

.nav ul li .li_box.active {
    background-color: #c7000a;
    color: white;
}

.nav ul li .li_box.active .order,
.nav ul li .li_box.active .bt {
    color: white;
}

.nav ul li .li_box.active .ms {
    color: #573232
}

.nav ul li .li_box .order {
    font-size: 28px;
    text-align: center;
    line-height: 25px;
    color: #4a4a4a;
    position: absolute;
    top: 50%;
    left: 10px;
    margin-top: -12px;
}

.nav ul li .li_box .bt {
    position: absolute;
    top: 20px;
    left: 45px;
    font-size: 16px;
    color: #4a4a4a;
}

.nav ul li .li_box .ms {
    position: absolute;
    top: 50px;
    left: 45px;
    font-size: 12px;
    color: #999999;
}

.list {
    width: 100%;
    height: 352px;
    margin-top: 15px;
    overflow: hidden;
}

.list ul {
    width: 100%;
    height: 352px;
    overflow: hidden;
}

.list ul li {
    width: 25%;
    height: 352px;
    padding-right: 10px;
    float: left;
    box-sizing: border-box;
    overflow: hidden;
}

.list ul li .box_li {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
    border: 1px solid #CCCCCC;
}

.list .box_li ul {
    height: auto;
}

.list ul li .box_li ul li {
    width: 100%;
    height: 30px;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    border-bottom: 1px solid #CCCCCC;
    color: #4a4a4a;
}

.list ul li .box_li ul li:hover {
    color: #c7000a;
    cursor: pointer;
}

.list ul li .box_li ul li.active {
    color: #c7000a;
}

.splx {
    margin-top: 10px;
    font-size: 14px;
    line-height: 30px;
    color: #c7000a;
}

.btn {
    margin-top: 20px;
    text-align: center;
}












/*填写商品详情*/

.tab {
    width: 100%;
    margin-top: 15px;
}

.tab_title {
    font-size: 14px;
    color: #333;
    line-height: 30px;
}

.tab span {
    font-size: 12px;
    color: red;
}












/*商品发布成功*/

.box {
    width: 100%;
    height: 300px;
    box-sizing: border-box;
    padding: 30px;
    background-color: white;
    margin-top: 20px;
}

.box .check {
    width: 50px;
    height: 50px;
    background-color: #c7000a;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    color: white;
    font-size: 25px;
    float: left;
    margin-right: 25px;
}

.box .suc {
    font-size: 26px;
    line-height: 50px;
}

.box p:nth-of-type(1) {
    font-size: 14px;
    margin-left: 75px;
    line-height: 50px;
}

.box p:nth-of-type(2) {
    font-size: 18px;
    margin-left: 175px;
    line-height: 50px;
}












/*预览弹窗*/

.cominfo {
    margin-bottom: 30px;
    height: auto;
    overflow: hidden;
}

.cominfo .img {
    width: 150px;
    height: 150px;
    float: left;
    margin-right: 50px;
}

.cominfo .info {
    float: left;
}

.cominfo .info ul li {
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    color: #999999;
}

.cominfo .info ul li:first-child {
    font-size: 16px;
    color: #4a4a4a;
    line-height: 32px;
}

.cominfo .info ul li span {
    color: #c7000a;
    font-size: 16px;
}

.comdetails p.title {
    font-size: 16px;
    line-height: 40px;
    color: #c7000a;
    border-bottom: 1px solid #c7000a;
    border-left: 0px solid #c7000a;
    margin-bottom: 20px;
}

.comdetails div p:first-child {
    font-size: 14px;
    line-height: 14px;
    margin: 10px 0;
    padding-left: 10px;
    border-left: 2px solid #c7000a;
    font-weight: 600;
}


.el-form-item:first-child {
    border: 1px solid #ccc;
}

.el-form-item {
    padding: 11px 0 22px 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-top: 0;
    margin: 0;
}

.serverarea .el-form-item {
    border: 0;
    padding: 11px 0;
}

.el-form-item__label {
    border-right: 1px solid #ccc;
}

.el-col .el-form-item {
    padding: 0!important;
}
</style>
<style>
.comdetails img {
    max-width: 100%!important;
}

.comImg {
    width: 320px!important;
}

.commodity .avatar-uploader .el-upload {
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.commodity .avatar-uploader.comImg .el-upload {
    width: 320px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.commodity .avatar-uploader .el-upload:hover {
    border-color: #c7000a;
}

.commodity .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}







/*.commodity .avatar {
    width: 178px;
    height: 178px;
    display: block;
}*/
</style>
