<template>
    <!--此页面是【监控视频信息页面（显示） 也就是显示简略的信息-->
    <!--之后还会有一个详细的页面，显示视频的详细信息。力例如入侵次数，入侵时间，入侵地点，入侵人员等-->
    <div>
        <!--可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。-->
        <!--可以通过指定 Table 组件的 row-class-name 属性来为 Table 中的某一行添加 class，表明该行处于某种状态。-->
        <el-main>
            
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column label="序号" type="index" width="100"> </el-table-column>
                <el-table-column prop="date" label="日期"></el-table-column>
                <el-table-column prop="state" label="是否异常" width="300"></el-table-column>
                <!-- <el-table-column prop="nickname" label="昵称" width="180">
                </el-table-column> -->

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="handleClick(scope.row)" size="mini">查看</el-button>
                        <el-button type="danger" @click="deleteUser(scope.row)" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <br>

            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="page.page_no" :page-sizes="[5, 10, 15, 20]" :page-size="page.page_size"
                layout="total, sizes, prev, pager, next, jumper" :total="page.table">
            </el-pagination>


        </el-main>
    </div>
</template>
<script>


</script>

<style>
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>
