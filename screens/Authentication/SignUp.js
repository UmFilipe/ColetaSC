import React, { useState } from 'react';
import { View, Text, Alert ,StyleSheet, SafeAreaView} from 'react-native';
import { Snackbar, TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { registration } from '../../API/firebaseMethods';
import { FontAwesome } from '@expo/vector-icons'

export default function SignUp({ navigation }) {

  const [visible, setVisible] = useState(false)
  const onToggleSnackBar = () => setVisible(!visible)
  const onDismissSnackBar = () => setVisible(false)
  const [errortype, setErrortype] = useState('')
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emptyState = () => {
    setErrortype('')
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };


  const handlePress = () => {
    if(!firstName && !lastName && !email && !password && !confirmPassword){
      setErrortype("Você precisa preencher os campos!")
      onToggleSnackBar()
    } else if (!firstName) {
      setErrortype("Você deixou o campo nome em branco.")
      onToggleSnackBar()
    } else if(!lastName){
      setErrortype("Você deixou o campo sobrenome em branco.")
      onToggleSnackBar()
    } else if (!email) {
      setErrortype("Você deixou o campo e-mail em branco.")
      onToggleSnackBar()
    } else if (!password) {
      setErrortype("Você deixou o campo senha em branco.")
      onToggleSnackBar()
    } else if (!confirmPassword) {
      setPassword('');
      setErrortype("Você precisa confirmar a senha.")
      onToggleSnackBar()
    } else if (password !== confirmPassword) {
      setConfirmPassword('');
      setErrortype("As senhas não coincidem, tente novamente.")
      onToggleSnackBar()
    } else {
      registration(
        email,
        password,
        lastName,
        firstName,
      );
      navigation.navigate('Loading');
      emptyState();
    }
  };

  return (
    <SafeAreaView>
     <View style={styles.container}>
          <FontAwesome name="angle-left" size={30} color="#99a7a8" style={styles.fab}
          onPress={() => navigation.navigate('Sign In')}
          />
          <TextInput
          selectionColor='#bfbfbf'
          underlineColor='#27AE60'
          style={styles.textInput}
          placeholder="Nome"
          value={firstName}
          onChangeText={(name) => setFirstName(name)}
          />
         <TextInput
          selectionColor='#bfbfbf'
          underlineColor='#27AE60'
          style={styles.textInput}
          placeholder="Sobrenome"
          value={lastName}
          onChangeText={(name) => setLastName(name)}
         />

         <TextInput
         selectionColor='#bfbfbf'
         underlineColor='#27AE60'
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
          keyboardType="email-address"
          autoCapitalize="none"
         />

          <TextInput
          selectionColor='#bfbfbf'
          underlineColor='#27AE60'
          style={styles.textInput}
          placeholder="Senha"
          value={password}
          onChangeText={(password) => setPassword(password)}
          secureTextEntry={true}
         />
         <TextInput
          selectionColor='#bfbfbf'
          underlineColor='#27AE60'
          style={styles.textInput}
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChangeText={(password2) => setConfirmPassword(password2)}
          secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Cadastrar-se</Text>
          </TouchableOpacity>

          <Snackbar visible={visible}
          onDismiss={onDismissSnackBar}
          duration={5000}
          action={{
            label: 'x',
            onPress: () => {
            },
          }}
          theme={{
            colors: {
                onSurface: "#f0f0ee",
                surface: "#616161",
                accent: "#27AE60",
            },
          }}>
          {errortype}
          </Snackbar>
          
     </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fab: {
    backgroundColor: 'white',
    overflow: 'hidden',
    shadowOpacity: 0,
    top: 15,
    margin: 16,
    left: 0,
    position: 'absolute'
  },

  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: 200,
    borderRadius: 15,
    backgroundColor: '#27AE60',
    padding: 5,
    margin: '2%'
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },

  inlineText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: '5%',
  },

  text: {
    textAlign: 'center',
    fontSize: 25,
    margin: '5%',
    marginTop:'15%',
    fontWeight: 'bold',
    color: 'black',
  },

  textInput: {
    width: 300,
    height: 30,
    fontSize:18,
    borderWidth: 1,
    borderColor:'#a4eddf',
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 5,
  },
});