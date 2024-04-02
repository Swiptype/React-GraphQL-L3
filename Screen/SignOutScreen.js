import React, {useContext} from "react";
import { TextInput, View, Button } from "react-native";
import {TokenContext, UsernameContext} from '../Context/Context';

export default function SignOutScreen ({ navigation }) {

    const [setToken] = useContext(TokenContext);
    const [setUsername] = useContext(UsernameContext);

    return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => (
            <View>
                <Button title='Sign me out' onPress={
                    () => {
                        setToken(null);
                        setUsername(null);
                    }
                } />
            </View>
            )}
        </UsernameContext.Consumer>
        )}
    </TokenContext.Consumer>
    );
}