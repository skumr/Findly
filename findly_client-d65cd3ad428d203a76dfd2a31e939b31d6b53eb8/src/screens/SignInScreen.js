import React, { useState, useContext } from 'react';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  // Button
} from 'react-native';
import { Button, Input, Image } from 'react-native-elements';
import Icon, { MaterialCommunityIcons } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';
import { styles, width, height } from '../styles';

import { AuthContext } from '../contexts/authContext';

export const SignInScreen = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signIn, signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: width, y: height }}
        //Light Top : Dark Bottom
        colors={['#33193B', '#25122B']}
        style={styles.linearGradient}
        locations={[0.01, 0.99]}
      >
        <View style={styles.viewStyle}>
          <Image
            source={require(`../../assets/FindlyLogo.png`)}
            style={{
              alignContent: 'center',
              justifyContent: 'center',
              width: 70,
              height: 70,
              backgroundColor: 'transparent',
              marginBottom: 45,
            }}
          />
          <Input
            placeholder="Email"
            value={username}
            onChangeText={setUsername}
            style={styles.loginInput}
          />
          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.loginInput}
          />
          <Button
            buttonStyle={{
              alignItems: 'center',
              backgroundColor: '#CF91F3',
              paddingVertical: 5,
              paddingHorizontal: 15,
              borderRadius: 10,
            }}
            titleStyle={styles.buttonText}
            onPress={() => signIn({ username, password })}
            title="Sing In"
          ></Button>

          <Button
            title="Sign up"
            buttonStyle={{
              alignItems: 'center',
              backgroundColor: '#CF91F3',
              marginTop: 15,
              paddingVertical: 5,
              paddingHorizontal: 15,
              borderRadius: 10,
            }}
            titleStyle={styles.buttonText}
            onPress={() => props.navigation.push('SignUp')}
          />
        </View>
      </LinearGradient>
    </View>
  );
};
export default SignInScreen;
