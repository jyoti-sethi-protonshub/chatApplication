import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'

const Home = () => {

    const {navigate}: any = useNavigation()

    const getChats = () => {
        firestore().collection('chatList')
        .where('usersId', 'array-contains', 1)
        .get()
        .then(data => {
            let msgs: any = []
            data.forEach(data => {
                msgs.push(data.data())
            })

            console.log('====================================');
            console.log(msgs);
            console.log('====================================');

        }).catch(error => {
            console.log('====================================');
            console.log('Error: ', error);
            console.log('====================================');
        })

        const subscriber = firestore()
        .collection('chatList')
        .onSnapshot(data => {
            let msgs: any = []
            // data.forEach(data => {
            //     msgs.push(data.data())
            // })
        })

        return () => subscriber()



    }

    React.useEffect(() => {
        getChats()
    }, [])

    const users = [
        {
            id: 1,
            name: 'Tarun'
        },
        {
            id: 2,
            name: 'Ajay'
        }, {
            id: 3,
            name: 'Bhanu'
        }
    ]

  return (
    <View>
      <Text>Home</Text>
      <FlatList
        data={users}
        keyExtractor={(item: any) => `${item?.id}`}
        renderItem={({item})=> {
            return(
                <TouchableOpacity 
                    style={{
                        borderBottomWidth: 0.5,
                        padding: 10,
                        marginBottom: 10
                    }}
                    onPress={() => navigate('Chat', item)}
                > 
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            )
        }}
      />
    </View>
  )
}

export default Home