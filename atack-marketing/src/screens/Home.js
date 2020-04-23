import * as React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Container from '../components/Container';
import Colors from '../constants/Color';
import LogoSize from '../components/LogoSize';

function HomeScreen({ navigation }) {
	return (
		<Container>
			<View style={styles.logo}>
				<LogoSize
					imageSrc={require('../../assets/ATACK-Marketing-Logo.png')}
				/>
			</View>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Home Screen</Text>
				<Button
					title="Go to Events"
					color={Colors.ORANGE}
					onPress={() => navigation.navigate('EventList')}
				/>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	logo: {
		flex: 1,
    alignItems: 'center',
    
	},
	wrapper: {
		flex: 1,
		alignItems: 'center',
	//	justifyContent: 'center',
	},
	title: {
		color: Colors.WHITE,
		fontSize: 22,
		marginBottom: 25,
	},
});

export default HomeScreen;
