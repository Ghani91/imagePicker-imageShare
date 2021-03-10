import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import logo from "./assets/cameraIcon.svg";
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Sharing from 'expo-sharing';  


export default function App() {



  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage({localUri:result.uri});
    }
  };
  const takePicture = async () => {
    let cameraResult = await ImagePicker.launchCameraAsync ({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
      quality:1,
    });
    //console.warn(cameraResult);

    if (!cameraResult.cancelled){
      setImage({localUri:cameraResult.uri});
    }
  };

  const openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(image.localUri);
  }; 

  if (image !== null)
  {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image.localUri }} style={styles.logoContainer} />
      <TouchableOpacity
       style={styles.cameraButton}
       onPress={openShareDialogAsync}
       >
      <Text
      style={styles.buttonText}
      >Share Pic</Text>
      </TouchableOpacity>
    </View>
  );
}
return (
  <View style={styles.container}>
    <Image source ={require('../imagePicker/assets/cam.png')}
    style={styles.logoContainer}
    />
    <TouchableOpacity
    style={styles.galleryButton}
    onPress={pickImage}
    >
    <Text
    style={styles.buttonText}
    >Launch Gallery</Text>
    </TouchableOpacity>
    <TouchableOpacity
     style={styles.cameraButton}
     onPress={takePicture}
     >
    <Text
    style={styles.buttonText}
    >Launch Camera</Text>
    </TouchableOpacity>
  </View>
);


}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer:{
    width:'100%',
    height:'60%',
  },
  buttonText:{
    fontSize:18,
    fontWeight:'bold',
    color:'white',

  },
  galleryButton:{
    backgroundColor:'blue',
    width:400,
    borderRadius:15,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    marginTop:15,
  },
  cameraButton:{
    backgroundColor:'red',
    width:400,
    borderRadius:15,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    marginTop:15,

  }
});
