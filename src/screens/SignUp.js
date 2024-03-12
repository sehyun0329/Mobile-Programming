import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { Input, Button } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail, removeWhitespace } from "../utils/common";
import { signUp } from "../utils/firebase";
import { theme } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

const SignUpContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${theme.background};
  padding: 0px 20px;
`;

const ImageContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Image = ({ source }) => {
  const insets = useSafeAreaInsets();
  return (
    <ImageContainer insets={insets}>
      <StyledImage source={source} />
    </ImageContainer>
  );
};

const StyledImage = styled.Image`
  width: 270px;
  height: 270px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${theme.errorText};
`;

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const didMountRef = useRef();

  const navigation = useNavigation();

  useEffect(() => {
    if (didMountRef.current) {
      let _errorMessage = "";
      if (!name) {
        _errorMessage = "Please enter your name.";
      } else if (!validateEmail(email)) {
        _errorMessage = "Please verify your email.";
      } else if (password.length < 6) {
        _errorMessage = "The password must contain at least 6 characters.";
      } else if (password !== passwordConfirm) {
        _errorMessage = "Passwords need to match.";
      } else {
        _errorMessage = "";
      }
      setErrorMessage(_errorMessage);
    } else {
      didMountRef.current = true;
    }
  }, [name, email, password, passwordConfirm]);

  useEffect(() => {
    setDisabled(
      !(name && email && password && passwordConfirm && !errorMessage)
    );
  }, [name, email, password, passwordConfirm, errorMessage]);

  const _handleSignUpButtonPress = async () => {
    try {
      const user = await signUp({ email, password });
      console.log(user);
      Alert.alert("Sign up successful", "Please login with your credentials.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"), // Login 화면으로 이동합니다.
        },
      ]);
    } catch (e) {
      Alert.alert("Sign up failed", e.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      extraScrollHeight={20}
    >
      <SignUpContainer>
        <Image source={require("../../assets/signUpImage.png")} />
        <Input
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          onSubmitEditing={() => {
            setName(name.trim());
            emailRef.current.focus();
          }}
          onBlur={() => setName(name.trim())}
          placeholder="Name"
          returnKeyType="next"
        />
        <Input
          ref={emailRef}
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(removeWhitespace(text))}
          onSubmitEditing={() => {
            passwordRef.current.focus();
          }}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={(text) => setPassword(removeWhitespace(text))}
          onSubmitEditing={() => {
            passwordConfirmRef.current.focus();
          }}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <Input
          ref={passwordConfirmRef}
          label="Confirm Password"
          value={passwordConfirm}
          onChangeText={(text) => setPasswordConfirm(removeWhitespace(text))}
          onSubmitEditing={_handleSignUpButtonPress}
          placeholder="Confirm Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Sign Up"
          onPress={_handleSignUpButtonPress}
          disabled={disabled}
        />
      </SignUpContainer>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
