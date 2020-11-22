<template>
  <section class="creat-case">
    <el-steps :active="stepIndex" finish-status="success">
      <el-step title="填写基本信息"></el-step>
      <el-step title="上传资料"></el-step>
       <el-step title="发布成功"></el-step>
    </el-steps>
    <component :is="step" @stepChange="stepChange"></component>
  </section>
</template>
<script>
import step1 from '../../components/case/publish-step1'
import step2 from '../../components/case/publish-step2'
import step3 from '../../components/case/publish-step3'
export default {
  data (){
    return{
      stepIndex: 1,
      step: 'step1',
    }
  },
  components: {
    step1,
    step2,
    step3,
  },
  methods: {
    stepChange (index) {
      this.stepIndex = index
      this.step = 'step' + index
    }
  },
  created () {
    // let index = sessionStorage.getItem('xiaobuStepIndex') || 1
    // index = Number(index)
    // if (index) {
    //   this.stepIndex = index
    //   this.step = 'step' + index
    // }
  }
}
</script>
<style scoped>
.creat-case{
  padding: 40px;
}
.step-box{
  margin-bottom: 20px;
}
</style>