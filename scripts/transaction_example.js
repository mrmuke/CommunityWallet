import { coins, GasPrice } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
async function main(){
const sender = {
    mnemonic: "luggage rotate orient usage program cloud armed warrior rich erase acquire remember",
    address: "cosmos14eadktsf4zzah6har7h7a46tunnj7rq7lmppy5",
    path: "m/44'/118'/0'/0/0"
};
const recipient = {
    mnemonic: "loyal awkward soda fade embrace alarm peace sorry shock kidney north arctic broccoli sting weather pond habit buyer hold monitor soft ensure eager enroll",
    address: "cosmos1jztulwdp5ungrffu5hd65k20upjrgdqqht4efw",
    path: "m/44'/118'/0'/0/0"
};
const tendermintUrl = "https://26657-coral-clam-78umxub9.ws-us15.gitpod.io/";
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic);

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

const before = await client.getBalance(recipient.address, "uatom");
console.log(before);

const transferAmount = {
    denom: "uatom",
    amount: "420",
};

const send = await client.sendTokens(sender.address, recipient.address, [transferAmount], fee, "sheee");
console.log(send);

const after = await client.getBalance(recipient.address, "uatom");
console.log(after);
}
main()