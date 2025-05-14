<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";

const PageHeader = defineAsyncComponent(() => import("@/components/PageHeader/index.vue"));

const editRef = ref();
const handleSuccess = () => {
  console.log(123);
};

const icon = ref("List");

const onClick = () => {
  editRef.value.open();
};

const formData = reactive({
  description: "_8_yDsRLMaLspxxFfw3vnLGB7Yy9kP1z.png",
  image: "http://static.cms.me/static/20240510/_8_yDsRLMaLspxxFfw3vnLGB7Yy9kP1z.png",
  fileList: [{ url: "http://static.cms.me/static/20240510/_8_yDsRLMaLspxxFfw3vnLGB7Yy9kP1z.png" }, { url: "http://static.cms.me/static/20240510/9aXZqyXna0vWFc4wdyqyGG7r2s0wz1BE.png" }],
});
const defaultProps = {
  children: "children",
  label: "name",
};
const jsonData = [
  {
    id: 1,
    name: "打包管理",
    parentId: 0,
    children: [
      {
        id: 2,
        name: "打包管理",
        parentId: 1,
        children: [
          {
            id: 353,
            name: "打包管理-查看",
            parentId: 2,
          },
          {
            id: 354,
            name: "打包管理-新增",
            parentId: 2,
          },
          {
            id: 355,
            name: "打包管理-修改",
            parentId: 2,
          },
          {
            id: 356,
            name: "打包管理-删除",
            parentId: 2,
          },
          {
            id: 625,
            name: "高级广告配置-查询",
            parentId: 2,
          },
          {
            id: 626,
            name: "支付配置-查看",
            parentId: 2,
          },
          {
            id: 627,
            name: "配置开关权限",
            parentId: 2,
          },
          {
            id: 630,
            name: "数据可操作权限",
            parentId: 2,
          },
          {
            id: 653,
            name: "一键提包权限",
            parentId: 2,
          },
          {
            id: 654,
            name: "秘钥-查看",
            parentId: 2,
          },
          {
            id: 655,
            name: "归因配置权限",
            parentId: 2,
          },
          {
            id: 656,
            name: "爱剪辑打包权限",
            parentId: 2,
          },
          {
            id: 657,
            name: "加固权限",
            parentId: 2,
          },
          {
            id: 658,
            name: "用户系统",
            parentId: 2,
          },
          {
            id: 659,
            name: "推广配置-查看",
            parentId: 2,
          },
          {
            id: 660,
            name: "市场配置-模块",
            parentId: 2,
          },
          {
            id: 663,
            name: "签名信息权限",
            parentId: 2,
          },
          {
            id: 680,
            name: "高级广告配置-修改",
            parentId: 2,
          },
          {
            id: 681,
            name: "网站配置权限",
            parentId: 2,
          },
          {
            id: 682,
            name: "支付配置-修改",
            parentId: 2,
          },
          {
            id: 683,
            name: "秘钥-修改",
            parentId: 2,
          },
          {
            id: 684,
            name: "投放配置-查看",
            parentId: 2,
          },
          {
            id: 685,
            name: "投放配置-修改",
            parentId: 2,
          },
          {
            id: 686,
            name: "推广配置-修改",
            parentId: 2,
          },
          {
            id: 687,
            name: "更新按钮-权限",
            parentId: 2,
          },
          {
            id: 688,
            name: "提包记录-查看",
            parentId: 2,
          },
          {
            id: 689,
            name: "市场-修改",
            parentId: 2,
          },
          {
            id: 690,
            name: "市场-新增",
            parentId: 2,
          },
          {
            id: 691,
            name: "打包任务-查看",
            parentId: 2,
          },
          {
            id: 692,
            name: "打包任务-新增",
            parentId: 2,
          },
          {
            id: 693,
            name: "打包记录-查看",
            parentId: 2,
          },
          {
            id: 694,
            name: "同步到测试环境权限",
            parentId: 2,
          },
        ],
      },
      {
        id: 3,
        name: "秘钥管理",
        parentId: 1,
        children: [
          {
            id: 357,
            name: "秘钥管理-查看",
            parentId: 3,
          },
          {
            id: 358,
            name: "秘钥管理-新增",
            parentId: 3,
          },
          {
            id: 359,
            name: "秘钥管理-修改",
            parentId: 3,
          },
          {
            id: 360,
            name: "秘钥管理-删除",
            parentId: 3,
          },
        ],
      },
      {
        id: 4,
        name: "主体管理",
        parentId: 1,
        children: [
          {
            id: 361,
            name: "主体管理-查看",
            parentId: 4,
          },
          {
            id: 362,
            name: "主体管理-新增",
            parentId: 4,
          },
          {
            id: 363,
            name: "主体管理-修改",
            parentId: 4,
          },
          {
            id: 364,
            name: "主体管理-删除",
            parentId: 4,
          },
        ],
      },
      {
        id: 5,
        name: "日志管理",
        parentId: 1,
        children: [
          {
            id: 365,
            name: "日志管理-查看",
            parentId: 5,
          },
          {
            id: 366,
            name: "日志管理-新增",
            parentId: 5,
          },
          {
            id: 367,
            name: "日志管理-修改",
            parentId: 5,
          },
          {
            id: 368,
            name: "日志管理-删除",
            parentId: 5,
          },
        ],
      },
      {
        id: 633,
        name: "Git审核",
        parentId: 1,
        children: [
          {
            id: 703,
            name: "Git审核-查看",
            parentId: 633,
          },
          {
            id: 704,
            name: "Git审核-新增",
            parentId: 633,
          },
          {
            id: 705,
            name: "Git审核-修改",
            parentId: 633,
          },
          {
            id: 706,
            name: "Git审核-删除",
            parentId: 633,
          },
        ],
      },
      {
        id: 634,
        name: "网站配置",
        parentId: 1,
        children: [
          {
            id: 737,
            name: "网站配置-查看",
            parentId: 634,
          },
          {
            id: 738,
            name: "网站配置-新增",
            parentId: 634,
          },
          {
            id: 739,
            name: "网站配置-修改",
            parentId: 634,
          },
          {
            id: 740,
            name: "网站配置-删除",
            parentId: 634,
          },
        ],
      },
      {
        id: 635,
        name: "打包记录",
        parentId: 1,
        children: [
          {
            id: 695,
            name: "打包记录-查看",
            parentId: 635,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "任务管理",
    parentId: 0,
    children: [
      {
        id: 8,
        name: "APP管理",
        parentId: 6,
        children: [
          {
            id: 373,
            name: "APP管理-查看",
            parentId: 8,
          },
          {
            id: 374,
            name: "APP管理-新增",
            parentId: 8,
          },
          {
            id: 375,
            name: "APP管理-修改",
            parentId: 8,
          },
          {
            id: 376,
            name: "APP管理-删除",
            parentId: 8,
          },
          {
            id: 662,
            name: "新包-合作包",
            parentId: 8,
          },
        ],
      },
      {
        id: 9,
        name: "任务管理",
        parentId: 6,
        children: [
          {
            id: 377,
            name: "任务管理-查看",
            parentId: 9,
          },
          {
            id: 378,
            name: "任务管理-新增",
            parentId: 9,
          },
          {
            id: 379,
            name: "任务管理-修改",
            parentId: 9,
          },
          {
            id: 380,
            name: "任务管理-删除",
            parentId: 9,
          },
        ],
      },
    ],
  },
  {
    id: 10,
    name: "后台管理",
    parentId: 0,
    children: [
      {
        id: 11,
        name: "部门管理",
        parentId: 10,
        children: [
          {
            id: 381,
            name: "部门管理-查看",
            parentId: 11,
          },
          {
            id: 382,
            name: "部门管理-新增",
            parentId: 11,
          },
          {
            id: 383,
            name: "部门管理-修改",
            parentId: 11,
          },
          {
            id: 384,
            name: "部门管理-删除",
            parentId: 11,
          },
        ],
      },
      {
        id: 12,
        name: "后台用户",
        parentId: 10,
        children: [
          {
            id: 385,
            name: "用户管理-查看",
            parentId: 12,
          },
          {
            id: 386,
            name: "用户管理-新增",
            parentId: 12,
          },
          {
            id: 387,
            name: "用户管理-修改",
            parentId: 12,
          },
          {
            id: 388,
            name: "用户管理-删除",
            parentId: 12,
          },
          {
            id: 661,
            name: "部门用户产品管理",
            parentId: 12,
          },
        ],
      },
      {
        id: 13,
        name: "角色管理",
        parentId: 10,
        children: [
          {
            id: 389,
            name: "角色管理-查看",
            parentId: 13,
          },
          {
            id: 390,
            name: "角色管理-新增",
            parentId: 13,
          },
          {
            id: 391,
            name: "角色管理-修改",
            parentId: 13,
          },
          {
            id: 392,
            name: "角色管理-删除",
            parentId: 13,
          },
        ],
      },
      {
        id: 14,
        name: "权限管理",
        parentId: 10,
        children: [
          {
            id: 393,
            name: "权限管理-查看",
            parentId: 14,
          },
          {
            id: 394,
            name: "权限管理-新增",
            parentId: 14,
          },
          {
            id: 395,
            name: "权限管理-修改",
            parentId: 14,
          },
          {
            id: 396,
            name: "权限管理-删除",
            parentId: 14,
          },
        ],
      },
    ],
  },
  {
    id: 15,
    name: "组件管理",
    parentId: 0,
    children: [
      {
        id: 16,
        name: "组件管理",
        parentId: 15,
        children: [
          {
            id: 397,
            name: "组件管理-查看",
            parentId: 16,
          },
          {
            id: 398,
            name: "组件管理-新增",
            parentId: 16,
          },
          {
            id: 399,
            name: "组件管理-修改",
            parentId: 16,
          },
          {
            id: 400,
            name: "组件管理-删除",
            parentId: 16,
          },
        ],
      },
      {
        id: 17,
        name: "下架组件",
        parentId: 15,
        children: [
          {
            id: 401,
            name: "下架组件-查看",
            parentId: 17,
          },
          {
            id: 402,
            name: "下架组件-新增",
            parentId: 17,
          },
          {
            id: 403,
            name: "下架组件-修改",
            parentId: 17,
          },
          {
            id: 404,
            name: "下架组件-删除",
            parentId: 17,
          },
        ],
      },
      {
        id: 631,
        name: "组件版本管理",
        parentId: 15,
        children: [
          {
            id: 664,
            name: "组件版本管理-查看",
            parentId: 631,
          },
          {
            id: 665,
            name: "组件版本管理-修改",
            parentId: 631,
          },
        ],
      },
      {
        id: 632,
        name: "版本记录",
        parentId: 15,
        children: [
          {
            id: 733,
            name: "版本记录-查看",
            parentId: 632,
          },
          {
            id: 734,
            name: "版本记录-新增",
            parentId: 632,
          },
          {
            id: 735,
            name: "版本记录-修改",
            parentId: 632,
          },
          {
            id: 736,
            name: "版本记录-删除",
            parentId: 632,
          },
        ],
      },
    ],
  },
  {
    id: 18,
    name: "退款管理",
    parentId: 0,
    children: [
      {
        id: 19,
        name: "爱剪辑订单管理",
        parentId: 18,
        children: [
          {
            id: 405,
            name: "爱剪辑订单管理-查看",
            parentId: 19,
          },
          {
            id: 406,
            name: "爱剪辑订单管理-新增",
            parentId: 19,
          },
          {
            id: 407,
            name: "爱剪辑订单管理-修改",
            parentId: 19,
          },
          {
            id: 408,
            name: "爱剪辑订单管理-删除",
            parentId: 19,
          },
        ],
      },
      {
        id: 20,
        name: "订单管理",
        parentId: 18,
        children: [
          {
            id: 409,
            name: "订单管理-查看",
            parentId: 20,
          },
          {
            id: 410,
            name: "订单管理-新增",
            parentId: 20,
          },
          {
            id: 411,
            name: "订单管理-修改",
            parentId: 20,
          },
          {
            id: 412,
            name: "订单管理-删除",
            parentId: 20,
          },
        ],
      },
      {
        id: 21,
        name: "投诉单管理",
        parentId: 18,
        children: [
          {
            id: 413,
            name: "投诉单管理-查看",
            parentId: 21,
          },
          {
            id: 414,
            name: "投诉单管理-新增",
            parentId: 21,
          },
          {
            id: 415,
            name: "投诉单管理-修改",
            parentId: 21,
          },
          {
            id: 416,
            name: "投诉单管理-删除",
            parentId: 21,
          },
        ],
      },
      {
        id: 22,
        name: "退款单管理",
        parentId: 18,
        children: [
          {
            id: 417,
            name: "退款单管理-查看",
            parentId: 22,
          },
          {
            id: 418,
            name: "退款单管理-新增",
            parentId: 22,
          },
          {
            id: 419,
            name: "退款单管理-修改",
            parentId: 22,
          },
          {
            id: 420,
            name: "退款单管理-删除",
            parentId: 22,
          },
        ],
      },
      {
        id: 23,
        name: "退款开关配置",
        parentId: 18,
        children: [
          {
            id: 421,
            name: "退款开关配置-查看",
            parentId: 23,
          },
          {
            id: 422,
            name: "退款开关配置-新增",
            parentId: 23,
          },
          {
            id: 423,
            name: "退款开关配置-修改",
            parentId: 23,
          },
          {
            id: 424,
            name: "退款开关配置-删除",
            parentId: 23,
          },
        ],
      },
      {
        id: 24,
        name: "产品退款比例",
        parentId: 18,
        children: [
          {
            id: 425,
            name: "产品退款比例-查看",
            parentId: 24,
          },
          {
            id: 426,
            name: "产品退款比例-新增",
            parentId: 24,
          },
          {
            id: 427,
            name: "产品退款比例-修改",
            parentId: 24,
          },
          {
            id: 428,
            name: "产品退款比例-删除",
            parentId: 24,
          },
        ],
      },
      {
        id: 25,
        name: "用户退款申请",
        parentId: 18,
        children: [
          {
            id: 429,
            name: "用户退款申请-查看",
            parentId: 25,
          },
          {
            id: 430,
            name: "用户退款申请-新增",
            parentId: 25,
          },
          {
            id: 431,
            name: "用户退款申请-修改",
            parentId: 25,
          },
          {
            id: 432,
            name: "用户退款申请-删除",
            parentId: 25,
          },
        ],
      },
      {
        id: 636,
        name: "次数订单",
        parentId: 18,
        children: [
          {
            id: 729,
            name: "次数订单-查看",
            parentId: 636,
          },
          {
            id: 730,
            name: "次数订单-新增",
            parentId: 636,
          },
          {
            id: 731,
            name: "次数订单-修改",
            parentId: 636,
          },
          {
            id: 732,
            name: "次数订单-删除",
            parentId: 636,
          },
        ],
      },
    ],
  },
  {
    id: 26,
    name: "资源管理",
    parentId: 0,
    children: [
      {
        id: 7,
        name: "分类管理",
        parentId: 26,
        children: [
          {
            id: 369,
            name: "分类管理-查看",
            parentId: 7,
          },
          {
            id: 370,
            name: "分类管理-新增",
            parentId: 7,
          },
          {
            id: 371,
            name: "分类管理-修改",
            parentId: 7,
          },
          {
            id: 372,
            name: "分类管理-删除",
            parentId: 7,
          },
        ],
      },
      {
        id: 27,
        name: "播单分类管理",
        parentId: 26,
        children: [
          {
            id: 433,
            name: "播单分类管理-查看",
            parentId: 27,
          },
          {
            id: 434,
            name: "播单分类管理-新增",
            parentId: 27,
          },
          {
            id: 435,
            name: "播单分类管理-修改",
            parentId: 27,
          },
          {
            id: 436,
            name: "播单分类管理-删除",
            parentId: 27,
          },
        ],
      },
      {
        id: 28,
        name: "微信文章管理",
        parentId: 26,
        children: [
          {
            id: 437,
            name: "微信文章管理-查看",
            parentId: 28,
          },
          {
            id: 438,
            name: "微信文章管理-新增",
            parentId: 28,
          },
          {
            id: 439,
            name: "微信文章管理-修改",
            parentId: 28,
          },
          {
            id: 440,
            name: "微信文章管理-删除",
            parentId: 28,
          },
        ],
      },
      {
        id: 29,
        name: "db资源管理",
        parentId: 26,
        children: [
          {
            id: 441,
            name: "db资源管理-查看",
            parentId: 29,
          },
          {
            id: 442,
            name: "db资源管理-新增",
            parentId: 29,
          },
          {
            id: 443,
            name: "db资源管理-修改",
            parentId: 29,
          },
          {
            id: 444,
            name: "db资源管理-删除",
            parentId: 29,
          },
        ],
      },
      {
        id: 637,
        name: "公共播单管理",
        parentId: 26,
        children: [
          {
            id: 709,
            name: "公共播单管理-查看",
            parentId: 637,
          },
          {
            id: 710,
            name: "公共播单管理-新增",
            parentId: 637,
          },
          {
            id: 711,
            name: "公共播单管理-修改",
            parentId: 637,
          },
          {
            id: 712,
            name: "公共播单管理-删除",
            parentId: 637,
          },
        ],
      },
      {
        id: 638,
        name: "视频列表",
        parentId: 26,
        children: [
          {
            id: 741,
            name: "视频列表-查看",
            parentId: 638,
          },
          {
            id: 742,
            name: "视频列表-新增",
            parentId: 638,
          },
          {
            id: 743,
            name: "视频列表-修改",
            parentId: 638,
          },
          {
            id: 744,
            name: "视频列表-删除",
            parentId: 638,
          },
        ],
      },
      {
        id: 639,
        name: "分类播单管理",
        parentId: 26,
        children: [
          {
            id: 713,
            name: "分类播单管理-查看",
            parentId: 639,
          },
          {
            id: 714,
            name: "分类播单管理-新增",
            parentId: 639,
          },
          {
            id: 715,
            name: "分类播单管理-修改",
            parentId: 639,
          },
          {
            id: 716,
            name: "分类播单管理-删除",
            parentId: 639,
          },
        ],
      },
    ],
  },
  {
    id: 30,
    name: "通用资源管理",
    parentId: 0,
    children: [
      {
        id: 31,
        name: "公共素材管理",
        parentId: 30,
        children: [
          {
            id: 445,
            name: "公共素材管理-查看",
            parentId: 31,
          },
          {
            id: 446,
            name: "公共素材管理-新增",
            parentId: 31,
          },
          {
            id: 447,
            name: "公共素材管理-修改",
            parentId: 31,
          },
          {
            id: 448,
            name: "公共素材管理-删除",
            parentId: 31,
          },
        ],
      },
      {
        id: 32,
        name: "公共目录管理",
        parentId: 30,
        children: [
          {
            id: 449,
            name: "公共素材分类-查看",
            parentId: 32,
          },
          {
            id: 450,
            name: "公共素材分类-新增",
            parentId: 32,
          },
          {
            id: 451,
            name: "公共素材分类-修改",
            parentId: 32,
          },
          {
            id: 452,
            name: "公共素材分类-删除",
            parentId: 32,
          },
        ],
      },
      {
        id: 33,
        name: "产品素材管理",
        parentId: 30,
        children: [
          {
            id: 453,
            name: "公共素材目录-查看",
            parentId: 33,
          },
          {
            id: 454,
            name: "公共素材目录-新增",
            parentId: 33,
          },
          {
            id: 455,
            name: "公共素材目录-修改",
            parentId: 33,
          },
          {
            id: 456,
            name: "公共素材目录-删除",
            parentId: 33,
          },
        ],
      },
      {
        id: 34,
        name: "产品目录管理",
        parentId: 30,
        children: [
          {
            id: 457,
            name: "公共素材目录(总)-查看",
            parentId: 34,
          },
          {
            id: 458,
            name: "公共素材目录(总)-新增",
            parentId: 34,
          },
          {
            id: 459,
            name: "公共素材目录(总)-修改",
            parentId: 34,
          },
          {
            id: 460,
            name: "公共素材目录(总)-删除",
            parentId: 34,
          },
        ],
      },
      {
        id: 640,
        name: "产品管理",
        parentId: 30,
        children: [
          {
            id: 745,
            name: "产品管理-查看",
            parentId: 640,
          },
          {
            id: 746,
            name: "产品管理-新增",
            parentId: 640,
          },
          {
            id: 747,
            name: "产品管理-修改",
            parentId: 640,
          },
          {
            id: 748,
            name: "产品管理-删除",
            parentId: 640,
          },
        ],
      },
    ],
  },
  {
    id: 35,
    name: "用户系统",
    parentId: 0,
    children: [
      {
        id: 36,
        name: "用户管理",
        parentId: 35,
        children: [
          {
            id: 461,
            name: "用户管理-查看",
            parentId: 36,
          },
          {
            id: 462,
            name: "用户管理-新增",
            parentId: 36,
          },
          {
            id: 463,
            name: "用户管理-修改",
            parentId: 36,
          },
          {
            id: 464,
            name: "用户管理-删除",
            parentId: 36,
          },
        ],
      },
      {
        id: 37,
        name: "商品管理",
        parentId: 35,
        children: [
          {
            id: 465,
            name: "商品管理-查看",
            parentId: 37,
          },
          {
            id: 466,
            name: "商品管理-新增",
            parentId: 37,
          },
          {
            id: 467,
            name: "商品管理-修改",
            parentId: 37,
          },
          {
            id: 468,
            name: "商品管理-删除",
            parentId: 37,
          },
        ],
      },
      {
        id: 38,
        name: "订单数据",
        parentId: 35,
        children: [
          {
            id: 469,
            name: "订单数据-查看",
            parentId: 38,
          },
          {
            id: 470,
            name: "订单数据-新增",
            parentId: 38,
          },
          {
            id: 471,
            name: "订单数据-修改",
            parentId: 38,
          },
          {
            id: 472,
            name: "订单数据-删除",
            parentId: 38,
          },
        ],
      },
      {
        id: 39,
        name: "订阅订单",
        parentId: 35,
        children: [
          {
            id: 473,
            name: "订阅订单-查看",
            parentId: 39,
          },
          {
            id: 474,
            name: "订阅订单-新增",
            parentId: 39,
          },
          {
            id: 475,
            name: "订阅订单-修改",
            parentId: 39,
          },
          {
            id: 476,
            name: "订阅订单-删除",
            parentId: 39,
          },
        ],
      },
      {
        id: 40,
        name: "帮助中心",
        parentId: 35,
        children: [
          {
            id: 477,
            name: "订阅订单2-查看",
            parentId: 40,
          },
          {
            id: 478,
            name: "订阅订单2-新增",
            parentId: 40,
          },
          {
            id: 479,
            name: "订阅订单2-修改",
            parentId: 40,
          },
          {
            id: 480,
            name: "订阅订单2-删除",
            parentId: 40,
          },
        ],
      },
      {
        id: 41,
        name: "订阅统计",
        parentId: 35,
        children: [
          {
            id: 481,
            name: "订阅统计-查看",
            parentId: 41,
          },
          {
            id: 482,
            name: "订阅统计-新增",
            parentId: 41,
          },
          {
            id: 483,
            name: "订阅统计-修改",
            parentId: 41,
          },
          {
            id: 484,
            name: "订阅统计-删除",
            parentId: 41,
          },
        ],
      },
      {
        id: 42,
        name: "一元订阅统计",
        parentId: 35,
        children: [
          {
            id: 485,
            name: "一元订阅统计-查看",
            parentId: 42,
          },
          {
            id: 486,
            name: "一元订阅统计-新增",
            parentId: 42,
          },
          {
            id: 487,
            name: "一元订阅统计-修改",
            parentId: 42,
          },
          {
            id: 488,
            name: "一元订阅统计-删除",
            parentId: 42,
          },
        ],
      },
      {
        id: 43,
        name: "优惠券",
        parentId: 35,
        children: [
          {
            id: 489,
            name: "优惠券-查看",
            parentId: 43,
          },
          {
            id: 490,
            name: "优惠券-新增",
            parentId: 43,
          },
          {
            id: 491,
            name: "优惠券-修改",
            parentId: 43,
          },
          {
            id: 492,
            name: "优惠券-删除",
            parentId: 43,
          },
        ],
      },
      {
        id: 44,
        name: "次数商品",
        parentId: 35,
        children: [
          {
            id: 493,
            name: "次数商品-查看",
            parentId: 44,
          },
          {
            id: 494,
            name: "次数商品-新增",
            parentId: 44,
          },
          {
            id: 495,
            name: "次数商品-修改",
            parentId: 44,
          },
          {
            id: 496,
            name: "次数商品-删除",
            parentId: 44,
          },
        ],
      },
      {
        id: 45,
        name: "次数订单",
        parentId: 35,
        children: [
          {
            id: 497,
            name: "次数订单-查看",
            parentId: 45,
          },
          {
            id: 498,
            name: "次数订单-新增",
            parentId: 45,
          },
          {
            id: 499,
            name: "次数订单-修改",
            parentId: 45,
          },
          {
            id: 500,
            name: "次数订单-删除",
            parentId: 45,
          },
          {
            id: 725,
            name: "次数订单-查看",
            parentId: 45,
          },
          {
            id: 726,
            name: "次数订单-新增",
            parentId: 45,
          },
          {
            id: 727,
            name: "次数订单-修改",
            parentId: 45,
          },
          {
            id: 728,
            name: "次数订单-删除",
            parentId: 45,
          },
        ],
      },
      {
        id: 46,
        name: "用户次数",
        parentId: 35,
        children: [
          {
            id: 501,
            name: "用户次数-查看",
            parentId: 46,
          },
          {
            id: 502,
            name: "用户次数-新增",
            parentId: 46,
          },
          {
            id: 503,
            name: "用户次数-修改",
            parentId: 46,
          },
          {
            id: 504,
            name: "用户次数-删除",
            parentId: 46,
          },
        ],
      },
      {
        id: 47,
        name: "优惠券统计",
        parentId: 35,
        children: [
          {
            id: 505,
            name: "优惠券统计-查看",
            parentId: 47,
          },
          {
            id: 506,
            name: "优惠券统计-新增",
            parentId: 47,
          },
          {
            id: 507,
            name: "优惠券统计-修改",
            parentId: 47,
          },
          {
            id: 508,
            name: "优惠券统计-删除",
            parentId: 47,
          },
        ],
      },
      {
        id: 48,
        name: "意见反馈",
        parentId: 35,
        children: [
          {
            id: 509,
            name: "意见反馈-查看",
            parentId: 48,
          },
          {
            id: 510,
            name: "意见反馈-新增",
            parentId: 48,
          },
          {
            id: 511,
            name: "意见反馈-修改",
            parentId: 48,
          },
          {
            id: 512,
            name: "意见反馈-删除",
            parentId: 48,
          },
        ],
      },
      {
        id: 49,
        name: "需求调研",
        parentId: 35,
        children: [
          {
            id: 513,
            name: "需求调研-查看",
            parentId: 49,
          },
          {
            id: 514,
            name: "需求调研-新增",
            parentId: 49,
          },
          {
            id: 515,
            name: "需求调研-修改",
            parentId: 49,
          },
          {
            id: 516,
            name: "需求调研-删除",
            parentId: 49,
          },
        ],
      },
    ],
  },
  {
    id: 51,
    name: "网赚配置",
    parentId: 0,
    children: [
      {
        id: 52,
        name: "金币配置",
        parentId: 51,
        children: [
          {
            id: 521,
            name: "金币配置-查看",
            parentId: 52,
          },
          {
            id: 522,
            name: "金币配置-新增",
            parentId: 52,
          },
          {
            id: 523,
            name: "金币配置-修改",
            parentId: 52,
          },
          {
            id: 524,
            name: "金币配置-删除",
            parentId: 52,
          },
        ],
      },
      {
        id: 53,
        name: "提现配置",
        parentId: 51,
        children: [
          {
            id: 525,
            name: "提现配置-查看",
            parentId: 53,
          },
          {
            id: 526,
            name: "提现配置-新增",
            parentId: 53,
          },
          {
            id: 527,
            name: "提现配置-修改",
            parentId: 53,
          },
          {
            id: 528,
            name: "提现配置-删除",
            parentId: 53,
          },
        ],
      },
      {
        id: 54,
        name: "广告配置",
        parentId: 51,
        children: [
          {
            id: 529,
            name: "广告配置-查看",
            parentId: 54,
          },
          {
            id: 530,
            name: "广告配置-新增",
            parentId: 54,
          },
          {
            id: 531,
            name: "广告配置-修改",
            parentId: 54,
          },
          {
            id: 532,
            name: "广告配置-删除",
            parentId: 54,
          },
        ],
      },
      {
        id: 55,
        name: "邀请配置",
        parentId: 51,
        children: [
          {
            id: 533,
            name: "邀请配置-查看",
            parentId: 55,
          },
          {
            id: 534,
            name: "邀请配置-新增",
            parentId: 55,
          },
          {
            id: 535,
            name: "邀请配置-修改",
            parentId: 55,
          },
          {
            id: 536,
            name: "邀请配置-删除",
            parentId: 55,
          },
        ],
      },
      {
        id: 56,
        name: "签到配置",
        parentId: 51,
        children: [
          {
            id: 537,
            name: "签到配置-查看",
            parentId: 56,
          },
          {
            id: 538,
            name: "签到配置-新增",
            parentId: 56,
          },
          {
            id: 539,
            name: "签到配置-修改",
            parentId: 56,
          },
          {
            id: 540,
            name: "签到配置-删除",
            parentId: 56,
          },
        ],
      },
      {
        id: 57,
        name: "任务配置",
        parentId: 51,
        children: [
          {
            id: 541,
            name: "任务配置-查看",
            parentId: 57,
          },
          {
            id: 542,
            name: "任务配置-新增",
            parentId: 57,
          },
          {
            id: 543,
            name: "任务配置-修改",
            parentId: 57,
          },
          {
            id: 544,
            name: "任务配置-删除",
            parentId: 57,
          },
        ],
      },
      {
        id: 58,
        name: "通用配置",
        parentId: 51,
        children: [
          {
            id: 545,
            name: "通用配置-查看",
            parentId: 58,
          },
          {
            id: 546,
            name: "通用配置-新增",
            parentId: 58,
          },
          {
            id: 547,
            name: "通用配置-修改",
            parentId: 58,
          },
          {
            id: 548,
            name: "通用配置-删除",
            parentId: 58,
          },
        ],
      },
      {
        id: 59,
        name: "新人签到",
        parentId: 51,
        children: [
          {
            id: 549,
            name: "新人签到-查看",
            parentId: 59,
          },
          {
            id: 550,
            name: "新人签到-新增",
            parentId: 59,
          },
          {
            id: 551,
            name: "新人签到-修改",
            parentId: 59,
          },
          {
            id: 552,
            name: "新人签到-删除",
            parentId: 59,
          },
        ],
      },
      {
        id: 641,
        name: "提现统计",
        parentId: 51,
        children: [
          {
            id: 717,
            name: "提现统计-查看",
            parentId: 641,
          },
          {
            id: 718,
            name: "提现统计-新增",
            parentId: 641,
          },
          {
            id: 719,
            name: "提现统计-修改",
            parentId: 641,
          },
          {
            id: 720,
            name: "提现统计-删除",
            parentId: 641,
          },
        ],
      },
    ],
  },
  {
    id: 60,
    name: "邮箱管理",
    parentId: 0,
    children: [
      {
        id: 61,
        name: "邮箱管理",
        parentId: 60,
        children: [
          {
            id: 553,
            name: "邮箱管理-查看",
            parentId: 61,
          },
          {
            id: 554,
            name: "邮箱管理-新增",
            parentId: 61,
          },
          {
            id: 555,
            name: "邮箱管理-修改",
            parentId: 61,
          },
          {
            id: 556,
            name: "邮箱管理-删除",
            parentId: 61,
          },
        ],
      },
      {
        id: 62,
        name: "整改邮件管理",
        parentId: 60,
        children: [
          {
            id: 557,
            name: "整改邮件管理-查看",
            parentId: 62,
          },
          {
            id: 558,
            name: "整改邮件管理-新增",
            parentId: 62,
          },
          {
            id: 559,
            name: "整改邮件管理-修改",
            parentId: 62,
          },
          {
            id: 560,
            name: "整改邮件管理-删除",
            parentId: 62,
          },
        ],
      },
    ],
  },
  {
    id: 63,
    name: "产品数据",
    parentId: 0,
    children: [
      {
        id: 64,
        name: "主体数据",
        parentId: 63,
        children: [
          {
            id: 561,
            name: "主体数据-查看",
            parentId: 64,
          },
          {
            id: 562,
            name: "主体数据-新增",
            parentId: 64,
          },
          {
            id: 563,
            name: "主体数据-修改",
            parentId: 64,
          },
          {
            id: 564,
            name: "主体数据-删除",
            parentId: 64,
          },
        ],
      },
      {
        id: 65,
        name: "收益数据",
        parentId: 63,
        children: [
          {
            id: 565,
            name: "收益数据-查看",
            parentId: 65,
          },
          {
            id: 566,
            name: "收益数据-新增",
            parentId: 65,
          },
          {
            id: 567,
            name: "收益数据-修改",
            parentId: 65,
          },
          {
            id: 568,
            name: "收益数据-删除",
            parentId: 65,
          },
        ],
      },
      {
        id: 66,
        name: "订阅数据",
        parentId: 63,
        children: [
          {
            id: 569,
            name: "订阅数据-查看",
            parentId: 66,
          },
          {
            id: 570,
            name: "订阅数据-新增",
            parentId: 66,
          },
          {
            id: 571,
            name: "订阅数据-修改",
            parentId: 66,
          },
          {
            id: 572,
            name: "订阅数据-删除",
            parentId: 66,
          },
        ],
      },
      {
        id: 67,
        name: "广告数据",
        parentId: 63,
        children: [
          {
            id: 573,
            name: "广告数据-查看",
            parentId: 67,
          },
          {
            id: 574,
            name: "广告数据-新增",
            parentId: 67,
          },
          {
            id: 575,
            name: "广告数据-修改",
            parentId: 67,
          },
          {
            id: 576,
            name: "广告数据-删除",
            parentId: 67,
          },
        ],
      },
      {
        id: 68,
        name: "友盟数据",
        parentId: 63,
        children: [
          {
            id: 577,
            name: "友盟数据-查看",
            parentId: 68,
          },
          {
            id: 578,
            name: "友盟数据-新增",
            parentId: 68,
          },
          {
            id: 579,
            name: "友盟数据-修改",
            parentId: 68,
          },
          {
            id: 580,
            name: "友盟数据-删除",
            parentId: 68,
          },
        ],
      },
      {
        id: 69,
        name: "数据分析",
        parentId: 63,
        children: [
          {
            id: 581,
            name: "数据分析-查看",
            parentId: 69,
          },
          {
            id: 582,
            name: "数据分析-新增",
            parentId: 69,
          },
          {
            id: 583,
            name: "数据分析-修改",
            parentId: 69,
          },
          {
            id: 584,
            name: "数据分析-删除",
            parentId: 69,
          },
        ],
      },
      {
        id: 70,
        name: "自定义友盟数据",
        parentId: 63,
        children: [
          {
            id: 585,
            name: "自定义友盟数据-查看",
            parentId: 70,
          },
          {
            id: 586,
            name: "自定义友盟数据-新增",
            parentId: 70,
          },
          {
            id: 587,
            name: "自定义友盟数据-修改",
            parentId: 70,
          },
          {
            id: 588,
            name: "自定义友盟数据-删除",
            parentId: 70,
          },
        ],
      },
      {
        id: 71,
        name: "退款数据",
        parentId: 63,
        children: [
          {
            id: 589,
            name: "退款数据-查看",
            parentId: 71,
          },
          {
            id: 590,
            name: "退款数据-新增",
            parentId: 71,
          },
          {
            id: 591,
            name: "退款数据-修改",
            parentId: 71,
          },
          {
            id: 592,
            name: "退款数据-删除",
            parentId: 71,
          },
        ],
      },
      {
        id: 72,
        name: "数据归因",
        parentId: 63,
        children: [
          {
            id: 593,
            name: "数据归因-查看",
            parentId: 72,
          },
          {
            id: 594,
            name: "数据归因-新增",
            parentId: 72,
          },
          {
            id: 595,
            name: "数据归因-修改",
            parentId: 72,
          },
          {
            id: 596,
            name: "数据归因-删除",
            parentId: 72,
          },
        ],
      },
      {
        id: 73,
        name: "产品状态",
        parentId: 63,
        children: [
          {
            id: 597,
            name: "产品状态-查看",
            parentId: 73,
          },
          {
            id: 598,
            name: "产品状态-新增",
            parentId: 73,
          },
          {
            id: 599,
            name: "产品状态-修改",
            parentId: 73,
          },
          {
            id: 600,
            name: "产品状态-删除",
            parentId: 73,
          },
        ],
      },
      {
        id: 74,
        name: "抓娃娃数据报表",
        parentId: 63,
        children: [
          {
            id: 601,
            name: "抓娃娃数据报表-查看",
            parentId: 74,
          },
          {
            id: 602,
            name: "抓娃娃数据报表-新增",
            parentId: 74,
          },
          {
            id: 603,
            name: "抓娃娃数据报表-修改",
            parentId: 74,
          },
          {
            id: 604,
            name: "抓娃娃数据报表-删除",
            parentId: 74,
          },
        ],
      },
      {
        id: 642,
        name: "友盟数据分渠道",
        parentId: 63,
        children: [
          {
            id: 652,
            name: "友盟数据分渠道",
            parentId: 642,
          },
        ],
      },
      {
        id: 643,
        name: "数据预警",
        parentId: 63,
        children: [
          {
            id: 721,
            name: "数据预警-查看",
            parentId: 643,
          },
          {
            id: 722,
            name: "数据预警-新增",
            parentId: 643,
          },
          {
            id: 723,
            name: "数据预警-修改",
            parentId: 643,
          },
          {
            id: 724,
            name: "数据预警-删除",
            parentId: 643,
          },
        ],
      },
      {
        id: 644,
        name: "数据报表",
        parentId: 63,
        children: [
          {
            id: 696,
            name: "数据报表-查看",
            parentId: 644,
          },
          {
            id: 697,
            name: "数据报表-新增",
            parentId: 644,
          },
          {
            id: 698,
            name: "数据报表-修改",
            parentId: 644,
          },
          {
            id: 699,
            name: "数据报表-删除",
            parentId: 644,
          },
        ],
      },
      {
        id: 674,
        name: "数据通知",
        parentId: 63,
        children: [
          {
            id: 675,
            name: "数据通知-查看",
            parentId: 674,
          },
          {
            id: 676,
            name: "数据通知-发送",
            parentId: 674,
          },
        ],
      },
    ],
  },
  {
    id: 75,
    name: "产品投放",
    parentId: 0,
    children: [
      {
        id: 76,
        name: "投放产品",
        parentId: 75,
        children: [
          {
            id: 605,
            name: "投放产品-查看",
            parentId: 76,
          },
          {
            id: 606,
            name: "投放产品-新增",
            parentId: 76,
          },
          {
            id: 607,
            name: "投放产品-修改",
            parentId: 76,
          },
          {
            id: 608,
            name: "投放产品-删除",
            parentId: 76,
          },
        ],
      },
      {
        id: 77,
        name: "投放数据",
        parentId: 75,
        children: [
          {
            id: 609,
            name: "投放数据-查看",
            parentId: 77,
          },
          {
            id: 610,
            name: "投放数据-新增",
            parentId: 77,
          },
          {
            id: 611,
            name: "投放数据-修改",
            parentId: 77,
          },
          {
            id: 612,
            name: "投放数据-删除",
            parentId: 77,
          },
        ],
      },
      {
        id: 78,
        name: "投放筛选",
        parentId: 75,
        children: [
          {
            id: 613,
            name: "投放筛选-查看",
            parentId: 78,
          },
          {
            id: 614,
            name: "投放筛选-新增",
            parentId: 78,
          },
          {
            id: 615,
            name: "投放筛选-修改",
            parentId: 78,
          },
          {
            id: 616,
            name: "投放筛选-删除",
            parentId: 78,
          },
        ],
      },
      {
        id: 79,
        name: "投放对比",
        parentId: 75,
        children: [
          {
            id: 617,
            name: "投放对比-查看",
            parentId: 79,
          },
          {
            id: 618,
            name: "投放对比-新增",
            parentId: 79,
          },
          {
            id: 619,
            name: "投放对比-修改",
            parentId: 79,
          },
          {
            id: 620,
            name: "投放对比-删除",
            parentId: 79,
          },
        ],
      },
      {
        id: 80,
        name: "投放数据优化",
        parentId: 75,
        children: [
          {
            id: 621,
            name: "投放数据优化-查看",
            parentId: 80,
          },
          {
            id: 622,
            name: "投放数据优化-新增",
            parentId: 80,
          },
          {
            id: 623,
            name: "投放数据优化-修改",
            parentId: 80,
          },
          {
            id: 624,
            name: "投放数据优化-删除",
            parentId: 80,
          },
        ],
      },
      {
        id: 679,
        name: "投放渠道",
        parentId: 75,
        children: [
          {
            id: 666,
            name: "投放渠道-小米",
            parentId: 679,
          },
          {
            id: 667,
            name: "投放渠道-华为",
            parentId: 679,
          },
          {
            id: 668,
            name: "投放渠道-OPPO",
            parentId: 679,
          },
          {
            id: 669,
            name: "投放渠道-VIVO",
            parentId: 679,
          },
          {
            id: 670,
            name: "投放渠道-小红书",
            parentId: 679,
          },
          {
            id: 671,
            name: "投放渠道-穿山甲",
            parentId: 679,
          },
          {
            id: 672,
            name: "投放渠道-巨量引擎",
            parentId: 679,
          },
          {
            id: 673,
            name: "投放数据-荣耀",
            parentId: 679,
          },
          {
            id: 677,
            name: "投放数据-信息流",
            parentId: 679,
          },
          {
            id: 678,
            name: "投放数据-应用宝",
            parentId: 679,
          },
        ],
      },
    ],
  },
  {
    id: 629,
    name: "客服查询产品信息权限",
    parentId: 0,
  },
  {
    id: 645,
    name: "制作展示图",
    parentId: 0,
    children: [
      {
        id: 646,
        name: "制作展示图",
        parentId: 645,
        children: [
          {
            id: 700,
            name: "制作展示图-查看",
            parentId: 646,
          },
        ],
      },
    ],
  },
  {
    id: 647,
    name: "广告收入权限",
    parentId: 0,
  },
  {
    id: 648,
    name: "账号管理",
    parentId: 0,
    children: [
      {
        id: 649,
        name: "账号管理",
        parentId: 648,
        children: [
          {
            id: 702,
            name: "账号管理-查看",
            parentId: 649,
          },
          {
            id: 708,
            name: "账号管理-修改",
            parentId: 649,
          },
        ],
      },
    ],
  },
  {
    id: 650,
    name: "申请权限管理",
    parentId: 0,
    children: [
      {
        id: 651,
        name: "申请权限管理",
        parentId: 650,
        children: [
          {
            id: 701,
            name: "申请权限管理-查看",
            parentId: 651,
          },
          {
            id: 707,
            name: "申请权限管理-修改",
            parentId: 651,
          },
        ],
      },
    ],
  },
];
</script>

<template>
  <div class="wrapper">
    <page-header title="工作台"> Page Header 页头# 如果页面的路径比较简单，推荐使用页头组件而非面包屑组件。</page-header>

    <MultipleFileUpload v-model="formData.fileList" />

    <el-card class="main">
      <div>
        <p>https://fontawesome.dashgame.com/</p>
        <Icon name="House" :size="24"></Icon>
        <Icon name="fa fa-home fa-2x"></Icon>
        <Icon name="fa fa-cog fa-fw fa-2x"></Icon>
        <Icon name="fa fa-circle-o fa-fw fa-2x"></Icon>
        <Icon name="fa fa-bars fa-fw fa-2x"></Icon>
        <Icon name="fa fa-bell fa-fw fa-2x"></Icon>
        <Icon name="fa fa-user fa-fw fa-2x"></Icon>
        <Icon name="fa fa-toggle-on fa-fw fa-2x"></Icon>
        <Icon name="fa fa-tags fa-fw fa-2x"></Icon>
        <Icon name="fa fa-list fa-fw fa-2x"></Icon>
        <Icon name="fa fa-list-alt fa-fw fa-2x"></Icon>
        <Icon name="fa fa-table fa-fw fa-2x"></Icon>
        <Icon name="fa fa-th fa-fw fa-2x"></Icon>
        <p>111</p>
      </div>

      <span>Dashboard</span>
      <el-form-item>
        <!--        <Icon icon="carbon:globe" size="100"/>-->
        <!--        <Icon icon="logos:alfresco"/>-->
        <!--          <i class="fa fa-camera-retro fa-5x"></i>-->
        <!--        <SvgIcon name="fa fa-camera-retro fa-5x"/>-->
        <!--        <SvgIcon name="House"/>-->
        <!--        <SvgIcon name="House"/>-->
        <!--        <SvgIcon name="House"/>-->
      </el-form-item>

      <Upload v-model="formData.image" width="250px">
        <template #empty>
          <el-icon>
            <Picture />
          </el-icon>
          <span>请上传照片</span>
        </template>
        <template #tip> 长方形组件（可拖拽上传）</template>
      </Upload>

      <Upload v-model="formData.fileList" :limit="5">
        <template #tip></template>
      </Upload>

      <el-form-item>
        <icon-select v-model="icon" placeholder="close"></icon-select>
      </el-form-item>
      <div></div>
      <Popup title="测试坦克" ref="editRef" @confirm="handleSuccess"> dsdasda</Popup>
      <el-tree style="max-width: 600px" :data="jsonData" default-expand-all show-checkbox node-key="id" :props="defaultProps" />
    </el-card>
  </div>
</template>
