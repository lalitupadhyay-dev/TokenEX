import { Image, View } from "react-native";

function Logo () {
    return (
        <View>
            <Image source={require("assets/dark-logo.png")} style={{width: 120, height: 40, resizeMode: "contain"}} />
        </View>
    );
}

export default Logo;