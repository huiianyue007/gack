<template>
    <div class="information" v-loading="loadingInformation">
        <my-header></my-header>
        <div class="page_top">
            <div class="pt_box">
                <div class="pb_left" @click="homeUrl">
                    <img src="../../assets/information/logo2.png" />
                    <span>国安创客</span>
                </div>
                <div class="pb_center">商家中心</div>
            </div>
        </div>
        <div class="page_box">
            <div class="pb_top">
                <el-steps :space="800" :active="active" align-center center>
                    <el-step title="完善信息"></el-step>
                    <el-step title="实名认证"></el-step>
                </el-steps>
            </div>
            <!--1-1-->
            <div class="pb_tits" style="background:#f5f5f5;" v-if="type === '0'">
                <el-form :model="stepOne" :rules="stepOneRules" ref="stepOne" label-width="100px" class="demo-ruleForm">
                    <div class="ps_box">
                        <div class="pb_title">基本信息</div>
                        <div class="pb_box" style="background:#fff;">

                            <el-form-item label="公司名称" prop="name">
                                <el-input v-model="stepOne.name" :maxlength="50" placeholder="请填写公司名称" style="width:220px"></el-input>
                            </el-form-item>
                            <el-form-item label="您的身份" prop="identity">
                                <el-select v-model="stepOne.identity" style="width:220px">
                                    <el-option v-for="(item,index) in dics" :key="index" :label="item.dictName" :value="item.id"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="企业Logo" required>
                                <el-upload class="avatar-uploader" name="companyLogo" action="https://apitest.gack.citic:8082/putImg" :show-file-list="false" :multiple="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                                    <img v-if="stepOne.imageUrl" :src="stepOne.imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="认证手机" prop="phone">
                                <el-input v-model="stepOne.phone" :maxlength="11" placeholder="请填写认证手机" style="width:220px"></el-input>
                            </el-form-item>
                            <el-form-item label="所在地" style="width:800px" required>
                                <el-col :span="5">
                                    <el-form-item prop="province">
                                        <el-select v-model="stepOne.province" style="width:100%" @change='provinceChange' placeholder="请选省份">
                                            <el-option v-for="(item,index) in provinces" :key='index' :label="item.name" :value="item.code"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="1">
                                    &nbsp;
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item prop="city">
                                        <el-select v-model="stepOne.city" style="width:100%" @change='cityChange' placeholder="请选市">
                                            <el-option v-for="(item,index) in citys" :key='index' :label="item.name" :value="item.code"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="1">
                                    &nbsp;
                                </el-col>
                                <el-col :span="5">
                                    <el-form-item prop="county">
                                        <el-select v-model="stepOne.county" style="width:100%" placeholder="请选县">
                                            <el-option v-for="(item,index) in areas" :key='index' :label="item.name" :value="item.code"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="详细地址" prop="detailed">
                                <el-input type="textarea" style="width:495px" :maxlength="50" v-model="stepOne.detailed"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="ps_box" style="margin-top:40px;margin-bottom:40px">
                        <div class="pb_title">服务范围</div>
                        <div class="pt_catBos">
                            <ul class="pt_list">
                                <li>
                                    <div class="list_sell">
                                        <div class="sell_ul">
                                            <div class="sell_li" v-for="(emit,index) in classification1" :class="{'active':classItem1[index]}" @click="fication1(emit,index)">{{emit.serverName}}</div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="list_sell">
                                        <div class="sell_ul">
                                            <div class="sell_li" v-for="(emit,index) in ification2" :class="{'active':classItem2[index]}" @click="fication2(emit,index)">{{emit.serverName}}</div>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div class="list_sell list_box">
                                        <div class="sell_selected">
                                            <div class="sell_ul">
                                                <div class="select_top">
                                                    你已选择类目：
                                                </div>
                                                <ul class="set_list">
                                                    <li v-for="(emit,index) in chosen">{{emit}}
                                                        <b @click='delChosen(index)'></b>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="next_btn">
                        <el-button type="primary" style="width:180px;" @click="submitStepOne">下一步</el-button>
                    </div>

                </el-form>
            </div>
            <!--2-1-->
            <div class="pb_tits" v-if="type === '1'" style="padding-bottom:0">
                <div class="crumbs">
                    <ul>
                        <li class="active">
                            填写公司信息
                        </li>
                        <li>
                            填写法人信息
                        </li>
                        <li>
                            提交审核
                        </li>
                    </ul>
                </div>
                <div class="company_box">
                    <div class="company_top" style="padding-left:65px">企业实名认证</div>
                    <div class="company_tit">
                        <p>这是一项识别身份的服务，请注意以下几点：</p>
                        <ul>
                            <li>请确保您是具有法人资格的商户，您需要可证明您依法设立、依法经营，开展社会活动的执照，证件等（如营业执照副本）</li>
                            <li>证件有效期在3个月内的商户，请找工商部门更新资料后再行提交</li>
                            <li>上传证书为三证合一</li>
                        </ul>
                    </div>
                    <div class="company_inp">
                        <el-form :model="company" :rules="companyRules" ref="company" label-width="200px" class="demo-ruleForm">
                            <el-form-item label="企业名称：" prop="name">
                                <el-input v-model="company.name" :maxlength="50" placeholder="请填写企业名称" style="width:260px"></el-input>
                            </el-form-item>
                            <el-form-item label="营业执照注册号：" required prop="regnum">
                                <el-input v-model="company.regnum" :maxlength="20" placeholder="请填写营业执照注册号" style="width:260px"></el-input>
                            </el-form-item>
                            <el-form-item label="营业年限：" required>
                                <el-radio-group v-model="company.resource" @change='resources'>
                                    <el-radio label="1">定时</el-radio>
                                    <el-radio label="0">长期</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="定时：" v-if="company.istime" prop="time">
                                <el-date-picker v-model="company.time" :editable='false' type="date" placeholder="选择日期时间" style="width:260px" :picker-options="pickerOptions">
                                </el-date-picker>
                            </el-form-item>
                            <!--<el-form-item label="组织机构代码证：" prop="cert">
                                                                                                                    <el-input v-model="company.cert" placeholder="请填写组织机构代码证" style="width:260px"></el-input>
                                                                                                                </el-form-item>
                                                                                                                <el-form-item label="组织机构代码证扫描件:" required>
                                                                                                                    <el-upload class="avatar-uploader" name="companyLogo" action="https://apitest.gack.citic:8082/putImg" :show-file-list="false" :multiple="false" :before-upload="beforeCompanyUpload" :on-success="handlePreview">
                                                                                                                        <img v-if="company.imageUrl" :src="company.imageUrl" class="avatar">
                                                                                                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                                                                                                        <div slot="tip" class="el-upload__tip" style="line-height:20px;width:500px">
                                                                                                                            <div style="color:#666">证件要求：</div>必须为清晰完整的彩色原件扫描件或数码照，仅支持jpg、bmp、png、gif的图片格式，图片大小不超过200KB。必须在有效期内且年检章齐全（当年成立的公司可无年检章）必须为中国大陆工商局颁发。</div>
                                                                                                                    </el-upload>
                                                                                                                </el-form-item> -->
                            <el-form-item label="营业执照副本扫描件：" required style="margin-bottom:60px">
                                <el-upload class="avatar-uploader" name="companyLogo" action="https://apitest.gack.citic:8082/putImg" :show-file-list="false" :multiple="false" :before-upload="beforeCompanyUpload1" :on-success="handlePreview1">
                                    <img v-if="company.imageUrlRes" :src="company.imageUrlRes" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    <div slot="tip" class="el-upload__tip" style="line-height:20px;width:500px">
                                        <div style="color:#666">证件要求：</div> 请上传由中国大陆工商局颁发的，在有效期内且年检章齐全（当年成立的公司可无年检章）的证件图片。请提供清晰、完整的彩色原件扫描件或数码照，仅支持 jpg、bmp、png、gif的图片格式，图片大小不能超过200KB。</div>
                                </el-upload>
                            </el-form-item>
                            <el-form-item style="padding:40px 0;background:#f5f5f5;margin:0;">
                                <el-button type="primary" style="margin-left:135px;width:180px;background:#ccc;border:1px solid #ccc;color:#666" @click="errorCompany">上一步</el-button>
                                <el-button type="primary" style="width:180px" @click="submitCompany">下一步</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <!--2-2-->
            <div class="pb_tits" v-if="type === '2'">
                <div class="crumbs">
                    <ul>
                        <li>
                            填写公司信息
                        </li>
                        <li class="active">
                            填写法人信息
                        </li>
                        <li>
                            提交审核
                        </li>
                    </ul>
                </div>
                <div class="company_box">
                    <div class="company_top" style="padding-left:65px">联系人信息</div>
                </div>
                <div class="company_inp company_legalinp">
                    <el-form :model="legal" :rules="legalRules" ref="legal" label-width="208px" class="demo-ruleForm">
                        <el-form-item label="企业联系人真实名称：" prop="name">
                            <el-input v-model="legal.name" :maxlength="20" placeholder="请确保姓名与证件原件上的姓名一致" style="width:260px"></el-input>
                        </el-form-item>
                        <el-form-item label="证件类型：" required>
                            <el-select v-model="legal.cardType" style="width:260px" placeholder="请选择您的证件类型">
                                <el-option v-for="(item,index) in voucher" :key="index" :label="item.dictName" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="证件号码：" prop="cardnum" required>
                            <el-input v-model="legal.cardnum" :maxlength="20" placeholder="请填写营业执照注册号" style="width:260px"></el-input>
                        </el-form-item>
                        <el-form-item label="证件有效期：" required>
                            <el-radio-group v-model="legal.resource" @change='resourcesLegal'>
                                <el-radio label="1">定时</el-radio>
                                <el-radio label="0">长期</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="定时：" v-if="legal.istime" prop="time">
                            <el-date-picker v-model="legal.time" :editable='false' type="date" placeholder="选择日期时间" style="width:260px" :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="手持身份证正面照：" required>
                            <el-upload class="upload-demo" name="companyLogo" action="https://apitest.gack.citic:8082/putImg" :show-file-list="false" :multiple="false" :before-upload="beforeLegalUploadHold" :on-success="legalPreviewHold">
                                <img v-if="legal.legimageUrlHold" :src="legal.legimageUrlHold" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="证件正面照片：" required>
                            <el-upload class="upload-demo" name="companyLogo" action="https://apitest.gack.citic:8082/putImg" :show-file-list="false" :multiple="false" :before-upload="beforeLegalUpload" :on-success="legalPreview">
                                <img v-if="legal.legimageUrl0" :src="legal.legimageUrl0" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="证件背面照片：" required>
                            <el-upload class="upload-demo" name="companyLogo" action="https://apitest.gack.citic:8082/putImg" :show-file-list="false" :multiple="false" :before-upload="beforeLegalUpload1" :on-success="legalPreview1">
                                <img v-if="legal.legimageUrl1" :src="legal.legimageUrl1" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                <div slot="tip" class="el-upload__tip" style="line-height:20px;width:600px;margin-top:30px">
                                    <div style="color:#666">证件要求：</div>
                                    1.扫描件需包含证件正面与背面两面信息。
                                    <br> 2.必须为清晰彩色原件扫描件或数码照，仅支持jpg、bmp、png、gif的图片格式，图片大小不能超过200KB
                                    <br> 3.证件必须在有效期内。
                                    <br> 4.境外护照上传资料时，正面上传护照封面，背面上传个人信息页。
                                    <br>
                                </div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item style="padding:40px 0;background:#f5f5f5;margin:0;">
                            <el-button type="primary" style="background:#ccc;border:1px solid #ccc;color:#666;margin-left:120px;width:180px" @click="errorLegal">上一步</el-button>
                            <el-button type="primary" style="width:180px" @click="submitLegal">提交审核</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <!--3-1 提交审核-->
            <div class="pb_tits" v-if="type === '3'">
                <div class="crumbs">
                    <ul>
                        <li>
                            填写公司信息
                        </li>
                        <li>
                            填写法人信息
                        </li>
                        <li class="active">
                            提交审核
                        </li>
                    </ul>
                </div>
                <div class="success_box">
                    <div class="success_top">
                        <img src="../../assets/information/u233.png">
                        <div class="s_top_text">认证提交成功，审核会在1-3个工作日内完成</div>
                    </div>
                    <div class="success_center">
                        您可以通过以下方式查询您的认证结果：
                    </div>
                    <div class="success_centers">
                        人工查询电话：400-851-8585
                    </div>
                    <div class="success_bottom">
                        <b>{{successTime}}</b>s 后自动跳转
                        <span>服务端</span> 你也可以点击
                        <span @click="backHome">跳转服务端</span>进行跳转（正在跳转中。。。）
                    </div>
                </div>
            </div>
        </div>

        <!--国安创客企业服务平台服务协议-->
        <el-dialog title="国安创客企业服务平台" top="5%" @open='openDialog' v-model="agreementVisible" :close-on-click-modal="false">
            <div class="dialog-box">
                <div class="dialog-top">国安创客企业服务平台服务协议</div>
                <div class="dialog-list xieyi_cont" id="myData" @scroll="scrollDialog">
                    <div>
                        <b>第一条 服务条款的确认与接纳</b>
                        <p>（一）以下所述各条款和条件构成您与创客平台之间，就使用本创客平台服务所达成的协议。当您同意以下各条款并注册时，即表示您已同意受该条款约束，可以使用创客平台为您提供的各项服务如果您不同意接受全部的条款和条件，请勿注册，同时您将无权使用创客平台的服务。</p>
                        <p>（二）创客平台有权在必要时修改本服务条款和条件，并只需公示于其网站。修改后的条款即时生效。在创客平台修改服务条款后，您继续使用服务应被视作您已接受了修改后的条款。</p>
                        <p>（三）除非得到创客平台的书面授权，任何人将不得修改本条款。</p>
                        <p>（四）创客平台提供的网络服务的所有权和最终解释权归中信国安创客投资有限公司所有。本协议中，被许可使用创客平台服务的用户均简称为“用户”。</p>

                        <b>第二条 服务内容</b>
                        <p>（一）在用户同意遵守本协议条款前提下，用户有权在创客平台网站指定位置上发布符合中国各项法律法规及规范性文件以及创客平台网站服务条款要求的信息。</p>
                        <p>（二）创客平台运用自己的操作系统通过互联网络为用户顺利实现在创客平台网站的信息发布提供服务。</p>

                        <b>第三条 服务内容的保证与变更</b>
                        <p>创客平台无法监控经由本服务传送的内容，也无法对用户的使用行为进行全面控制，因此不保证内容的合法性、正确性、真实性等；用户使用本服务时，请自行加以判断并承担所有风险。创客平台有权在必要时修改服务内容，而无需征得用户的事先同意。</p>

                        <b>第四条 用户权利义务</b>
                        <p>（一）用户有权在创客平台网站指定位置上发布符合中国各项法律法规及规范性文件以及创客平台网站服务条款要求的信息，并依据本平台服务规则享受创客平台提供的各项服务。</p>
                        <p>（二）用户有义务保证其发布的信息符合法律、法规及创客平台网站的相关服务规则，并及时对已发布的信息进行维护和管理。</p>
                        <p>（三）考虑到创客平台产品服务的重要性，用户有义务保证其提供的所有信息（包括但不限于个人注册信息、 发布的项目信息等）真实、准确，无重大遗漏或误导。如因用户提供的信息不准确，不真实，不合法有效，创客平台保留结束用户使用创客平台各项服务的权利，同时用户应赔偿因此造成的各方的一切损失。</p>
                        <p>（四）除创客平台规定的条件外，用户因其在创客平台网站的信息发布行为而达成的交易，应当与交易对方约定具体交易条件并完成交易。同时，用户明确知道，自己应当对创客平台上发布的项目做出独立的投资判断，创客平台不对用户的投资判断承担任何责任。</p>

                        <b>第五条 创客平台权利义务</b>
                        <p>（一）创客平台应运用专业电子技术为用户发布信息提供技术服务。</p>
                        <p>（二）如用户有如下行为之一的，创客平台有权立即停止用户所发布的信息的技术支持，并保存有关记录， 必要时可依据法律法规向国家有关机关报告，并且删除含有该内容的地址、目录或关闭服务器。用户应承担全部法律责任，并赔偿创客平台由此受到的损失，包括合理的追索费用： 1、用户提供的产品有侵害任何第三方知识产权、财产权等合法权益，或可能对第三方造成不利影响或侵害； 2、用户利用创客平台提供之网络平台进行任何犯罪活动，或宣传散播法律法规禁止散播的信息，或一切损害创客平台利益的活动； 3、用户有违反本协议任何条款的行为，经创客平台警告后仍未更正的； 4、用户的行为干扰创客平台的服务。
                        </p>
                        <p>（三）用户同意创客平台有权依据本协议及本平台服务规则对用户的不合法、不合规行为采取行动，包括但不限于中断其帐号、删除地址、目录或关闭服务器等。</p>
                        <p>（四）创客平台或中信国安创客投资有限公司对本平台发布的信息真实性、及时性和有效性不做任何形式的担保， 对该等信息的理解和运用应当依赖于用户自身判断。</p>
                    </div>
                </div>
                <div class="dialog-top" style="margin-top:20px">国安创客企业服务平台服务商行为规范</div>
                <div class="dialog-list xieyi_cont" id="myData1" @scroll="scrollDialog1">
                    <div>
                        <b>第一条 服务条款的确认与接纳</b>
                        <p>（一）以下所述各条款和条件构成您与创客平台之间，就使用本创客平台服务所达成的协议。当您同意以下各条款并注册时，即表示您已同意受该条款约束，可以使用创客平台为您提供的各项服务如果您不同意接受全部的条款和条件，请勿注册，同时您将无权使用创客平台的服务。</p>
                        <p>（二）创客平台有权在必要时修改本服务条款和条件，并只需公示于其网站。修改后的条款即时生效。在创客平台修改服务条款后，您继续使用服务应被视作您已接受了修改后的条款。</p>
                        <p>（三）除非得到创客平台的书面授权，任何人将不得修改本条款。</p>
                        <p>（四）创客平台提供的网络服务的所有权和最终解释权归中信国安创客投资有限公司所有。本协议中，被许可使用创客平台服务的用户均简称为“用户”。</p>

                        <b>第二条 服务内容</b>
                        <p>（一）在用户同意遵守本协议条款前提下，用户有权在创客平台网站指定位置上发布符合中国各项法律法规及规范性文件以及创客平台网站服务条款要求的信息。</p>
                        <p>（二）创客平台运用自己的操作系统通过互联网络为用户顺利实现在创客平台网站的信息发布提供服务。</p>

                        <b>第三条 服务内容的保证与变更</b>
                        <p>创客平台无法监控经由本服务传送的内容，也无法对用户的使用行为进行全面控制，因此不保证内容的合法性、正确性、真实性等；用户使用本服务时，请自行加以判断并承担所有风险。创客平台有权在必要时修改服务内容，而无需征得用户的事先同意。</p>

                        <b>第四条 用户权利义务</b>
                        <p>（一）用户有权在创客平台网站指定位置上发布符合中国各项法律法规及规范性文件以及创客平台网站服务条款要求的信息，并依据本平台服务规则享受创客平台提供的各项服务。</p>
                        <p>（二）用户有义务保证其发布的信息符合法律、法规及创客平台网站的相关服务规则，并及时对已发布的信息进行维护和管理。</p>
                        <p>（三）考虑到创客平台产品服务的重要性，用户有义务保证其提供的所有信息（包括但不限于个人注册信息、 发布的项目信息等）真实、准确，无重大遗漏或误导。如因用户提供的信息不准确，不真实，不合法有效，创客平台保留结束用户使用创客平台各项服务的权利，同时用户应赔偿因此造成的各方的一切损失。</p>
                        <p>（四）除创客平台规定的条件外，用户因其在创客平台网站的信息发布行为而达成的交易，应当与交易对方约定具体交易条件并完成交易。同时，用户明确知道，自己应当对创客平台上发布的项目做出独立的投资判断，创客平台不对用户的投资判断承担任何责任。</p>

                        <b>第五条 创客平台权利义务</b>
                        <p>（一）创客平台应运用专业电子技术为用户发布信息提供技术服务。</p>
                        <p>（二）如用户有如下行为之一的，创客平台有权立即停止用户所发布的信息的技术支持，并保存有关记录， 必要时可依据法律法规向国家有关机关报告，并且删除含有该内容的地址、目录或关闭服务器。用户应承担全部法律责任，并赔偿创客平台由此受到的损失，包括合理的追索费用： 1、用户提供的产品有侵害任何第三方知识产权、财产权等合法权益，或可能对第三方造成不利影响或侵害； 2、用户利用创客平台提供之网络平台进行任何犯罪活动，或宣传散播法律法规禁止散播的信息，或一切损害创客平台利益的活动； 3、用户有违反本协议任何条款的行为，经创客平台警告后仍未更正的； 4、用户的行为干扰创客平台的服务。
                        </p>
                        <p>（三）用户同意创客平台有权依据本协议及本平台服务规则对用户的不合法、不合规行为采取行动，包括但不限于中断其帐号、删除地址、目录或关闭服务器等。</p>
                        <p>（四）创客平台或中信国安创客投资有限公司对本平台发布的信息真实性、及时性和有效性不做任何形式的担保， 对该等信息的理解和运用应当依赖于用户自身判断。</p>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="agreementVisible = false">取 消</el-button>
                <el-button type="primary" :disabled="!(isDiaLogin1 && isDiaLogin)" @click="agreementVisibleLogin">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import myHeader from 'components/header'
