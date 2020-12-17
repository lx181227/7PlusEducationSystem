// 引入请求方式
import { httpPost } from "@/utils/http";
// 引入请求接口
import word from "@/api/wordPageAPI";
//全局提示
import { message } from "ant-design-vue";
import { ref } from "vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";
import { createVNode } from "vue";
import { Modal } from "ant-design-vue";
export const useDelWord = getWordData => {
  // 点击删除触发的事件
  let delWord = id => {
    id = Array.isArray(id) ? id : [id];
    // 发送请求
    httpPost(word.WordDel, {
      ids: id
    })
      .then(res => {
        // 判断请求是否成功
        if (res.success) {
          // 刷新列表
          getWordData();
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      })
      .catch(err => {
        // 请求失败的回调
        console.log(err);
      });
  };
  // 多选数据
  let wordKeys = ref([]);
  //多选触发事件
  const onSelectChange = selectedRowKeys => {
    wordKeys.value = selectedRowKeys;
  };
  // 删除事件
  const delWords = () => {
    // 判断是否选择
    if (wordKeys.value.length == 0) {
      message.warning("您还没有选择");
      return;
    } else {
      // 二次确认弹出框
      Modal.confirm({
        title: "您确定要删除选中的所有单词吗？",
        icon: createVNode(ExclamationCircleOutlined),
        //确认事件
        onOk() {
          delWord(wordKeys.value);
          wordKeys.value = [];
        },
        // 取消事件
        onCancel() {
          message.info("您已取消删除");
        }
      });
    }
  };
  return {
    delWord,
    wordKeys,
    onSelectChange,
    delWords
  };
};
