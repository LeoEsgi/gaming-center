import ParallaxScrollView from "@/components/ParallaxScrollView";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Alert, Image, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const gamingWorkstationImage = require("../../assets/images/poste2.webp");

type Poste = {
  id: number;
  name: string;
};

type Reservation = {
  posteId: number;
  date: string;
  startTime: number;
  endTime: number;
};

const postes: Poste[] = [
  { id: 1, name: "Poste 1" },
  { id: 2, name: "Poste 2" },
  { id: 3, name: "Poste 3" },
  { id: 4, name: "Poste 4" },
  { id: 5, name: "Poste 5" },
  { id: 6, name: "Poste 6" },
  { id: 7, name: "Poste 7" },
  { id: 8, name: "Poste 8" },
];

const validHours = Array.from({ length: 13 }, (_, i) => i + 8); // Array of hours from 8 to 20

export default function TabThreeScreen() {
  const [selectedPoste, setSelectedPoste] = useState<Poste | null>(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setShowTimeModal(true);
  };

  const onTimeSelect = (hour: number) => {
    const selectedDate = new Date(date);
    selectedDate.setHours(hour);
    selectedDate.setMinutes(0);
    setDate(selectedDate);
    setShowTimeModal(false);
    setShow(false);
    confirmerReservation(selectedPoste, selectedDate);
  };

  const reserverPoste = (poste: Poste) => {
    setSelectedPoste(poste);
    setShow(true);
  };

  const isAvailable = (posteId: number, date: string, hour: number) => {
    return !reservations.some(
      (reservation) =>
        reservation.posteId === posteId &&
        reservation.date === date &&
        reservation.startTime <= hour &&
        reservation.endTime > hour
    );
  };

  const confirmerReservation = (poste: Poste | null, selectedDate: Date) => {
    if (poste) {
      const dateString = selectedDate.toLocaleDateString();
      const hour = selectedDate.getHours();

      if (isAvailable(poste.id, dateString, hour)) {
        setReservations([
          ...reservations,
          {
            posteId: poste.id,
            date: dateString,
            startTime: hour,
            endTime: hour + 1,
          },
        ]);
        Alert.alert(
          `Vous avez réservé ${
            poste.name
          } pour le ${dateString} à ${selectedDate.toLocaleTimeString()}`
        );
      } else {
        Alert.alert(
          `${poste.name} est déjà réservé pour le ${dateString} à ${hour}:00`
        );
      }
      setSelectedPoste(null);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <View style={stylesq.container}>
        <Text style={stylesq.title}>Réservation des Postes</Text>
        <View style={stylesq.map}>
          {postes.map((poste) => (
            <TouchableOpacity
              key={poste.id}
              style={stylesq.poste}
              onPress={() => reserverPoste(poste)}
            >
              <Image
                source={gamingWorkstationImage}
                style={stylesq.posteImage}
              />
              <Text style={stylesq.posteText}>{poste.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
        <Modal
          visible={showTimeModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowTimeModal(false)}
        >
          <View style={stylesq.modalContainer}>
            <View style={stylesq.modalContent}>
              <ScrollView>
                <Text style={stylesq.modalTitle}>Sélectionnez une heure</Text>
                {validHours.map((hour) => (
                  <TouchableOpacity
                    key={hour}
                    style={stylesq.hourButton}
                    onPress={() => onTimeSelect(hour)}
                  >
                    <Text style={stylesq.hourButtonText}>{`${hour}:00`}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
        {selectedPoste && !show && !showTimeModal && (
          <TouchableOpacity
            style={stylesq.button}
            onPress={() => setShowTimeModal(true)}
          >
            <Text style={stylesq.buttonText}>Sélectionner l'heure</Text>
          </TouchableOpacity>
        )}
      </View>
    </ParallaxScrollView>
  );
}

const stylesq = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff8f8",
  },
  map: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  poste: {
    width: 120,
    height: 140,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  posteImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
  },
  posteText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  button: {
    margin: 20,
    padding: 15,
    backgroundColor: "#006400",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  hourButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#006400",
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  hourButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