import moment from 'moment'

export default {
    name: 'information',
    data() {
        var validateCardnum = (rule, value, callback) => {
            let regExp = /^[0-9a-zA-Z]{15,18}$/g
            if (value === '') {
                callback(new Error('请输入证件号码'));
            } else if (regExp.test(value) === false) {
                callback(new Error('证件号码由15到18个字符英文或者数字组成'))
            } else {
                callback();
            }
        };
        var validateBankAccountNumber = (rule, value, callback) => {
            let regExp = /^[0-9a-zA-Z]{15,20}$/g
            if (value === '') {
                callback(new Error('请输入营业执照注册号'));
            } else if (regExp.test(value) === false) {
                callback(new Error('营业执照注册号为长度在15到20个字符英文或者数字'))
            } else {
                callback();
            }
        };
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            type: '0',
            active: 0,
            provinces: [],
            citys: [],
            areas: [],
            dics: [],
            voucher: [],
            stepOne: {
                name: '',
                identity: '',
                phone: '',
                province: '',
                city: '',
                county: '',
                detailed: '',
                imageUrl: '',
                logo: ''
            },
            stepOneRules: {
                name: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' }
                ],
                identity: [
                    { required: true, message: '请选择您的身份', trigger: 'change' }
                ],
                phone: [
                    { required: true, message: '请输入您的手机号', trigger: 'blur' },
                    { pattern: /^1[34578]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
                ],
                province: [
                    { required: true, message: '请选择省份', trigger: 'change' }
                ],
                city: [
                    { required: true, message: '请选择市', trigger: 'change' }
                ],
                county: [
                    { required: true, message: '请选择县', trigger: 'change' }
                ],
                detailed: [
                    { required: true, message: '请填写详细地址', trigger: 'change' },
                    // { pattern: /^[\w\u4e00-\u9fa5\-_][\s\w\u4e00-\u9fa5\-_]*[\w\u4e00-\u9fa5\-_]$/, message: '具体地址由中英文，数字组成', trigger: 'blur' }
                ]
            },
            //出售服务 搜索内容
            searchVal: '',
            classification1: [],
            classification2: [],
            //初始化
            ification2: [],
            //选中的数据
            chosenId: [],
            chosen: [],
            //切换状态
            classItem1: [true],
            classItem2: [],
            //2-1
            company: {
                name: '',
                regnum: '',
                resource: '1',
                istime: true,
                time: '',
                cert: '',
                imageUrl: '',
                imageUrlRes: '',
                orgurl: '',
                resurl: ''
            },
            companyRules: {
                name: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' },
                    // { pattern: /^[\w\u4e00-\u9fa5\-_][\s\w\u4e00-\u9fa5\-_]*[\w\u4e00-\u9fa5\-_]$/, message: '企业名称由中英文，数字组成', trigger: 'blur' }
                ],
                regnum: [
                    { validator: validateBankAccountNumber, trigger: 'blur' },
                ],
                time: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ]
                // ,
                // cert: [
                //     { required: true, message: '请输入组织机构代码证', trigger: 'blur' }
                // ]

            },
            //3-2
            legal: {
                name: '',
                cardType: '',
                cardnum: '',
                resource: '1',
                istime: true,
                time: '',
                legimageUrlHold: '',
                legimageUrl0: '',
                legimageUrl1: '',
                cpfronturlHold: '',
                cpfronturl: '',
                cpcontraryurl: ''
            },
            legalRules: {
                name: [
                    { required: true, message: '请输入企业联系人真实名称', trigger: 'blur' },
                    // { pattern: /^[\w\u4e00-\u9fa5\-_][\s\w\u4e00-\u9fa5\-_]*[\w\u4e00-\u9fa5\-_]$/, message: '联系人名称由中英文，数字组成', trigger: 'blur' }
                ],
                cardnum: [
                    { validator: validateCardnum, trigger: 'blur' },
                ],
                time: [
                    { type: 'date', required: true, message: '请输入选择时间', trigger: 'change' }
                ]
            },
            agreementVisible: false,
            //国安创客企业服务平台服务协议
            scrollTop: 0,
            isDiaLogin: false,
            //国安创客企业服务平台服务商行为规范
            scrollTop1: 0,
            isDiaLogin1: false,
            successTime: 4,
            loadingInformation: false,
            userid: '', //用户Id
            businessid: ''
        }
    },
    components: {
        myHeader
    },
    created: function() {
        var user = this.$store.state.userid;
        this.userid = user.id;

        this.init();
        //初始化

    },
    mounted: function() {
        var h = $(window).height();
        $('.information').css({ minHeight: h });
    },
    methods: {
        init() {
            var that = this;
            this.$htAjax.post('https://apitest.gack.citic:8082/selectInitialData')
                .then(({ data }) => {
                    if (data.status === 200) {
                        that.classification1 = data.data.pss;
                        that.classification2 = data.data.pssTwo;
                        that.ification2 = that.classification2.filter((o) => {
                            return o.parentServerId == data.data.pss[0].id;
                        })
                        that.dics = data.data.pds;
                        that.list();
                    } else {
                        that.$message.error(data.msg);
                    }
                }).catch(function(err) {

                });
            //省列表
            this.$htAjax.post('https://apitest.gack.citic:8082/selProvinceList')
                .then(({ data }) => {
                    if (data.status === 200) {
                        that.provinces = data.data;
                    } else {
                        that.$message.error(data.msg);
                    }
                }).catch(function(err) {

                });
        },
        list() {
            var item = {
                userid: this.userid
            }
            this.$htAjax.post('https://apitest.gack.citic:8082/selectBusByUserid', {}, {
                params: item
            }).then(({ data }) => {
                if (data.status == 200) {
                    if (data.data) {
                        this.businessid = data.data.id || '';
                        this.stepOne.name = data.data.businessName || '';
                        if (data.data.identityType) {
                            this.stepOne.identity = data.data.identityType.toString();
                        }
                        this.stepOne.phone = data.data.licensPhone || '';
                        this.stepOne.imageUrl = data.data.companyLogo || '';
                        this.stepOne.logo = data.data.companyLogo || '';
                        this.stepOne.province = data.data.companyProvince || '';
                        this.stepOne.city = data.data.companyCity || '';
                        this.stepOne.county = data.data.companyArea || '';
                        this.stepOne.detailed = data.data.companyAdress || '';
                        //选中的数据
                        let arr = [];
                        let arrId = [];
                        if (data.data.serverClasss) {
                            data.data.serverClasss.forEach(function(element) {
                                arr.push(element.serverName)
                                arrId.push(element.id)
                            });
                        }
                        this.chosen = arr;
                        this.chosenId = arrId;
                        this.company.name = data.data.companyName || '';
                        this.company.regnum = data.data.companyResgiserMark || '';
                        this.company.resource = data.data.busAgelimit || '';
                        if (data.data.busAgelimit == '1') {
                            this.company.istime = true;
                        } else {
                            this.company.istime = false;
                        }
                        this.company.time = data.data.busAgelimitDate;
                        this.company.cert = data.data.orgCodeCard || '';
                        this.company.orgurl = data.data.orgCodeCardPicture || '';
                        this.company.resurl = data.data.companyLicenseReplica || '';
                        this.company.imageUrlRes = data.data.companyLicenseReplica || '';
                        this.legal.name = data.data.companyCorporationName || '';
                        if (data.data.voucherType) {
                            this.legal.cardType = data.data.voucherType.toString();
                        }
                        this.legal.cardnum = data.data.companyCorporationIDCardNo || '';
                        this.legal.resource = data.data.voucherEffectiveType || '';
                        if (data.data.voucherEffectiveType == '1') {
                            this.legal.istime = true;
                        } else {
                            this.legal.istime = false;
                        }
                        if (data.data.voucherEffectiveDate) {
                            this.legal.time = moment(data.data.voucherEffectiveDate).format("YYYY-MM-DD") || '';
                        }
                        this.legal.cpfronturl = data.data.companyCorporationIDCardNoFront || '';
                        this.legal.legimageUrl0 = data.data.companyCorporationIDCardNoFront || '';
                        this.legal.cpcontraryurl = data.data.companyCorporationIDCardNoContrary || '';
                        this.legal.legimageUrl1 = data.data.companyCorporationIDCardNoContrary || '';
                        this.legal.cpfronturlHold = data.data.companyOtherReplica || '';
                        this.legal.legimageUrlHold = data.data.companyOtherReplica || '';
                    }
                }
            }).catch((err) => {
            });
        },
        //退出
        SignOut() {
            this.$confirm('确认退出系统？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '成功退出系统!'
                });
                sessionStorage.removeItem('user');
                this.$router.push('/');
            }).catch(() => {

            });
        },
        //返回首页
        homeUrl() {
            this.$router.push('/');
        },
        //1-1
        //省变化
        provinceChange(item) {
            var reg = {
                procode: item
            }
            var that = this;
            this.$htAjax.post('https://apitest.gack.citic:8082/selcityList', {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status === 200) {
                    that.citys = data.data;
                    that.stepOne.city = that.citys[0].code;
                } else {
                    that.$message.error(data.msg);
                }
            }).catch(function(err) {

            });

        },

        //市变化
        cityChange(item) {
            var reg = {
                citycode: item
            }
            var that = this;
            this.$htAjax.post('https://apitest.gack.citic:8082/selAreaList', {}, {
                params: reg
            }).then(({ data }) => {
                if (data.status === 200) {
                    that.areas = data.data;
                    that.stepOne.county = that.areas[0].code;
                } else {
                    that.$message.error(data.msg);
                }
            }).catch(function(err) {

            });
        },
        handleAvatarSuccess(response, file) {
            this.stepOne.imageUrl = URL.createObjectURL(file.raw);
            this.stepOne.logo = response.data;
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 0.2;
            if (!isLt2M) {
                this.$message.warning('上传图片大小不能超过 200KB!');
            }
            return isLt2M;
        },
        //1-1 选择类目
        fication1(emit, index) {
            this.classItem1 = [];
            this.classItem2 = [];
            this.ification2 = this.classification2;
            this.$set(this.classItem1, index, true);
            this.ification2 = this.ification2.filter((o) => {
                return o.parentServerId == emit.id;
            })
        },
        fication2(emit, index) {
            // this.classItem2 = [];
            // this.$set(this.classItem2, index, true);
            this.chosen.forEach((element) => {
                if (element == emit.serverName) {
                    this.$message({
                        message: '该项已选择！',
                        type: 'warning'
                    });
                }
            });
            this.chosenId.push(emit.id);
            this.chosenId = this.chosenId.unique();
            this.chosen.push(emit.serverName);
            this.chosen = this.chosen.unique();
        },
        delChosen(index) {
            this.chosen.splice(index, 1);
            this.chosenId.splice(index, 1);
        },
        //1-1 提交
        submitStepOne(stepOne) {
            this.$refs.stepOne.validate((valid) => {
                if (valid) {
                    if (this.stepOne.imageUrl == '') {
                        this.$message({
                            message: '请上传企业Logo！',
                            type: 'warning'
                        });
                    } else {
                        if (this.chosenId.length == 0) {
                            this.$message({
                                message: '请选择服务项！',
                                type: 'warning'
                            });
                        } else {
                            this.type = '1';
                            this.active = 1;
                        }
                    }

                    //设置滚动条位置
                    $("html,body").animate({ scrollTop: 0 }, 500);
                } else {
                    this.$message({
                        message: '请仔细填写表单信息！',
                        type: 'warning'
                    });
                    $("html,body").animate({ scrollTop: 0 }, 500);
                }
            })
        },
        //定时   3-1
        resources() {
            if (this.company.resource == '1') {
                this.company.istime = true;
            } else {
                this.company.istime = false;
                this.company.time = '';
            }
        },
        handlePreview(response, file, fileList) {
            this.company.imageUrl = URL.createObjectURL(file.raw);
            this.company.orgurl = response.data;
        },
        beforeCompanyUpload(file) {
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
                this.$message.warning('上传图片大小不能超过200KB!');
            }

            return isJPG && isLt2M;
        },
        handlePreview1(response, file, fileList) {
            this.company.imageUrlRes = URL.createObjectURL(file.raw);
            this.company.resurl = response.data;
        },
        beforeCompanyUpload1(file) {
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
                this.$message.warning('上传图片大小不能超过200KB!');
            }

            return isJPG && isLt2M;
        },
        //公司信息 实名认证  提交
        submitCompany() {
            var that = this;
            this.company.time = moment(this.company.time).toDate();
            this.$refs.company.validate((valid) => {
                if (valid) {
                    if (this.company.imageUrlRes == '') {
                        that.$message.warning('请上传营业执照副本扫描件');
                        return false;
                    }
                    this.type = '2';
                    this.active = 2;
                    //设置滚动条位置
                    $("html,body").animate({ scrollTop: 0 }, 500);
                    var reg = {
                        fatherID: 4
                    }
                    this.$htAjax.post('https://apitest.gack.citic:8082/guoanmaker/provide/dictionary/selectByfatheridList', {}, {
                        params: reg
                    }).then(({ data }) => {
                        if (data.status === 200) {
                            that.voucher = data.data;
                        } else {
                            that.$message.error(data.msg);
                        }
                    }).catch(function(err) {

                    });
                } else {
                    this.$message({
                        message: '请仔细填写表单信息！',
                        type: 'warning'
                    });
                    $("html,body").animate({ scrollTop: 0 }, 500);
                }
            })
        },
        errorCompany() {
            this.type = '0';
            this.active = 0;
            $("html,body").animate({ scrollTop: 0 }, 500);
        },
        //2-2
        resourcesLegal() {
            if (this.legal.resource == '1') {
                this.legal.istime = true;
            } else {
                this.legal.istime = false;
                this.legal.time = '';
            }
        },
        //dialog 回调
        openDialog() {
            setTimeout(() => {
                let top = $('#myData div').height() - 160;
                let top1 = $('#myData1 div').height() - 160;
                this.scrollTop = top;
                this.scrollTop1 = top1;
            }, 1000)
        },
        scrollDialog(e) {
            let top = e.target.scrollTop;
            if (top >= this.scrollTop) {
                this.isDiaLogin = true;
            }
        },
        scrollDialog1(e) {
            let top = e.target.scrollTop;
            if (top >= this.scrollTop1) {
                this.isDiaLogin1 = true;
            }
        },
        //个人 实名认证  提交
        submitLegal() {
            this.legal.time = moment(this.legal.time).toDate();
            this.$refs.legal.validate((valid) => {
                if (valid) {
                    if (this.legal.legimageUrlHold == '' || this.legal.legimageUrl0 == '' || this.legal.legimageUrl1 == '') {
                        this.$message({
                            message: '请上传证件照！',
                            type: 'warning'
                        });
                        return false;
                    }
                    this.agreementVisible = true;
                } else {
                    this.$message({
                        message: '请仔细填写表单信息！',
                        type: 'warning'
                    });
                }
            })
        },
        //dialog 确定
        agreementVisibleLogin() {
            var that = this;
            if (this.isDiaLogin1 && this.isDiaLogin) {
                this.agreementVisible = false;
                var reg = {
                    id: this.businessid,
                    businessName: this.stepOne.name,
                    IdentityType: Number(this.stepOne.identity),
                    LicensPhone: this.stepOne.phone,
                    companyLogo: this.stepOne.logo,
                    companyProvince: this.stepOne.province,
                    companyCity: this.stepOne.city,
                    companyArea: this.stepOne.county,
                    companyAdress: this.stepOne.detailed,
                    commoditys: this.chosenId.toString(),
                    companyName: this.company.name,
                    companyResgiserMark: this.company.regnum,
                    busAgelimit: this.company.resource,
                    busAgelimitDate: this.company.time,
                    orgCodeCard: this.company.cert,
                    orgCodeCardPicture: this.company.orgurl,
                    companyLicenseReplica: this.company.resurl,
                    companyCorporationName: this.legal.name,
                    voucherType: Number(this.legal.cardType),
                    companyCorporationIDCardNo: this.legal.cardnum,
                    voucherEffectiveType: this.legal.resource,
                    voucherEffectiveDate: this.legal.time,
                    companyCorporationIDCardNoFront: this.legal.cpfronturl,
                    companyCorporationIDCardNoContrary: this.legal.cpcontraryurl,
                    companyOtherReplica: this.legal.cpfronturlHold,
                    service_range: 1,
                    personalUser: {
                        id: this.userid
                    }
                }
                this.loadingInformation = true;
                this.$htAjax.post('https://apitest.gack.citic:8082/save', reg)
                    .then(({ data }) => {
                        this.loadingInformation = false;
                        if (data.status == 200) {
                            this.stateUser();
                        } else if (data.status == 300) {
                            this.$message.warning('您已经申请服务商');
                        } else {
                            this.$message.warning('请求错误');
                        }
                    }).catch(function(err) {
                        that.$message.warning('请求错误，请稍后重试');
                        that.loadingInformation = false;
                    });
            } else {
                this.$message({
                    message: '请先阅读协议内容！',
                    type: 'warning'
                });
            }
        },
        stateUser() {
            var sta = {
                userid: this.userid,
                state: '1'
            }
            var that = this;
            this.$htAjax.post('https://apitest.gack.citic:8081/guoanmaker/personal/user/beProvider', {}, {
                params: sta
            }).then(({ data }) => {
                this.type = '3';
                this.active = 2;
                this.timer();
                this.$store.dispatch('findById', this.userid);
                this.$message({
                    message: '提交成功',
                    type: 'success'
                });
            }).catch(({ data }) => {
                this.loadingInformation = false;
            });
        },
        //获取验证码 倒计时
        timer: function() {
            if (this.successTime > 0) {
                this.successTime--;
                setTimeout(this.timer, 1000);
            }
        },
        errorLegal() {
            this.type = '1';
            this.active = 1;
            $("html,body").animate({ scrollTop: 0 }, 500);
        },
        /*组织机构代码证扫描件*/
        legalRemove(file, fileList) {
            //fileList  图片数组

        },
        legalPreviewHold(response, file, fileList) {
            this.legal.legimageUrlHold = URL.createObjectURL(file.raw);
            this.legal.cpfronturlHold = response.data;
        },
        legalPreview(response, file, fileList) {
            this.legal.legimageUrl0 = URL.createObjectURL(file.raw);
            this.legal.cpfronturl = response.data;
        },
        beforeLegalUploadHold(file) {
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
                this.$message.warning('上传图片大小不能超过200KB!');
            }

            return isJPG && isLt2M;
        },
        beforeLegalUpload(file) {
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
                this.$message.warning('上传图片大小不能超过200KB!');
            }

            return isJPG && isLt2M;

        },
        /*营业执照副本扫描*/
        legalRemove1(file, fileList) {
            //删除
        },
        legalPreview1(response, file, fileList) {
            this.legal.legimageUrl1 = URL.createObjectURL(file.raw);
            this.legal.cpcontraryurl = response.data;
        },
        beforeLegalUpload1(file) {
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
                this.$message.warning('上传图片大小不能超过200KB!');
            }

            return isJPG && isLt2M;
        },
        //审核通过跳转
        backHome() {
            this.$router.push('/backHome');
        }
    },
    watch: {
        successTime: function(newVal, oddVal) {
            if (newVal == 0) {
                this.$router.push('/backHome');
            }
        }
    }
}


