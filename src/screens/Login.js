import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { Alert } from "react-native";
import { Input, Button } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { validateEmail, removeWhitespace } from "../utils/common";
import { login } from "../utils/firebase";
import { theme } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const InputContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const ImageContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 40px;
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
  width: 250px;
  height: 250px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${theme.errorText};
`;

const Login = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(email && password && !errorMessage));
  }, [email, password, errorMessage]);

  const _handleEmailChange = (email) => {
    const changedEmail = removeWhitespace(email);
    setEmail(changedEmail);
    setErrorMessage(
      validateEmail(changedEmail) ? "" : "Please verify your email."
    );
  };

  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  };

  const _handleLoginButtonPress = async () => {
    try {
      const user = await login({ email, password });
      // Alert.alert("Login successful", user.email);
      navigation.navigate("LoginSuccess", { userEmail: user.email });
    } catch (e) {
      Alert.alert("Login failed", e.message);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <InputContainer insets={insets}>
        <Image source={require("../../assets/loginImage.png")} />
        <Input
          label="Email"
          value={email}
          onChangeText={_handleEmailChange}
          onSubmitEditing={() => passwordRef.current.focus()}
          placeholder="Email"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="Password"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={() => {
            _handleLoginButtonPress();
          }}
          placeholder="Password"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Login"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="Sign up with email"
          onPress={() => navigation.navigate("SignUp")}
          isFilled={false}
        />
      </InputContainer>
    </KeyboardAwareScrollView>
  );
};

export default Login;
