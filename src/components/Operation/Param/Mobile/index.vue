<template>
  <div>
    <!-- 页头 start -->
    <a-row>
      <a-col :span="24"
        ><a-button
          type="primary"
          style="float: right;margin-bottom: 15px"
          @click="showAddModal"
          >添加广告图</a-button
        ></a-col
      >
    </a-row>
    <!-- 页头 end -->
    <!-- 表格 start -->
    <a-table
      :row-key="record => record.id"
      :columns="mobileColumn"
      :data-source="mobileList.data"
      :pagination="false"
      bordered
    >
      <template #ad="{ record }">
        <img :src="record.picUrl" style="width: 30%;height: auto" />
      </template>
      <template #operational="{ record }">
        <a-button
          size="small"
          class="modify-btn"
          type="primary"
          @click="showEditModal(record.id)"
          >修改</a-button
        >
        <a-popconfirm
          placement="topRight"
          title="您真的要禁用么?"
          @confirm="changeMobileList(record.id)"
          v-if="record.enabled === 1"
        >
          <a-button size="small" type="danger" style="margin: 0 10px"
            >禁用</a-button
          >
        </a-popconfirm>
        <a-button
          size="small"
          v-else
          style="margin: 0 10px"
          type="primary"
          @click="changeMobileList(record.id)"
          >启用</a-button
        >
        <a-popconfirm
          placement="topRight"
          title="您真的要删除么?"
          @confirm="delSubmit(record.id)"
        >
          <a-button size="small" type="danger">删除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
    <!-- 表格 end -->
    <!-- 添加模态框 start -->
    <a-modal
      title="添加广告图"
      v-model:visible="addModalVisible"
      @ok="addSubmit"
      @cancel="addCancel"
    >
      <a-form :model="addModel" :rules="addRule" ref="addRef">
        <a-form-item
          label="顺序值"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          name="sort"
        >
          <a-input v-model:value="addModel.sort"></a-input>
        </a-form-item>
        <a-form-item
          label="名称"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          name="name"
        >
          <a-input v-model:value="addModel.name"></a-input>
        </a-form-item>
        <a-form-item
          label="上传图片"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <ImageUpload :key="+new Date()"></ImageUpload>
        </a-form-item>
        <a-form-item
          label="链接"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          name="link"
        >
          <a-input v-model:value="addModel.link"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 添加模态框 end -->
    <!-- 修改模态框 start -->
    <a-modal
      title="添加广告图"
      v-model:visible="editModalVisible"
      @ok="editSubmit"
      @cancel="editCancel"
    >
      <a-form :model="editModel" :rules="addRule" ref="editRef">
        <a-form-item
          label="顺序值"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          name="sort"
        >
          <a-input v-model:value="editModel.sort"></a-input>
        </a-form-item>
        <a-form-item
          label="名称"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          name="name"
        >
          <a-input v-model:value="editModel.name"></a-input>
        </a-form-item>
        <a-form-item
          label="上传图片"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
        >
          <ImageUpload :key="+new Date()"></ImageUpload>
        </a-form-item>
        <a-form-item
          label="链接"
          has-feedback
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 18 }"
          name="link"
        >
          <a-input v-model:value="editModel.link"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 修改模态框 end -->
  </div>
</template>

<script>
// 引入列表格式
import { useMobileColumn } from "./useMobileColumn";
// 引入获取移动端广告列表方法
import { useGetMobileList } from "./useGetMobileList";
// 引入更改移动端广告列表状态方法
import { useChangeMobileList } from "./useChangeMobileList";
// 引入添加移动端广告方法
import { useAddMobileList } from "./useAddMobileList";
// 引入编辑移动端广告方法
import { useEditMobileList } from "./useEditMobileList";
// 引入删除移动端广告方法
import { useDelMobileList } from "./useDelMobileList";
// 引入上传图片组件
import ImageUpload from "@/components/ImageUpload";
// 引入公共储存库
import { useStore } from "vuex";

export default {
  components: {
    ImageUpload
  },
  setup() {
    // 使用公共储存库
    const store = useStore();

    //#region 获取列表格式
    const { mobileColumn } = useMobileColumn();
    //#endregion

    //#region 获取移动端广告数据
    const { mobileList, getMobileList } = useGetMobileList();
    //#endregion

    //#region 更改移动端广告列表状态方法
    const { changeMobileList } = useChangeMobileList(getMobileList);
    //#endregion

    //#region 添加移动端广告列表方法
    const {
      addModalVisible,
      addRef,
      addModel,
      addRule,
      showAddModal,
      addSubmit,
      addCancel
    } = useAddMobileList(store, getMobileList);
    //#endregion

    //#region 编辑移动端广告列表方法
    const {
      editModalVisible,
      editRef,
      editModel,
      showEditModal,
      editSubmit,
      editCancel
    } = useEditMobileList(store, getMobileList);
    //#endregion

    //#region 删除移动端广告列表方法
    const { delSubmit } = useDelMobileList(getMobileList);
    //#endregion

    return {
      //#region 获取表格格式
      mobileColumn,
      //#endregion
      //#region 获取移动端广告数据
      mobileList,
      //#endregion
      //#region 更改移动端列表状态
      changeMobileList,
      //#endregion
      //#region 添加移动端广告方法
      addModalVisible,
      addRef,
      addModel,
      addRule,
      showAddModal,
      addSubmit,
      addCancel,
      //#endregion
      //#region 编辑移动端广告方法
      editModalVisible,
      editRef,
      editModel,
      showEditModal,
      editSubmit,
      editCancel,
      //#endregion
      //#region 删除移动端广告方法
      delSubmit
      //#endregion
    };
  }
};
</script>

<style scoped></style>
