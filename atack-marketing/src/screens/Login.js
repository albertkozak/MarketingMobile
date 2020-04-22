import React, { Fragment, navigation } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton.js';
import ErrorMessage from '../components/ErrorMessage';
import firebase from '../firebase';
import Colors from '../constants/Color';
import Container from '../components/Container';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.label('Email')
		.email('Enter a valid email')
		.required('Please enter a registered email'),
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
								'please verify your email address from the verification email sent to your inbox'
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
									// console.log(tokenResponse.token);
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
			<SafeAreaView style={styles.container}>
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
								placeholder="Enter verified email"
								autoCapitalize="none"
								iconName="ios-mail"
								iconColor="#2C384A"
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
								placeholder="Enter password"
								secureTextEntry
								iconName="ios-lock"
								iconColor="#2C384A"
								onBlur={handleBlur('password')}
							/>
							<ErrorMessage
								errorValue={touched.password && errors.password}
							/>
							<View style={styles.buttonContainer}>
								<FormButton
									buttonType="outline"
									onPress={handleSubmit}
									title="LOGIN"
									buttonColor={Colors.ORANGE}
									titleColor="#fff"
									disabled={!isValid || isSubmitting}
									loading={isSubmitting}
								/>
							</View>
						</Fragment>
					)}
				</Formik>
				<Button
					title="Don't have an account? Please Register"
					onPress={goToSignup}
					titleStyle={{
						color: '#fd972a',
					}}
					type="clear"
				/>
				<Button
					title="Forgot Password?"
					onPress={goToForgotPassword}
					titleStyle={{
						color: '#fd972a',
					}}
					type="clear"
				/>
			</SafeAreaView>
		</Container>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	buttonContainer: {
		margin: 25,
	},
});
