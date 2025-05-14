// 布局配置
declare interface ThemeConfigState {
  themeConfig: {
    isDrawer: boolean;
    primary: string;
    topBar: string;
    topBarColor: string;
    isTopBarColorGradual: boolean;
    menuBar: string;
    menuBarColor: string;
    menuBarActiveColor: string;
    isMenuBarColorGradual: boolean;
    columnsMenuBar: string;
    columnsMenuBarColor: string;
    isColumnsMenuBarColorGradual: boolean;
    isColumnsMenuHoverPreload: boolean;
    isCollapse: boolean;
    isUniqueOpened: boolean;
    isFixedHeader: boolean;
    isFixedHeaderChange: boolean;
    isClassicSplitMenu: boolean;
    isLockScreen: boolean;
    lockScreenTime: number;
    isShowLogo: boolean;
    isShowLogoChange: boolean;
    isBreadcrumb: boolean;
    isTagsview: boolean;
    isBreadcrumbIcon: boolean;
    isTagsviewIcon: boolean;
    isCacheTagsView: boolean;
    isSortableTagsView: boolean;
    isShareTagsView: boolean;
    isFooter: boolean;
    isGrayscale: boolean;
    isInvert: boolean;
    isIsDark: boolean;
    isWartermark: boolean;
    wartermarkText: string;
    tagsStyle: string;
    animation: string;
    columnsAsideStyle: string;
    columnsAsideLayout: string;
    layout: string;
    isRequestRoutes: boolean;
    globalTitle: string;
    globalViceTitle: string;
    globalViceTitleMsg: string;
    globalI18n: string;
    globalComponentSize: string;
  };
}

// 路由列表
declare interface RouteListState<T = any> {
  routeList: T[];
  isColumnsMenuHover: Boolean;
  isColumnsNavHover: Boolean;
}

// TagsView 路由列表
declare interface TagsViewRoutesState<T = any> {
  tagsViewRoutes: T[];
  isTagsViewCurrenFull: Boolean;
}

// 路由缓存列表
declare interface KeepAliveState {
  keepAlive: string[];
  cachedViews: string[];
}

// 用户信息
declare interface User<T = any> {
  username: string;
  avatar?: string;
  email?: string;
  remember?: number;
  [key: string]: T;
}
// 用户信息
declare interface UserState {
  token: string;
  userInfo: User;
}