Array.prototype.unique = function() {
    var res = [];
    var json = {};
    for (var i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
}
</script>
<style  scoped>
/*gack_top*/

.gack {
    width: 100%;
    min-width: 1200px;
    height: auto;
    margin: 0 auto;
    padding: 0;
    overflow: hidden;
    background: #fff;
}


.gack_top {
    width: 100%;
    height: 35px;
    line-height: 34px;
    background: #F9F9F9;
    border-bottom: 1px solid #e2e2e2;
}

.gack_rop {
    float: left;
}

.top_in {
    width: 1200px;
    height: 35px;
    margin: 0 auto;
    font-size: 12px;
    color: #333;
}

.top_in .left {
    float: left;
    width: auto;
    height: auto;
    overflow: hidden;
}

.top_in .left span {
    float: left;
}

.phone_img {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin: 8px;
    margin-left: 30px;
    background: url(../../assets/gack/dh.png) no-repeat 0 0;
    background-size: 16px 16px;
}

.top_in .left:hover .phone_img {
    background: url(../../assets/gack/dh1.png) no-repeat 0 0;
    background-size: 16px 16px;
}

.top_in .right {
    float: right;
    height: 15px;
    margin: 10px 0;
    color: #666;
    line-height: 15px;
}

.top_in .gack_list {
    float: left;
    padding: 0 15px;
    cursor: pointer;
    height: 16px;
    line-height: 16px;
    border-right: 1px solid #999;
}

.gack_name img {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    float: left;
    -webkit-transform: scale(1.3, 1.3);
    -moz-transform: scale(1.3, 1.3);
    -o-transform: scale(1.3, 1.3);
    transform: scale(1.3, 1.3);
    margin: 0 10px;
}

.gack_name span {
    float: left;
    margin-right: 8px;
}

.gack_name .gack_out {
    float: left;

    color: #D7000F;
}

.top_in .gack_list:last-of-type {
    border: 0;
}

.top_in .gack_list:hover {
    color: #D7000F;
}

.top_in .gack_name:hover {
    color: #666;
}

.ph_img {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../../assets/gack/sj_icon.png) no-repeat 0 0;
    background-size: auto 16px;
}

