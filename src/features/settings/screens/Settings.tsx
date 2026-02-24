import { Alert, Switch, Text, TouchableOpacity, View, StyleSheet } from "react-native";
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
  safe: {
    flex: 1,
    backgroundColor: "#0D0D12",
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  sectionTitle: {
    color: "#6B7280",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 8,
  },
  card: {
    backgroundColor: "#16161D",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2A2A35",
    padding: 4,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#1E1E28",
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxDevnet: {
    backgroundColor: "#2D2310",
  },
  label: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  value: {
    color: "#fff",
  },
  sublabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  badge: {
    backgroundColor: "#1E1E28",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    color: "#14F195",
    fontSize: 14,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#2A2A35",
    marginHorizontal: 14,
  },
  dangerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#1A1215",
    borderWidth: 1,
    borderColor: "#3D2023",
    paddingVertical: 16,
    marginTop: 20,
    borderRadius: 14,
  },
  dangerText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default function Settings() {
  const isDevnet = useWalletStore((s) => s.isDevnet);
  const toggleNetwork = useWalletStore((s) => s.toggleNetwork);
  const favorites = useWalletStore((s) => s.favorites);
  const searchHistory = useWalletStore((s) => s.searchHistory);
  const clearHistory = useWalletStore((s) => s.clearHistory);

  return (
    <View style={s.container}>
      {/* Network Toggle */}
      <View style={s.row}>
        <View>
          <Text style={s.label}>Use Devnet</Text>
          <Text style={s.sublabel}>
            {isDevnet ? "Testing network (free SOL)" : "Real network"}
          </Text>
        </View>
        <Switch
          value={isDevnet}
          onValueChange={toggleNetwork}
          trackColor={{ true: "#14F195", false: "#333" }}
          thumbColor="#fff"
        />
      </View>

      {/* Stats */}
      <View style={s.row}>
        <Text style={s.label}>Saved Wallets</Text>
        <Text style={s.value}>{favorites.length}</Text>
      </View>

      <View style={s.row}>
        <Text style={s.label}>Search History</Text>
        <Text style={s.value}>{searchHistory.length}</Text>
      </View>

      {/* Clear History */}
      <TouchableOpacity
        style={s.dangerButton}
        onPress={() => {
          Alert.alert(
            "Clear History",
            "This will remove all your search history. Favorites won't be affected.",
            [
              { text: "Cancel", style: "cancel" },
              { text: "Clear", style: "destructive", onPress: clearHistory },
            ]
          );
        }}
      >
        <Text style={s.dangerText}>Clear Search History</Text>
      </TouchableOpacity>
    </View>
  );
}