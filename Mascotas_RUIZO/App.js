import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritasProvider } from "./context/FavoritasContext"; 
import MainNavigator from "./navigation/AppNavigator";
import { SafeAreaView, StyleSheet } from "react-native";

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemeProvider>
          <AuthProvider>
                <FavoritasProvider>
                  <MainNavigator />
                </FavoritasProvider>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: "#fff" },
});