.ph_imgTit {
    display: inline-block;
    width: 20px;
    height: 14px;
    margin: 0 9px;
    background: url(../../assets/reg/zc_mail.png) no-repeat 0 0;
    background-size: auto 14px;
}

.gack_list:nth-of-type(3):hover .ph_img {
    background: url(../../assets/gack/sj_icon1.png) no-repeat 0 0;
    background-size: auto 16px;
}

.wei_img {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url(../../assets/gack/wx_icon.png) no-repeat 0 0;
    background-size: 16px 16px;
}

.gack_list:nth-of-type(4):hover .wei_img {
    background: url(../../assets/gack/wx_icon1.png) no-repeat 0 0;
    background-size: auto 16px;
}

.gack_list b {
    float: left;
    font-weight: 400;
}






/**/

.information {
    width: 100%;
    min-width: 1000px;
    height: auto;
    background: #f5f5f5;
    overflow: hidden;
}

.pb_top {
    width: 100%;
    height: auto;
    background: #f5f5f5;
    margin: 0 auto;
    padding-bottom: 20px;
}

.page_box {
    width: 1000px;
    height: auto;
    margin: 50px auto;
    background: #fff;
}

.page_top {
    width: 100%;
    height: 60px;
    color: #fff;
    line-height: 60px;
    background: #c7000a;
    font-size: 22px;
    box-sizing: border-box;
}

