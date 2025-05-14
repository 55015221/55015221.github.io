import { defineStore } from "pinia";

const useDictStore = defineStore("dict", () => {
  const attrTypeDict = [
    { label: "文本框", value: "text" },
    { label: "单选框", value: "select" },
    { label: "多选框", value: "checkbox" },
    { label: "图片", value: "image" },
    { label: "文件", value: "file" },
  ];

  return {
    attrTypeDict,
  };
});

export default useDictStore;
