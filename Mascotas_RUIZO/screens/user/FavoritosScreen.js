import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { useFavoritas } from "../../context/FavoritasContext";

const FavoritasScreen = () => {
  const { favoritas } = useFavoritas();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.header, { color: theme.textColor }]}>⭐ Mascotas Favoritas ⭐</Text>

      {favoritas.length === 0 ? (
        <Text style={[styles.emptyText, { color: theme.textColor }]}>
          No hay mascotas favoritas aún. ¡Agrega algunas! 🐶🐱
        </Text>
      ) : (
        <FlatList
          data={favoritas}
          numColumns={2} 
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
              <Image source={{ uri: item.imagen }} style={styles.image} />
              <Text style={[styles.title, { color: theme.textColor }]}>{item.nombre}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 20,
    alignItems: "center",
  },
  card: {
    width: "45%",
    margin: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    backgroundColor: "#57B4BA",
  },
});

export default FavoritasScreen;
