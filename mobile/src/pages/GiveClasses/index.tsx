import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import giveClassesBgImage from '../../assets/images/give-classes-background.png'

import styles from './styles'

const GiveClasses: React.FC = () => {

  const {goBack} = useNavigation()

  function handleNavigateBack(){
    goBack()
  }

  return (
    <View style={styles.container} >
      <ImageBackground 
        resizeMode='contain' 
        source={giveClassesBgImage} 
        style={styles.content}>
          <Text style={styles.title}>Quer ser um Proffy?</Text>
          <Text style={styles.description}>
            Para começar voce precisa se cadastrar em nossa plataforma na web
          </Text>
      </ImageBackground>
      <RectButton onPress={handleNavigateBack} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo bem</Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses;