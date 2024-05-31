import ParallaxScrollView from "@/components/ParallaxScrollView";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useMemo, useState } from "react";
import { Alert, Image, ImageBackground, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

type Poste = {
  id: number;
  name: string;
  x: number;
  y: number;
  status?: "available" | "unavailable";
};

type Reservation = {
  posteId: number;
  date: string;
  startTime: number;
  endTime: number;
};

const yBase = 270;
const xBase = 150;

const postes: Poste[] = [
  { id: 1, name: "1", x: xBase, y: yBase, status: "available" },
  { id: 2, name: "2", x: xBase + 40, y: yBase, status: "unavailable" },
  { id: 3, name: "3", x: xBase, y: yBase + 40, status: "available" },
  { id: 4, name: "4", x: xBase + 40, y: yBase + 40, status: "available" },
  { id: 5, name: "5", x: xBase, y: yBase + 80, status: "available" },
  { id: 6, name: "6", x: xBase + 40, y: yBase + 80, status: "available" },
  {
    id: 7,
    name: "7",
    x: xBase + 40,
    y: yBase - 230,
    status: "available",
  },
  {
    id: 8,
    name: "8",
    x: xBase - 130,
    y: yBase + 50,
    status: "available",
  },
  {
    id: 9,
    name: "9",
    x: xBase + 150,
    y: yBase - 240,
    status: "unavailable",
  },
];

const validHours = Array.from({ length: 13 }, (_, i) => i + 8);

export default function TabThreeScreen() {
  const [selectedPoste, setSelectedPoste] = useState<Poste | null>(null);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

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

  const filteredPostes = useMemo(() => {
    if (!filter && !filterStatus) return postes;
    return postes.filter((poste) => {
      if (filter && !poste.name.toLowerCase().includes(filter.toLowerCase())) {
        return false;
      }
      if (filterStatus && poste.status !== filterStatus) {
        return false;
      }
      return true;
    });
  }, [filter, postes, filterStatus]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={<Ionicons size={310} name="code-slash" />}
      noPadding={true}
    >
      <View style={style.filters}>
        <TextInput
          style={style.searchBar}
          onChangeText={setFilter}
          placeholder="Rechercher un espace"
        />
        <TouchableOpacity
          style={[
            style.filterButton,
            filterStatus ? style.filterButtonActive : {},
          ]}
          onPress={() => setFilterModalVisible(true)}
        >
          <Text>Filtres</Text>
          {filterStatus && (
            <Ionicons name="checkmark-circle" size={20} color="green" />
          )}
        </TouchableOpacity>
      </View>
      <View style={style.container}>
        <Text style={style.title}>Réservation des Postes</Text>
        <View style={style.map}>
          <ImageBackground
            source={require("../../assets/images/floor.webp")}
            style={style.floorPlan}
            resizeMode="cover"
          >
            {filteredPostes.map((poste) => (
              <TouchableOpacity
                key={poste.id}
                style={[
                  style.poste,
                  { left: poste.x, top: poste.y },
                  poste.status === "unavailable"
                    ? { backgroundColor: "#ff0000" }
                    : {},
                ]}
                onPress={() => {
                  if (poste.status === "available") reserverPoste(poste);
                  else Alert.alert(`Poste ${poste.name} est indisponible`);
                }}
              >
                <Text style={style.posteText}>{poste.name}</Text>
              </TouchableOpacity>
            ))}
          </ImageBackground>
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
          <View style={style.modalContainer}>
            <View style={style.modalContent}>
              <ScrollView>
                <Text style={style.modalTitle}>Sélectionnez une heure</Text>
                {validHours.map((hour) => (
                  <TouchableOpacity
                    key={hour}
                    style={[
                      style.hourButton,
                      isAvailable(
                        selectedPoste?.id || 0,
                        date.toLocaleDateString(),
                        hour
                      )
                        ? {}
                        : { backgroundColor: "#ff0000" },
                    ]}
                    onPress={() => onTimeSelect(hour)}
                  >
                    <Text style={style.hourButtonText}>{`${hour}:00`}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
        {selectedPoste && !show && !showTimeModal && (
          <TouchableOpacity
            style={style.button}
            onPress={() => setShowTimeModal(true)}
          >
            <Text style={style.buttonText}>Sélectionner l'heure</Text>
          </TouchableOpacity>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isFilterModalVisible}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={style.modalView}>
            <Text style={style.modalText}>Choisissez vos filtres :</Text>

            <TouchableOpacity
              style={[
                style.filterOption,
                filterStatus === "available"
                  ? { backgroundColor: "#089708" }
                  : {},
              ]}
              onPress={() => {
                if (filterStatus === "available") {
                  setFilterStatus("");
                } else {
                  setFilterStatus("available");
                }
              }}
            >
              <Text style={style.filterText}>Disponible</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                style.filterOption,
                filterStatus === "unavailable"
                  ? { backgroundColor: "#089708" }
                  : {},
              ]}
              onPress={() => {
                if (filterStatus === "unavailable") {
                  setFilterStatus("");
                } else {
                  setFilterStatus("unavailable");
                }
              }}
            >
              <Text style={style.filterText}>Indisponible</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.buttonClose}
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={style.textStyle}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ParallaxScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#ffffff",
  },
  map: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  floorPlan: {
    flex: 1,
    width: "100%",
    height: 450,
  },
  poste: {
    position: "absolute",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#008000", // Green for available
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ffffff",
  },
  filterButtonActive: {
    backgroundColor: "#4CAF50",
  },
  posteText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#ffffff",
    position: "absolute",
    top: "30%",
    left: "90%",
    transform: [{ translateX: -15 }, { translateY: -4 }],
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#727070",
    borderRadius: 10,
    paddingLeft: 15,
    backgroundColor: "#bbbaba",
    marginRight: 10,
  },
  filterButton: {
    width: 100,
    backgroundColor: "#bbbaba",
    borderColor: "#727070",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 40,
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
    backgroundColor: "rgba(212, 209, 209, 0.5)",
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  filterOption: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginTop: 16,
    width: 200,
    alignItems: "center",
    borderRadius: 10,
  },
  filterText: {
    fontSize: 16,
    color: "#333",
  },
  buttonClose: {
    backgroundColor: "#c2c2c27e",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 25,
    width: 200,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
