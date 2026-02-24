
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
import RecentSearch from "@/components/wallet/RecentSearch";
import { useWalletStore } from "@/stores/wallet-store";

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#16161D",
        paddingHorizontal: 15,
        paddingBottom: 20,
        position: "relative",
        paddingTop: 40
    },
    scroll: {
        flex: 1,
    },
    devDot: {
        height: 12,
        width: 12,
        borderRadius: 20,
        backgroundColor: "orange",
    },
    mainDot: {
        height: 12,
        width: 12,
        borderRadius: 20,
        backgroundColor: "#14F195",
    },
    devnetBanner: {
        backgroundColor: "#33335a",
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 16,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 5,
        borderWidth: 1,
        position: "absolute",
        zIndex: 10,
        top: 10,
        right: 15,
    },
    devnetText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: 900
    }

});

export default function Wallet() {

    const [address, setAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const [balance, setBalance] = useState<number | null>(null);
    const [tokens, setTokens] = useState<any[]>([]);
    const [txns, setTxns] = useState<any[]>([]);

    // Pick ONLY what you need — component only re-renders when these change
    const addToHistory = useWalletStore((s) => s.addToHistory);
    const searchHistory = useWalletStore((s) => s.searchHistory);
    const isDevnet = useWalletStore((s) => s.isDevnet);

    const { getBalance, getTokens, getTxns } = useSolanaService();

    const search = async () => {
        const addr = address.trim();
        addToHistory(addr);
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

            <View style={s.devnetBanner}>
                <View style={isDevnet ? s.devDot : s.mainDot}></View>
                <Text style={s.devnetText}>{isDevnet ? "Devnet" : "Mainnet"}</Text>
            </View>

            {/* Search wallet component */}
            <SearchWallet address={address} setAddress={setAddress} loading={loading} search={search} clear={clear} />

            <RecentSearch />

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