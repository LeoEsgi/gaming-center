import ParallaxScrollView from "@/components/ParallaxScrollView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Input } from "@rneui/themed";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TabFourScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    Alert.alert("Login", `Email: ${email}, Password: ${password}`);
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    Alert.alert("Sign Up", `Email: ${email}, Password: ${password}`);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          {isLogin ? "Connexion" : "Inscription"}
        </Text>
        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <Input
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {!isLogin && (
          <Input
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        )}
        <Button
          title={isLogin ? "Connexion" : "Inscription"}
          onPress={isLogin ? handleLogin : handleSignUp}
          buttonStyle={styles.button}
        />
        <TouchableOpacity
          onPress={() => setIsLogin(!isLogin)}
          style={styles.toggleContainer}
        >
          <Text style={styles.toggleText}>
            {isLogin
              ? "Pas de compte ? Inscrivez-vous"
              : "Déjà un compte ? Connectez-vous"}
          </Text>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff",
  },
  button: {
    backgroundColor: "#006400",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonContainer: {
    marginVertical: 10,
    alignSelf: "center",
    width: "80%",
  },
  toggleContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  toggleText: {
    color: "#006400",
    fontSize: 16,
  },
});
