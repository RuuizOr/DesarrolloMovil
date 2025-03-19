import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";

const MascotasScreen = ({ navigation }) => {
  const [mascotas, setMascotas] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const responsePerros = await axios.get("https://dog.ceo/api/breeds/list/all");
        const razas = Object.keys(responsePerros.data.message);
        const razasAleatorias = razas.sort(() => 0.5 - Math.random()).slice(0, 10); 

        const perrosPromises = razasAleatorias.map(async (raza) => {
          const res = await axios.get(`https://dog.ceo/api/breed/${raza}/images/random`);
          return {
            id: `dog-${raza}`,
            nombre: raza,
            tipo: "Perro",
            imagen: res.data.message, 
          };
        });
        const perros = await Promise.all(perrosPromises);

        const responseGatos = await axios.get("https://api.thecatapi.com/v1/images/search?limit=10");
        const gatos = responseGatos.data.map((gato, index) => ({
          id: `cat-${index}`,
          nombre: `Gato ${index + 1}`,
          tipo: "Gato",
          imagen: gato.url,
        }));

        setMascotas([...perros, ...gatos]);
      } catch (error) {
        console.error("Error al obtener las mascotas:", error);
      }
    };

    fetchMascotas();
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
      <Image source={{ uri: item.imagen }} style={styles.image} />
      <Text style={[styles.title, { color: theme.textColor }]}>{item.nombre}</Text>
      <Text style={[styles.type, { color: theme.textColor }]}>🐾 {item.tipo}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#57B4BA" }]} 
          onPress={() => navigation.navigate("Información", { mascota: item })}
        >
          <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>Ver detalles</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.textColor }]}>🐶🐱 Mascotas en Adopción 🐶🐱</Text>
      <FlatList data={mascotas} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  card: { padding: 15, borderRadius: 10, marginBottom: 15 },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 5 },
  type: { fontSize: 16, textAlign: "center", marginBottom: 10 },
  buttonsContainer: { flexDirection: "row", justifyContent: "center" },
  button: { paddingVertical: 10, borderRadius: 5, alignItems: "center", width: "80%" },
  buttonText: { color: "#FFF", fontSize: 14, fontWeight: "bold" },
});

export default MascotasScreen;
