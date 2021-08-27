import * as React from 'react';
import {View, Image, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  FAB,
} from 'react-native-paper'
import * as firebase from 'firebase'
import 'firebase/firestore'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { loggingOut } from '../API/firebaseMethods'

export default class Profile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
    nome: '',
    sobrenome: '',
    email: ''
    }

  }

  async componentDidMount(){
    await this.getData()
  }


  logout = () => {
    loggingOut();
    this.props.navigation.replace('Sign In')
  };

  getData = async () => {
    const id = firebase.auth().currentUser.uid;
    const usersRef = firebase.firestore().collection('users').doc(id);
    const doc = await usersRef.get()
    this.setState({
      nome: doc.data().firstName, 
      sobrenome: doc.data().lastName,
      email: doc.data().email
    })

  }

  render() {
    return (
        <SafeAreaView style={styles.container}>
         <View style={styles.userInfoSection}>
         <View style={{flexDirection: 'row', marginTop: 15}}>
           <Avatar.Image 
             source={{
               uri: 'https://img2.gratispng.com/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg',
             }}
             size={100}
           />
           <View style={{marginLeft: 20}}>
          
             <Title style={[styles.title, {
               marginTop:15,
               marginBottom: 5,
               fontSize: 30
             }]}>{this.state.nome}</Title>
             <Text style={{color:"gray", fontSize:15}}>{this.state.sobrenome}</Text>
           </View>
         </View>
 
       <View style={styles.userInfoSection}>

         <View style={styles.row}>
           <Icon name="email" color="#27AE60" size={30}/>
           <Text style={{color:"#777777", marginLeft: 20, fontSize: 20}}>{this.state.email}</Text>
         </View>
       </View>
       </View>
       <FAB
          style={styles.fab}
          small
          icon="logout"
          onPress={() => { this.logout()} }
      />
        </SafeAreaView>
    )}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    userInfoSection: {
      paddingHorizontal: 30,
      marginBottom: 25,
      marginTop: 20
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
      fontWeight: '500',
    },
    row: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    infoBoxWrapper: {
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1,
      borderTopColor: '#dddddd',
      borderTopWidth: 1,
      flexDirection: 'row',
      height: 100,
    },
    infoBox: {
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuWrapper: {
      marginTop: 10,
    },
    menuItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 30,
    },
    menuItemText: {
      color: '#777777',
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 16,
      lineHeight: 26,
    },

    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
      width: 45,
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red'
  },
  });