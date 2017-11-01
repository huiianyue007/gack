<template>
    <div class="particulars" v-loading="loadingTab">
        <div class="particulars_title">活动详情</div>
        <div v-html="eventInfor" class="particulars_contont"></div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            loadingTab: false,
            eventInfor: ''
        }
    },
    created() {
        if (this.$route.query.id) {
            this.loadingTab = true
            this.$htAjax.post('https://apitest.gack.citic:8083/guoanmaker/operator/eventDetails/getSelectEvent?id=' + this.$route.query.id)
                .then(({ data }) => {
                    if (data.status === 200) {
                        this.eventInfor = data.data[0].eventInfor
                        this.loadingTab = false
                    } else {
                        this.$message.error(data.msg);
                        this.loadingTab = false
                    }
                }).catch(err => {
                });
        }
    }
}
</script>

<style scoped>
.particulars_title {
    display: flex;
    justify-content: center;
    font-size: 18px;
    margin: 20px 0;
    font-weight: bold;
}

.particulars_contont {
    display: flex;
    justify-content: center;
    flex-direction: column
}
</style>


