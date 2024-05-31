import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { useMemo, useState } from "react";
import {
  Alert,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";

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
const { width, height } = Dimensions.get("window");

const scale = width / 360;
const yBase = 235;
const xBase = 150;

const postes: Poste[] = [
  {
    id: 1,
    name: "1",
    x: xBase * scale,
    y: yBase,
    status: "available",
  },
  {
    id: 2,
    name: "2",
    x: (xBase + 40) * scale,
    y: yBase,
    status: "unavailable",
  },
  {
    id: 3,
    name: "3",
    x: xBase * scale,
    y: yBase + 40,
    status: "available",
  },
  {
    id: 4,
    name: "4",
    x: (xBase + 40) * scale,
    y: yBase + 40,
    status: "available",
  },
  {
    id: 5,
    name: "5",
    x: xBase * scale,
    y: yBase + 80,
    status: "available",
  },
  {
    id: 6,
    name: "6",
    x: (xBase + 40) * scale,
    y: yBase + 80,
    status: "available",
  },
  {
    id: 7,
    name: "7",
    x: (xBase + 35) * scale,
    y: yBase - 200,
    status: "available",
  },
  {
    id: 8,
    name: "8",
    x: (xBase - 100) * scale,
    y: yBase + 40,
    status: "available",
  },
  {
    id: 9,
    name: "9",
    x: (xBase + 130) * scale,
    y: yBase - 200,
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
      <ThemedView style={style.filters}>
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
          <ThemedText>Filtres</ThemedText>
          {filterStatus && (
            <Ionicons name="checkmark-circle" size={20} color="green" />
          )}
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={style.container}>
        <ThemedText style={style.title}>Réservation des Postes</ThemedText>
        <ThemedView style={style.map}>
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
                <ThemedText style={style.posteText}>{poste.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </ImageBackground>
        </ThemedView>
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
          <ThemedView style={style.modalContainer}>
            <ThemedView style={style.modalContent}>
              <ScrollView>
                <ThemedText style={style.modalTitle}>
                  Sélectionnez une heure
                </ThemedText>
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
                    <ThemedText
                      style={style.hourButtonText}
                    >{`${hour}:00`}</ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </ThemedView>
          </ThemedView>
        </Modal>
        {selectedPoste && !show && !showTimeModal && (
          <TouchableOpacity
            style={style.button}
            onPress={() => setShowTimeModal(true)}
          >
            <ThemedText style={style.buttonText}>
              Sélectionner l'heure
            </ThemedText>
          </TouchableOpacity>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isFilterModalVisible}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View style={style.modalView}>
            <ThemedText style={style.modalText}>
              Choisissez vos filtres :
            </ThemedText>

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
              <ThemedText
                style={[
                  style.filterText,
                  filterStatus === "available" ? { color: "#f5f5f5" } : {},
                ]}
              >
                Disponible
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                style.filterOption,
                filterStatus === "unavailable"
                  ? { backgroundColor: "#ff0000" }
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
              <ThemedText
                style={[
                  style.filterText,
                  filterStatus === "unavailable" ? { color: "#f5f5f5" } : {},
                ]}
              >
                Indisponible
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.buttonClose}
              onPress={() => setFilterModalVisible(false)}
            >
              <ThemedText style={style.textStyle}>Fermer</ThemedText>
            </TouchableOpacity>
          </View>
        </Modal>
      </ThemedView>
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
    marginTop: 50,
    flexDirection: "row",
    flexWrap: "wrap",
    height: height,
    width: width,
  },
  floorPlan: {
    flex: 1,
    width: "100%",
    height: 400,
  },
  poste: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#008000",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ffffff",
    position: "absolute",
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
    transform: [{ translateX: -15 }, { translateY: -7 }],
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 0,
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
  buttonTextS: {
    color: "#000000",
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
    color: "#333",
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
    color: "#33333392",
  },
  buttonClose: {
    backgroundColor: "#0000003e",
    borderRadius: 20,
    padding: 10,
    marginTop: 25,
    width: 200,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "transparent",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
});
