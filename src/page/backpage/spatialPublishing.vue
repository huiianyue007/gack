<template>
    <div class="spatialPublishing">
        <div class="crumbs">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>商家管理中心</el-breadcrumb-item>
                <el-breadcrumb-item>空间设置</el-breadcrumb-item>
                <el-breadcrumb-item>空间发布</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="spatialPublishing-from">
            <el-form :inline="true" class="demo-form-inline" label-width="120px" :model="ruleForm" :rules="rules" ref="ruleForm">
                <el-form-item label="空间名称 : " prop="roomName">
                    <el-input style="width:300px" v-model="ruleForm.roomName"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="空间描述 : " prop="describeAsk">
                    <el-input style="width:300px" v-model="ruleForm.describeAsk"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="空间位置 : " required>
                    <el-select v-model="value1" placeholder="请选择省" @change="provinceChange(value1)">
                        <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                    <div class="el-form-item__error" v-if="op1">请选择</div>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="value2" placeholder="请选择市" @change="cityChange(value2)">
                        <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                    <div class="el-form-item__error" v-if="op2">请选择</div>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="value3" placeholder="请选择区">
                        <el-option v-for="item in options3" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                    <div class="el-form-item__error" v-if="op3">请选择</div>
                </el-form-item>
                <br/>
                <el-form-item label="详细位置 : " required>
                    <el-input class="input_style" @blur="addressPosition(ruleForm.address)"
                     v-model="ruleForm.address" style="width:300px"></el-input>
                    <img src="../../assets/images/information/position.png" style="width:12px;height:15px;margin-right:10px;cursor: pointer;" @click="Place" />
                    <div class="chulai" v-if="ditu">
                        <div class="amap-page-container">
                            <el-amap-search-box ref='searches' class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
                            <el-amap vid="amapDemo" :center="mapCenter" :plugin="plugin" :events="events" :zoom="12" class="amap-demo">
                                <el-amap-marker v-for="(marker,index) in markers" :position="marker" :key="index"></el-amap-marker>
                            </el-amap>
                        </div>
                        <el-button style="position: absolute;top: 25px;right: 20px;" type="primary" @click="xiaoshi">确 定</el-button>
                    </div>
                    <div class="el-form-item__error" v-if="statePosition">请在右侧选择详细地址位置</div>
                </el-form-item>
                <br/>

                <el-form-item label="空间配套设施 : " v-if="!ditu" style="width:100%" class="sheshi" required>
                    <div class="facility" :style="logo?'border-color:red':''">
                        <ul>
                            <el-form-item class="facility-li" prop="facilityLogo">
                                <li v-for="(item,index) in facilitys" :key="index" @click="Facilitys(item,index)">
                                    <img v-if="item.state == 0" :src="item.spacefacilitiesNoUrl" alt="加载中。。。" />
                                    <img v-else :src="item.spacefacilitiesYesUrl" alt="加载中。。。" />
                                    <span :class="item.state == 1?'active':''">{{item.spacefacilitiesName}}</span>
                                </li>
                            </el-form-item>
                        </ul>
                    </div>
                    <div class="el-form-item__error" v-if="logo">至少有一个</div>
                </el-form-item>
                <el-form-item label="空间列表图 : " v-if="!ditu" required>
                    <el-upload class="avatar-uploader" :style="lists?'border-color:red':''" name="companyLogo" :action="`${$config.back}/putImg`" :show-file-list="false" :multiple="false" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess3">
                        <img v-if="imageUrlLists" :src="imageUrlLists" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <div class="el-form-item__error" v-if="lists">请上传</div>
                </el-form-item>
                <div class="zhushi">注：建议上传图片比例 宽595px 高330px</div>
                <br/>
                <el-form-item label="空间展示 : " class="upLoad" v-if="!ditu" ref="oimg" required>
                    <el-upload :class="fileList2.length >=5 ? 'active_index' : ''" :action="`${$config.back}/putImg`" name="companyLogo" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="del" :file-list="fileList2" :on-success="bianhua" :on-progress="add" :before-upload="beforeAvatarUpload">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible" width="30%">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <div class="el-form-item__error" v-if="leastThree">最少上传3张</div>
                </el-form-item>
                <div class="zhushi">注：建议上传图片比列 宽450px 高250px</div>
                <br/>
                <el-form-item label="空间详情 : " v-if="!ditu" prop="spaceDetail" class="xiangqing" required>
                    <v-editor :fileName="'myFile'" :toolbars='toolbars' :uploadUrl="ruleForm.uploadUrl" v-model="ruleForm.spaceDetail"></v-editor>
                </el-form-item>
                <br/>
                <el-form-item style="width:100%" v-if="!ditu">
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

