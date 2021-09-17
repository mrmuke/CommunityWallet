import { SigningStargateClient } from "@cosmjs/stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
async function main() {
  const sender = {
    mnemonic: "luggage rotate orient usage program cloud armed warrior rich erase acquire remember",
    address: "cosmos14eadktsf4zzah6har7h7a46tunnj7rq7lmppy5",
    path: "m/44'/118'/0'/0/0"
  };
  const tendermintUrl = "https://26657-coral-clam-78umxub9.ws-us15.gitpod.io";
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(sender.mnemonic);

  const client = await SigningStargateClient.connectWithSigner(tendermintUrl, wallet);

  const initMsg = {
    name: "Time Token",
    symbol: "TMT",
    decimals: 0,
    initial_balances: [{ address, amount: "123456789" }],
  };
  const foo = await client.instantiate(1, initMsg, "FOO");
  foo;
  foo.logs[0].events[0];
  const fooAddr = foo.contractAddress;

  // we can also find this another way...
  const fooAddr2 = await client
    .getContracts(1)
    .then(
      (contracts) =>
        contracts.filter((x) => x.label == "FOO").map((x) => x.address)[0],
    )[(fooAddr, fooAddr2)];

  // now we have some cash
  client.queryContractSmart(fooAddr, { balance: { address } });

  const rcpt = "cosmos1jztulwdp5ungrffu5hd65k20upjrgdqqht4efw"

  rcpt;
  client.queryContractSmart(fooAddr, { balance: { address: rcpt } });

  const execMsg = { transfer: { recipient: rcpt, amount: "808" } };
  const exec = await client.execute(fooAddr, execMsg);
  exec;
  exec.logs[0].events[0];
  client.queryContractSmart(fooAddr, { balance: { address: rcpt } });
} main()