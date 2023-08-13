import { StyleSheet, Text, View, Pressable,ScrollView, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserType } from "../../UserContext";
import UserChat from "../component/UserChat";
import api from "../../apiConfig";

const ChatsScreen = () => {
    const [acceptedFriends, setAcceptedFriends] = useState([]);
    const { userId, setUserId } = useContext(UserType);
    const navigation = useNavigation();
    useEffect(() => {
      const acceptedFriendsList = async () => {
        try {
          const response = await fetch(
            api.port+`/accepted-friends/${userId}`
          );
          const data = await response.json();
  
          if (response.ok) {
            setAcceptedFriends(data);
          }
        } catch (error) {
          console.log("error showing the accepted friends", error);
        }
      };
  
      acceptedFriendsList();
    }, []);
    console.log("friends",acceptedFriends)
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable>
            {acceptedFriends.map((item,index) => (
                <UserChat key={index} item={item}/>
            ))}
        </Pressable>
      </ScrollView>
    );
  };
  
  export default ChatsScreen;
  
  const styles = StyleSheet.create({});
  
