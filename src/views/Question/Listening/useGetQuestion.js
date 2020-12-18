//#region 选择题目分类
// 导入get请求
import { httpGet } from "@/utils/http";
// 导入接口配置文件
import question from "@/api/questionAPI";
// 引入响应式API
import { ref, onMounted } from "vue";

export function useGetQuestion() {
  // 当前题目分类
  const category = ref("SST");

  // 当前题目标签筛选（默认空字符串为全部）
  const labelId = ref("");

  // 加载状态
  const isLoading = ref(false);

  // 题目列表
  const questionList = ref([]);

  // 总条数
  const total = ref(0);

  // 记录当前页码，每页条数
  const pagenum = ref(1);
  const pagesize = ref(10);

  // 获取题目
  const getQuestion = () => {
    // 开启加载状态
    isLoading.value = true;
    // 发起数据请求
    httpGet(question.GetQuestion, {
      // 二级分类
      category: category.value,
      // 标签
      labelId: labelId.value,
      // 页码
      pageNum: pagenum.value,
      // 分页大小
      pageSize: pagesize.value,
      // 类型  1.听
      type: 1
    })
      .then(res => {
        let { success, data } = res;
        // 如果数据获取成功
        if (success) {
          // 保存数据
          questionList.value = data.records;
          console.log(data);
          // 记录数据库中的数据总数
          total.value = data.total;
          // 关闭加载状态
          isLoading.value = false;
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // 跳转页码时
  function changePagenum({ current, pageSize }) {
    // 根据分页器的 page, size 刷新页面
    pagenum.value = current;
    pagesize.value = pageSize;
    getQuestion();
  }

  // 初始化时
  onMounted(() => {
    // 获取题目列表
    getQuestion();
  });

  return {
    category,
    labelId,
    getQuestion,
    questionList,
    isLoading,
    total,
    changePagenum
  };
}
//#endregion
