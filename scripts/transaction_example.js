import { SigningStargateClient } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
async function main(){
const sender = {
    mnemonic: "luggage rotate orient usage program cloud armed warrior rich erase acquire remember",
    address: "cosmos14eadktsf4zzah6har7h7a46tunnj7rq7lmppy5",
    path: "m/44'/118'/0'/0/0"
};
const middle = {
    mnemonic: "option rotate frost tribe crucial access final pluck sniff lift wine clump egg employ agree snap subject engage still bunker milk waste vocal tank"
}
const test = {
    mnemonic: "enter champion cram fancy float broom vicious vintage error shuffle dinosaur burst verb royal law bridge drink clown render pencil enter place dry hope"
}
const recipient = {
    mnemonic: "loyal awkward soda fade embrace alarm peace sorry shock kidney north arctic broccoli sting weather pond habit buyer hold monitor soft ensure eager enroll",
    address: "cosmos1jztulwdp5ungrffu5hd65k20upjrgdqqht4efw",
    path: "m/44'/118'/0'/0/0"
};
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic);
const wallet2 = await DirectSecp256k1HdWallet.fromMnemonic(test.mnemonic);

let accounts = await wallet2.getAccounts()
let wallet2address = accounts[0].address
console.log(wallet2address)
console.log(wallet2.mnemonic)
/*
const tendermintUrl = "localhost:26657";

const fee = {
    amount: [
        {
            denom: "uatom",
            amount: "2000",
        },
    ],
    gas: "180000",
};

const client = await SigningStargateClient.connectWithSigner(tendermintUrl, wallet);

const before = await client.getBalance(wallet2address, "uatom");
console.log(before);

const transferAmount = {
    denom: "uatom",
    amount: "420",
};

const send = await client.sendTokens(sender.address, wallet2address, [transferAmount], fee, "sheee");
console.log(send);

const after = await client.getBalance(wallet2address, "uatom");
console.log(after);
*/
