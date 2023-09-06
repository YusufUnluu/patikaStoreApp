import React from 'react';
import { View, Text, Image, Alert } from 'react-native';
import styles from './Login.style';
import Input from '../../components/Input';
import Button from '../../components/Button/Button';
import { Formik } from 'formik';
import usePost from '../../hooks/usePost/usePost';
import { showMessage } from 'react-native-flash-message';

import config from '../../../config';
import { ApiUrls } from '../../Constant/ApiUrls';

const Login = ({ navigation }) => {
  const { data, loading, error, post } = usePost();

  function handleLogin(values) {
    if (values.username !== '' && values.password !== '') {
      post(ApiUrls.API_AUTH_URL, values);
    } else {
      showMessage({
        message: 'Missing username or password.',
        type: 'danger',
      });
    }
  }

  if (!loading) {
    console.log(data)
    if (data) {
      if (data.token !== undefined) {
        const token = data.token;
        navigation.navigate('ProductsPage');
      } else {
        //Alert.alert('PatikaStore', 'Something went wrong..');
        showMessage({
          message: 'Something went wrong..',
          type: 'danger',
        });
      }
    } else {
      if (error) {
        showMessage({
          message: 'Incorrect username or password.',
          type: 'danger',
        });
      }
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.ContentContainer}>
        <View style={styles.TitleContainer}>
          <Text style={styles.h1}>Log In Now</Text>
          <Text style={styles.p}>Please login to reach products.</Text>
        </View>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={handleLogin}>
          {({ handleSubmit, handleChange, values }) => (
            <View style={styles.inputContainer}>
              <Input
                placeholder={'Username'}
                value={values.username}
                onType={handleChange('username')}
              />
              <Input
                placeholder={'Password'}
                value={values.password}
                onType={handleChange('password')}
                isSecure={true}
              />
              <Button text="LOGIN" onPress={handleSubmit} loading={loading} />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default Login;