import vEditor from './editor.vue'
export default {
    data() {
        let self = this;
        return {
            businessid: '',
            toolbars: 'toolbar',
            //空间列表图
            imageUrlLists: '',
            isFalse: true,
            ditu: false,
            //from
            ruleForm: {
                roomName: '',
                describeAsk: '',
                address: '',
                uploadUrl: `${this.$config.back}/putImg`,
                spaceDetail: '',
                roomImgOne: '',
                roomImgTwo: '',
                roomImgThree: '',
                roomImgFour: '',
                roomImgFive: '',
            },
            rules: {
                roomName: [
                    { required: true, message: '名称不可为空', trigger: 'blur' },
                    { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '有非法符号', trigger: 'blur' },
                    { min: 1, max: 15, message: '最多输入 15 个字符', trigger: 'blur' }
                ],
                describeAsk: [
                    { required: true, message: '请输入空间名称', trigger: 'blur' },
                    { pattern: /^[\u4E00-\u9FA5A-Za-z0-9]+$/, message: '有非法符号', trigger: 'blur' },
                    { min: 1, max: 15, message: '最多输入 15 个字符', trigger: 'blur' }
                ],
                spaceDetail: [
                    { required: true, message: '空间详细不能为空', trigger: 'change' },
                ]
            },
            fileList2: [],
            dialogImageUrl: '',
            dialogVisible: false,
            address_detail: '', //详细地址
            userlocation: { lng: "", lat: "" },
            flength: 0,
            show: false,
            //经纬度
            lat: 0,
            lng: 0,
            //临时保存
            facilitys: [],
            //点击一下
            n: 0,
            //id保存一下
            ID: '',
            upIMG: '',
            //空间配套logo验证
            logo: false,
            //空间列表图验证
            lists: false,
            //空间展示验证
            leastThree: false,
            //省级联动
            options1: [],
            value1: '',
            options2: [],
            value2: '',
            options3: [],
            value3: '',
            op1: false,
            op2: false,
            op3: false,
            DADA: 1,
            DA: 1,
            positionState: false,
            statePosition: false,
            //地图
            markers: [],
            searchOption: {
                city: '全国',
                citylimit: true
            },
            mapCenter: [116.40387397, 39.91488908],
            loaded: false,
            plugin: [{
                pName: 'Geolocation',
                events: {
                    init(o) {
                        // o 是高德地图定位插件实例
                        o.getCurrentPosition((status, result) => {
                            if (result && result.position) {
                                self.lng = result.position.lng;
                                self.lat = result.position.lat;
                                self.mapCenter = [self.lng, self.lat];
                                self.loaded = true;
                                self.$refs.searches.$data.keyword = result.formattedAddress
                                self.$nextTick();
                            }

                        });

                    }
                }
            }],
            events: {
                click(e) {
                    let { lng, lat } = e.lnglat;
                    self.lng = lng;
                    self.lat = lat;
                    self.markers = [];
                    self.markers.push([self.lng, self.lat]);
                    self.mapCenter = [self.lng, self.lat]
                    // 这里通过高德 SDK 完成。
                    var geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all"
                    });
                    geocoder.getAddress([lng, lat], function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            if (result && result.regeocode) {
                                self.$refs.searches.$data.keyword = result.regeocode.formattedAddress
                                self.$nextTick();
                            }
                        }
                    });
                }
            }
        }
    },
    components: {
        vEditor
    },
    created() {
        // 商户id
        let businessid = this.$store.state.business;
        if (businessid) {
            this.businessid = businessid;
        } else {
            this.$router.push('/');
        }

        //页面刷新时获取省
        this.getProvince()

        //空间管理编辑
        if (this.$store.state.compile) {
            this.DADA = 2;
            this.DA = 2;
            let Compile = {
                id: this.$store.state.compile
            }

            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/room/selectRoomById`, {}, {
                params: Compile
            }).then(({ data }) => {
                if (data.status == 200) {
                    this.lng = data.data.lng
                    this.lat = data.data.lat
                    this.ruleForm = data.data;
                    this.provinceChange(data.data.province.id)
                    this.cityChange(data.data.city.id)
                    this.value1 = data.data.province.id;
                    
                    this.value2 = data.data.city.id;
                    this.value3 = data.data.area.id;
                    

                    let home = ['roomImgOne', 'roomImgTwo', 'roomImgThree', 'roomImgFour', 'roomImgFive']
                    let aaa = home.map(item => {
                        if (this.ruleForm[item]) {
                            return {
                                url: this.ruleForm[item]
                            }
                        }
                    })
                    for (var i = 0; i < aaa.length; i++) {
                        if (!aaa[i]) {
                            aaa.splice(i, 1)
                            i--;
                        }
                    }
                    this.fileList2 = aaa;
                    this.imageUrlLists = this.ruleForm.roomlogo;
                    return this.select()

                }
            }).then(({ data }) => {
                let complement = this.ruleForm.complement ? this.ruleForm.complement.split(',') : []
                if (data.status == 200) {
                    this.facilitys = data.data.map(item => {
                        item.state = 0
                        complement.forEach(it => {
                            if (item.id == it) {
                                item.state = 1;
                            }
                        })
                        return item;
                    })
                } else {
                    this.$message.error(response.data.msg);
                }
            }).catch(error => {
            })

        } else {
            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/serverClass/selectAllSpacefacilities`)
                .then(({ data }) => {
                    if (data.status === 200) {
                        this.facilitys = data.data;
                        this.facilitys.map(it => {
                            it.state = 0;
                            return it;
                        })

                    } else {
                        this.$message.error(response.data.msg);
                    }
                }).catch(err => {

                });
        }
    },
    methods: {
        //地图
        addMarker() {
            let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
            let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
            this.markers.push([lng, lat]);
        },
        onSearchResult(pois) {
            if (pois.length > 0) {
                this.markers = [];
                this.lng = pois[0].lng;
                this.lat = pois[0].lat;
                this.markers.push([pois[0].lng, pois[0].lat]);
                this.mapCenter = [pois[0].lng, pois[0].lat];
            }
        },
        addressPosition(val) {
            if (!this.positionState || !val) {
                this.statePosition = true
            }
        },
        select() {
            return new Promise((resolve, reject) => {
                this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/serverClass/selectAllSpacefacilities`)
                    .then(response => {
                        resolve(response)
                    }).catch(err => {
                        reject(err)
                    });
            })
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //地图
        Place() {
            this.ditu = true;
        },
        xiaoshi() {
            this.ditu = false;
            this.statePosition = false;
            this.positionState = true;
            this.ruleForm.address = this.$refs.searches.$data.keyword
        },
        //空间展示列表
        bianhua(response, file, fileList) {
            if (this.$store.state.compile) {
                if (fileList.length == 1) {
                    this.ruleForm.roomImgOne = fileList[0].response.data
                } else if (fileList.length == 2) {
                    this.ruleForm.roomImgOne = fileList[0].response.data;
                    this.ruleForm.roomImgTwo = fileList[1].response.data;
                } else if (fileList.length == 3) {
                    this.ruleForm.roomImgOne = fileList[0].response.data;
                    this.ruleForm.roomImgTwo = fileList[1].response.data;
                    this.ruleForm.roomImgThree = fileList[2].response.data;
                } else if (fileList.length == 4) {
                    this.ruleForm.roomImgOne = fileList[0].response.data;
                    this.ruleForm.roomImgTwo = fileList[1].response.data;
                    this.ruleForm.roomImgThree = fileList[2].response.data;
                    this.ruleForm.roomImgFour = fileList[3].response.data;
                } else if (fileList.length == 5) {
                    this.ruleForm.roomImgOne = fileList[0].response.data;
                    this.ruleForm.roomImgTwo = fileList[1].response.data;
                    this.ruleForm.roomImgThree = fileList[2].response.data;
                    this.ruleForm.roomImgFour = fileList[3].response.data;
                    this.ruleForm.roomImgFive = fileList[4].response.data;
                }
            } else {
                if (fileList.length == 1) {
                    this.ruleForm.roomImgOne = fileList[0].response.data
                } else if (fileList.length == 2) {
                    this.ruleForm.roomImgOne = fileList[0].response.data;
                    this.ruleForm.roomImgTwo = fileList[1].response.data;
                } else if (fileList.length == 3) {
                    this.ruleForm.roomImgOne = fileList[0].response.data;
                    this.ruleForm.roomImgTwo = fileList[1].response.data;
                    this.ruleForm.roomImgThree = fileList[2].response.data;
                } else if (fileList.length == 4) {
                    this.ruleForm.roomImgOne = fileList[0].response.data;
                    this.ruleForm.roomImgTwo = fileList[1].response.data;
                    this.ruleForm.roomImgThree = fileList[2].response.data;
                    this.ruleForm.roomImgFour = fileList[3].response.data;
                } else if (fileList.length == 5) {
                    this.ruleForm.roomImgOne = fileList[0].response.data;
                    this.ruleForm.roomImgTwo = fileList[1].response.data;
                    this.ruleForm.roomImgThree = fileList[2].response.data;
                    this.ruleForm.roomImgFour = fileList[3].response.data;
                    this.ruleForm.roomImgFive = fileList[4].response.data;
                }
                if (this.ruleForm.roomImgOne !== '' && this.ruleForm.roomImgTwo !== '' && this.ruleForm.roomImgThree !== '') {
                    this.leastThree = false;
                } else {
                    this.leastThree = true;
                }
            }
        },
        del(file, fileList) {
            this.fileList2 = fileList;
            if (this.$store.state.compile) {
                if (fileList.length == 1) {
                    this.ruleForm.roomImgOne = fileList[0].url;
                    this.ruleForm.roomImgTwo = '';
                    this.ruleForm.roomImgThree = '';
                    this.ruleForm.roomImgFour = '';
                    this.ruleForm.roomImgFive = '';
                } else if (fileList.length == 2) {
                    this.ruleForm.roomImgOne = fileList[0].url;
                    this.ruleForm.roomImgTwo = fileList[1].url;
                    this.ruleForm.roomImgThree = '';
                    this.ruleForm.roomImgFour = '';
                    this.ruleForm.roomImgFive = '';
                } else if (fileList.length == 3) {
                    this.ruleForm.roomImgOne = fileList[0].url;
                    this.ruleForm.roomImgTwo = fileList[1].url;
                    this.ruleForm.roomImgThree = fileList[2].url;
                    this.ruleForm.roomImgFour = '';
                    this.ruleForm.roomImgFive = '';
                } else if (fileList.length == 4) {
                    this.ruleForm.roomImgOne = fileList[0].url;
                    this.ruleForm.roomImgTwo = fileList[1].url;
                    this.ruleForm.roomImgThree = fileList[2].url;
                    this.ruleForm.roomImgFour = fileList[3].url;
                    this.ruleForm.roomImgFive = '';
                } else if (fileList.length == 5) {
                    this.ruleForm.roomImgOne = fileList[0].url;
                    this.ruleForm.roomImgTwo = fileList[1].url;
                    this.ruleForm.roomImgThree = fileList[2].url;
                    this.ruleForm.roomImgFour = fileList[3].url;
                    this.ruleForm.roomImgFive = fileList[4].url;
                }
                if (this.ruleForm.roomImgOne !== '' && this.ruleForm.roomImgTwo !== '' && this.ruleForm.roomImgThree !== '') {
                    this.leastThree = false;
                } else {
                    this.leastThree = true;
                }
            } else {
                if (fileList.length == 1) {
                    this.ruleForm.roomImgOne = fileList[0].response.data;
                    this.ruleForm.roomImgTwo = '';
                    this.ruleForm.roomImgThree = '';
                    this.ruleForm.roomImgFour = '';
                    this.ruleForm.roomImgFive = '';
                } else if (fileList.length == 2) {
                    this.ruleForm.roomImgOne = fileList[0].response.data;
                    this.ruleForm.roomImgTwo = fileList[1].response.data;
                    this.ruleForm.roomImgThree = '';
                    this.ruleForm.roomImgFour = '';
                    this.ruleForm.roomImgFive = '';
                } else if (fileList.length == 3) {
                    this.ruleForm.roomImgOne = fileList[0].response.data;
                    this.ruleForm.roomImgTwo = fileList[1].response.data;
                    this.ruleForm.roomImgThree = fileList[2].response.data;
                    this.ruleForm.roomImgFour = '';
                    this.ruleForm.roomImgFive = '';
                } else if (fileList.length == 4) {
                    this.ruleForm.roomImgOne = fileList[0].response.data;
                    this.ruleForm.roomImgTwo = fileList[1].response.data;
                    this.ruleForm.roomImgThree = fileList[2].response.data;
                    this.ruleForm.roomImgFour = fileList[3].response.data;
                    this.ruleForm.roomImgFive = '';
                } else if (fileList.length == 5) {
                    this.ruleForm.roomImgOne = fileList[0].response.data;
                    this.ruleForm.roomImgTwo = fileList[1].response.data;
                    this.ruleForm.roomImgThree = fileList[2].response.data;
                    this.ruleForm.roomImgFour = fileList[3].response.data;
                    this.ruleForm.roomImgFive = fileList[4].response.data;
                }
                if (this.ruleForm.roomImgOne !== '' && this.ruleForm.roomImgTwo !== '' && this.ruleForm.roomImgThree !== '') {
                    this.leastThree = false;
                } else {
                    this.leastThree = true;
                }
            }
        },
        add(event, file, fileList) {
            this.fileList2 = fileList;
        },

        //空间列表图上传前
        beforeAvatarUpload(file) {
            const isImg = file.type;
            var isJPG = false;
            if (isImg != 'image/jpeg' && isImg != 'image/png' && isImg != 'image/bmp' && isImg != 'image/gif') {
                this.$message.error('上传头像图片只能是 JPG/PNG/BMP/GIF 格式!');
                isJPG = false;
            } else {
                isJPG = true;
            }
            const isLt2M = file.size / 1000 < 200;
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 200KB!');
            }
            return isJPG && isLt2M;
        },
        //空间列表图上传成功
        handleAvatarSuccess3(response, file, fileList) {
            this.imageUrlLists = response.data;
            this.upIMG = response.data;
            this.lists = false;
        },
        // 获取省列表
        getProvince() {
            this.$htAjax.post(`${this.$config.back}/selectOprtorProvice`)
                .then(({ data }) => {
                    if (data.status === 200) {
                        this.options1 = data.data;
                    } else {
                        this.$message.error(data.msg);
                    }
                }).catch(err => {
                });
        },
        //省变化
        provinceChange(value) {
            if (this.DADA == 1) {
                this.value2 = '';
                this.value3 = '';
                this.ruleForm.address = ''
            } else if (this.DADA == 2) {
                this.DADA = 1;
                this.DA = 1;
            }
            if (value) {
                var reg = {
                    id: value
                }
                var that = this;
                this.$htAjax.post(`${this.$config.back}/selcityList3`, {}, {
                    params: reg
                }).then(({ data }) => {
                    if (data.status === 200) {
                        that.options2 = data.data;
                    } else {
                        that.$message.error(data.msg);
                    }
                }).catch(function(err) {

                });
            }

        },

        cityChange(value) {
            if (this.DA == 1) {
                this.DA = 2;

            } else if (this.DA == 2) {
                this.value3 = '';
            }
            if (value) {
                // alert(1)
                var reg = {
                    id: value
                }
                var that = this;
                this.$htAjax.post(`${this.$config.back}/selAreaList2`, {}, {
                    params: reg
                }).then(({ data }) => {
                    if (data.status === 200) {
                        that.options3 = data.data;
                    } else {
                        that.$message.error(data.msg);
                    }
                }).catch(function(err) {
                })
            }
        },
        //空间配套设施ative
        Facilitys(data, index) {
            if (data.state == 0) {
                data.state = 1;
            } else {
                data.state = 0;
            }
            this.logo = true;
            this.facilitys.forEach(item => {
                if (item.state !== 0) {
                    this.logo = false;
                }
            })
        },
        //数据提交

        submitForm(formName) {
            //空间配套设施
            var ofrom = this.$refs[formName].$el;
            this.logo = true;
            this.facilitys.forEach(item => {
                if (item.state !== 0) {
                    this.logo = false;
                }
            })
            //空间列表图
            if (this.imageUrlLists === '') {
                this.lists = true;
            }
            //空间展示
            if (this.ruleForm.roomImgOne !== '' && this.ruleForm.roomImgTwo !== '' && this.ruleForm.roomImgThree !== '') {
                this.leastThree = false;
            } else {
                this.leastThree = true;
            }
            //详细位置
            if (!this.positionState || this.ruleForm.address == '') {
                this.statePosition = true
            }
            if (this.value1 == '') {
                this.op1 = true;
            } else {
                this.op1 = false;
            }
            if (this.value2 == '') {
                this.op2 = true;
            } else {
                this.op2 = false;
            }
            if (this.value3 == '') {
                this.op3 = true;
            } else {
                this.op3 = false;
            }
            //id字符串
            for (var i = 0; i < this.facilitys.length; i++) {
                if (this.facilitys[i].state == 1) {
                    this.ID += ',' + this.facilitys[i].id
                }
            }

            this.ID = this.ID.replace(this.ID.substring(0, 1), '');

            if (this.$store.state.compile.length != 0) {
                //编辑数据
                var json = {
                    roomName: this.ruleForm.roomName,
                    describeAsk: this.ruleForm.describeAsk,
                    province: {
                        id: this.value1
                    },
                    city: {
                        id: this.value2
                    },
                    area: {
                        id: this.value3
                    },
                    address: this.ruleForm.address,
                    lat: this.lat,
                    lng: this.lng,
                    roomState: 1,
                    roomlogo: this.imageUrlLists,
                    spaceDetail: this.ruleForm.spaceDetail,
                    complement: this.ID,
                    roomImgOne: this.ruleForm.roomImgOne,
                    roomImgTwo: this.ruleForm.roomImgTwo,
                    roomImgThree: this.ruleForm.roomImgThree,
                    roomImgFour: this.ruleForm.roomImgFour,
                    roomImgFive: this.ruleForm.roomImgFive,
                    business: {
                        id: this.businessid
                    },
                    id: this.ruleForm.id
                };
                var that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.logo && !this.lists && !this.leastThree && !this.op1 && !this.op2 && !this.op3) {
                            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/room/updateRoomById`, json)
                                .then(({ data }) => {
                                    if (data.status === 200) {
                                        that.$message({
                                            type: 'success',
                                            message: '发布成功!',
                                        });
                                        that.$router.push('/spaceHome');
                                    }
                                }).catch(function(error) {
                                });

                        }
                    } else {
                        return false;
                    }
                });

            } else {

                //     //新建数据
                var json = {
                    roomName: this.ruleForm.roomName,
                    describeAsk: this.ruleForm.describeAsk,
                    province: {
                        id: this.value1
                    },
                    city: {
                        id: this.value2
                    },
                    area: {
                        id: this.value3
                    },
                    address: this.ruleForm.address,
                    lat: this.lat,
                    lng: this.lng,
                    roomState: 1,
                    roomlogo: this.upIMG,
                    spaceDetail: this.ruleForm.spaceDetail,
                    complement: this.ID,
                    roomImgOne: this.ruleForm.roomImgOne,
                    roomImgTwo: this.ruleForm.roomImgTwo,
                    roomImgThree: this.ruleForm.roomImgThree,
                    roomImgFour: this.ruleForm.roomImgFour,
                    roomImgFive: this.ruleForm.roomImgFive,
                    business: {
                        id: this.businessid
                    },

                };
                var that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.logo && !this.lists && !this.leastThree && !this.statePosition) {
                            this.$htAjax.post(`${this.$config.back}/guoanmaker/provide/room/addProvideRoom`, json)
                                .then(({ data }) => {
                                    if (data.status === 200) {
                                        that.$message({
                                            type: 'success',
                                            message: '发布成功!',
                                        });
                                        that.$router.push('/spaceHome');
                                        that.$store.state.adminleftnavnum = 'spaceHome';
                                    }
                                }).catch(function(error) {
                                });
                        }
                    } else {
                        return false;
                    }
                });
            }
        },

    }
}
</script>

