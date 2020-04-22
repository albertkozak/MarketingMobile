import React, { Fragment, navigation } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import ErrorMessage from '../components/ErrorMessage';
import Colors from '../constants/Color';
import Container from '../components/Container';

import firebase from '../firebase';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.label('Email')
		.email('Enter a valid email')
		.required('Please enter a registered email'),
	password: Yup.string()
		.label('Password')
		.required()
		.min(6, 'Password must have more than 6 characters '),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
		.required('Confirm Password is required'),
});

export default function Register({ navigation }) {
	const goToLogin = () => navigation.navigate('Login');

	async function handleSubmit(values) {
		return new Promise(async (resolve, reject) => {
			if (values.email.length > 0 && values.password.length > 0) {
				await setTimeout(() => {
					firebase
						.auth()
						.createUserWithEmailAndPassword(
							values.email,
							values.password
						)
						.then((response) => {
							alert(
								' - ' +
									response.user.email +
									' Please check verification email'
							);
							firebase.auth().currentUser.sendEmailVerification();
							resolve();
						})
						.catch((error) => {
							reject('Firebase ' + error);
						});
				}, 6000);
			}
		});
	}
	return (
		<Container>
			<SafeAreaView style={styles.container}>
				<Formik
					initialValues={{
						email: '',
						password: '',
						confirmPassword: '',
					}}
					onSubmit={async (values, { resetForm, setSubmitting }) => {
						try {
							await handleSubmit(values);
							//Success
						} catch (error) {
							//Fail
							alert(error);
							resetForm();
						}
						navigation.navigate('Login', { values });
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
							<FormInput
								name="password"
								value={values.confirmPassword}
								onChangeText={handleChange('confirmPassword')}
								placeholder="Confirm password"
								secureTextEntry
								iconName="ios-lock"
								iconColor="#2C384A"
								onBlur={handleBlur('confirmPassword')}
							/>
							<ErrorMessage
								errorValue={
									touched.confirmPassword &&
									errors.confirmPassword
								}
							/>
							<View style={styles.buttonContainer}>
								<FormButton
									buttonType="outline"
									onPress={handleSubmit}
									title="SIGNUP"
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
					title="Already registered?  Login"
					onPress={goToLogin}
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
