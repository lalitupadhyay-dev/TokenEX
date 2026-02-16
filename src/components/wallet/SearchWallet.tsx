import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const s = StyleSheet.create({
    inputContainer: {
        backgroundColor: "#212130",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#33335a",
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginTop: 15,
    },
    input: {
        color: "#FFFFFF",
        fontSize: 12,
        paddingVertical: 14,
        fontWeight: "400",
        borderColor: "#fff",
        marginTop: 10,
        borderRadius: 10
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
});

function SearchWallet({ address, setAddress, loading, search, clear }: { address: string, setAddress: React.Dispatch<React.SetStateAction<string>>, loading: boolean, search: () => void, clear: () => void }) {
    return (
        <View>
            <View style={s.inputContainer}>
                <Text style={{ color: "#fff", fontWeight: 900, paddingHorizontal: 4, marginTop: 10 }}>Wallet address</Text>
                <TextInput
                    style={s.input}
                    placeholder="Enter wallet address..."
                    placeholderTextColor="#8585af"
                    value={address}
                    onChangeText={setAddress}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
            </View>
            <View style={s.btnRow}>
                {/*
                Web: <button onClick={fn}>Search</button>
                RN: <TouchableOpacity onPress={fn}><Text>Search</Text></TouchableOpacity>
                ALL text must be inside <Text>! 
                */}
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

                <TouchableOpacity
                    style={[s.btnGhost, loading && s.btnDisabled]}
                    onPress={clear}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    <Text style={s.btnGhostText}>Clear</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default SearchWallet;