<template>
	<div class="issueFinancial">
		<div class="title">
			<span class="tip inline-block"></span>商业企划书
		</div>
		<div style="padding:20px 0" v-loading="loadingTab">
			<el-form :model="ruleForm" :res="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
				<el-form-item label="项目名称" prop="name">
					<el-input v-model="ruleForm.name" :maxlength="20" style="width:500px" placeholder="请填写项目名称"></el-input>
				</el-form-item>
				<el-form-item label="项目图片" class="guolai" prop="projectPhoto">
					<el-upload class="avatar-uploader" name="projectPhoto" :action="`${$config.back}/guoanmaker/providepersonalFinanceProject/uploadPersonalFinanceProjectPhoto`" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="ruleForm.projectPhoto" :src="ruleForm.projectPhoto" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<div class="guoqu">建议上传图片尺寸比例为4：3</div>
				</el-form-item>
				<el-form-item label="所处阶段" prop="stage">
					<el-select v-model="ruleForm.stage" placeholder="请选择">
						<el-option v-for="item in stageList" :key="item" :label="item" :value="item">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="项目概述" prop="summary">
					<el-input v-model="ruleForm.summary" style="width:500px" placeholder="项目内容概述"></el-input>
				</el-form-item>
				<el-form-item label="具体项目描述" prop="concreteSummary">
					<el-input v-model="ruleForm.concreteSummary" type="textarea" :autosize="{ minRows: 2, maxRows: 6}" style="width:500px"></el-input>
				</el-form-item>
				<el-form-item label="商业 / 项目计划书" prop="prospectus">
					<el-upload name="prospectus" style="width:500px" class="upload-demo" :action="`${$config.back}/guoanmaker/providepersonalFinanceProject/uploadPersonalFinanceProjectProspectus`" :on-success="handlePreview" :on-remove="handleRemove" multiple :limit="1" :file-list="fileList" :before-upload="beforeAvatarUpload1">
						<el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
				</el-form-item>
				<div align="center">
					<el-button type="primary" :loading="loading" @click="next('ruleForm')">确认</el-button>
				</div>
			</el-form>

		</div>

	</div>