<style scoped>
.zhushi{
    margin-left: 120px;
    color: red;
    font-size: 12px;
}
.amap-demo {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.search-box {
    position: absolute;
    top: 25px;
    left: 20px;
}

.amap-page-container {
    position: relative;
}

.active {
    color: red;
}

.crumbs {
    height: auto;
    margin: 15px 0;
    margin-top: 15px;
    width: 100%;
}

.spatialPublishing-from {
    padding: 20px 0 0 20px;
}

#allmap {
    position: fixed!important;
    bottom: 10px;
    top: 70px;
    right: 10px;
    left: 10px;
    z-index: 100;
}

.facility {
    border: 1px solid rgb(217, 192, 191);
    height: 200px;
    border-radius: 4px;
}

.facility:hover {
    border-color: rgb(165, 134, 131)
}

.facility ul li {
    float: left;
    padding: 10px;
}

.facility ul li img {
    display: block;
    margin: 0 auto;
    width: 36px;
    height: 36px;
}

.facility ul li:hover {
    cursor: pointer;
}

.facility ul li span {
    display: block;
    text-align: center;
}

.avatar-uploader {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    /*min-width: 148px;
    max-width: 600px;
    height: 148px;*/
    cursor: pointer;
    /*line-height: 146px;*/
    vertical-align: top;
    text-align: center;
    font-size: 28px;
    color: #8c939d;
}
.spatialPublishing .avatar{
    width: auto;
    min-width: 148px;
    max-width: 600px;
    height: 148px;
    display: block;
}
.spatialPublishing .el-icon-plus{
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
}
.avatar-uploader:hover {
    border-color: #c7000a;
}

