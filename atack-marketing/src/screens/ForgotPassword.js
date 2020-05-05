import React, { Fragment } from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../components/FormInput";
import FormButton from "../components/FormButton.js";
import ErrorMessage from "../components/ErrorMessage";
import firebase from "../firebase";
import Colors from "../constants/Color";
import Container from "../components/Container";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a registered email.")
    .required("Please enter a registered email."),
});
export default function ForgotPassword({ navigation }) {
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
                  "Please check email for password reset instructions."
              );
              resolve();
            })
            .catch((error) => {
              reject("firebase " + error);
            });
        }, 3000);
      }
    });
  }
  return (
    <Container>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Forgot Password?</Text>
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values, { resetForm }) => {
            try {
              await handleSubmit(values);
              navigation.navigate("Login");
            } catch (error) {
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
                onChangeText={handleChange("email")}
                placeholder="Enter email"
                autoCapitalize="none"
                iconName="ios-mail"
                iconColor={Colors.ORANGE}
                onBlur={handleBlur("email")}
                autoFocus
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType="outline"
                  onPress={handleSubmit}
                  title="RESET PASSWORD"
                  buttonColor={Colors.ORANGE}
                  titleColor={Colors.WHITE}
                  disabled={!isValid || isSubmitting}
                />
              </View>
              <ErrorMessage errorValue={errors.general} />
            </Fragment>
          )}
        </Formik>
      </SafeAreaView>
    </Container>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: Colors.WHITE,
    marginBottom: 30,
    fontSize: 20,
    marginLeft: 10,
  },
  buttonContainer: {
    marginVertical: 25,
    marginHorizontal: 70,
  },
});
