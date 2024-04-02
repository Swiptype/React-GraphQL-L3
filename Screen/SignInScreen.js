import React, { useContext, useState } from "react";
import { TokenContext, UsernameContext } from "../Context/Context";
import { TextInput, View, Button } from "react-native";
import { signIn } from "../components/SignIn";

export default function SignInScreen({ navigation }) {
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
                title="Sign In"
                onPress={() => {
                  const newToken = signIn(enteredUsername, enteredPassword)
                  .then(token => {
                    setToken(token);
                    setUsername(enteredUsername);
                  })
                  .catch(err => {
                    setError('Identifiant inconnu');
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
