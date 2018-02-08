<template>
    <div v-loading.body="loading" class="comEdit">
        <div class="tab" v-if="detailsType == '1'">
            <p class="tab_title">商品基本信息</p>
            <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="150px" class="demo-ruleForm">
                <el-form-item label="商品分类:" prop="classoptions">
                    <el-input v-model="ruleForm1.comClass" placeholder="请输入内容" style="width:220px;"></el-input>
                    <el-button type="primary" @click="edit">编辑</el-button>
                </el-form-item>
                <el-form-item label="商品名称:" prop="name">
                    <el-input v-model="ruleForm1.name" style="width:500px;" :maxlength="16"></el-input>
                </el-form-item>
                <el-form-item label="商品描述:" prop="brief">
                    <el-input v-model="ruleForm1.brief" style="width:500px;" :maxlength="33"></el-input>
                </el-form-item>
                <el-form-item label="商品价格:" prop="price">
                    <el-input placeholder="请输入金额" v-model="ruleForm1.price" style="width:220px;" :maxlength="11">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="商品单位:" prop="company">
                    <el-select v-model="ruleForm1.company" placeholder="请选择">
                        <el-option v-for="item in ruleForm1.companyOptions" :key="item.id" :label="item.dictName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发票邮寄方式:" prop="mail">
                    <template>
                        <el-radio class="radio" v-model="ruleForm1.mail" label="1">包邮</el-radio>
                        <el-radio class="radio" v-model="ruleForm1.mail" label="2">货到付款</el-radio>
                    </template>
                </el-form-item>
                <el-form-item label="所属空间:" prop="roomId">
                    <el-select v-model="ruleForm1.roomId" placeholder="请选择">
                        <el-option v-for="item in ruleForm1.roomOptions" :key="item.id" :label="item.roomName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="空间工位库存:" prop="stock">
                    <el-input placeholder="请输入库存量" v-model="ruleForm1.stock" style="width:220px;" :maxlength="11">
                    </el-input>
                </el-form-item>
                <el-form-item label="商品图片logo:" >
                    <el-upload class="avatar-uploader" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess11">
                        <img v-if="ruleForm1.imageUrl1" :src="ruleForm1.imageUrl1" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span>上传商品默认主图，仅支持jpg、bmp、png、gif的图片格式，图片大小不能超过200KB，为了展示效果更加清晰，建议上传180*180的图片</span>
                </el-form-item>
                <el-form-item label="商品图片:" >
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
                    <el-button type="primary" @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tab" v-if="detailsType == '3'">
            <p class="tab_title">商品基本信息</p>
            <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="150px" class="demo-ruleForm">
                <el-form-item label="商品分类:" prop="classoptions">
                    <el-input v-model="ruleForm1.comClass" placeholder="请输入内容" style="width:220px;"></el-input>
                    <el-button type="primary" @click="dialogVisible = true">编辑</el-button>
                </el-form-item>
                <el-form-item label="商品名称:" prop="name">
                    <el-input v-model="ruleForm2.name" style="width:500px;" :maxlength="16"></el-input>
                </el-form-item>
                <el-form-item label="商品描述:" prop="brief">
                    <el-input v-model="ruleForm2.brief" style="width:500px;" :maxlength="33"></el-input>
                </el-form-item>
                <el-form-item label="商品价格:" prop="price">
                    <el-input placeholder="请输入金额" v-model="ruleForm2.price" style="width:220px;" :maxlength="11">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="商品单位:" prop="company">
                    <el-select v-model="ruleForm2.company" placeholder="请选择">
                        <el-option v-for="item in ruleForm2.companyOptions" :key="item.id" :label="item.dictName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发票邮寄方式:" prop="mail">
                    <template>
                        <el-radio class="radio" v-model="ruleForm2.mail" label="1">包邮</el-radio>
                        <el-radio class="radio" v-model="ruleForm2.mail" label="2">货到付款</el-radio>
                    </template>
                </el-form-item>
                <el-form-item label="报名人数限制:" prop="personNum">
                    <el-input placeholder="请输入报名人数" v-model="ruleForm2.personNum" style="width:220px;" :maxlength="11">
                    </el-input>
                </el-form-item>
                <el-form-item label="报名时间范围:" required class="serverarea">
                    <el-col :span="6">
                        <el-form-item prop="datavalue1">
                            <el-date-picker v-model="ruleForm2.datavalue1" type="datetime" placeholder="选择日期时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">-</el-col>
                    <el-col :span="5">
                        <el-form-item prop="datavalue2">
                            <el-date-picker v-model="ruleForm2.datavalue2" type="datetime" placeholder="选择日期时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="商品图片logo:" >
                    <el-upload class="avatar-uploader" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess22">
                        <img v-if="ruleForm2.imageUrl1" :src="ruleForm2.imageUrl1" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span>上传商品默认主图，仅支持jpg、bmp、png、gif的图片格式，图片大小不能超过200KB，为了展示效果更加清晰，建议上传180*180的图片</span>
                </el-form-item>
                <el-form-item label="商品图片:" >
                    <el-upload class="avatar-uploader comImg" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess2">
                        <img v-if="ruleForm2.imageUrl" :src="ruleForm2.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span>上传商品默认主图，仅支持jpg、bmp、png、gif的图片格式，图片大小不能超过200KB，为了展示效果更加清晰，建议上传750*416的图片</span>
                </el-form-item>
                <!--<el-form-item label="培训受众：" prop="details" class="quillcon" required>
                                    <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm2.toolbar1' :uploadUrl="ruleForm2.uploadUrl" v-model="ruleForm2.introduce"></editor>
                                </el-form-item>-->
                <el-form-item label="商品介绍：" prop="details" class="quillcon" required>
                    <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm2.toolbar2' :uploadUrl="ruleForm2.uploadUrl" v-model="ruleForm2.describe"></editor>
                </el-form-item>
                <!--<el-form-item label="课程概述：" prop="details" class="quillcon" required>
                                    <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm2.toolbar3' :uploadUrl="ruleForm2.uploadUrl" v-model="ruleForm2.case"></editor>
                                </el-form-item>
                                <el-form-item label="培训师/机构介绍：" prop="details" class="quillcon" required>
                                    <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm2.toolbar4' :uploadUrl="ruleForm2.uploadUrl" v-model="ruleForm2.process"></editor>
                                </el-form-item>-->
                <el-form-item label="服务承诺：" prop="details" class="quillcon" required>
                    <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm2.toolbar5' :uploadUrl="ruleForm2.uploadUrl" v-model="ruleForm2.promise"></editor>
                </el-form-item>
                <el-form-item style="text-align: center;">
                    <el-button type="primary" @click="submitForm2()" :loading="submitLoading">提交发布商品</el-button>
                    <el-button type="primary" @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tab" v-if="detailsType == '2'">
            <p class="tab_title">商品基本信息</p>
            <el-form :model="ruleForm3" :rules="rules" ref="ruleForm3" label-width="150px" class="demo-ruleForm">
                <el-form-item label="商品分类:" prop="classoptions">
                    <el-input v-model="ruleForm3.comClass" placeholder="请输入内容" style="width:220px;"></el-input>
                    <el-button type="primary" @click="dialogVisible = true">编辑</el-button>
                </el-form-item>
                <el-form-item label="商品名称:" prop="name">
                    <el-input v-model="ruleForm3.name" style="width:500px;" :maxlength="16"></el-input>
                </el-form-item>
                <el-form-item label="商品描述:" prop="brief">
                    <el-input v-model="ruleForm3.brief" style="width:500px;" :maxlength="33"></el-input>
                </el-form-item>
                <el-form-item label="商品是否允许议价:" prop="bargaining" @change="clearServiceRange()">
                    <template>
                        <el-radio class="radio" v-model="ruleForm3.bargaining" label="1">是</el-radio>
                        <el-radio class="radio" v-model="ruleForm3.bargaining" label="2">否</el-radio>
                    </template>
                    <br>
                    <span>商品议价为线下与用户联系确定价格后在议价商品订单中修改。</span>
                </el-form-item>
                <el-form-item label="是否有地域限制:" prop="region">
                    <template>
                        <el-radio class="radio" v-model="ruleForm3.region" label="1">有</el-radio>
                        <el-radio class="radio" v-model="ruleForm3.region" label="2">没有</el-radio>
                    </template>
                    <br>
                    <span>系统默认服务范围为“没有，即全国范围”，如您有地域限制，请勾选“有”后进行自主填写。</span>
                </el-form-item>
                <el-form-item label="商品价格:" prop="price" v-if="ruleForm3.bargaining == '1'">
                    <el-input placeholder="请输入金额" v-model="ruleForm3.price" style="width:220px;" :maxlength="11">
                        <template slot="append">元起</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="商品价格:" prop="nowPrice" v-if="ruleForm3.bargaining == '2' && ruleForm3.region=='2'">
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
                <el-form-item label="商品促销价:" prop="promotionPrice" v-if="ruleForm3.bargaining == '2' && ruleForm3.region=='2' && ruleForm3.promotion == 1">
                    <el-input placeholder="请输入金额" v-model="ruleForm3.promotionPrice" style="width:220px;" :maxlength="11">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <el-form-item label="促销时间范围：" required v-if="ruleForm3.bargaining == '2' && ruleForm3.region=='2' && ruleForm3.promotion == 1">
                    <el-col :span="7">
                        <el-form-item prop="startTime">
                            <el-date-picker v-model="ruleForm3.startTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                        </el-form-item>

                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="6">
                        <el-form-item prop="endTime">
                            <el-date-picker v-model="ruleForm3.endTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <!--第二个服务区域循环-->
                <el-form-item v-for="(serviceArea, index) in ruleForm3.serviceAreas" :key="index" :label="'服务区域' + (index+1)" v-if="ruleForm3.region == '1' && ruleForm3.bargaining=='2'" class="serverarea" required>
                    <el-col :span="5">
                        <el-form-item>
                            <el-select v-model="serviceArea.value1" placeholder="请选择省" style="width:150px;margin-right:10px;" @change="provinceChange(serviceArea.value1,index,2)">
                                <el-option v-for="(item,index) in serviceArea.options1" :key="item.name" :label="item.name" :value="item.id"></el-option>
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
                    <el-col :span="10">
                        <el-form-item label="是否促销：" label-width="100px" style="margin-top:20px;">
                            <template>
                                <el-radio class="radio" v-model="serviceArea.bargain" label='1'>是</el-radio>
                                <el-radio class="radio" v-model="serviceArea.bargain" label='2'>否</el-radio>
                            </template>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="ruleForm3.serviceAreas[index].bargain =='1'">
                        <el-form-item label="促销价格：" label-width="120px" style="margin-top:20px;">
                            <el-input v-model="serviceArea.promotionPrice" style="width:180px;" :maxlength="11"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24" v-if="ruleForm3.serviceAreas[index].bargain =='1'">
                        <el-form-item label="时间范围：" label-width="120px" style="margin-top:20px;">
                            <el-date-picker v-model="serviceArea.startTime" type="datetime" placeholder="选择日期时间" style="width:180px;"></el-date-picker>
                            <span style="padding: 0 20px;">-</span>
                            <el-date-picker v-model="serviceArea.endTime" type="datetime" placeholder="选择日期时间" style="width:180px;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-button @click.prevent="removeServiceArea(serviceArea)" v-if="index != '0'">删除</el-button>
                    <el-button type="primary" @click="addServiceArea2(index)" v-if="index == '0'">增加</el-button>
                </el-form-item>
                <el-form-item label="商品单位:" prop="company">
                    <el-select v-model="ruleForm3.company" placeholder="请选择">
                        <el-option v-for="item in ruleForm3.companyOptions" :key="item.id" :label="item.dictName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品库存:" prop="stock">
                    <el-input v-model="ruleForm3.stock" style="width:220px;" :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="发票邮寄方式:" prop="mail">
                    <template>
                        <el-radio class="radio" v-model="ruleForm3.mail" label="1">包邮</el-radio>
                        <el-radio class="radio" v-model="ruleForm3.mail" label="2">货到付款</el-radio>
                    </template>
                </el-form-item>
                <!--第一个服务区域-->
                <el-form-item v-for="(serviceArea, index) in ruleForm3.serviceAreas" :key="serviceArea" :label="'服务区域' + (index+1)" v-if="ruleForm3.region == '1' && ruleForm3.bargaining == '1'" class="serverarea" required>
                    <el-col :span="5">
                        <el-form-item>
                            <el-select v-model="serviceArea.value1" placeholder="请选择省" style="width:150px;margin-right:10px;" @change="provinceChange(serviceArea.value1,index,2)">
                                <el-option v-for="(item,index) in serviceArea.options1" :key="item.name" :label="item.name" :value="item.id"></el-option>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="1">&nbsp;</el-col>
                    <el-col :span="5">
                        <el-form-item>
                            <el-select v-model="serviceArea.value2" placeholder="请选择市" style="width:150px; margin-right:10px;" @change="cityChange(serviceArea.value2,index,2)">
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
                    <el-button type="primary" @click="addServiceArea(index)" v-if="index == '0'">增加</el-button>
                </el-form-item>
                <el-form-item label="商品图片logo:">

                    <el-upload class="avatar-uploader" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess33">
                        <img v-if="ruleForm3.imageUrl1" :src="ruleForm3.imageUrl1" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span>上传商品默认主图，仅支持jpg、bmp、png、gif的图片格式，图片大小不能超过200KB，为了展示效果更加清晰，建议上传180*180的图片</span>
                </el-form-item>
                <el-form-item label="商品图片:">

                    <el-upload class="avatar-uploader comImg" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess3">
                        <img v-if="ruleForm3.imageUrl" :src="ruleForm3.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <span>上传商品默认主图，仅支持jpg、bmp、png、gif的图片格式，图片大小不能超过200KB，为了展示效果更加清晰，建议上传750*416的图片</span>
                </el-form-item>
                <!--<el-form-item label="商品介绍:" class="quillcon" required>
                                    <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm3.toolbar1' :uploadUrl="ruleForm3.uploadUrl" v-model="ruleForm3.introduce"></editor>
                                </el-form-item>-->
                <el-form-item label="商品介绍:" class="quillcon" required>
                    <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm3.toolbar2' :uploadUrl="ruleForm3.uploadUrl" v-model="ruleForm3.describe"></editor>
                </el-form-item>
                <!--<el-form-item label="服务案例:" class="quillcon" required>
                                    <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm3.toolbar3' :uploadUrl="ruleForm3.uploadUrl" v-model="ruleForm3.case"></editor>
                                </el-form-item>
                                <el-form-item label="服务流程:" class="quillcon" required>
                                    <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm3.toolbar4' :uploadUrl="ruleForm3.uploadUrl" v-model="ruleForm3.process"></editor>
                                </el-form-item>-->
                <el-form-item label="服务承诺:" class="quillcon" required>
                    <editor ref="myTextEditor" :fileName="'myFile'" :toolbars='ruleForm3.toolbar5' :uploadUrl="ruleForm3.uploadUrl" v-model="ruleForm3.promise"></editor>
                </el-form-item>
                <el-form-item style="text-align: center;">
                    <el-button type="primary" @click="submitForm3('newForm')" :loading="submitLoading">提交发布商品</el-button>
                    <el-button type="primary" @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="tab" v-if="detailsType == '4'">
            <p class="tab_title">商品基本信息</p>
            <el-form :model="ruleForm4" :rules="rules" ref="ruleForm4" label-width="150px" class="demo-ruleForm">
                <el-form-item label="商品分类:" prop="classoptions">
                    <el-input v-model="ruleForm4.comClass" placeholder="请输入内容" style="width:220px;"></el-input>
                    <el-button type="primary" @click="edit">编辑</el-button>
                </el-form-item>
                <el-form-item label="名称：" prop="name">
                    <el-input v-model="ruleForm4.name" style="width:500px;" :maxlength="16"></el-input>
                </el-form-item>
                <el-form-item label="服务描述：" prop="brief">
                    <el-input v-model="ruleForm4.brief" style="width:500px;" :maxlength="33"></el-input>
                </el-form-item>
                <el-form-item label="服务是否允许议价：">
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
                        <!---->
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
                <el-form-item label="服务logo：">
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
                    <el-button type="primary" @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--编辑弹窗-->
        <el-dialog :visible.sync="dialogVisible">
            <div class="out_box">
                <div class="inner">
                    <ul>
                        <li v-for="(lis,index) in oneDirectory" :key="index" :class="{'active':classlis1[index]}" @click="fication1(lis,index)"> {{lis.serverName}} </li>
                    </ul>
                </div>
                <div class="inner">
                    <ul>
                        <li v-for="(lis,index) in directory2" :key="index" :class="{'active':classlis2[index]}" @click="fication2(lis,index)">{{lis.serverName}}</li>
                    </ul>
                </div>
                <div class="inner">
                    <ul>
                        <li v-for="(lis,index) in directory3" :key="index" :class="{'active':classlis3[index]}" @click="fication3(lis,index)">{{lis.serverName}}</li>
                    </ul>
                </div>
                <div class="inner">
                    <ul>
                        <li v-for="(lis,index) in directory4" :key="index" :class="{'active':classlis4[index]}" @click="fication4(lis,index)">{{lis.serverName}}</li>
                    </ul>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm" :disabled="next">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import editor from './editor.vue'
