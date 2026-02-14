import { Text, View } from "react-native";
import Logo from "./Logo";

function Header () {
    return (
        <View style={{backgroundColor: "#242424", padding: 10}}>
            <Logo />
        </View>
    );
}

export default Header;