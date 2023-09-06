import React, {useEffect} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import styles from './Login.style';
import Input from '../../components/Input';
import Button from '../../components/Button/Button';
import {Formik} from 'formik';
import usePost from '../../hooks/usePost/usePost';
import config from '../../../config';
import axios from 'axios';

const Login = ({navigation}) => {
  const {data, loading, error, post} = usePost();

  const postReauest = async (url, apiData) => {
    let responseData;

    axios.post(url, apiData).then(res => {
      console.log('response : ', res);
      responseData = res;
    });
    console.log(responseData);
  };
  function handleLogin(values) {
    postReauest(config.API_AUTH_URL + '/login', values);

    // axios.post(config.API_AUTH_URL + '/login', values)

    // post(config.API_AUTH_URL + '/login', values);
  }

  if (error) {
    Alert.alert('Shop', 'Bir hata oluştu!');
  }
  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (data) {
    if (data.status === 'Error') {
      Alert.alert('Shop', 'User not found !');
    } else {
      navigation.navigate('ProductsPage');
    }
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo_container}>
        <Image
          style={styles.logo}
          source={require('../../assets/login-logo.png')}
        />
      </View>
      <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={handleLogin}>
        {({handleSubmit, handleChange, values}) => (
          <View style={styles.body_container}>
            <Input
              placeholder="Username"
              value={values.username}
              onType={handleChange('username')}
              iconName={'account'}
            />
            <Input
              placeholder="Password"
              value={values.password}
              onType={handleChange('password')}
              iconName={'key'}
              isSecure
            />
            <Button text="Login" onPress={handleSubmit} loading={loading} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Login;
