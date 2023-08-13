import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import FriendRequest from "../component/FriendRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../apiConfig";
import { UserType} from '../../UserContext';

const FriendsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(api.port+`/friend-request/${userId}`);
      if (response.status === 200) {
        const friendRequestsData = response.data.map((friendRequest: { _id: any; name: any; email: any; image: any; }) => ({
          _id: friendRequest._id,
          name: friendRequest.name,
          email: friendRequest.email,
          image: friendRequest.image,
        }));

        setFriendRequests(friendRequestsData);
      }
    } catch (err) {
      console.log("error message", err);
    }
  };

  console.log(friendRequests);
  return (
    <View style={{ padding: 10, marginHorizontal: 12 }}>
      {friendRequests.length > 0 && <Text>Your Friend Requests!</Text>}

      {friendRequests.map((item, index) => (
        <FriendRequest
          key={index}
          item={item}
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
        />
      ))}
    </View>
  );
};

export default FriendsScreen;

