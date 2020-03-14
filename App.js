import React from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput
} from "react-native";

export default function App() {
  return (
    <KeyboardAvoidingView>
      <View>
        <Image source={require('./assets/logo.png')} />
      </View>

      <View>
        <TextInput
          placeholder="Email"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TextInput
          placeholder="Password"
          autoCorrect={false}
          onChangeText={() => {}}
        />

        <TouchableOpacity>
          <Text>Acess</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Create Account</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    /*
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>New application RN</Text>
    </View>
    */
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
