<template>
  <el-card class="order-container">
    <div class="data">
      <el-card class="data-item" shadow="hover">
        <template #header>
          <span>订单状态</span>
        </template>
        <div>
          {{data.orderStatusString }}
        </div>
      </el-card>
      <el-card class="data-item" shadow="hover">
        <template #header>
          <span>创建时间</span>
        </template>
        <div>
          {{data.createTime }}
        </div>
      </el-card>
      <el-card class="data-item" shadow="hover">
        <template #header>
          <span>订单号</span>
        </template>
        <div>
          {{data.orderNo }}
        </div>
      </el-card>
    </div>
  </el-card>
  <el-table
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
  >
    <el-table-column
      label="商品图片"
    >
      <template #default="scope">
        <img
          style="width: 100px" :key="scope.row.goodsId"
          :src="$filters.prefix(scope.row.goodsCoverImg)"
          alt="商品主图">
      </template>
    </el-table-column>
    <el-table-column
      prop="goodsId"
      label="商品编号"
    >
    </el-table-column>
    <el-table-column
      prop="goodsName"
      label="商品名"
    ></el-table-column>
    <el-table-column
      prop="goodsCount"
      label="商品数量"
    >
    </el-table-column>
    <el-table-column
      prop="sellingPrice"
      label="价格"
    >
    </el-table-column>
  </el-table>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import { useRoute } from "vue-router"
import axios from '@/utils/axios'
export default {
  name: "OrderDetail",
  setup() {
    const route = useRoute()
    const { id } = route.query
    const state = reactive({
      data: {},
      tableData: []
    })
    onMounted(() => {
      axios.get(`/orders/${id}`)
        .then(res => {
          const { newBeeMallOrderItemVOS } = res
          state.data = res
          state.tableData = newBeeMallOrderItemVOS
        })
    })
    return {
      ...toRefs(state)
    }
  }
}
</script>

<style scoped>
.data {
  display: flex;
  margin-bottom: 50px;
}
.data .data-item {
  flex: 1;
  margin: 0 10px;
}
.el-table {
  border: 1px solid #EBEEF5;
  border-bottom: none;
}
.has-gutter th {
  border-right: 1px solid #EBEEF5;
}

.has-gutter th:last-child {
  border-right: none;
}
.el-table__row td {
  border-right: 1px solid #EBEEF5;
}
.el-table__row td:last-child {
  border-right: none;
}
</style>