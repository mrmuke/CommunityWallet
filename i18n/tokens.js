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
        Common},
    tabs: DrawerScreen,
    screens: {
        admin: {
            members: MembersScreen
        },
        wallet: {
            createServices: CreateServicesScreen,
            send: SendScreen,
            services: ServicesScreen,
            wallets: WalletScreen
        },
        adminNavigator: AdminNavigatorScreen,
        drawer: DrawerScreen,
        home: HomeScreen,
        login: LoginScreen,
        signup: SignupScreen,
    }
}

export default tokens