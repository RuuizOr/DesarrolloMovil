import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useTheme } from "../../context/ThemeContext";

const InformacionMascotaScreen = ({ route }) => {
  const { mascota } = route.params;
  const { theme } = useTheme();
  const [adoptada, setAdoptada] = useState(false);

  const enviarSolicitud = () => {
    Alert.alert(
      "Solicitud enviada",
      `Has enviado una solicitud para adoptar a ${mascota.nombre}. Pronto te contactaremos.`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Image source={{ uri: mascota.imagen }} style={styles.image} />

      <Text style={[styles.title, { color: theme.textColor }]}>{mascota.nombre}</Text>
      <Text style={[styles.type, { color: theme.textColor }]}>🐾 {mascota.tipo}</Text>

      <Text style={[styles.description, { color: theme.textColor }]}>
        Esta mascota está buscando un hogar amoroso. ¡Anímate a adoptarla!
      </Text>

      <TouchableOpacity
        style={[styles.solicitudButton, { backgroundColor: "#3498DB" }]}
        onPress={enviarSolicitud}
      >
        <Text style={styles.buttonText}>📩 Enviar solicitud de adopción</Text>
      </TouchableOpacity>
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
  solicitudButton: {
    width: "90%",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InformacionMascotaScreen;
