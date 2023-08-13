import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import User from "../component/User";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import api from "../../apiConfig";
import { UserType } from '../../UserContext';

const HomeScreen = () => {
  const navigation: any = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Swift Chat</Text>
      ),

      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <MaterialIcons
            onPress={() => navigation.navigate("Chats")}
            name="chat" size={24} color="black" />
          <MaterialIcons
            onPress={() => navigation.navigate("Friends")}
            name="people"
            size={24}
            color="black"
          />
          <MaterialIcons
            onPress={handleLogout}
            name="logout"
            size={24}
            color="black"
          />
        </View>
      ),
    });
  }, []);
  const handleLogout = () => {
    Alert.alert(
      '',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => logout() },
      ],
      { cancelable: false }
    )
  }
  const logout = () => {
    AsyncStorage.setItem("authToken", '');
    navigation.replace("Login");
  }
  useEffect(() => {
    const fetchUsers = async () => {
      const token: any = await AsyncStorage.getItem("authToken");
      const decodedToken: any = jwt_decode(token);
      const userId: any = decodedToken.userId;
      setUserId(userId);
      axios
        .get(api.port + `/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.log("error retrieving users", error);
        });
    };

    fetchUsers();
  }, []);

  console.log("users", users);
  return (

      <View>
        <View style={{ padding: 10 }}>
          {users.map((item, index) => (
            <User key={index} item={item} />
          ))}
        </View>
      </View>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({});