import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LandingTest } from './src/screens/LandingTest';
import Tabs from './src/navigation/tabs';
import { SignInScreen } from './src/screens/SignInScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { AuthContext } from './src/contexts/authContext';
import { UserContext } from './src/contexts/userContext';
import * as SecureStore from 'expo-secure-store';

function App() {
  const [user, setUser] = React.useState({});
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      //TODO Fix secure store
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps
      //TODO

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        //TODO
        setUser({
          id: 12,
          groups: [
            { id: 1, name: 'Group 1' },
            { id: 2, name: 'Group 2' },
            { id: 3, name: 'Group 3' },
            { id: 4, name: 'Group 4' },
            { id: 5, name: 'Group 5' },
          ],
          name: 'Jacob',
        });
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => {
        console.log('signing out');
        setUser({});
        dispatch({ type: 'SIGN_OUT' });
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        //TODO
        setUser({
          id: 12,
          groups: [
            { id: 1, name: 'Group 1' },
            { id: 2, name: 'Group 2' },
            { id: 3, name: 'Group 3' },
            { id: 4, name: 'Group 4' },
          ],
        });
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  const Stack = createNativeStackNavigator();

  if (state.isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  if (state.isLoading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <UserContext.Provider value={user}>
        <NavigationContainer>
          {state.userToken == null ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="SignIn" component={SignInScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Navigator>
          ) : (
            <Tabs />
          )}
        </NavigationContainer>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