.pt_box {
    width: 1200px;
    margin: 0 auto;
    height: 60px;
}

.pb_left {
    float: left;
    width: 30%;
    cursor: pointer;
}

.pb_left img {
    float: left;
    display: block;
    width: 41px;
    margin: 7px 0;
    margin-right: 15px;
}

.pb_left span {
    float: left;
    font-size: 20px;
    font-weight: 400!important;
}

.pb_center {
    float: left;
    width: 40%;
    text-align: center;
}

.pb_right {
    float: right;
    width: 30%;
    text-align: right;
    cursor: pointer;
    overflow: hidden;
}

.pb_right span {
    float: right;
    font-size: 16px;
}

.pb_right img {
    float: right;
    width: 26px;
    margin: 17px 8px;
    height: 26px;
}

.pb_tits {
    width: 100%;
    height: auto;
    margin: 0 auto;
}

.pb_tits:nth-of-type(2) {
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
}

.pb_title {
    width: 100%;
    height: auto;
    padding: 0 20px;
    box-sizing: border-box;
    overflow: hidden;
    background: #c7000a;
    color: #fff;
    height: 50px;
    line-height: 50px;
}

.ps_box {
    width: 100%;
    height: auto;
    overflow: hidden;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, .1), 0 10px 12px 0 rgba(170, 182, 206, .36);
}

