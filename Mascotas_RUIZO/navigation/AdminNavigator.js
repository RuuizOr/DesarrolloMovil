import { createDrawerNavigator } from "@react-navigation/drawer";
import AdminHomeScreen from "../screens/admmin/AdminHomeScreen";
import ProfileScreen from "../screens/admmin/ProfileScreen";
import InformaScreen from "../screens/admmin/InformaScreen";
import { Feather } from "@expo/vector-icons";
import { createStackNavigator } from '@react-navigation/stack';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const RevisorStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="Inicio"
      component={AdminHomeScreen}
    />
    <Stack.Screen
      name="Información"
      component={InformaScreen}
    />
  </Stack.Navigator>
);

const RevisorNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: true, 
      headerStyle: {
        backgroundColor: "#57B4BA", 
      },
      headerTintColor: "#fff", 
      headerTitleStyle: {
        fontWeight: "bold",
      },
      drawerActiveBackgroundColor: "#FE4F2D",
      drawerActiveTintColor: "#fff", 
      drawerInactiveTintColor: "#333", 
      drawerStyle: {
        backgroundColor: "#57B4BA", 
        width: 240,
      },
    }}
  >
    <Drawer.Screen
      name="Inicio"
      component={RevisorStackNavigator}
      options={{
        drawerIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
      }}
    />
    <Drawer.Screen
      name="Perfil"
      component={ProfileScreen}
      options={{
        drawerIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
      }}
    />
  </Drawer.Navigator>
);


export default RevisorNavigator;