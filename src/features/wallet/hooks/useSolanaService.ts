import { Alert } from "react-native";
import solanaRPC from "../services/solana.service";
import solanaService from "../services/solana.service";

function useSolanaService() {

    const getBalance = async (addr: string) => {
        try {
            const result = await solanaService.getBalance(addr);
            return result;
        } catch (err) {
            throw err;
        }
    }

    const getTokens = async (addr: string) => {
        try {
            const result = await solanaService.getTokens(addr);
            return result;
        } catch (err) {
            throw err;
        }
    }

    const getTxns = async (addr: string) => {
        try {
            const result = await solanaService.getTxns(addr);
            return result;
        } catch (err) {
            throw err;
        }
    }

  return { getBalance, getTokens, getTxns };
}

export default useSolanaService;