.pb_box {
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 20px 3%;
    box-sizing: border-box;
    padding-top: 40px;
    overflow: hidden;
}

.next_btn {
    margin-top: 40px;
    text-align: center;
    width: 100%;
    height: auto;
}






/*完善信息 企业服务类*/

.pb_tits .pt_category {
    width: 100%;
    height: 160px;
    overflow: hidden;
}

.pb_tits .cards {
    box-sizing: border-box;
    width: 360px;
    border: 2px solid #797979;
    border-radius: 10px;
    height: 120px;
    margin: 20px 0;
    background: #fff;
    overflow: hidden;
    position: relative;
}

.pb_tits .card_img {
    width: 80px;
    height: 80px;
    margin: 20px;
}

.pb_tits .card_img img {
    width: 100%;
    height: 100%;
}

.pb_tits .card_title {
    position: absolute;
    left: 120px;
    right: 20px;
    top: 20px;
    bottom: 20px;
}

.pb_tits .card_title p {
    display: block;
    width: 100%;
    height: 30px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
}

.pb_tits .card_title b {
    display: block;
    font-weight: 400;
    color: #666;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
}

.pb_tits .card_title div {
    color: #FF002F;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
}

.pb_tits .card_title div span {
    margin: 0 10px;
}


.pt_catBos {
    width: 100%;
    height: auto;
    background: #fff;

    overflow: hidden;
}

