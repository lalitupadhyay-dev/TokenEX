import short from "@/utils/short";
import { Ionicons } from "@expo/vector-icons";
import { useReducer, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const s = StyleSheet.create({
    btnDisabled: {
        opacity: 0.6,
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
});

function createArray(len: number) {
    return Array.from({ length: len }, (_, i) => i + 1);
}

interface Pagination {
    data: any[],
    start: number,
    end: number,
    pageNo: number,
    limit: number,
}

type PaginationAction = {
    type: "NEXT" | "PREV" | "RANDOM",
    payload: any,
}

function paginationReducer(state: Pagination, action: PaginationAction) {
    switch (action.type) {
        case "NEXT":
            return { ...state, start: state.start + state.limit, end: state.start + (2 * state.limit) - 1, pageNo: state.pageNo + 1 };

        case "PREV":
            return { ...state, start: state.start - state.limit, end: state.end - state.limit, pageNo: state.pageNo - 1 };

        case "RANDOM":
            // here to start

        default:
            throw new Error("Action is not defined!")
    }
}

function init(data: any[], limit: number) {
    const paginationData: Pagination = {
        data: data,
        start: 0,
        end: limit - 1,
        pageNo: 1,
        limit: limit,
    };
    return paginationData;
}

function Pagination({ data, limit, maxPagesToRender, dataLength }: { data: any[], limit: number, maxPagesToRender: number, dataLength: number }) {

    const [currentRenderingPages, setCurrentRenderingPages] = useState(() => {
        if (dataLength >= maxPagesToRender) {
            return createArray(maxPagesToRender);
        } else {
            return createArray(dataLength);
        }
    });

    const [paginationData, dispatch] = useReducer(paginationReducer, null, () => {
        if (dataLength >= limit) {
            return init(data, limit);
        } else {
            return init(data, dataLength);
        }
    });

    const renderThis = paginationData && paginationData.data.filter((item, i) => {
        if (i >= paginationData.start && i <= paginationData.end) return item;
    });

    // console.log(renderThis);

    console.log("start: ", paginationData.start, "end: ", paginationData.end, "pageNo:", paginationData.pageNo);

    return (
        <View>


            <FlatList
                data={renderThis}
                keyExtractor={(t) => t.mint}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={s.row}>
                        <Text style={s.mint}>{short(item.mint, 6)}</Text>
                        <Text style={s.amount}>{item.amount}</Text>
                    </View>
                )}
            />

            <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>

                <TouchableOpacity style={[paginationData.pageNo === 1 && s.btnDisabled, { paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: "#fff", borderRadius: 5, }]} disabled={paginationData.pageNo === 1} onPress={() => dispatch({ type: "PREV", payload: null })}>
                    <Ionicons name="arrow-back" size={15} color="#fff" />
                </TouchableOpacity>

                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
                    {
                        currentRenderingPages.map((pageNo) => <TouchableOpacity style={[paginationData.pageNo === pageNo ? { backgroundColor: "#14F195" } : { backgroundColor: "#fff" }, { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5 }]} key={pageNo}>
                            <Text style={{ color: "#0D0D12", fontWeight: 900 }}>{pageNo}</Text>
                        </TouchableOpacity>)
                    }
                </View>

                <TouchableOpacity style={[paginationData.pageNo === dataLength && s.btnDisabled, { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 5, borderWidth: 1, borderColor: "#fff", }]} disabled={paginationData.pageNo === dataLength} onPress={() => dispatch({ type: "NEXT", payload: null })}>
                    <Ionicons name="arrow-forward" size={15} color="#fff" />
                </TouchableOpacity>

            </View>
        </View>
    );
}

export default Pagination;