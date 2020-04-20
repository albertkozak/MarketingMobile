import React from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Color';

const FormInput = ({
	iconName,
	iconColor,
	returnKeyType,
	keyboardType,
	name,
	color,
	placeholder,
	value,
	...rest
}) => (
	<View style={styles.inputContainer}>
		<Input
			{...rest}
			leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
			leftIconContainerStyle={styles.iconStyle}
			placeholderTextColor="grey"
			name={name}
			value={value}
			placeholder={placeholder}
			inputStyle={styles.input}
		/>
	</View>
);

const styles = StyleSheet.create({
	inputContainer: {
		margin: 15,
	},
	iconStyle: {
		marginRight: 10,
	},
	input: {
		color: '#fff',
	},
});

export default FormInput;
