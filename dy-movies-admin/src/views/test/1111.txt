<template>
  <div class="experience-container">
    <el-card class="box-card">
      <h2>基本信息</h2>
      <el-form ref="form" :model="formData" label-width="120px" label-position="left">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="姓名" prop="name" required>
              <el-input v-model="formData.name" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="性别" prop="gender" required>
              <el-select v-model="formData.gender" placeholder="请选择性别">
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="出生日期" prop="birthDate" required>
              <el-date-picker
                v-model="formData.birthDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="文化程度" prop="education" required>
              <el-select v-model="formData.education" placeholder="请选择文化程度">
                <el-option label="初中" value="初中" />
                <el-option label="中技" value="中技" />
                <el-option label="中专" value="中专" />
                <el-option label="高中" value="高中" />
                <el-option label="大专" value="大专" />
                <el-option label="本科" value="本科" />
                <el-option label="硕士" value="硕士" />
                <el-option label="博士" value="博士" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="科室" prop="department" required>
              <el-input v-model="formData.department" placeholder="请输入科室" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="民族" prop="ethnicity" required>
              <el-select v-model="formData.ethnicity" placeholder="请选择民族">
                <el-option label="汉族" value="汉族" />
                <el-option label="少数民族" value="少数民族" />
                <!-- 可根据需要添加更多民族选项 -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="籍贯" prop="hometown" required>
              <el-input v-model="formData.hometown" placeholder="请输入籍贯" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="政治面貌" prop="politicalStatus" required>
              <el-input v-model="formData.politicalStatus" placeholder="请输入政治面貌" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="入党日期" prop="partyJoinDate" required>
              <el-date-picker
                v-model="formData.partyJoinDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="转正日期" prop="partyRegularDate" required>
              <el-date-picker
                v-model="formData.partyRegularDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="隶属党支部" prop="partyBranch" required>
              <el-input v-model="formData.partyBranch" placeholder="请输入隶属党支部" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="聘用情况" prop="employmentStatus" required>
              <el-input v-model="formData.employmentStatus" placeholder="请输入聘用情况" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="参加工作时间" prop="workStartDate" required>
              <el-date-picker
                v-model="formData.workStartDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="到我院时间" prop="hospitalJoinDate" required>
              <el-date-picker
                v-model="formData.hospitalJoinDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="人员类型" prop="personnelType" required>
              <el-select v-model="formData.personnelType" placeholder="请选择人员类型">
                <el-option label="最高管理者" value="最高管理者" />
                <el-option label="检测" value="检测" />
                <el-option label="质量负责人" value="质量负责人" />
                <el-option label="授权签字人" value="授权签字人" />
                <el-option label="技术负责人" value="技术负责人" />
                <el-option label="内审员" value="内审员" />
                <el-option label="监督员" value="监督员" />
                <el-option label="设备管理员" value="设备管理员" />
                <el-option label="其他" value="其他" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!--      <el-row :gutter="20">-->
        <!--        <el-col :span="8">-->
        <!--          <el-form-item label="社保" prop="socialSecurity">-->
        <!--            <el-input v-model="formData.socialSecurity" placeholder="请输入社保信息" />-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <!--      </el-row>-->

        <h2>职称资格</h2>

        <!-- 现任职务信息 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="现任职务" prop="currentPosition" required>
              <el-input v-model="formData.currentPosition" placeholder="请输入现任职务" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="任职时间" prop="positionStartDate" required>
              <el-date-picker
                v-model="formData.positionStartDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="现职务层次时间" prop="positionLevelDate" required>
              <el-date-picker
                v-model="formData.positionLevelDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 专业技术职称 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="现专业技术职称" prop="technicalTitle" required>
              <el-input v-model="formData.technicalTitle" placeholder="请输入专业技术职称" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="生效时间" prop="titleEffectiveDate" required>
              <el-date-picker
                v-model="formData.titleEffectiveDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 岗位信息 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="现岗位时间" prop="currentPostDate" required>
              <el-date-picker
                v-model="formData.currentPostDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="现聘岗位" prop="currentPost" required>
              <el-input v-model="formData.currentPost" placeholder="请输入现聘岗位" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人员类型" prop="personnelType" required>
              <el-select v-model="formData.personnelType" placeholder="请选择人员类型">
                <el-option label="最高管理者" value="最高管理者" />
                <el-option label="检测" value="检测" />
                <el-option label="质量负责人" value="质量负责人" />
                <el-option label="授权签字人" value="授权签字人" />
                <el-option label="技术负责人" value="技术负责人" />
                <el-option label="内审员" value="内审员" />
                <el-option label="监督员" value="监督员" />
                <el-option label="设备管理员" value="设备管理员" />
                <el-option label="其他" value="其他" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 学历学位信息 -->
        <h3>学历学位</h3>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="全日制学历" prop="fulltimeEducation" required>
              <el-input v-model="formData.fulltimeEducation" placeholder="请输入全日制学历" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="全日制学位" prop="fulltimeDegree" required>
              <el-input v-model="formData.fulltimeDegree" placeholder="请输入全日制学位" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="全日制专业" prop="fulltimeMajor" required>
              <el-input v-model="formData.fulltimeMajor" placeholder="请输入全日制专业" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="全日制学校" prop="fulltimeSchool" required>
              <el-input v-model="formData.fulltimeSchool" placeholder="请输入全日制学校" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="
          毕业时间"
              prop="fulltimeGraduationDate"
              required
            >
              <el-date-picker
                v-model="formData.fulltimeGraduationDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 在职学历信息 -->
        <h3>在职学历（非必填）</h3>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="在职学历" prop="parttimeEducation">
              <el-input v-model="formData.parttimeEducation" placeholder="请输入在职学历" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="在职学位" prop="parttimeDegree">
              <el-input v-model="formData.parttimeDegree" placeholder="请输入在职学位" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="在职专业" prop="parttimeMajor">
              <el-input v-model="formData.parttimeMajor" placeholder="请输入在职专业" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="在职学校" prop="parttimeSchool">
              <el-input v-model="formData.parttimeSchool" placeholder="请输入在职学校" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毕业时间" prop="parttimeGraduationDate">
              <el-date-picker
                v-model="formData.parttimeGraduationDate"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                style="width: 100%"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" style="text-align: center">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24" style="text-align: right">
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  name: '',
  gender: '',
  birthDate: '',
  education: '',
  department: '',
  ethnicity: '',
  hometown: '',
  politicalStatus: '',
  partyJoinDate: '',
  partyRegularDate: '',
  partyBranch: '',
  employmentStatus: '',
  workStartDate: '',
  hospitalJoinDate: '',
  personnelType: '',
  socialSecurity: '',
  // 现任职务信息
  currentPosition: '',
  positionStartDate: '',
  positionLevelDate: '',

  // 专业技术职称
  technicalTitle: '',
  titleEffectiveDate: '',

  // 岗位信息
  currentPostDate: '',
  currentPost: '',
  personnelType: '',

  // 全日制学历
  fulltimeEducation: '',
  fulltimeDegree: '',
  fulltimeMajor: '',
  fulltimeSchool: '',
  fulltimeGraduationDate: '',

  // 在职学历
  parttimeEducation: '',
  parttimeDegree: '',
  parttimeMajor: '',
  parttimeSchool: '',
  parttimeGraduationDate: ''
})

const form = ref(null)

const submitForm = () => {
  form.value.validate((valid) => {
    if (valid) {
      console.log('提交数据:', formData.value)
      // 这里可以添加提交数据的逻辑
      alert('提交成功!')
    } else {
      console.log('表单验证失败')
      return false
    }
  })
}

const resetForm = () => {
  form.value.resetFields()
}
</script>

<style scoped lang="scss">
.experience-container {
  padding: 20px;
}

.el-table {
  margin-top: 10px;
}

.basic-info-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  h2 {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
}

.el-form-item {
  margin-bottom: 22px;
}

.el-row {
  margin-bottom: 10px;
}
</style>
