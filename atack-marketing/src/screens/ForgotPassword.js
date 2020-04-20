import React, { Fragment, navigation } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { Button, colors } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton.js';
import ErrorMessage from '../components/ErrorMessage';
import firebase from '../firebase';
import Colors from '../constants/Color';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.label('Email')
		.email('Enter a registered email')
		.required('Please enter a registered email'),
});
export default function ForgotPassword({ navigation }) {
	//  passwordReset: email => {
	// return firebase.auth().sendPasswordResetEmail(email)
	async function handleSubmit(values) {
		return new Promise(async (resolve, reject) => {
			if (values.email.length > 0) {
				await setTimeout(() => {
					firebase
						.auth()
						.sendPasswordResetEmail(values.email)

						.then(() => {
							alert(
								values.email +
									' Please check email for password reset instructions'
							);
							resolve();
						})
						.catch((error) => {
							reject('firebase ' + error);
						});
				}, 3000);
			}
		});
	}
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>Forgot Password?</Text>
			<Formik
				initialValues={{ email: '' }}
				onSubmit={async (values, { resetForm }) => {
					try {
						await handleSubmit(values);
						navigation.navigate('Login');
					} catch (error) {
						//Fail
						alert(error);
						resetForm();
					}
				}}
				validationSchema={validationSchema}
			>
				{({
					handleChange,
					values,
					handleSubmit,
					errors,
					isValid,
					touched,
					handleBlur,
					isSubmitting,
				}) => (
					<Fragment>
						<FormInput
							name="email"
							value={values.email}
							onChangeText={handleChange('email')}
							placeholder="Enter email"
							autoCapitalize="none"
							iconName="ios-mail"
							iconColor="#2C384A"
							onBlur={handleBlur('email')}
						/>
						<ErrorMessage
							errorValue={touched.email && errors.email}
						/>
						<View style={styles.buttonContainer}>
							<FormButton
								buttonType="outline"
								onPress={handleSubmit}
								title="Send Email"
								buttonColor={Colors.ORANGE}
								disabled={!isValid || isSubmitting}
							/>
						</View>
						<ErrorMessage errorValue={errors.general} />
					</Fragment>
				)}
			</Formik>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000f',
	},
	buttonContainer: {
		margin: 25,
	},
});
