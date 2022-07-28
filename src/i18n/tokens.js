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
    SignupScreen,
    SplashScreen,
    Common
} from "./keys"

const tokens = {
    common:{
        Common
    },
    tabs: DrawerScreen,
    screens: {
        admin: {
            members: MembersScreen
        },
        adminNavigator: AdminNavigatorScreen,
        drawer: DrawerScreen,
        home: HomeScreen,
        login: LoginScreen,
        signup: SignupScreen,
        wallet: WalletScreen
    }
}

export default tokens