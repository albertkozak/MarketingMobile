import * as React from 'react';
import { View, Text, Button } from 'react-native';

function HomeScreen({ navigation }) {
	return (
		<View
			style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
		>
			<Text>Home Screen</Text>
			<Button
				title="Go to Details"
				onPress={() => navigation.navigate('Details')}
			/>

			<Button
				title="Login"
				onPress={() => navigation.navigate('Login')}
			/>
			<Button
				title="Register"
				onPress={() => navigation.navigate('Register')}
			/>
		</View>
	);
}

export default HomeScreen;
