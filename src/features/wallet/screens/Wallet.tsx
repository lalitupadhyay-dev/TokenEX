
import { useState } from "react";
import {
    ScrollView,
    Alert,
    StyleSheet, Text, View
} from "react-native";
import useSolanaService from "../hooks/useSolanaService";
import TokensList from "@/components/wallet/TokensList";
import RecentTxnsList from "@/components/wallet/RecentTxnsList";
import SearchWallet from "@/components/wallet/SearchWallet";
import Balance from "@/components/wallet/Balance";

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16161D",
        paddingHorizontal: 15,
        paddingBottom: 20,
    },
    scroll: {
        borderWidth: 5,
        borderColor: "pink",
        flex: 1,
    },
    
});

export default function Wallet() {

    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState<number | null>(null);
    const [tokens, setTokens] = useState<any[]>([]);
    const [txns, setTxns] = useState<any[]>([]);

    const { getBalance, getTokens, getTxns } = useSolanaService();

    const search = async () => {
        const addr = address.trim();
        if (!addr) return Alert.alert("Enter a wallet address");

        setLoading(true);
        try {
            const [bal, tok, tx] = await Promise.all([
                getBalance(addr),
                getTokens(addr),
                getTxns(addr),
            ]);
            setBalance(bal);
            setTokens(tok);
            setTxns(tx);
        } catch (e: any) {
            Alert.alert("Error", e.message);
        }
        setLoading(false);
    };

    const clear = () => {
        setAddress("");
        setBalance(null);
        setTokens([]);
        setTxns([]);
    }

    return <ScrollView style={s.scroll} contentContainerStyle={{ flexGrow: 1 }}>


        <View style={s.container}>

            {/* Search wallet component */}
            <SearchWallet address={address} setAddress={setAddress} loading={loading} search={search} clear={clear} />


            {/* Balance Card */}
            {balance !== null && (
                <Balance balance={balance} address={address} />
            )}

            {/* Tokens */}
            {tokens.length > 0 && (
                <TokensList tokens={tokens} />
            )}

            {/* Transactions */}
            {txns.length > 0 && (
                <RecentTxnsList txns={txns} />
            )}
        </View>
    </ScrollView>
}