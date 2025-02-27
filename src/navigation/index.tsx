import React, { useEffect } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";
import Icon from "react-native-dynamic-vector-icons";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import { isReadyRef, navigationRef } from "react-navigation-helpers";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { useAppSelector } from "../services/redux/Hook";
import { SCREENS } from "@shared-constants";
import { LightTheme, DarkTheme, palette } from "@theme/themes";
import { NewPassword, ForgotPassword, Login, Register } from "@screens/Auth";
import OnBoarding from "@screens/onBoarding/OnBoarding";
import { selectIsAuthenticated } from "@services/redux/AuthenticationSlice";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect((): any => {
    return () => (isReadyRef.current = false);
  }, []);

  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName = "home";
    switch (route.name) {
      case SCREENS.HOME:
        iconName = focused ? "home" : "home-outline";
        break;
      case SCREENS.SEARCH:
        iconName = focused ? "search" : "search-outline";
        break;
      case SCREENS.NOTIFICATION:
        iconName = focused ? "notifications" : "notifications-outline";
        break;
      case SCREENS.PROFILE:
        iconName = focused ? "person" : "person-outline";
        break;
      default:
        iconName = focused ? "home" : "home-outline";
        break;
    }
    // return <Icon name={iconName} type="Ionicons" size={size} color={color} />;
  };

  // const renderTabNavigation = () => {
  //   return (
  //     <Tab.Navigator
  //       screenOptions={({ route }) => ({
  //         headerShown: false,
  //         tabBarIcon: ({ focused, color, size }) =>
  //           renderTabIcon(route, focused, color, size),
  //         tabBarActiveTintColor: palette.primary,
  //         tabBarInactiveTintColor: "gray",
  //         tabBarStyle: {
  //           backgroundColor: isDarkMode ? palette.black : palette.white,
  //         },
  //       })}
  //     >
  //       <Tab.Screen name={SCREENS.HOME} component={HomeScreen} />
  //       <Tab.Screen name={SCREENS.SEARCH} component={SearchScreen} />
  //       <Tab.Screen
  //         name={SCREENS.NOTIFICATION}
  //         component={NotificationScreen}
  //       />
  //       <Tab.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
  //     </Tab.Navigator>
  //   );
  // };

  const AuthStack = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={SCREENS.ON_BOARDING} component={OnBoarding} />
        <Stack.Screen name={SCREENS.LOGIN} component={Login} />
        <Stack.Screen name={SCREENS.REGISTER} component={Register} />
        <Stack.Screen name={SCREENS.NEW_PASSWORD} component={NewPassword} />
        <Stack.Screen
          name={SCREENS.FORGOT_PASSWORD}
          component={ForgotPassword}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={isDarkMode ? DarkTheme : LightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name={SCREENS.HOME} component={renderTabNavigation} />
        <Stack.Screen name={SCREENS.DETAIL}>
          {(props) => <DetailScreen {...props} />}
        </Stack.Screen> */}
        <Stack.Screen name={SCREENS.AUTH_STACK} component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
