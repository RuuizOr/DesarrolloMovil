import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://reqres.in/api/users/2");
        setUser(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}> 
        <ActivityIndicator size="large" color="#3D85C6" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}> 
        <Text style={[styles.errorText, { color: theme.textColor }]}>No se pudo cargar el perfil.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.scrollContainer, { backgroundColor: theme.background }]}> 
      <View style={styles.container}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={[styles.name, { color: theme.textColor }]}>{`${user.first_name} ${user.last_name}`}</Text>
        <Text style={[styles.email, { color: theme.textColor }]}>{user.email}</Text>
        <View style={styles.infoCard}>
          <Text style={[styles.infoText, { color: theme.textColor }]}>Ciudad: {user.location ? user.location.city : "Desconocida"}</Text>
        </View>

        <Text style={[styles.teamTitle, { color: theme.textColor }]}>Gustos</Text>
        <View style={styles.teamContainer}>
          <View style={styles.pokemonCard}>
            <Text style={[styles.pokemon, { color: theme.textColor }]}>Futbol</Text>
          </View>
          <View style={styles.pokemonCard}>
            <Text style={[styles.pokemon, { color: theme.textColor }]}>Programación</Text>
          </View>
          <View style={styles.pokemonCard}>
            <Text style={[styles.pokemon, { color: theme.textColor }]}>Música Electrónica</Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: "#F95454" }]} onPress={logout}>
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.themeButton, { backgroundColor: theme.buttonBackground }]} onPress={toggleTheme}>
          <Text style={[styles.buttonText, { color: theme.buttonText }]}>Cambiar Tema</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
  },
  teamTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  teamContainer: {
    width: '100%',
  },
  pokemonCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pokemon: {
    fontSize: 16,
  },
  logoutButton: {
    padding: 12, 
    borderRadius: 10,
    width: "90%",
    marginTop: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  themeButton: {
    padding: 12,
    borderRadius: 10,
    width: "90%",
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ProfileScreen;