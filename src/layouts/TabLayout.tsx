import Header from "@/components/system/Header";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function TabLayout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#16161D", borderWidth: 5, borderColor: "yellow" }} edges={["top"]}>

            <Header />

            <View style={{ flex: 1, borderWidth: 5, borderColor: "red" }}>
                <Tabs screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: "#16161D",
                        borderTopColor: "#2A2A35",
                    },
                    tabBarActiveTintColor: "#14F195",
                    tabBarInactiveTintColor: "#6B7280",
                }}>
                    <Tabs.Screen name="index" options={{
                        title: "Wallet", tabBarIcon: ({ size, color }) => (
                            <Ionicons name="wallet" size={size} color={color} />
                        )
                    }} />

                    <Tabs.Screen name="swap" options={{
                        title: "Swap", tabBarIcon: ({ size, color }) => (
                            <Ionicons name="swap-vertical" size={size} color={color} />
                        )
                    }} />
                </Tabs>
            </View>
        </SafeAreaView>
    );
}