import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"

const wallet = await DirectSecp256k1HdWallet.generate()
    const mnemonic = await wallet.mnemonic
export async function createWallet(){
    
    return mnemonic
}