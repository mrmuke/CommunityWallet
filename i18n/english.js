import { Drawer } from 'native-base';
import Members from '../screens/Admin/Members';
import Wallet from '../screens/Wallet/Wallet';
import {
    MembersScreen,
    CreateServicesScreen,
    SendScreen,
    ServicesScreen,
    WalletScreen,
    AdminNavigatorScreen,
    DrawerScreen,
    HomeScreen,
    LoginScreen,
} from './keys';

export const english = {
    [MembersScreen.joinCode_P]: 'Join Code: ',
    [MembersScreen.phone_W]: 'Phone',
    [MembersScreen.joined_W]: 'Joined',
    [MembersScreen.tokens_W]: 'Tokens',
    [MembersScreen.serv_W]: 'Serv.',

    [CreateServicesScreen.cameraRollPermission_P]: 'Sorry, we need camera roll permissions to make this work!',
    [CreateServicesScreen.createServices_P]: 'Create Services',
    [CreateServicesScreen.info_W]: 'MAIN INFO',
    [CreateServicesScreen.nameOfService_P]: 'Name of Service',
    [CreateServicesScreen.category_W]: 'Category',
    [CreateServicesScreen.price_W]: 'Price',
    [CreateServicesScreen.description_W]: 'DESCRIPTION',
    [CreateServicesScreen.describeService_P]: 'Describe Your Service',
    [CreateServicesScreen.photo_W]: 'PHOTO',
    [CreateServicesScreen.insertImage_P]: 'INSERT IMAGE HERE',
    [CreateServicesScreen.create_W]: 'CREATE',

    [SendScreen.success_W]: 'Success!',
    [SendScreen.goHome_P]: 'Go Home',
    [SendScreen.clear_W]: 'CLEAR',
    [SendScreen.cancel_W]: 'Cancel',
    [SendScreen.cameraPermission_P]: 'No camera permission',
    [SendScreen.sending_W]: 'Sending',
    [SendScreen.tokensTo_P]: 'tokens to',
    [SendScreen.confirm_W]: 'Confirm',
    [SendScreen.who_P]: 'Who do you want to send this to?',
    [SendScreen.next_W]: 'Next',
    [SendScreen.or_W]: 'OR',
    [SendScreen.scan_W]: 'Scan',

    [ServicesScreen.allServices]: 'All',

    [WalletScreen.myWallet_P]: 'My Wallet',
    [WalletScreen.totalBalance_P]: 'Total Balance',
    [WalletScreen.receiveTokens_P]: 'Receive Tokens',
    [WalletScreen.today_P]: 'Today',

    [AdminNavigatorScreen.transactions_W]: 'Transactions',
    [AdminNavigatorScreen.progress_W]: 'Progress',
    [AdminNavigatorScreen.statistics_W]: 'Statistics',
    [AdminNavigatorScreen.signOut_P]: 'Sign Out',
    [AdminNavigatorScreen.back_W]: 'Back!',
    [AdminNavigatorScreen.send_W]: 'Send!',
    [AdminNavigatorScreen.timeToken_W]: 'Time Token',
    [AdminNavigatorScreen.burnToken_P]: 'Burn Token',
    [AdminNavigatorScreen.sendToken_P]: 'Send Token',

    [DrawerScreen.home_W]: 'Home',
    [DrawerScreen.send_W]: 'Send',
    [DrawerScreen.wallet_W]: 'Wallet',
    [DrawerScreen.services_W]: 'Services',
    [DrawerScreen.logout_W]: 'Logout',

    [HomeScreen.welcome_W]: 'Welcome',
    [HomeScreen.welcome_P]: 'Welcome back to Bao',
    [HomeScreen.your_W]: 'Your',
    [HomeScreen.wallet_W]: 'Wallet',
    [HomeScreen.community_W]: 'Community',

    [LoginScreen.bao_W]: 'Bao',
    [LoginScreen.forgotPassword_P]: 'Forgot Password?',
    [LoginScreen.login_W]: 'LOGIN',
    [LoginScreen.signUp_P]: "Don't have an account? Signup now!",
}