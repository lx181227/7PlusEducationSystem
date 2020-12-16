import { reactive } from "vue";

export const useLogColumns = () => {
  const columns = reactive([
    {
      title: "时间",
      align: "center",
      dataIndex: "createTime"
    },
    {
      title: "IP",
      align: "center",
      dataIndex: "ip"
    },
    {
      title: "登录方式",
      align: "center",
      dataIndex: "channel"
    }
  ]);

  return {
    columns
  };
};
