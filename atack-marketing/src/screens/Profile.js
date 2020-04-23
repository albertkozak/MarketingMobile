import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Container from '../components/Container';
import Colors from '../constants/Color';
import firebase from '../firebase';
import Logout from '../components/Logout';
import LogoSize from '../components/LogoSize';

function ProfileScreen({ navigation }) {
	const [loggedIn, setLoggedIn] = useState(false);
	const [currentUser, setCurrentUser] = useState(false);

	const getCurrentUser = async () => {
		try {
			let currentUser = await firebase.auth().currentUser;
			//	console.log(currentUser);

			if (currentUser != null) {
				setCurrentUser(currentUser);
				setLoggedIn(true);
			} else {
				setLoggedIn(false);

				navigation.navigate('Login');
			}
		} catch (error) {
			console.log('Error Checking Logged In User' + error);
		}
	};

	getCurrentUser();
	function getLoggedIn(boolean) {
		setLoggedIn(boolean);
	}
	return (
		<Container>
			<SafeAreaView style={styles.wrapper}>
				<Text style={styles.title}>Profile Screen</Text>

				{loggedIn && (
					<Text style={styles.loggedStat}>
						Currently logged in as: {currentUser.email}
					</Text>
				)}
				<View>{loggedIn && <Logout getLoggedIn={getLoggedIn} />}</View>
			</SafeAreaView>
		</Container>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		color: Colors.WHITE,
		fontSize: 22,
		marginBottom: 25,
	},
	loggedStat: {
		color: Colors.WHITE,
		marginBottom: 25,
	},
});

export default ProfileScreen;
