import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { assert } from "chai";
import { SolanaCounter } from "../target/types/solana_counter";

let _baseAccount = null;

describe("solana-counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.SolanaCounter as Program<SolanaCounter>;

  it("Create a count", async () => {
    const baseAccount = anchor.web3.Keypair.generate();

    await program.methods
      .create()
      .accounts({
        baseAccount: baseAccount.publicKey,
        user: anchor.AnchorProvider.env().publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([baseAccount])
      .rpc();

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    console.log("Count?", account.count.toString());
    assert.ok(account.count.toString() === "0");

    _baseAccount = baseAccount;
  });

  it("Increment a count", async () => {
    const baseAccount = _baseAccount;
    await program.methods
      .increment()
      .accounts({
        baseAccount: baseAccount.publicKey,
      })
      .rpc();

    const account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );

    console.log("Count 1:", account.count.toString());
    assert.ok(account.count.toString() === "1");
  });
});
