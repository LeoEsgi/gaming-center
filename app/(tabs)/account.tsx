import ParallaxScrollView from "@/components/ParallaxScrollView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Button, Input } from "@rneui/themed";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TabFourScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleLogin = () => {
    Alert.alert("Connexion", `Email: ${email}, Mot de passe: ${password}`);
  };

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas");
      return;
    }
    Alert.alert("Inscription", `Email: ${email}, Mot de passe: ${password}`);
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
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          leftIcon={<Ionicons name="mail-outline" size={20} color="#cccccc" />}
        />
        <Input
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon={
            <Ionicons name="lock-closed-outline" size={20} color="#cccccc" />
          }
        />
        {!isLogin && (
          <Input
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            leftIcon={
              <Ionicons name="lock-closed-outline" size={20} color="#cccccc" />
            }
          />
        )}
        <Button
          title={isLogin ? "Connexion" : "Inscription"}
          onPress={isLogin ? handleLogin : handleSignUp}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          containerStyle={styles.buttonContainer}
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
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
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
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonContainer: {
    marginVertical: 10,
    alignSelf: "center",
    width: "80%",
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  input: {
    color: "#333",
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