.facility-li {
    width: 100%;
    height: 100%;
}
</style>


<style>
.spatialPublishing .chulai img{
    display: block
}
.spatialPublishing .facility-li .el-form-item__content {
    width: 100%!important;
    height: 100%;
    margin: 0!important;
}

.spatialPublishing-from .el-form-item .el-input {
    width: 200px;
    margin-right: 10px;
}

.spatialPublishing-from .el-form-item__content .el-textarea {
    width: 400px;
    margin-right: 20px;
}

.spatialPublishing-from .el-form-item:last-child .el-form-item__content {
    width: 60px;
    margin: 0 auto;
    display: block;
    margin-top: 100px;
}

.spatialPublishing .chulai {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, .8);
}

.spatialPublishing .el-dialog__footer {
    text-align: center;
    line-height: 1;
}

#tangram-suggestion--TANGRAM__1i-main {
    z-index: 2;
}

#suggestId {
    padding-left: 10px;
    width: 500px;
    margin: 10px auto;
    height: 35px;
    display: block;
}

.xiangqing .el-form-item__content,
.sheshi .el-form-item__content {
    width: 85%;
}

.spatialPublishing .sheshi .el-form-item__content {
    padding-right: 20px;
}

.spatialPublishing .avatar-uploader .el-upload {
    width: 100%;
    height: 100%;
    border: 0;
}

.spatialPublishing .active_index .el-upload--picture-card {
    display: none;
}

.tangram-suggestion-main {
    z-index: 999;
}
</style>
