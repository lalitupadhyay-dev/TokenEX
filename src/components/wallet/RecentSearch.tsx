import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

function RecentSearch() {
    return (
        <View style={{ marginTop: 15, borderWidth: 1, borderColor: "#33335a", backgroundColor: "#212130", padding: 10, borderRadius: 10}}>
            <View style={{
                flexDirection: "row", alignItems: "center"
            }}>
                <Text style={{ color: "#fff", fontWeight: 900, paddingHorizontal: 4 }}>Recent Searches</Text>
                <Ionicons name="search" size={20} color="#fff" />
            </View>

            <View style={{borderTopWidth: 1, borderStyle: "dashed", borderColor: "#79799d", marginTop: 15, marginHorizontal: 4}}></View>

            <View style={{marginTop: 15}}>
                <Text style={{ color: "#79799d", paddingHorizontal: 4, fontSize: 12 }}>No current searches</Text>
            </View>

        </View>
    );
}

export default RecentSearch;