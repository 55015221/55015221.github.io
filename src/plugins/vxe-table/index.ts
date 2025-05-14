import { App } from "vue";
// 完整导入 UI 组件库
import VxeUI, { VxeComponentSizeType, VxeGlobalConfig } from "vxe-pc-ui";
import "vxe-pc-ui/lib/style.css";

// 完整导入 表格库
import VxeUITable, { VxeGridProps, VxeTableProps } from "vxe-table";
import { i18n } from "@/i18n";

/**
 * VXETable
 * @see https://vxetable.cn/#/table/start/install
 *
 */

// VXETable.config({});
import { globalComponentSize } from "@/utils/other";

export function loadVxeTable(app: App) {
  const height = document.documentElement.offsetHeight - 160;
  const size = globalComponentSize() as VxeComponentSizeType;
  const config: VxeGlobalConfig = {
    size: size, // 全局尺寸
    zIndex: 999, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡；新版本可以使用 dom-zindex 共享配置
    version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
    table: <VxeTableProps>{
      size: size,
      height: 400,
      border: "default", // 'default' | 'full' | 'outer' | 'inner' | 'none' | ''
      stripe: true,
      showHeader: true,
      keepSource: true,
      showHeaderOverflow: true,
      showOverflow: false,
      showFooterOverflow: null,
      autoResize: true,
      round: false,
      emptyText: "暂无数据",
      resizeConfig: {
        refreshDelay: 250,
      },
      resizableConfig: {
        isDblclickAutoWidth: true,
      },
      columnConfig: {
        // resizable: true,
      },
      customConfig: {
        storage: false,
        mode: "popup", // 默认自定义列方式
      },
      rowConfig: { keyField: "id", isHover: true, resizable: true },
      //   rowConfig: {
      //     keyField: '_X_ROW_KEY' // 行数据的唯一主键字段名
      //   },
      //   radioConfig: {
      //     trigger: 'default'
      //   },
      //   checkboxConfig: {
      //     strict: false,
      //     highlight: false,
      //     range: false,
      //     trigger: 'default'
      //   },
      sortConfig: {
        remote: true,
        trigger: "default",
        orders: ["asc", "desc", null],
      },
      loadingConfig: {
        text: "加载中...",
        icon: "loading",
      },
      //   filterConfig: {
      //     remote: false,
      //     filterMethod: null
      //   },
      //   expandConfig: {
      //     trigger: 'default',
      //     showIcon: true
      //   },
      //   treeConfig: {
      //     rowField: 'id',
      //     parentField: 'parentId',
      //     children: 'children',
      //     hasChild: 'hasChild',
      //     mapChildren: '_X_ROW_CHILD',
      //     indent: 20,
      //     showIcon: true
      //   },
      //   tooltipConfig: {
      //     enterable: true
      //   },
      //   menuConfig: {
      //     visibleMethod () {}
      //   },
      //   editConfig: {
      //     mode: "cell",
      //     showAsterisk: true
      //   }
      editConfig: {
        trigger: "click",
        mode: "row",
        showStatus: true,
      },
      importConfig: {
        modes: ["insert", "covering"],
      },
      exportConfig: {
        modes: ["current", "selected", "all"],
      },
      //   customConfig: {
      //    storage: false
      //   },
      //   area-config: {
      //     multiple: false
      //   },
      //   scrollX: {
      //     enabled: false, // 是否默认开启横向虚拟滚动
      //     gt: 60 // 当列大于指定数量时自动触发启用虚拟滚动
      //   },
      //   scrollY: {
      //     enabled: false, // 是否默认开启纵向虚拟滚动
      //     gt: 100 // 当数据大于指定数量时自动触发启用虚拟滚动
      //   },
    },
    grid: <VxeGridProps>{
      size: size,
      autoResize: true,
      rowConfig: {
        resizable: true,
      },
      zoomConfig: {
        escRestore: true,
      },
      exportConfig: {
        modes: ["current", "selected", "all"],
      },
      toolbarConfig: {
        buttons: [
          { code: "insert", name: "新增", status: "success" },
          { code: "delete", name: "批量删除", status: "danger" },
        ],
        refresh: true, // 显示刷新按钮
        import: true, // 显示导入按钮
        export: true, // 显示导出按钮
        print: true, // 显示打印按钮
        zoom: true, // 显示全屏按钮
        custom: true, // 显示自定义列按钮
      },
      proxyConfig: {
        autoLoad: true,
        message: true,
        seq: true, // 启用动态序号代理，每一页的序号会根据当前页数变化
        sort: true, // 启用排序代理，当点击排序时会自动触发 query 行为
        filter: true, // 启用筛选代理，当点击筛选时会自动触发 query 行为
        form: true, // 启用表单代理，当点击表单提交按钮时会自动触发 reload 行为
        props: {
          // 对应响应结果 Promise<{ result: [], page: { total: 100 } }>
          list: null, // 用于列表，读取响应数据
          result: "result", // 配置响应结果列表字段
          total: "page.total", // 配置响应结果总页数字段
        },
      },
      pagerConfig: {
        enabled: true,
        background: true,
        perfect: false,
        pageSize: 10,
        pageSizes: [10, 15, 20, 50, 100, 500],
        layouts: ["Total", "Sizes", "PrevJump", "PrevPage", "JumpNumber", "NextPage", "NextJump", "FullJump"],
      },
    },
    pager: {
      size: size,
      border: false,
      autoHidden: false,
      perfect: false,
      pageSize: 10,
      pageSizes: [10, 15, 20, 50, 100],
      layouts: ["PrevJump", "PrevPage", "Jump", "PageCount", "NextPage", "NextJump", "Sizes", "Total"],
    },
    // form: {
    //   preventSubmit: false
    //   size: null,
    //   colon: false,
    //   validConfig: {
    //     autoPos: true
    //   },
    //   tooltipConfig: {
    //     enterable: true
    //   },
    //   titleAsterisk: true
    // },
    // input: {
    //   size: null,
    //   transfer: false
    //   parseFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
    //   labelFormat: '',
    //   valueFormat: '',
    //   startDay: 1,
    //   digits: 2,
    //   controls: true
    // },
    // textarea: {
    //   size: null
    //   autosize: {
    //     minRows: 1,
    //     maxRows: 10
    //   }
    // },
    // select: {
    //   size: null,
    //   transfer: false,
    //   optionConfig: {
    //     keyField: '_X_OPTION_KEY' // 选项数据的唯一主键字段名
    //   },
    //   multiCharOverflow: 8
    // },
    toolbar: {
      buttons: [
        { code: "insert", name: "新增", status: "success" },
        { code: "delete", name: "批量删除", status: "danger" },
      ],
      refresh: true, // 显示刷新按钮
      import: true, // 显示导入按钮
      export: true, // 显示导出按钮
      print: true, // 显示打印按钮
      zoom: true, // 显示全屏按钮
      custom: true, // 显示自定义列按钮
    },
    // button: {
    //   size: null,
    //   transfer: false
    // },
    // radio: {
    //   size: null
    // },
    // checkbox: {
    //   size: null
    // },
    // switch: {
    //   size: null
    // },
    // modal: {
    //   // size: null,
    //   minWidth: 340,
    //   minHeight: 200,
    //   lockView: true,
    //   mask: true,
    //   duration: 3000,
    //   marginSize: 0,
    //   dblclickZoom: true,
    //   showTitleOverflow: true
    //   storage: false
    // },
    // list: {
    //   scrollY: {
    //     gt: 100
    //   }
    // }
  };

  VxeUI.setConfig(config);

  app.use(VxeUI);
  app.use(VxeUITable);
}
