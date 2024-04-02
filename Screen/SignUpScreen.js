import React, { useContext, useState } from "react";
import { TokenContext, UsernameContext } from "../Context/Context";
import { TextInput, View, Button } from "react-native";
import { signUp } from "../components/SignUp";

export default function SignUpScreen({ navigation }) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [error,setError] = useState(null);

  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => (
            <View>
              <TextInput
                placeholder="Username"
                value={enteredUsername}
                onChangeText={(text) => setEnteredUsername(text)}
              />
              <TextInput
                placeholder="Password"
                value={enteredPassword}
                onChangeText={(text) => setEnteredPassword(text)}
                secureTextEntry
              />
              <Button
                title="Sign Up"
                onPress={() => {
                  const newToken = signUp(enteredUsername, enteredPassword)
                  .then(token => {
                    setToken(token);
                    setUsername(enteredUsername);
                    navigation.navigate('Home');
                  })
                  .catch(err => {
                    setError('Identifiant deja existant');
                    console.error(err);
                  })
                }}
              />
            </View>
          )}
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>
  );
}
