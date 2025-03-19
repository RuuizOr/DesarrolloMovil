import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from "react-native";
import axios from "axios";
import { useTheme } from "../../context/ThemeContext";
import { useFavoritas } from "../../context/FavoritasContext";

const MascotasScreen = ({ navigation }) => {
  const [mascotas, setMascotas] = useState([]);
  const [filtroRaza, setFiltroRaza] = useState(null);
  const [filtroTamaño, setFiltroTamaño] = useState(null);
  const { theme } = useTheme();
  const { favoritas, toggleFavorita } = useFavoritas();

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const responsePerros = await axios.get("https://dog.ceo/api/breeds/list/all");
        const razas = Object.keys(responsePerros.data.message);
        const razasAleatorias = razas.sort(() => 0.5 - Math.random()).slice(0, 10);

        const perrosPromises = razasAleatorias.map(async (raza) => {
          const res = await axios.get(`https://dog.ceo/api/breed/${raza}/images/random`);
          return { id: `dog-${raza}`, nombre: raza, tipo: "Perro", imagen: res.data.message, tamaño: getTamañoPerro(raza) };
        });
        const perros = await Promise.all(perrosPromises);

        const responseGatos = await axios.get("https://api.thecatapi.com/v1/images/search?limit=10");
        const gatos = responseGatos.data.map((gato, index) => ({
          id: `cat-${index}`, nombre: `Gato ${index + 1}`, tipo: "Gato", imagen: gato.url, tamaño: getTamañoGato()
        }));

        setMascotas([...perros, ...gatos]);
      } catch (error) {
        console.error("Error al obtener las mascotas:", error);
      }
    };

    fetchMascotas();
  }, []);

  const getTamañoPerro = (raza) => {
    const tamaños = ["Pequeño", "Mediano", "Grande"];
    return tamaños[Math.floor(Math.random() * tamaños.length)];
  };

  const getTamañoGato = () => {
    return "Pequeño"; 
  };

  const filtrarMascotas = () => {
    return mascotas.filter((m) => {
      const coincideRaza = filtroRaza ? m.nombre.toLowerCase().includes(filtroRaza.toLowerCase()) : true;
      const coincideTamaño = filtroTamaño ? m.tamaño === filtroTamaño : true;
      return coincideRaza && coincideTamaño;
    });
  };

  const renderItem = ({ item }) => {
    const esFavorito = favoritas.some((fav) => fav.id === item.id);

    return (
      <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
        <Image source={{ uri: item.imagen }} style={styles.image} />
        <Text style={[styles.title, { color: theme.textColor }]}>{item.nombre}</Text>
        <Text style={[styles.type, { color: theme.textColor }]}>🐾 {item.tipo} - {item.tamaño}</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#57B4BA" }]}
            onPress={() => navigation.navigate("Información", { mascota: item })}
          >
            <Text style={styles.buttonText}>Ver detalles</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: esFavorito ? "#F39C12" : "#95A5A6" }]}
            onPress={() => toggleFavorita(item)}
          >
            <Text style={styles.buttonText}>{esFavorito ? "★ Quitar" : "☆ Favorito"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.textColor }]}>🐶🐱 Mascotas disponibles 🐶🐱</Text>

      {/* Filtros por raza y tamaño */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFiltroRaza(null)}>
          <Text style={styles.filterText}>Todas las Razas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFiltroRaza("perro")}>
          <Text style={styles.filterText}>Perro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFiltroRaza("Gato")}>
          <Text style={styles.filterText}>Gato</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFiltroTamaño(null)}>
          <Text style={styles.filterText}>Todos los Tamaños</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFiltroTamaño("Pequeño")}>
          <Text style={styles.filterText}>Pequeño</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFiltroTamaño("Mediano")}>
          <Text style={styles.filterText}>Mediano</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFiltroTamaño("Grande")}>
          <Text style={styles.filterText}>Grande</Text>
        </TouchableOpacity>
      </View>

      <FlatList data={filtrarMascotas()} renderItem={renderItem} keyExtractor={(item) => item.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  filterContainer: { flexDirection: "row", justifyContent: "center", marginBottom: 10 },
  filterButton: { marginHorizontal: 5, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: "#57B4BA", borderRadius: 5 },
  filterText: { color: "#FFF", fontWeight: "bold" },
  card: { padding: 15, borderRadius: 10, marginBottom: 15 },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 5 },
  type: { fontSize: 16, textAlign: "center", marginBottom: 10 },
  buttonsContainer: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  button: { flex: 1, paddingVertical: 10, borderRadius: 5, alignItems: "center", marginHorizontal: 5 },
  buttonText: { color: "#FFF", fontSize: 14, fontWeight: "bold" },
});

export default MascotasScreen;
