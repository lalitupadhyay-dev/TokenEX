import short from "@/utils/short";
import timeAgo from "@/utils/timeAgo";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Linking } from "react-native";

const s = StyleSheet.create({
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

function RecentTxnsList({ txns }: { txns: any[] }) {
    return (
        <View>
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
        </View>
    );
}

export default RecentTxnsList;