</template>
<script>
export default {
	name: 'issueFinancial',
	data() {
		return {
			loadingTab: false,
			loading: false,
			//阶段哪几项
			stageList: ['天使轮', 'Pre-A', 'A轮', 'B轮'],
			fileList: [],
			ruleForm: {
				name: '',//项目名称
				projectPhoto: '', //图片
				stage: '',//项目所处阶段
				summary: '',//项目概述
				concreteSummary: '',//项目具体概述
				prospectus: '',//项目规划书（路径）
				prospectusName: '',//项目规划书名称
				id: '',
			},
			rules: {
				name: [{ required: true, message: '请输入项目名称', trigger: 'blur,change' }],
				projectPhoto: [{ required: true, message: '请上传', trigger: 'blur,change' }],
				stage: [{ required: true, message: '请输入项目所处阶段', trigger: 'blur,change' }],
				summary: [{ required: true, message: '请输入项目概述', trigger: 'blur,change' },{ min: 1, max: 100, message: '最多100字', trigger: 'blur' }],
				concreteSummary: [{ required: true, message: '请输入项目具体概述', trigger: 'blur,change' },{ min: 1, max: 300, message: '最多300字', trigger: 'blur' }],
				prospectus: [{ required: true, message: '请上传', trigger: 'blur,change' }]
			}
		}
	},
  beforeDestroy() {
		this.fileList = []
		this.$refs.ruleForm.resetFields()
	},
	created () {
		this.ruleForm.id = this.$route.query.value || '';
		if (this.ruleForm.id) {
			sessionStorage.setItem('jinRong', '1')
			this.loadingTab = true;
			this.$htAjax.post(`${this.$config.back}/guoanmaker/providepersonalFinanceProject/findPersonalFinanceProjectPartOne?projectId=` + this.ruleForm.id, {}, {}).then(({ data }) => {
				if (data.status == 200) {
					this.ruleForm = data.data
					this.fileList = [{
						name: data.data.prospectusName,
						url: data.data.prospectus
					}]
					this.loadingTab = false;
				} else {
					this.$message.error('请求失败')
					this.loadingTab = false;
				}
			}).catch((err) => {
				this.$message.error('请求失败')
				this.loadingTab = false;
			})
		} else {
			sessionStorage.setItem('jinRong', '0')
		}
	},

	methods: {
		//上传图片
		handleAvatarSuccess(res, file) {
			this.ruleForm.projectPhoto = res.data.value
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
			const isLt2M = file.size / 1024 / 1024 < 4;
			if (!isLt2M) {
				this.$message.warning('上传图片大小不能超过 4MB!');
			}
			return isJPG && isLt2M;
		},
		//上传计划书
		handleRemove(file, fileList) {
			this.fileList = [];
			this.ruleForm.prospectus = ''
			this.ruleForm.prospectusName = ''
		},
		handlePreview(res, file) {
			if (res.data.key == 'success') {
				this.fileList.push(file);
				this.ruleForm.prospectus = file.response.data.value;
				this.ruleForm.prospectusName = file.name;
			} else {
				this.fileList = [];
				this.$message.warning(res.data.value)
			}

		},
		beforeAvatarUpload1(file) {
			const isImg = file.type;
			var isJPG = false;
			if (isImg) {
				if (isImg != 'application/msword' && isImg != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
					&& isImg != 'application/vnd.openxmlformats-officedocument.presentationml.presentation' &&
					isImg != 'application/pdf' && isImg != 'application/vnd.ms-powerpoint') {
					this.$message.warning('该上传内容仅支持pdf、word及PPT格式，大小不超过10M');
					isJPG = false;
				} else {
					isJPG = true;
				}
			}else{
				if(file.name.endsWith(".pdf") || file.name.endsWith(".pptx") || file.name.endsWith(".ppt") ||
				file.name.endsWith(".doc") || file.name.endsWith(".docx")){
					isJPG = true;
				}else{
					isJPG = false;
				}
			}

			const isLt2M = file.size / 1024 / 1024 < 10;
			if (!isLt2M) {
				this.$message.warning('上传图片大小不能超过 10MB!');
			}
			return isJPG && isLt2M;
		},
		//下一步
		next(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.loading = true;
					this.$htAjax.post(`${this.$config.back}/guoanmaker/providepersonalFinanceProject/saveOrUpdatePersonalFinanceProjectPartOne`, {}, {
						params: {
							name: this.ruleForm.name,//项目名称
							projectPhoto: this.ruleForm.projectPhoto,//项目图片
							stage: this.ruleForm.stage,//项目所处阶段
							summary: this.ruleForm.summary,//项目概述
							concreteSummary: this.ruleForm.concreteSummary,//项目具体概述
							prospectus: this.ruleForm.prospectus,//项目规划书（路径）
							prospectusName: this.ruleForm.prospectusName,//项目规划书名称
							id: this.ruleForm.id,
							personalUserId: this.$store.state.userid.id,
						}
					}).then(({ data }) => {
						if (data.data.key == 'success') {
							this.loading = false;
							this.$router.push({ path: '/user/financing', query: { title: '金融服务', value: data.data.value } })
						} else {
							this.loading = false;
							this.$message.error('请求失败')
						}
					}).catch((err) => {
						this.loading = false;
						this.$message.error('请求失败')
					})
				} else {
					return false;
				}
			})

		}
	}
}
</script>
<style scoped>
.issueFinancial {
	background: #fff;
	padding-left: 24px;
}

.issueFinancial .guolai {
	position: relative;
	width: 500px;
}

.issueFinancial .guoqu {
	position: absolute;
	right: 0;
	top: 30%;
	color: red;
	font-size: 12px;
}

.issueFinancial .title {
	padding: 15px 0;
	border-bottom: 1px solid #e0e0e0;
}

.issueFinancial .tip {
	width: 6px;
	height: 32px;
	background: #ff0000;
	vertical-align: middle;
	margin-right: 15px;
}
</style>
<style>
.issueFinancial .avatar-uploader .el-upload {
	border: 1px dashed #d9d9d9;
	border-radius: 6px;
	cursor: pointer;
	position: relative;
	overflow: hidden;
}

.issueFinancial .avatar-uploader .el-upload:hover {
	border-color: #409EFF;
}

.issueFinancial .avatar-uploader-icon {
	font-size: 28px;
	color: #8c939d;
	width: 160px;
	height: 120px;
	line-height: 120px;
	text-align: center;
}

.issueFinancial .avatar {
	width: 160px;
	height: 120px;
	display: block;
}
</style>


