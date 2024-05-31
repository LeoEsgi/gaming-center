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
      headerImage={<Ionicons size={310} name="code-slash" />}
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
        <TouchableOpacity style={styles.orContainer}>
          <Text style={styles.orText}>ou</Text>
        </TouchableOpacity>
        <Button
          title=" Continuer avec Google"
          buttonStyle={styles.buttonGoogle}
          titleStyle={styles.buttonGoogleTitle}
          containerStyle={styles.buttonGoogleContainer}
          icon={
            <Ionicons
              name="logo-google"
              size={20}
              color="#fff"
              style={styles.icon}
            />
          }
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
  container: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#006400",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
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
    paddingRight: 10,
    paddingLeft: 10,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginBottom: 2,
    borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  input: {
    color: "#333",
    fontSize: 16,
  },
  toggleContainer: {
    marginTop: 20,
  },
  toggleText: {
    color: "#006400",
    fontSize: 14,
    paddingLeft: 12,
  },
  orContainer: {
    marginTop: 20,
  },
  orText: {
    color: "#ffffff67",
    textAlign: "center",
  },
  buttonGoogle: {
    backgroundColor: "transparent",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ffffff2f",
  },
  buttonGoogleTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonGoogleContainer: {
    marginVertical: 10,
    marginTop: 20,
    paddingRight: 10,
    paddingLeft: 10,
  },
  icon: {
    position: "absolute",
    left: 18,
  },
});
