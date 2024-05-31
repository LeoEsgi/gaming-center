import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import LottieView from "lottie-react-native";
import React, { useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

export default function TabFiveScreen() {
  const [isGiftOpened, setGiftOpened] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [isPrizeModalVisible, setPrizeModalVisible] = useState(false);
  const [prize, setPrize] = useState<Prize | null>(null);
  type Prize = {
    id: number;
    name: string;
    rarity: number;
    color: string;
  };

  const prizes: Prize[] = [
    { id: 1, name: "rien", rarity: 0.75, color: "#979797" },
    { id: 2, name: "skin moyen !", rarity: 0.25, color: "#5146f0" },
    { id: 3, name: "skin rare !", rarity: 0.1, color: "#bb15b3" },
    { id: 4, name: "skin legendaire !!!", rarity: 0.01, color: "#f0e665" },
  ];

  function getRandomPrize(prizes: Prize[]) {
    let sum = 0;
    const acc = prizes.map((prize) => (sum += prize.rarity));
    const rand = Math.random() * sum;
    for (let i = 0; i < acc.length; i++) {
      if (acc[i] >= rand) {
        return prizes[i];
      }
    }
    return prizes[prizes.length - 1];
  }

  const handlePressGift = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start(() => {
      const randomPrize = getRandomPrize(prizes);
      setPrize(randomPrize);
      setPrizeModalVisible(true);
      setGiftOpened(true);
    });
  };

  const resetGift = () => {
    setGiftOpened(false);
    scaleAnim.setValue(1);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<Ionicons size={310} name="code-slash" />}
    >
      <View style={styles.container}>
        <ThemedView>
          <ThemedText type="title" style={styles.title}>
            Clique sur le cadeau
          </ThemedText>
        </ThemedView>
        {!isGiftOpened && (
          <TouchableOpacity onPress={handlePressGift}>
            <Animated.View
              style={[styles.gift, { transform: [{ scale: scaleAnim }] }]}
            >
              <Image
                source={require("@/assets/images/gift.png")}
                style={styles.giftImage}
              />
            </Animated.View>
          </TouchableOpacity>
        )}
        <View style={styles.prizesContainer}>
          {prizes.map((prize) => (
            <View
              key={prize.id}
              style={[styles.prizeItem, { backgroundColor: prize.color }]}
            >
              <ThemedText style={styles.prizeText}>{prize.name}</ThemedText>
              <ThemedText style={styles.prizeRarity}>{`Rareté : ${
                prize.rarity * 100
              }%`}</ThemedText>
            </View>
          ))}
        </View>
        {isGiftOpened && (
          <TouchableOpacity onPress={resetGift} style={styles.resetButton}>
            <ThemedText style={[styles.resetButtonText]}>
              Ouvrir un autre cadeau
            </ThemedText>
          </TouchableOpacity>
        )}
      </View>
      <Modal
        isVisible={isPrizeModalVisible}
        onBackdropPress={() => setPrizeModalVisible(false)}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        backdropColor="#000000"
        backdropOpacity={0.5}
      >
        <View style={styles.modalContent}>
          <ThemedText style={styles.modalTitle}>Félicitations !</ThemedText>
          <ThemedText style={styles.modalMessage}>Vous avez gagné :</ThemedText>
          <ThemedText
            style={{ fontSize: 22, fontWeight: "bold", color: prize?.color }}
          >
            {prize?.name}
          </ThemedText>
          <TouchableOpacity
            style={styles.buttonClose}
            onPress={() => setPrizeModalVisible(false)}
          >
            <ThemedText style={styles.textStyle}>Fermer</ThemedText>
          </TouchableOpacity>
        </View>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#f8f6f6",
  },
  gift: {
    width: 150,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
  },
  giftImage: {
    width: "100%",
    height: "100%",
  },
  resetButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  resetButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  prizesContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "90%",
  },
  prizeItem: {
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  prizeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  prizeRarity: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalMessage: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 15,
    color: "#333",
  },
  buttonClose: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
    width: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
