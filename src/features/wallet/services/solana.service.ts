import solanaRPC from "@/utils/solanaRPC";
import { Alert } from "react-native";

const solanaService = {
  getBalance: async function (addr: string) {
    try {
      const result = await solanaRPC("getBalance", [addr]);
      return result.value / 1_000_000_000;
    } catch (err) {
      throw err;
    }
  },
  getTokens: async (addr: string) => {
    const result = await solanaRPC("getTokenAccountsByOwner", [
      addr,
      { programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA" },
      { encoding: "jsonParsed" },
    ]);
    return (result.value || [])
      .map((a: any) => ({
        mint: a.account.data.parsed.info.mint,
        amount: a.account.data.parsed.info.tokenAmount.uiAmount,
      }))
      .filter((t: any) => t.amount > 0);
  },

  getTxns: async (addr: string) => {
    const sigs = await solanaRPC("getSignaturesForAddress", [
      addr,
      { limit: 10 },
    ]);
    return sigs.map((s: any) => ({
      sig: s.signature,
      time: s.blockTime,
      ok: !s.err,
    }));
  },
};

export default solanaService;
