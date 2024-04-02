import React, { useContext, useState } from "react";
import { TokenContext, UsernameContext } from "../Context/Context";
import { Text } from "react-native";

export default function HomeScreen () {
    const [username, setUsername] = useContext(UsernameContext)
    return (
      <>
        <Text>Welcome !</Text>
        <Text>You are logged as {username}</Text>
      </>
    )
  }