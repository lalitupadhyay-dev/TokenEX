import short from "@/utils/short";
import { useReducer, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Pagination from "../system/Pagination";

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
});

function TokensList({ tokens }: { tokens: any[] }) {


    // const [start, setStart] = useState(0);

    return (
        <View>
            <Text style={s.section}>Tokens ({tokens.length})</Text>
            {/* <FlatList
                data={tokens}
                keyExtractor={(t) => t.mint}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={s.row}>
                        <Text style={s.mint}>{short(item.mint, 6)}</Text>
                        <Text style={s.amount}>{item.amount}</Text>
                    </View>
                )}
            /> */}

            <Pagination data={tokens} limit={5} maxPagesToRender={5} dataLength={tokens.length} />

        </View>
    );
}

export default TokensList;