.pt_search {
    width: 600px;
    height: 40px;
    margin: 20px auto;
}

.pt_list {
    width: 90%;
    height: 400px;
    margin: 30px auto;
}

.pt_list li {
    float: left;
    width: 33.3%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding: 10px;
}

.pt_list li .list_sell {
    width: 100%;
    height: 100%;
    overflow: auto;
    border: 1px solid #e5e5e5;
}

.list_sell .sell_ul {
    width: 100%;
    height: auto;
}

.sell_li {
    width: 100%;
    height: 26px;
    line-height: 26px;
    overflow: hidden;
    color: #4a4a4a;
    font-size: 14px;
    box-sizing: border-box;
    padding: 0 10px;
    cursor: pointer;
}

.sell_li:hover {
    background: #c7000a;
    color: #fff;
}

.list_sell .active {
    background: #c7000a;
    color: #fff;
}



.company_legalinp .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;

    position: relative;
    overflow: hidden;
}

.company_legalinp .avatar-uploader .el-upload:hover {
    border-color: #c7000a;
}

.company_legalinp .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    border: 1px dashed #d9d9d9;
    line-height: 178px;
    text-align: center;
}

.company_legalinp .avatar {
    width: auto;
    max-width: 800px;
    height: 178px;
    display: block;
}

