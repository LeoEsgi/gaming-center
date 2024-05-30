import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Image, Platform, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bienvenue sur GC</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Etape 1: Réserve une séance</ThemedText>
        <ThemedText>
          Dans l'onglet <ThemedText type="defaultSemiBold">Salle</ThemedText>{" "}
          réserve un poste avec la date et l'heure qui te convient.{" "}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Etape 2: QR Code</ThemedText>
        <ThemedText>
          Un mail te seras envoyé contenant les informations sur ta réservation
          ainsi qu'un QR Code te permettant d'accèder a votre poste le jour J.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Etape 3: Venez jouer !</ThemedText>
        <ThemedText>
          Présente toi à notre gaming center avec ton QR Code, une fois sur ton
          poste déverouille le à l'aide de celui ci.{" "}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
