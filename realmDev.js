import Realm from "realm"
import { UUID } from 'bson'

// Returns the shared instance of the Realm app.
export function getRealmApp() {
    const appId = 'walletdevrealm-khyji' // Set Realm app ID here.
    const appConfig = {
        id: appId,
        timeout: 10000,
    }
    return new Realm.App(appConfig)
}

export const WalletSchema = {
    name: 'Wallet',
    properties: {
        _id: 'uuid',
        _partition: 'uuid',
        phoneNumber: 'int',
    },
    primaryKey: '_id',
}

async function anonymousLogin() {
    let user
    try {
        const app = getRealmApp() // pass in the appConfig variable that you created earlier
        const credentials = Realm.Credentials.anonymous() // create an anonymous credential
        user = await app.logIn(credentials)
        return user
    } catch (error) {
        throw `Error logging in anonymously: ${JSON.stringify(error, null, 2)}`
    }
}

export async function openRealm(partition_id) {
    let user = await anonymousLogin()
    let realm
    try {
        // ...
        console.log(`Logged in with the user: ${user.identity}`)
        const config = {
            schema: [WalletSchema],
            sync: {
                user: user,
                partitionValue: partition_id
            },
        }
        realm = await Realm.open(config)
        return realm
    } catch (error) {
        throw `Error opening realm: ${JSON.stringify(error, null, 2)}`
    }
}