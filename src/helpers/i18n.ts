

export const messages: Record<"zh" | "jp", Record<string, string>> = {
  zh: {
    // 通用
    systemName: "IT 在线教育",
    home: "首页",
    shopCentre: "商城",
    login: "登录",
    logout: "退出",
    admin: "管理员",
    signup: "注册",
    signupSubTitle: "还没有账号？注册一个吧。",
    signupSuccess: "注册成功",
    signupFail: "注册失败",
    signin: "注册",
    signinSuccess: "登录成功",
    signinFail: "登录失败",
    adminDashboard: "管理员 仪表板",
    userDashboard: "用户 仪表板",
    dashboard: "仪表板",
    toDashboard: "返回 dashboard",
    settings: "设置",
    profile: "个人资料",
    language: "语言",
    save: "保存",
    cancel: "取消",
    chinese: "中文",
    japanese: "日语",
    yes: "是",
    no: "否",
    latestShelves: "最新上架",
    mostPopular: "最受欢迎",
    productAllCategory: "所有分类",
    searchPlaceholder: "请输入搜索关键字",
    search: "搜索",
    FilterByCategory: "按照分类筛选",
    FilterByPrice: "按照价格筛选",
    productDetailsBtn: "查看详情",
    addToCart: "加入购物车",
    salesVolume: "销量",
    timeShelves: "上架时间",


    // 商品管理
    productManagement: "商品管理",
    products: "商品",
    addProduct: "添加商品",
    editProduct: "编辑商品",
    deleteProduct: "删除商品",
    productName: "商品名称",
    productDescription: "商品描述",
    price: "价格",
    stock: "库存",
    productsImg: "商品封面",
    productCategory: "所属分类",
    
    selectCategory: "请选择分类",
    productNum: "商品数量",
    isTransportation: "是否需要运输",
    productDetail: "商品详情",
    

    // 订单管理
    orderManagement: "订单管理",
    orders: "订单",
    orderID: "订单号",
    customerName: "客户名称",
    orderDate: "订单日期",
    status: "状态",
    totalAmount: "总金额",

    // 用户管理
    adminUserinfo: "管理员信息",
    userManagement: "用户管理",
    users: "用户",
    addUser: "添加用户",
    editUser: "编辑用户",
    deleteUser: "删除用户",
    username: "用户名",
    password: "密码",
    email: "邮箱",
    role: "角色",
    addCategory: "添加分类",
    categoryName: "分类名",
    categoryAddSuccess:"分类添加成功",
  

    // 报表
    reports: "报表",
    salesReport: "销售报表",
    inventoryReport: "库存报表",
    customerReport: "客户报表",
  },
  jp: {
    // 通用
    systemName: "IT オンライン　コース",
    home: "ホーム",
    shopCentre: "ショッピングモール",
    admin: "管理者",
    login: "ログイン",
    logout: "ログアウト",
    signup: "サインアップ",
    signupSubTitle: "アカウントをお持ちではありませんか？サインアップしましょう。",
    signupSuccess: "サインアップに成功しました",
    signupFail: "サインアップに失敗しました",
    signin: "サインイン",
    signinSuccess: "登録に成功しました",
    signinFail: "登録に失敗しました",
    adminDashboard: "アドミン ダッシュボード",
    userDashboard: "ユーザー ダッシュボード",
    dashboard: "ダッシュボード",
    toDashboard: "返回 ダッシュボード",
    settings: "設定",
    profile: "プロフィール",
    language: "言語",
    save: "保存",
    cancel: "キャンセル",
    chinese: "日本語",
    japanese: "中国語",
    yes: "はい",
    no: "いいえ",
    latestShelves: "最新　コース",
    mostPopular: "一番人気のコース",
    productAllCategory: "すべての分類",
    searchPlaceholder: "検索キーワードを入力してください。",
    search: "検索",
    FilterByCategory: "分類によって選別",
    FilterByPrice: "価格で選別",
    productDetailsBtn: "詳細を見る",
    addToCart: "カートに入れる",
    salesVolume: "販売量",
    timeShelves: "発売時間",

    // 商品管理
    productManagement: "商品管理",
    products: "商品",
    addProduct: "商品を追加",
    addProductSucMsg: "商品を追加",
    editProduct: "商品を編集",
    deleteProduct: "商品を削除",
    productName: "商品名",
    productDescription: "商品の説明",
    price: "価格",
    stock: "在庫",
    productsImg: "商品カバー",
    productCategory: "所属分類",
    productNum: "商品の数量",
    isTransportation: "運送が必要ですか",
    selectCategory:"分類を選んでください。",
    productDetail: "商品詳細",

    // 订单管理
    orderManagement: "注文管理",
    orders: "注文",
    orderID: "注文ID",
    customerName: "顧客名",
    orderDate: "注文日",
    status: "ステータス",
    totalAmount: "合計金額",

    // 用户管理
    adminUserinfo: "アドミン 情報",
    userManagement: "ユーザー管理",
    users: "ユーザー",
    addUser: "ユーザーを追加",
    addCategory: "分類を追加",
    categoryName: "分類名",
    categoryAddSuccess:"分類追加成功",
    editUser: "ユーザーを編集",
    deleteUser: "ユーザーを削除",
    username: "ユーザー名",
    password: "パスワード",
    email: "メール",
    role: "役割",
    

    // 报表
    reports: "レポート",
    salesReport: "売上レポート",
    inventoryReport: "在庫レポート",
    customerReport: "顧客レポート",
  }
};