.information .avatar {
    width: auto;
    min-width: 178px;
    max-width: 800px;
    height: 178px;
    display: block;
}






/*提交审核*/

.success_top {
    width: 520px;
    height: 80px;
    margin: 20px auto;
    text-align: center;
    line-height: 80px
}

.success_top img {
    height: 40px;
    margin: 20px;
    float: left;
}

.s_top_text {
    float: left;
    color: #333;
    font-size: 22px;
}

.success_center {
    width: 400px;
    margin: 0 auto;
    text-align: center;
    color: #4a4a4a;
    font-size: 14px;
}

.success_centers {
    width: 400px;
    margin: 20px auto;
    margin-bottom: 50px;
    font-size: 16px;
    text-align: center;
    color: #333;
}

.success_bottom {
    width: 600px;
    margin: 0 auto;
    padding-bottom: 60px;
    font-size: 16px;
    text-align: center;
    color: #333;
}

.success_bottom b {
    color: #c7000a;
    font-weight: 400;
    font-size: 18px;
}

.success_bottom span {
    color: #c7000a;
    margin: 0 4px;
    cursor: pointer;
    text-decoration: underline;
}

.xieyi_cont {
    padding: 10px 0;
    width: 96%;
    margin: 0 auto;
    color: #727272;
}

.xieyi_cont h2 {
    font-size: 14px;
}

.xieyi_cont b {
    font-size: 12px;
    line-height: 20px;
    margin: 8px 0;
    display: inline-block;
}

.xieyi_cont p {
    font-size: 12px;
    text-indent: 2em;
    line-height: 20px;
    text-align: Justify;
    text-justify: inter-ideograph;
}


.dialog-box {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.dialog-top {
    width: 100%;
    height: 20px;
    margin: 5px 0;
    line-height: 20px;
    text-align: center;
    font-size: 16px;
    color: #4a4a4a;
}

.dialog-list {
    height: 160px;
    box-sizing: border-box;
    padding: 10px 0;
    overflow-x: hidden;
    overflow-y: auto;
}

.xieyi_cont div {
    width: 100%;
    height: auto;
    overflow: hidden;
}


.sell_selected {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    overflow: auto;
    font-size: 14px;
}

.list_box {
    border: 0!important;
}

.list_box .set_list {
    overflow: hidden;
}

.list_box .set_list li {
    background: #fff;
    border-radius: 3px;
    border: 1px solid #c7000a;
    width: auto;
    height: 34px;
    line-height: 32px;
    text-align: center;
    position: relative;
    float: left;
    color: #c7000a;
    font-size: 14px;
    padding: 0 20px!important;
    position: relative;
    overflow: visible;
    cursor: pointer;
    margin: 10px 0;
    margin-right: 10px;
    /* transition: 0.5 all ease;
    -webkit-transition: 0.5 all ease;
    -moz-transition: 0.5 all ease;
    -o-transition: 0.5 all ease; */
}

.list_box .set_list li b {
    display: block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    background: url(../../assets/backImg/delate.png) 0 0 no-repeat;
    background-size: 16px 16px;
    position: absolute;
    right: -9px;
    top: -9px;
    opacity: 0.9;
}

.list_box .set_list li:hover b {
    display: block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    background: url(../../assets/backImg/nopass.png) 0 0 no-repeat;
    background-size: 16px 16px;
    position: absolute;
    right: -9px;
    top: -9px;
}

.select_top {
    width: 100%;
    height: 40px;
    line-height: 40px;
}

.set_list {
    width: 100%;
    height: auto;
    overflow: hidden;
}

.set_list li {
    width: 100%;
    height: 26px;
    padding: 0!important;
    line-height: 26px;
    color: #666;
    font-size: 12px;
    display: block;
}

.sell_btn {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 30px;
}

.company_tit {
    width: 100%;
    height: auto;
    overflow: hidden;
    line-height: 26px;
    font-size: 14px;
    color: #333;
    margin: 8px 0;
    box-sizing: border-box;
    padding-left: 80px;
}

.company_tit ul {
    list-style: circle;
    list-style-position: inside;
    color: #999;
    font-size: 12px;
    margin: 5px 0;
}

.company_box {
    width: 100%;
    height: auto;
    color: #666;
    overflow: hidden;
}

.company_top {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    font-weight: 600;
    width: 100%;
    box-sizing: border-box;
    padding-left: 15px;
}

.crumbs {
    width: 90%;
    height: 20px;
    margin: 25px auto;
    margin-bottom: 10px;
}

.crumbs ul {
    width: auto;
    height: 20px;
}

.crumbs ul li {
    float: left;
    height: 20px;
    line-height: 20px;
    color: #888;
    font-size: 12px;
    margin-right: 10px;
}

.crumbs ul .active {
    color: #222;
}

.crumbs ul li:after {
    content: '>';
}

.company_inp {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin-top: 20px;
}
</style>
<style>
.information .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.information .avatar-uploader .el-upload:hover {
    border-color: #c7000a;
}

.information .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}

.information .avatar {
    width: 100px;
    height: 100px;
    display: block;
}

.information .el-form-item {
    padding: 0 40px;
}

.information .pb_box .el-form-item {
    padding: 0;
}
</style>

