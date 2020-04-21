import React from 'react';
import firebase from '../firebase';

import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Color';
const Logout = (props) => {
	async function signOutUser() {
		await firebase
			.auth()
			.signOut()
			.then(() => {
				props.getLoggedIn(false);
			})
			.catch(function (error) {
				// An error happened.
			});
	}

	return(

	<Button color= {Colors.ORANGE} title="Logout" onPress={() => signOutUser()} />
    );
};

export default Logout;
