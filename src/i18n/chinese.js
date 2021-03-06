// need to be all converted to Chinese

import {
    MembersScreen,
    HomeScreen,
    CreateServicesScreen,
    SendScreen,
    ServicesScreen,
    WalletScreen,
    AdminNavigatorScreen,
    DrawerScreen,
    LoginScreen,
    SignupScreen,
    Common
} from './keys';

export const chinese = {
    [MembersScreen.joinCode_P]: '加入代碼: ',
    [MembersScreen.phone_W]: '電話',
    [MembersScreen.joined_W]: '加入日期',
    [MembersScreen.tokens_W]: '幣',
    [MembersScreen.serv_W]: '服務',
    [MembersScreen.noMembers_P]:"没有成员",

    [CreateServicesScreen.cameraRollPermission_P]: '抱歉，我們需要相機膠卷權限!',
    [CreateServicesScreen.createServices_P]: '創造服務',
    [CreateServicesScreen.info_W]: '主要信息',
    [CreateServicesScreen.nameOfService_P]: '服務名稱',
    [CreateServicesScreen.category_W]: '類別',
    [CreateServicesScreen.price_W]: '價錢',
    [CreateServicesScreen.description_W]: '描述',
    [CreateServicesScreen.describeService_P]: '描述一下服務做什麽',
    [CreateServicesScreen.photo_W]: '照片',
    [CreateServicesScreen.insertImage_P]: '上傳照片',
    [CreateServicesScreen.create_W]: '創造',
    [CreateServicesScreen.uploaded_W]:"上傳了",
    [CreateServicesScreen.nameofService_EP]: '必須長於三個字符',
    [CreateServicesScreen.category_EP]: '不能為空',
    [CreateServicesScreen.price_EP]: '不能為空',
    [CreateServicesScreen.description_EP]: '不能為空',
    [CreateServicesScreen.photo_EP]: '請上傳照片',

    [SendScreen.success_W]: '成功!',
    [SendScreen.goHome_P]: '回家',
    [SendScreen.clear_W]: '清除',
    [SendScreen.cancel_W]: '取消',
    [SendScreen.cameraPermission_P]: '沒有相機權限',
    [SendScreen.sending_W]: '發送',
    [SendScreen.tokensTo_P]: '幣到',
    [SendScreen.confirm_W]: '確認',
    [SendScreen.who_P]: '你想發幣給誰？',
    [SendScreen.next_W]: '下一步',
    [SendScreen.or_W]: '或',
    [SendScreen.scan_W]: '掃描',
    [SendScreen.unknown_P]:"用戶不存在..",
    [SendScreen.found_P]:"找到用戶了..",
    [ServicesScreen.all_W]: '全部',

    [WalletScreen.myWallet_P]: '我的錢包',
    [WalletScreen.totalBalance_P]: '總代幣',
    [WalletScreen.receiveTokens_P]: '接收代幣',
    [WalletScreen.today_W]: '今天',

    [AdminNavigatorScreen.transactions_W]: '交易',
    [AdminNavigatorScreen.progress_W]: '進展',
    [AdminNavigatorScreen.statistics_W]: '統計數據',
    [AdminNavigatorScreen.signOut_P]: '登出!',
    [AdminNavigatorScreen.back_W]: '返回!',
    [AdminNavigatorScreen.send_W]: '發送!',
    [AdminNavigatorScreen.timeToken_W]: '時間代幣',
    [AdminNavigatorScreen.burnToken_P]: '燒代幣',
    [AdminNavigatorScreen.sendToken_P]: '發送代幣',
    [AdminNavigatorScreen.analytics_W]: '分析',
    [AdminNavigatorScreen.tokens_W]: '代幣',
    [AdminNavigatorScreen.members_W]: '成员',
    [AdminNavigatorScreen.economy_W]: '经济',
    [AdminNavigatorScreen.createToken_P]:"创建代幣",
    [AdminNavigatorScreen.mintToken_P]:"鑄幣",
    [AdminNavigatorScreen.adminHome_P]:"管理员主页",
    [AdminNavigatorScreen.nameToken_P]:"代幣名稱",
    [AdminNavigatorScreen.amount_W]:"數量",
    [AdminNavigatorScreen.invalidAmount_P]:"請輸入有效的代幣數量",
    [AdminNavigatorScreen.invalidName_P]:"代幣名稱至少四個字",

    [DrawerScreen.home_W]: '回家',
    [DrawerScreen.send_W]: '發送',
    [DrawerScreen.wallet_W]: '錢包',
    [DrawerScreen.services_W]: '服務',
    [DrawerScreen.logout_W]: '登出',
    [DrawerScreen.language_W]:"英语",

    [HomeScreen.welcome_W]: '歡迎',
    [HomeScreen.welcome_P]: '歡迎回到包',
    [HomeScreen.your_W]: '您的',
    [HomeScreen.wallet_W]: '錢包',
    [HomeScreen.community_W]: '社區',

    [LoginScreen.wrongCredentials_P]: '號碼或密碼有錯誤',
    [LoginScreen.bao_W]: '包',
    [LoginScreen.phoneNumber_W]: '電話號碼',
    [LoginScreen.password_W]: '密碼',
    [LoginScreen.forgotPassword_P]: '忘記密碼?',
    [LoginScreen.login_W]: '登錄',
    [LoginScreen.signUp_P]: "沒有賬戶？報名！",


    [SignupScreen.verificationCode_P]: '您的驗證碼是',
    [SignupScreen.wrongVerificationCode_P]: '驗證碼有錯誤',
    [SignupScreen.signUp_P]: '報名',
    [SignupScreen.aCodeHasBeenSent_P]: '代碼已發送到',
    [SignupScreen.pleaseEnterCode_P]: '請輸入',
    [SignupScreen.verficationCodeInput_P]: '驗證碼...',
    [SignupScreen.goBack_P]: '返回',
    [SignupScreen.verify_W]: '確認',
    [SignupScreen.alreadyHaveAccount_P]: '已經有帳戶？登錄！',
    [SignupScreen.phoneNumber_W]: '電話號碼',
    [SignupScreen.username_W]: '用戶名',
    [SignupScreen.password_W]: '密碼',
    [SignupScreen.confirmPassword_P]: '確認密碼',
    [SignupScreen.communityName_W]: '社區名字',
    [SignupScreen.communityCode_W]: '社區代碼',
    [SignupScreen.submitSignUp_P]: '報名',
    [SignupScreen.numTokens_P]:'代幣数量',
    [SignupScreen.isAdmin_W]:"管理員",
    [Common.chooseToken_P]:"選擇代幣",
    [SignupScreen.phoneNumber_EP]:"無效",
    [SignupScreen.username_EP]: "必須長於四個字符",
    [SignupScreen.password_EP]: "不夠長",
    [SignupScreen.confirmPassword_EP]: "不一致",
    [SignupScreen.communityName_EP]: "不夠長",
    [SignupScreen.communityCode_EP]: "無效",
    [SignupScreen.notUnique_EP]: "您的用戶名或電話號碼已存在",
    [SignupScreen.numTokens_EP]: "不能為空",
}