import React, { Fragment, navigation } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton.js';
import ErrorMessage from '../components/ErrorMessage';
import firebase from '../firebase';
import Colors from '../constants/Color';
import Fonts from '../constants/Fonts';
import Container from '../components/Container';
import LogoSize from '../components/LogoSize';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.label('Email')
		.email('Enter a valid email')
		.required('Please enter a verified email'),
	password: Yup.string()
		.label('Password')
		.required()
		.min(6, 'Password must have more than 6 characters '),
});

export default function Login({ route, navigation }) {
	const values = route.params;
	const goToSignup = () => navigation.navigate('Register');
	const goToForgotPassword = () => navigation.navigate('ForgotPassword');

	const API_CREATE_URL =
		'https://atackmarketingapi.azurewebsites.net/api/User/create';

	async function handleSubmit(values) {
		return new Promise(async (resolve, reject) => {
			if (values.email.length > 0 && values.password.length > 0) {
				firebase
					.auth()
					.signInWithEmailAndPassword(values.email, values.password)
					.then(() => {
						if (
							firebase.auth().currentUser.emailVerified === false
						) {
							reject(
								'Please verify your email address.'
							);
						}
						firebase
							.auth()
							.currentUser.getIdTokenResult()

							.then((tokenResponse) => {
								fetch(API_CREATE_URL, {
									method: 'POST',
									headers: {
										Authorization: `Bearer ${tokenResponse.token}`,
									},
								}).then((response) => {
									if (response.status == 201) {
										resolve(response.status);
									} else {
										'API ERROR: ' +
											JSON.stringify(response);
									}
								});

								resolve();
							})
							.catch((error) => reject('Firebase ' + error));
					})
					.catch((error) => reject('Firebase ' + error));
			}
		});
	}
	return (
		<Container>
			<View style={styles.wrapper}>
			<View style={styles.logo}>
				<LogoSize
					imageSrc={require('../../assets/Logo-Atack.png')}
				/>
			</View>
			<SafeAreaView style={styles.container}>
				{/* <Text style={styles.title}>Login</Text> */}
				<Formik
					initialValues={{ email: '', password: '' }}
					onSubmit={async (values, { resetForm }) => {
						try {
							await handleSubmit(values);
							navigation.navigate('Home');
							resetForm();
						} catch (error) {
							//Fail
							alert(error);
							values.password = '';
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
								placeholder="Email"
								autoCapitalize="none"
								iconName="ios-mail"
								iconColor={Colors.ORANGE}
								onBlur={handleBlur('email')}
								autoFocus
							/>
							<ErrorMessage
								errorValue={touched.email && errors.email}
							/>
							<FormInput
								name="password"
								value={values.password}
								onChangeText={handleChange('password')}
								placeholder="Password"
								secureTextEntry
								autoCapitalize="none"
								iconName="ios-lock"
								iconColor={Colors.ORANGE}
								onBlur={handleBlur('password')}
							/>
							<ErrorMessage
								errorValue={touched.password && errors.password}
							/>
							<View style={styles.buttonContainer}>
								<FormButton
									buttonType="outline"
									borderColor="none"
									onPress={handleSubmit}
									title="LOGIN"
									buttonColor={Colors.ORANGE}
									titleColor={Colors.WHITE}
									disabled={!isValid || isSubmitting}
									loading={isSubmitting}
								/>
							</View>
						</Fragment>
					)}
				</Formik>
				<Button
					title="Don't have an account? Register"
					onPress={goToSignup}
					titleStyle={{
						color: Colors.LIGHTGREY,
						fontSize: 14
					}}
					type="clear"
				/>
				<Button
					title="Forgot Password?"
					onPress={goToForgotPassword}
					titleStyle={{
						color: Colors.GREY,
						fontSize: 14,
					}}
					type="clear"
				/>
			</SafeAreaView>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		alignItems: 'center',
		margin: 0,
	},
	container: {
		// flex: 1,
		// margin: 10,
	},
	title: {
		color: Colors.WHITE,
		alignSelf: 'center',
		marginTop: 25,
		marginRight: 25,
	},
	buttonContainer: {
		marginVertical: 10,
		marginHorizontal: 23,

	},
});
