import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Platform, StyleSheet } from "react-native";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="code-slash" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Gaming Center</ThemedText>
      </ThemedView>
      <ThemedText>
        Bienvenue au Gaming Center, votre espace dédié à l'exploration du monde
        numérique et du gaming. Nous mettons à disposition des ordinateurs haut
        de gamme et offrons des formations pour tous les niveaux, du débutant à
        l'expert.
      </ThemedText>
      <Collapsible title="Notre mission">
        <ThemedText>
          Notre objectif est d'offrir un accès équitable aux technologies de
          pointe et de fournir des formations en informatique et en gaming,
          permettant à chacun de se familiariser avec le numérique.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Formations disponibles">
        <ThemedText>
          Explorez nos différents modules de formation, allant de l'initiation à
          l'informatique à la programmation avancée, en pass les compétences en
          création de jeux vidéo.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Équipement et installations">
        <ThemedText>
          Nos installations comprennent des stations de jeu équipées des
          dernières technologies, des salles de cours interactives, et des
          espaces de travail collaboratifs adaptés à tous vos besoins
          numériques.
        </ThemedText>
        <Image
          source={require("@/assets/images/poste.webp")}
          style={{
            alignSelf: "center",
            height: 200,
            width: 300,
            margin: 18,
            borderRadius: 8,
          }}
        />
      </Collapsible>
      <Collapsible title="Rejoignez notre communauté">
        <ThemedText>
          Participez à nos événements communautaires, tournois, et workshops
          pour rencontrer d'autres passionnés de technologie et de gaming.
          Découvrez comment la technologie peut enrichir votre vie quotidienne
          et professionnelle.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Support pour tous les appareils">
        <ThemedText>
          Que vous soyez sur PC, console ou mobile, notre équipe technique est
          là pour vous soutenir. Profitez de conseils personnalisés pour tirer
          le meilleur parti de votre équipement.
        </ThemedText>
      </Collapsible>
      <Collapsible title="Programmes de mentorat">
        <ThemedText>
          Nos mentors sont des experts dans leurs domaines et sont là pour vous
          guider à travers votre parcours d'apprentissage numérique, vous
          offrant soutien et conseils à chaque étape.
        </ThemedText>
      </Collapsible>
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
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
