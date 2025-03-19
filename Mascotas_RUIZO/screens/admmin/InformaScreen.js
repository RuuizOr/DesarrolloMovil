import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const InformacionMascotaScreen = ({ route, navigation }) => {
  const { mascota } = route.params;
  const { theme } = useTheme();
  const [adoptada, setAdoptada] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={{ uri: mascota.imagen }} style={styles.image} />

      <Text style={[styles.title, { color: theme.textColor }]}>{mascota.nombre}</Text>
      <Text style={[styles.type, { color: theme.textColor }]}>🐾 {mascota.tipo}</Text>

      <Text style={[styles.description, { color: theme.textColor }]}>
        Esta mascota está buscando un hogar amoroso. ¡Anímate a adoptarla!
      </Text>

      <TouchableOpacity
        style={[styles.adoptButton, { backgroundColor: adoptada ? "#2ECC71" : "#E74C3C" }]}
        onPress={() => setAdoptada(!adoptada)}
      >
        <Text style={styles.buttonText}>{adoptada ? "✅ Adoptada" : "❤️ Marcar como adoptada"}</Text>
      </TouchableOpacity>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#F39C12" }]}
          onPress={() => alert("Funcionalidad de edición simulada")}
        >
          <Text style={styles.buttonText}>✏️ Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#E74C3C" }]}
          onPress={() => {
            alert("Mascota eliminada (simulado)");
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>🗑️ Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,  
    height: 250,
    borderRadius: 125,  
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#57B4BA",  
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  type: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  adoptButton: {
    width: "90%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InformacionMascotaScreen;
