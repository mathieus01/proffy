import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { Image, Linking, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutLineIcon from '../../assets/images/icons/heart-outline.png'
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png'
import whatsAppIcon from '../../assets/images/icons/whatsapp.png'
import api from '../../services/api';

import styles from './styles';

export interface Teacher {
    id: number,
    subject: string,
    cost: number,
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string
}

interface TeacherItemProps {
  teacher: Teacher
  favorited: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited)

  function createNewConnection(){
    api.post('connections', {
      user_id: teacher.id
    })
  }

  function handleLinkToWhatsapp(){
    console.log(teacher.whatsapp);
    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    createNewConnection()
  }

  async function handleToggleFavorite(){

    const favorites = await AsyncStorage.getItem('favorites')
    let favoritesArray = []

    if(favorites){
      favoritesArray =JSON.parse(favorites)
    }

    if( isFavorited ) {
      const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
        return teacherItem.id === teacher.id
      })

      favoritesArray.splice(favoriteIndex,1)
      setIsFavorited(false)
    }else{
      favoritesArray.push(teacher)
      setIsFavorited(true)
    }
    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
  }

  return (
    <View style={styles.container} >
    <View style={styles.profile}>
      <Image 
      style={styles.avatar} 
      source={{uri: teacher.avatar}}
      />

      <View style={styles.profileInfo}>
        <Text style={styles.name}>{teacher.name}</Text>
        <Text style={styles.subject}>{teacher.subject}</Text>
      </View>
    </View>

    <Text style={styles.bio}>
      {teacher.bio}
    </Text>

    <View style={styles.footer}>
      <Text style={styles.price}>
        Preco/Hora {'   '}
  <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton 
        onPress={handleToggleFavorite}
        style={[
          styles.favoriteButton, 
          isFavorited ? styles.favorited : {}
          ]}>
          {isFavorited ? (
            <Image source={unFavoriteIcon} />
            ): (
              <Image source={heartOutLineIcon} />
          )}
          
        </RectButton>
        
        <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
          <Image source={whatsAppIcon} />
          <Text style={styles.contactButtonText}>Entrar em contato</Text>
        </RectButton>
      </View>
    </View>
  </View>
  )
}

export default TeacherItem;