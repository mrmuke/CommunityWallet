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
    SplashScreen
} from "./keys"

const tokens = {
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