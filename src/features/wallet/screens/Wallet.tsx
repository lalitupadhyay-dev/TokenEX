
import { useState } from "react";
import {
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator,
    Alert,
    Linking,
    StyleSheet, Text, View
} from "react-native";
import useSolanaService from "../hooks/useSolanaService";
import short from "@/utils/short";
import timeAgo from "@/utils/timeAgo";

const s = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#242424",
        paddingHorizontal: 15
    },
    scroll: {
        flex: 1,
        // paddingHorizontal: 24,
        // paddingTop: 16,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "800",
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        color: "#6B7280",
        fontSize: 15,
        marginBottom: 28,
        fontWeight: "400",
    },

    inputContainer: {
        backgroundColor: "#323232",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#1b1b1b",
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginTop: 15,
    },
    input: {
        color: "#FFFFFF",
        fontSize: 15,
        paddingVertical: 14,
        fontWeight: "400",
    },

    btnRow: {
        flexDirection: "row",
        gap: 12,
        marginTop: 16,
    },
    btn: {
        flex: 1,
        backgroundColor: "#14F195",
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#14F195",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 8,
    },
    btnDisabled: {
        opacity: 0.6,
    },
    btnText: {
        color: "#0D0D12",
        fontWeight: "600",
        fontSize: 16,
        letterSpacing: 0.3,
    },
    btnGhost: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 14,
        backgroundColor: "#16161D",
        borderWidth: 1,
        borderColor: "#2A2A35",
    },
    btnGhostText: {
        color: "#9CA3AF",
        fontSize: 15,
        fontWeight: "500",
    },

    card: {
        backgroundColor: "#16161D",
        borderRadius: 24,
        padding: 28,
        alignItems: "center",
        marginTop: 28,
        borderWidth: 1,
        borderColor: "#2A2A35",
    },
    label: {
        color: "#6B7280",
        fontSize: 13,
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: 1.2,
    },
    balanceRow: {
        flexDirection: "row",
        alignItems: "baseline",
        marginTop: 8,
    },
    balance: {
        color: "#FFFFFF",
        fontSize: 48,
        fontWeight: "700",
        letterSpacing: -1,
    },
    sol: {
        color: "#14F195",
        fontSize: 18,
        fontWeight: "600",
        marginLeft: 8,
    },
    addr: {
        color: "#9945FF",
        fontSize: 13,
        fontFamily: "monospace",
        marginTop: 16,
        backgroundColor: "#1E1E28",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        overflow: "hidden",
    },

    section: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "600",
        marginTop: 32,
        marginBottom: 16,
        letterSpacing: -0.3,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#16161D",
        paddingVertical: 16,
        paddingHorizontal: 18,
        borderRadius: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#2A2A35",
    },
    mint: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: "monospace",
        fontWeight: "500",
    },
    amount: {
        color: "#14F195",
        fontSize: 15,
        fontWeight: "600",
    },
    time: {
        color: "#6B7280",
        fontSize: 12,
        marginTop: 4,
        fontWeight: "400",
    },
    statusIcon: {
        fontSize: 18,
        fontWeight: "600",
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

    return <ScrollView style={s.scroll}>


        <View style={s.container}>
            <View style={s.inputContainer}>
                <TextInput
                    style={s.input}
                    placeholder="Enter wallet address..."
                    placeholderTextColor="#8f8f8f"
                    value={address}
                    onChangeText={setAddress}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>

            <View style={s.btnRow}>
                {/* 💡 Web: <button onClick={fn}>Search</button>
                  RN: <TouchableOpacity onPress={fn}><Text>Search</Text></TouchableOpacity>
                  ALL text must be inside <Text>! */}
                <TouchableOpacity
                    style={[s.btn, loading && s.btnDisabled]}
                    onPress={search}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    {loading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <Text style={s.btnText}>Search</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Balance Card */}
            {balance !== null && (
                <View style={s.card}>
                    <Text style={s.label}>SOL Balance</Text>
                    <View style={s.balanceRow}>
                        <Text style={s.balance}>{balance.toFixed(4)}</Text>
                        <Text style={s.sol}>SOL</Text>
                    </View>
                    <Text style={s.addr}>{short(address.trim(), 6)}</Text>
                </View>
            )}

            {/* Tokens */}
            {tokens.length > 0 && (
                <>
                    <Text style={s.section}>Tokens ({tokens.length})</Text>
                    <FlatList
                        data={tokens}
                        keyExtractor={(t) => t.mint}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <View style={s.row}>
                                <Text style={s.mint}>{short(item.mint, 6)}</Text>
                                <Text style={s.amount}>{item.amount}</Text>
                            </View>
                        )}
                    />
                </>
            )}

            {/* Transactions */}
            {txns.length > 0 && (
                <>
                    <Text style={s.section}>Recent Transactions</Text>
                    <FlatList
                        data={txns}
                        keyExtractor={(t) => t.sig}
                        scrollEnabled={false}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={s.row}
                                onPress={() =>
                                    Linking.openURL(`https://solscan.io/tx/${item.sig}`)
                                }
                                activeOpacity={0.7}
                            >
                                <View>
                                    <Text style={s.mint}>{short(item.sig, 8)}</Text>
                                    <Text style={s.time}>
                                        {item.time ? timeAgo(item.time) : "pending"}
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        s.statusIcon,
                                        { color: item.ok ? "#14F195" : "#EF4444" },
                                    ]}
                                >
                                    {item.ok ? "+" : "-"}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </>
            )}
        </View>
    </ScrollView>
}