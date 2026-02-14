import Header from "@/components/Header";
import { Tabs } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function TabLayout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#242424", }} edges={["top"]}>

            <Header />

            <View style={{ flex: 1 }}>
                <Tabs screenOptions={{ headerShown: false }}>
                    <Tabs.Screen name="index" options={{ title: "Wallet" }} />
                    <Tabs.Screen name="swap" options={{ title: "Swap" }} />

                </Tabs>
            </View>
        </SafeAreaView>
    );
}