import moment from 'moment'

export default {
    data() {
        return {
            loading: false,
            businessid: '',
            zhi: 2,
            detailsType: '2',
            serverType: '',
            submitLoading: false,
            commodityCode: '',
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
            next: true,
            // 四个值
            commodityType1: '',
            commodityType2: '',
            commodityType3: '',
            commodityType4: '',
            // 最后一级id
            serverLastId: '',
            // 空间服务数据
            ruleForm1: {
                comClass: '',
                name: '',
                brief: '',
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
                details: '',
                salesVolume: 0,
                evaluateValue: 0,
                id: null,
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
                comClass: '',
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
                salesVolume: 0,
                evaluateValue: 0,
                // 商品图片上传
                imageUrl: '',
                upImgUrl: '',
                imageUrl1: '',
                upImgUrl1: '',
                // details: '',
                id: null,
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
                uploadUrl: `${this.$config.back}/api/upload`,
                toolbar1: 'toolbar1',
                toolbar2: 'toolbar2',
                toolbar3: 'toolbar3',
                toolbar4: 'toolbar4',
                toolbar5: 'toolbar5',
            },
            // 其他服务数据
            ruleForm3: {
                comClass: '',
                // 商品名称
                name: '',
                // 商品描述
                brief: '',
                // 是否议价
                bargaining: '1',
                // 商品价格
                price: '',
                // 原价
                originalPrice: '',
                // 现价
                nowPrice: '',
                // 是否促销
                promotion: '2',
                // 促销价
                promotionPrice: '',
                // 促销开始时间
                startTime: null,
                // 促销结束时间
                endTime: null,
                // 库存
                stock: '',
                //商品评价数量
                evaluateValue: 0,
                // 商品单位选择
                companyOptions: [],
                //销量
                salesVolume: 0,
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
                        price: '',
                        bargain: '2',

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
                editorOption: {
                    // something config
                },
                id: null,
                uploadUrl: `${this.$config.back}/putImg`,
                toolbar1: 'toolbar1',
                toolbar2: 'toolbar2',
                toolbar3: 'toolbar3',
                toolbar4: 'toolbar4',
                toolbar5: 'toolbar5',
            },
            ruleForm4: {

                id: '',
                comClass: '',
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
                stock: '',
                // 商品图片上传
                imageUrl: '',
                upImgUrl: '',
                // 介绍
                introduce: '',
                // 描述
                describe: '',
                uploadUrl: `${this.$config.back}/putImg`,
                toolbar1: 'toolbar1',
                finalClass: '',
                finalType: '',
            },
            rules: {
                name: [
                    { required: true, message: '商品标题名称长度至少3个字符，最长16个汉字', trigger: 'change' },
                    { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'change' },
                ],
                brief: [
                    { required: true, message: '一句话描述您的商品，字数限制为 33 个字', trigger: 'blur' },
                    { max: 33, message: '最长为33个字符', trigger: 'blur' },
                ],
                bargaining: [
                    { required: true, message: '请选择是否议价', trigger: 'change' }
                ],
                startPrice: [
                    { required: true, message: '请输入商品价格' },
                    {
                        pattern: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/,
                        message: '商品价格格式不正确'
                    }
                ],
                price: [
                    { required: true, message: '请输入商品价格' },
                    {
                        pattern: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/,
                        message: '商品价格格式不正确'
                    }
                ],
                nowPrice: [
                    { required: true, message: '请输入商品价格' },
                    {
                        pattern: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/,
                        message: '商品价格格式不正确'
                    }
                ],
                promotionPrice: [
                    { required: true, message: '请输入商品促销价格', trigger: 'change' },
                    {
                        pattern: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/,
                        message: '商品促销价格格式不正确',
                        trigger: 'change'
                    }
                ],
                stock: [
                    { required: true, message: '请输入商品库存量' },
                    {
                        pattern: /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/,
                        message: '商品库存量格式不正确'
                    }
                ],
                mail: [
                    { required: true, message: '请选择发票邮寄方式', trigger: 'change' }
                ],
                roomId: [
                    { required: true, message: '请选择所属空间', trigger: 'change' }
                ],
                personNum: [
                    { required: true, message: '请输入培训人数' },
                    {
                        pattern: /^[1-9]*[1-9][0-9]*$/,
                        message: '培训人数格式不正确'
                    }
                ],
                datavalue1: [
                    { type: 'date', required: true, message: '请选择开始报名时间', trigger: 'change' },
                ],
                datavalue2: [
                    { type: 'date', required: true, message: '请选择结束报名时间', trigger: 'change' },
                ],
                startTime: [
                    { type: 'date', required: true, message: '请选择促销开始时间', trigger: 'change' },
                ],
                endTime: [
                    { type: 'date', required: true, message: '请选择促销结束时间', trigger: 'change' },
                ],
                region: [
                    { required: true, message: '请选择是否有地域限制', trigger: 'change' }
                ],
                img: [
                    { required: true, message: '请上传商品默认主图', trigger: 'change' },
                ],
                details: [
                    { required: true, message: '请输入商品详情介绍', trigger: 'change' },
                ],
                province: [
                    { required: true, message: '请选择省份', trigger: 'change' },
                ],
                company: [
                    { required: true, message: '请选择商品单位', trigger: 'change' },
                ],
                areas: [
                    { required: true, message: '请补全区域信息', trigger: 'change' },
                ]

            },
            // 编辑弹窗状态
            dialogVisible: false,
            index: 0,
        }
    },
    components: {
        editor
    },
    created: function() {
        // 商户id
        let businessid = this.$store.state.business;
        if (businessid) {
            this.businessid = businessid;
        }

        let order = this.$store.state.stateId;
        let orders = order;
        // 获取商品id
        let comm = this.$store.state.comId;
        //四级分类
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
                that.$message.error(data.msg);
            }
        }).catch(function(err) {

        });



        //加载商品详情信息
        this.init(comm, this.businessid);


        //加载商品单位列表
        var reg2 = {
            fatherID: 100
        }

        var that = this;
        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/dictionary/selectByfatheridList`, {}, {
            params: reg2
        }).then(({ data }) => {
            if (data.status === 200) {
                that.ruleForm4.companyOptions = data.data;
                that.ruleForm3.companyOptions = data.data;
                that.ruleForm2.companyOptions = data.data;
                that.ruleForm1.companyOptions = data.data;
            } else {
                that.$message.error(data.msg);
            }
        }).catch(function(err) {

        });
        //获取省列表
        this.getProvinceList(0, 1)

    },
    methods: {

        init(comid, businessid) {
            this.loading = true;
            var reg = {
                id: comid
            }
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/getProvideCommodity`, {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status === 200) {
                    if (data.data.type == 5) {
                        this.detailsType = 4
                    } else {
                        this.detailsType = data.data.type;
                    }
                    this.serverLastId = data.data.serviceType.id;
                    this.commodityCode = data.data.commodityCode
                    // 空间
                    this.ruleForm1.comClass = data.data.serviceType.serverName
                    this.ruleForm1.name = data.data.commodityName;
                    this.ruleForm1.mail = data.data.invoiceMail;
                    this.ruleForm1.brief = data.data.synopsis
                    this.ruleForm1.imageUrl = data.data.commodity_bigimage
                    this.ruleForm1.upImgUrl = data.data.commodity_bigimage
                    this.ruleForm1.imageUrl1 = data.data.commodity_smallimage
                    this.ruleForm1.upImgUrl1 = data.data.commodity_smallimage
                    this.ruleForm1.id = data.data.id
                    this.ruleForm1.company = data.data.measurementUnit.id
                    this.ruleForm1.introduce = data.data.introduce
                    this.ruleForm1.describe = data.data.description
                    this.ruleForm1.case = data.data.commodityCase
                    this.ruleForm1.process = data.data.process
                    this.ruleForm1.promise = data.data.promise
                    this.ruleForm1.salesVolume = data.data.salesVolume
                    this.ruleForm1.evaluateValue = data.data.evaluateValue
                   
                    //培训
                    this.ruleForm2.comClass = data.data.serviceType.serverName
                    this.ruleForm2.name = data.data.commodityName
                    this.ruleForm2.mail = data.data.invoiceMail
                    this.ruleForm2.brief = data.data.synopsis
                    this.ruleForm2.imageUrl = data.data.commodity_bigimage
                    this.ruleForm2.upImgUrl = data.data.commodity_bigimage
                    this.ruleForm2.imageUrl1 = data.data.commodity_smallimage
                    this.ruleForm2.upImgUrl1 = data.data.commodity_smallimage
                    this.ruleForm2.id = data.data.id
                    this.ruleForm2.company = data.data.measurementUnit.id
                    this.ruleForm2.introduce = data.data.introduce
                    this.ruleForm2.describe = data.data.description
                    this.ruleForm2.case = data.data.commodityCase
                    this.ruleForm2.process = data.data.process
                    this.ruleForm2.promise = data.data.promise
                    this.ruleForm2.salesVolume = data.data.salesVolume
                    this.ruleForm2.evaluateValue = data.data.evaluateValue
                     
                    // 其他
                    this.ruleForm3.comClass = data.data.serviceType.serverName
                    this.ruleForm3.name = data.data.commodityName
                    this.ruleForm3.mail = data.data.invoiceMail
                    this.ruleForm3.brief = data.data.synopsis
                    this.ruleForm3.imageUrl = data.data.commodity_bigimage
                    this.ruleForm3.upImgUrl = data.data.commodity_bigimage
                    this.ruleForm3.imageUrl1 = data.data.commodity_smallimage
                    this.ruleForm3.upImgUrl1 = data.data.commodity_smallimage
                    this.ruleForm3.id = data.data.id
                    this.ruleForm3.company = data.data.measurementUnit.id
                    this.ruleForm3.introduce = data.data.introduce
                    this.ruleForm3.describe = data.data.description
                    this.ruleForm3.case = data.data.commodityCase
                    this.ruleForm3.process = data.data.process
                    this.ruleForm3.promise = data.data.promise
                    this.ruleForm3.salesVolume = data.data.salesVolume
                    this.ruleForm3.evaluateValue = data.data.evaluateValue
                    
                    //大企业合作
                    this.ruleForm4.comClass = data.data.serviceType.serverName
                    this.ruleForm4.name = data.data.commodityName;
                    this.ruleForm4.mail = data.data.invoiceMail;
                    this.ruleForm4.brief = data.data.synopsis
                    this.ruleForm4.imageUrl = data.data.commodity_smallimage
                    this.ruleForm4.upImgUrl = data.data.commodity_smallimage
                    this.ruleForm4.id = data.data.id
                    this.ruleForm4.company = data.data.measurementUnit.id
                    this.ruleForm4.introduce = data.data.introduce
                    if (data.data.commodityPricePromotion == null) {
                        this.ruleForm4.promotionPrice == null;
                    } else {
                        this.ruleForm4.promotionPrice = data.data.commodityPricePromotion
                    }
                    this.ruleForm4.startTime = data.data.startTime
                    this.ruleForm4.endTime = data.data.endTime
                    
                    if (this.detailsType == 1) {
                        this.getRooms(data.data.romm.id, businessid, data.data.romm.roomName);
                        this.ruleForm1.price = (data.data.commodityPrice).toString()
                        this.ruleForm1.stock = data.data.stock
                        this.ruleForm1.details = data.data.description
                    } else if (this.detailsType == 4) {
                        this.ruleForm4.promotion = data.data.isPromotion.toString()
                        this.ruleForm4.finalType = data.data.type
                        this.ruleForm4.stock = data.data.stock
                        if (data.data.isBargaining == 2) {
                            this.ruleForm4.bargain = '2';
                            this.ruleForm4.price = data.data.commodityPrice
                        } else {
                            this.ruleForm4.bargain = '1';
                            if (data.data.startingPrice == 0) {
                                this.ruleForm4.negotiable = '1'
                            } else {
                                this.ruleForm4.negotiable = '2'
                                this.ruleForm4.startPrice = data.data.startingPrice
                            }
                        }
                    } else if (this.detailsType == 3) {
                        this.ruleForm2.price = data.data.commodityPrice
                        this.ruleForm2.personNum = data.data.populationRestriction
                        this.ruleForm2.datavalue1 = data.data.registrationStartTime
                        this.ruleForm2.datavalue2 = data.data.registrationEndTime
                    } else if (this.detailsType == 2) {
                        this.ruleForm3.bargaining = data.data.isBargaining
                        this.ruleForm3.region = data.data.isTerritoryRestriction
                        this.ruleForm3.stock = data.data.stock
                        this.ruleForm3.price = data.data.startingPrice
                        this.ruleForm3.nowPrice = data.data.commodityPrice
                        this.ruleForm3.promotion = data.data.isPromotion.toString()
                        if (data.data.commodityPricePromotion == null) {
                            this.ruleForm3.promotionPrice == null;
                        } else {
                            this.ruleForm3.promotionPrice = data.data.commodityPricePromotion.toString()
                        }
                        this.ruleForm3.startTime = data.data.startTime
                        this.ruleForm3.endTime = data.data.endTime
                        var range = data.data.serviceRange
                        var serverAreas = [];

                        for (var i = 0; i < range.length; i++) {
                            var area = {
                                options1: [],
                                value1: '',
                                id: null,
                                options2: [],
                                value2: '',
                                options3: [],
                                value3: '',
                                price: '',
                                bargain: '2',
                                promotionPrice: null,
                                startTime: null,
                                endTime: null
                            }
                            area.id = range[i].id;
                            if (range[i].province == null) {
                                area.value1 = null;
                            } else {
                                area.value1 = range[i].province.id
                            }
                            if (range[i].city == null) {
                                area.value2 = null
                            } else {
                                area.value2 = range[i].city.id
                            }
                            if (range[i].area == null) {
                                area.value3 = null
                            } else {
                                area.value3 = range[i].area.id
                            }
                            if (range[i].commodityPrice == null) {
                                area.price = null
                            } else {
                                area.price = range[i].commodityPrice
                            }
                            if (range[i].isPromotion == null) {
                                area.bargain = null
                            } else {
                                area.bargain = range[i].isPromotion.toString()
                            }
                            if (range[i].commodityPricePromotion == null) {
                                area.promotionPrice = null
                            } else {
                                area.promotionPrice = range[i].commodityPricePromotion
                            }
                            if (range[i].startTime == null) {
                                range[i].startTime = null
                            } else {
                                area.startTime = range[i].startTime
                            }

                            if (range[i].endTime == null) {
                                area.endTime = null
                            } else {
                                area.endTime = range[i].endTime
                            }

                            serverAreas.push(area)
                        }
                        if (serverAreas.length > 0) {
                            this.ruleForm3.serviceAreas = serverAreas
                        } else if (serverAreas.length == 0) {
                            this.ruleForm3.serviceAreas.concat(serverAreas)
                        }
                        if (this.ruleForm3.region == '1') {
                            this.zhi = 1;
                        }

                    }
                    this.loading = false;
                } else {
                    this.loading = false;
                    this.$message.warning(data.msg);
                }
            }).catch(function(error) {
                
            });

        },
        //获取空间列表
        getRooms(value, businessid, roomName) {
            var that = this;
            var rooms = {
                businessId: that.businessid,
                roomState: 2
            }
            //加载空间列表
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/room/selectRoomListStauts`, {}, {
                params: rooms
            }).then(({ data }) => {
                if (data.status === 200) {
                    that.ruleForm1.roomOptions = data.data;
                    if (data.data.length == 0) {
                        that.ruleForm1.roomId = roomName + "";
                    } else {
                        that.ruleForm1.roomId = value;
                    }
                } else {
                    that.$message.error(data.msg);
                }
            }).catch(function(err) {

            });
        },
        //省列表
        getProvinceList(index, type) {
            var that = this;
            this.$htAjax.post(`${this.$config.back}/selectOprtorProvice`)
                .then(({ data }) => {
                    if (data.status === 200) {
                        that.ruleForm3.serviceAreas[index].options1 = data.data;
                    } else {
                        that.$message.error(data.msg);
                    }
                }).catch(function(err) {

                });

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
                this.$message.warning('上传图片大小不能超过 200KB!');
            }
            return isJPG && isLt2M;
        },
        beforeAvatarUpload2(file) {
            const isImg = file.type;
            var isJPG = false;
            if (isImg != 'image/jpeg' && isImg != 'image/png' && isImg != 'image/bmp' && isImg != 'image/gif') {
                this.$message.warning('上传头像图片只能是 JPG/PNG/BMP/GIF 格式!');
                isJPG = false;
            } else {
                isJPG = true;
            }
            const isLt2M = file.size / 80 / 80 < 0.2;

            if (!isLt2M) {
                this.$message.warning('上传图片大小不能超过 200KB!');
            }
            return isJPG && isLt2M;
        },
        // 删除
        removeServiceArea(item) {
            this.index--;
            var index = this.ruleForm3.serviceAreas.indexOf(item)
            if (this.ruleForm3.serviceAreas[index].id == undefined || this.ruleForm3.serviceAreas[index].id == null || this.ruleForm3.serviceAreas[index].id == "") {
                if (index !== -1) {
                    this.ruleForm3.serviceAreas.splice(index, 1)
                }
            } else {
                var reg = {
                    id: this.ruleForm3.serviceAreas[index].id
                }
                var that = this;
                this.$htAjax.post(`${this.$config.back}/deleteServiceRange`, {}, {
                    params: reg
                }).then(({ data }) => {
                    if (data.status === 200) {
                        if (index !== -1) {
                            that.ruleForm3.serviceAreas.splice(index, 1)
                        }
                    } else {
                        that.$message.error(data.msg);
                    }
                }).catch(function(err) {

                });
            }

        },
        // 添加
        addServiceArea() {
            var len = this.ruleForm3.serviceAreas.length - 1
            this.index = len
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
            this.index = this.ruleForm3.serviceAreas.length - 1
            this.index++;
            var jsons = {
                options1: [],
                value1: '',
                options2: [],
                value2: '',
                options3: [],
                value3: '',
                price: '',
                bargain: '2',
                promotionPrice: '',
                startTime: '',
                endTime: ''
            };
            this.ruleForm3.serviceAreas.push(jsons);
            this.getProvinceList(this.index, 1);
        },
        // 、提交验证
        submitForm1() {
            this.$refs.ruleForm1.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    var reg = {
                        isBargaining: '2',
                        isTerritoryRestriction: '2',
                        commodityCode: this.commodityCode,
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
                        salesVolume: this.ruleForm1.salesVolume,
                        type: this.detailsType,
                        evaluateValue: this.ruleForm1.evaluateValue,
                        romm: {
                            id: this.ruleForm1.roomId
                        },
                        measurementUnit: {
                            id: this.ruleForm1.company
                        },
                        serviceType: {
                            id: this.serverLastId
                        },
                        providerBusiness: {
                            id: this.businessid
                        },
                        id: this.ruleForm1.id
                    }
                    if ((reg.commodity_bigimage == null || reg.commodity_bigimage == '') || (reg.commodity_smallimage == null || reg.commodity_smallimage == '')) {
                        this.$message.warning('请上传商品logo图、商品主图');
                        this.submitLoading = false;
                        return false;
                    }
                    if ((reg.introduce == '') || (reg.commodityCase == '') || (reg.description == '')) {
                        this.$message.warning('请仔细填写页面信息');
                        this.submitLoading = false;
                        return false;
                    }
                    var that = this;
                    this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/updateProvideCommodity`, reg)
                        .then(({ data }) => {
                            that.submitLoading = false;
                            if (data.status == 200) {
                                that.submitLoading = false;

                                that.$store.state.stateId2 = that.$store.state.stateId

                                that.$router.push('/manage');
                            } else if (data.status === 300) {
                                that.$message({
                                    type: 'warning',
                                    message: '所上架商品不在服务范围内!'
                                });
                            } else if (data.status === 250) {
                                that.$message({
                                    type: 'error',
                                    message: '发布失败!'
                                });
                                return;
                            } else if (data.status === 350) {
                                that.$message({
                                    type: 'warning',
                                    message: '所属空间不存在或已下架!'
                                });
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
        submitForm2() {
            this.ruleForm2.datavalue1 = moment(this.ruleForm2.datavalue1).toDate();
            this.ruleForm2.datavalue2 = moment(this.ruleForm2.datavalue2).toDate();
            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    this.submitLoading = true;
                    var reg = {
                        isBargaining: '2',
                        isTerritoryRestriction: '2',
                        isBargaining: '2',
                        commodityCode: this.commodityCode,
                        commodityName: this.ruleForm2.name,
                        invoiceMail: this.ruleForm2.mail,
                        commodityPrice: this.ruleForm2.price,
                        registrationStartTime: this.ruleForm2.datavalue1,
                        registrationEndTime: this.ruleForm2.datavalue2,
                        populationRestriction: this.ruleForm2.personNum,
                        commodity_bigimage: this.ruleForm2.upImgUrl,
                        commodity_smallimage: this.ruleForm2.upImgUrl1,
                        description: this.ruleForm2.describe,
                        commodityCase: this.ruleForm2.case,
                        promise: this.ruleForm2.promise,
                        process: this.ruleForm2.process,
                        introduce: this.ruleForm2.introduce,
                        commodityState: 1,
                        finalPrice: this.ruleForm2.price,
                        synopsis: this.ruleForm2.brief,
                        type: this.detailsType,
                        salesVolume: this.ruleForm2.salesVolume,
                        evaluateValue: this.ruleForm2.evaluateValue,
                        measurementUnit: {
                            id: this.ruleForm2.company
                        },
                        serviceType: {
                            id: this.serverLastId
                        },
                        providerBusiness: {
                            id: this.businessid
                        },
                        id: this.ruleForm2.id
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
                    }
                    var that = this;
                    this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/updateProvideCommodity`, reg)
                        .then(({ data }) => {
                            that.submitLoading = false;
                            if (data.status === 200) {
                                that.submitLoading = false;

                                that.$store.state.stateId2 = that.$store.state.stateId

                                that.$router.push('/manage');
                            } else if (data.status === 300) {
                                that.$message({
                                    type: 'warning',
                                    message: '所上架商品不在服务范围内!'
                                });
                            } else if (data.status === 250) {
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
        submitForm3() {

            this.ruleForm3.startTime = moment(this.ruleForm3.startTime).toDate();
            this.ruleForm3.endTime = moment(this.ruleForm3.endTime).toDate();
            this.$refs.ruleForm3.validate((valid) => {
                var serviceRange = [];
                var length = this.ruleForm3.serviceAreas.length
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
                        isPromotion: '2',
                        commodityPrice: null,
                        commodityPricePromotion: null,
                        startTime: null,
                        endTime: null,
                        id: null
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
                    if (this.ruleForm3.serviceAreas[i].bargain == null || this.ruleForm3.serviceAreas[i].bargain == '') {
                        service.isPromotion = '2'
                    } else {
                        service.isPromotion = this.ruleForm3.serviceAreas[i].bargain
                    }
                    if (this.ruleForm3.serviceAreas[i].price == null || this.ruleForm3.serviceAreas[i].price == '') {
                        this.ruleForm3.serviceAreas[i].price = null
                    } else {
                        service.commodityPrice = this.ruleForm3.serviceAreas[i].price
                    }
                    if (this.ruleForm3.serviceAreas[i].promotionPrice == null || this.ruleForm3.serviceAreas[i].promotionPrice == '') {
                        service.commodityPricePromotion = null
                    } else {
                        service.commodityPricePromotion = this.ruleForm3.serviceAreas[i].promotionPrice
                    }
                    if (this.ruleForm3.serviceAreas[i].startTime == null || this.ruleForm3.serviceAreas[i].startTime == '') {
                        service.startTime = null
                    } else {
                        service.startTime = this.ruleForm3.serviceAreas[i].startTime
                    }
                    if (this.ruleForm3.serviceAreas[i].endTime == null || this.ruleForm3.serviceAreas[i].endTime == ' ') {
                        service.endTime = null
                    } else {
                        service.endTime = this.ruleForm3.serviceAreas[i].endTime
                    }
                    service.id = this.ruleForm3.serviceAreas[i].id;
                    serviceRange.push(service);
                }
                var price = 0.0;
                if (this.ruleForm3.bargaining == '1' && this.ruleForm3.region == '1') {
                    price = this.ruleForm3.price;
                } else if (this.ruleForm3.bargaining == '2' && this.ruleForm3.region == '1') {
                    price = this.ruleForm3.serviceAreas[0].price;
                } else if (this.ruleForm3.bargaining == '2' && this.ruleForm3.region == '2') {
                    price = this.ruleForm3.nowPrice;
                } else if (this.ruleForm3.bargaining == '1' && this.ruleForm3.region == '2') {
                    price = this.ruleForm3.price;
                }
                if (valid) {
                    this.submitLoading = true;
                    var reg = {
                        commodityCode: this.commodityCode,
                        commodityName: this.ruleForm3.name,
                        isBargaining: this.ruleForm3.bargaining,
                        startingPrice: this.ruleForm3.price,
                        invoiceMail: this.ruleForm3.mail,
                        isTerritoryRestriction: this.ruleForm3.region,
                        isPromotion: this.ruleForm3.promotion,
                        commodityPrice: this.ruleForm3.nowPrice,
                        commodityPricePromotion: this.ruleForm3.promotionPrice,
                        startTime: this.ruleForm3.startTime,
                        endTime: this.ruleForm3.endTime,
                        salesVolume: this.ruleForm3.salesVolume,
                        finalPrice: price,
                        commodity_bigimage: this.ruleForm3.upImgUrl,
                        commodity_smallimage: this.ruleForm3.upImgUrl1,
                        description: this.ruleForm3.describe,
                        commodityCase: this.ruleForm3.case,
                        promise: this.ruleForm3.promise,
                        process: this.ruleForm3.process,
                        introduce: this.ruleForm3.introduce,
                        evaluateValue: this.ruleForm3.evaluateValue,
                        commodityState: 1,
                        stock: this.ruleForm3.stock,
                        synopsis: this.ruleForm3.brief,
                        type: this.detailsType,
                        measurementUnit: {
                            id: this.ruleForm3.company
                        },
                        serviceType: {
                            id: this.serverLastId
                        },
                        serviceRange: serviceRange,
                        providerBusiness: {
                            id: this.businessid
                        },
                        id: this.ruleForm3.id
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
                                            if ((element.commodityPricePromotion != '') && (element.startTime != undefined) && (element.endTime != undefined)) {
                                                if (!regE.test(element.commodityPricePromotion)) {
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
                        var that = this;
                        this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/updateProvideCommodity`, reg)
                            .then(({ data }) => {
                                if (data.status === 200) {
                                    that.submitLoading = false;

                                    that.$store.state.stateId2 = that.$store.state.stateId
                                    that.$router.push('/manage');
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
        submitForm4() {
            this.ruleForm4.startTime = moment(this.ruleForm4.startTime).toDate();
            this.ruleForm4.endTime = moment(this.ruleForm4.endTime).toDate();
            this.$refs.ruleForm4.validate((valid) => {
                var comType = '';
                var comPrice = '';
                var finalPrice = '';
                var commodityPricePromotion = '';
                var startTime = '';
                var endTime = '';
                if (this.ruleForm4.finalClass == null || this.ruleForm4.finalClass == '' || this.ruleForm4.finalClass == undefined) {
                    comType = this.ruleForm4.finalType
                } else {
                    var comTypeIndex = this.ruleForm4.finalClass.indexOf('需求')
                    if (comTypeIndex > 0) {
                        comType = 4
                    } else {
                        comType = 5
                    }
                }
                if (this.ruleForm4.negotiable == 1) {
                    comPrice = 0

                } else {
                    comPrice = this.ruleForm4.startPrice
                }
                if (this.ruleForm4.bargain == 1) {
                    this.ruleForm4.price = 0;
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
                        commodityCode: this.commodityCode,
                        commodityName: this.ruleForm4.name,
                        invoiceMail: this.ruleForm4.mail,
                        startingPrice: comPrice,
                        commodityPrice: this.ruleForm4.price,
                        commodity_smallimage: this.ruleForm4.upImgUrl,
                        isBargaining: this.ruleForm4.bargain,
                        commodityState: 1,
                        finalPrice: finalPrice,
                        synopsis: this.ruleForm4.brief,
                        introduce: this.ruleForm4.introduce,
                        isTerritoryRestriction: 2,
                        stock: this.ruleForm4.stock,
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
                        },
                        id: this.ruleForm4.id
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
                    this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/commodity/updateProvideCommodity`, reg)
                        .then(({ data }) => {
                            that.submitLoading = false;
                            if (data.status === 200) {
                                that.submitLoading = false;

                                that.$store.state.stateId2 = that.$store.state.stateId

                                that.$router.push('/manage');
                            } else if (data.status === 300) {
                                that.$message({
                                    type: 'warning',
                                    message: '所发布服务不在服务范围内!'
                                });
                            } else if (data.status === 250) {
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
            if (nowTime-new Date(this.ruleForm4.startTime).getTime()>1000) {
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
                    if (type == 2) {
                        that.ruleForm3.serviceAreas[index].value2 = '';
                        that.ruleForm3.serviceAreas[index].value3 = '';
                    }

                    that.ruleForm3.serviceAreas[index].options2 = data.data;
                    that.ruleForm3.serviceAreas[index].options3 = [];

                } else {
                    that.$message.error(data.msg);
                }
            }).catch(function(err) {

            });

        },

        //市变化
        cityChange(item, index, type) {
            if (item == "") {
                return false;
            }
            var reg = {
                id: item
            }
            var that = this;
            this.$htAjax.post(`${this.$config.back}/selAreaList2`, {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status === 200) {
                    if (type == 2) {
                        that.ruleForm3.serviceAreas[index].value3 = '';
                    }
                    var arr = [{ citycode: '', code: '', id: '', name: '无' }]
                    data.data.forEach(function(o) {
                        arr.push(o)
                    })
                    that.ruleForm3.serviceAreas[index].options3 = arr;
                } else {
                    that.$message.error(data.msg);
                }
            }).catch(function(err) {

                that.$message.error('请求错误');
            });

        },
        // 四级分类事件
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
            // this.commodityTypeId = this.oneDirectory[index].id
            this.serverType = this.oneDirectory[index].serverType
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
        // 编辑确认
        confirm() {
            if (this.serverType == 1) {
                this.getRooms('', this.businessid, '');
                this.detailsType = '1';
            } else if (this.serverType == 3) {
                this.detailsType = '3';
            } else if (this.serverType == 2) {
                this.detailsType = '2';
            } else {

                this.detailsType = '4';
                this.ruleForm4.finalClass = this.commodityType2;
                // that.ruleForm4.finalType=data.data.type
            }
            if (this.commodityType4 != "") {
                this.ruleForm1.comClass = this.commodityType4
                this.ruleForm2.comClass = this.commodityType4
                this.ruleForm3.comClass = this.commodityType4
                this.ruleForm4.comClass = this.commodityType4
            } else if (this.commodityType3 != "") {
                this.ruleForm1.comClass = this.commodityType3
                this.ruleForm2.comClass = this.commodityType3
                this.ruleForm3.comClass = this.commodityType3
                this.ruleForm4.comClass = this.commodityType3
            } else {
                this.ruleForm1.comClass = this.commodityType2
                this.ruleForm2.comClass = this.commodityType2
                this.ruleForm3.comClass = this.commodityType2
                this.ruleForm4.comClass = this.commodityType2
            }

            this.dialogVisible = false;
        },
        // 取消事件
        cancel() {

            this.$store.state.stateId2 = this.$store.state.stateId

            this.$router.push('/manage');
        },
        // 编辑弹窗
        edit() {
            this.dialogVisible = true;
        },

        clearServiceRange() {
            this.index = 0;
            this.ruleForm3.serviceAreas = [
                {
                    options1: [],
                    value1: '',
                    options2: [],
                    value2: '',
                    options3: [],
                    value3: '',
                    price: '',
                    bargain: '2',
                    promotionPrice: '',
                    startTime: null,
                    endTime: null

                }
            ];
            this.getProvinceList(this.index);
        }
    },
    computed: {
        editor() {
            return this.$refs.myTextEditor.quillEditor;
        }
    },
    watch: {
        'zhi': function(newVal, oldVal) {
            if (newVal != oldVal) {
                var that = this;
                this.$htAjax.post(`${this.$config.back}/selectOprtorProvice`)
                    .then(({ data }) => {
                        if (data.status === 200) {
                            var len = that.ruleForm3.serviceAreas.length;
                            if (len > 0) {
                                for (var i = 0; i < len; i++) {
                                    that.ruleForm3.serviceAreas[i].options1 = data.data;
                                    that.provinceChange(that.ruleForm3.serviceAreas[i].value1, i, 1)
                                    if (that.ruleForm3.serviceAreas[i].value2 != null) {
                                        that.cityChange(that.ruleForm3.serviceAreas[i].value2, i, 1)
                                    }
                                }
                            }

                        } else {
                            that.$message.error(data.msg);
                        }
                    }).catch(function(err) {

                    });
            }
        }

    }
}

</script>
<style scoped>
.quillcon {
    height: 280px!important;
}

.con {
    height: 250px;
}

.tab {
    width: 100%;
    margin-top: 15px;
}

.tab_title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    line-height: 30px;
}

.tab span {
    font-size: 12px;
    color: red;
}







/*弹窗样式*/

.out_box {
    width: 100%;
    height: 300px;
    overflow: out;
}

.inner {
    width: 25%;
    float: left;
}

.inner ul {
    height: 300px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: auto;
}

.inner ul li {
    height: 29px;
    font-size: 14px;
    line-height: 29px;
    overflow: hidden;
    border-bottom: 1px solid #ccc;
    margin: 0 5px;
    text-align: center;
    cursor: pointer;
}

.inner ul li:hover {
    color: #C7000A;
}

.inner ul li.active {
    color: #C7000A;
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
.comImg {
    width: 320px!important;
}

.comEdit .avatar-uploader .el-upload {
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.comEdit .avatar-uploader.comImg .el-upload {
    width: 320px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.comEdit .avatar-uploader .el-upload:hover {
    border-color: #c7000a;
}

.comEdit .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
</style>



