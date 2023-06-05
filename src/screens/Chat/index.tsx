import { View, Text, TouchableOpacity, Image, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import React from 'react'
import { Avatar, Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';





const Chat = ({route: {params: item}}: any) => {
    const navigation: any = useNavigation();


    const myId = item?.id === 1 ? 2 : 1
    // item?.id === 1 ? 2 : item?.id === 2 ? 3 : 1 // show only user original id here not any condition like this.
    const username = item?.id === 1 ? 'Ajay' : item?.id === 2 ? 'Bhanu' : 'Tarun' // set only original current loggedIn user name not any condition like this

    let chatId = myId > item?.id ? `${myId}:${item?.id}` : `${item?.id}:${myId}`

    const [messages, setMessages] = React.useState<any>([
       
    ]);

    const renderMessageImage = (props:any) => {
        const { currentMessage } = props;
    
        if (currentMessage.image) {
          return <Image style={{ width: 200, height: 200 }} source={{ uri: currentMessage.image }} />;
        }
    
        return null;
      };
    

    const unread: number = React.useMemo(() => {
        const data =  messages.filter((i: any) => {
            return i?.user?._id !== myId && i?.status !== 'read'
        })
        return data?.length
    }, [messages])

    const onSend = (msg: any) => {
        let data = msg[0]
        
        data = {...data, user: {...data.user, name: username}, createdAt: firestore.Timestamp.fromDate(new Date())}
        firestore().collection('chats')
        .doc(chatId)
        .collection('messages')
        .add(data)
        .catch(e => {
            console.log('====================================');
            console.log('error: ', e);
            console.log('====================================');
        })
        data = {...data, user: {...data.user, name: username}, createdAt: new Date(), status: 'sent'}
        setMessages((previousMessages: any) => GiftedChat.append(previousMessages, [data]))

        firestore()
        .collection('chatList')
        .doc(chatId)
        .set({
            text: data?.text,
            updatedAt: firestore.Timestamp.fromDate(new Date()),
            sender: myId,
            usersId: [myId, item?.id],
            users: [{_id: myId, name: username}, item],
            unread,
        }).catch(error => {
            console.log('====================================');
            console.log('ERROR: ', error);
            console.log('====================================');
        })
    }

    const getMsg = () => {
        let one = `user${item.id}:user${myId}`
        let two = `user${myId}:user${item.id}`
        let find = [one, two]
        firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .get()
        .then(data =>{
            let msgs: any = []
            data.forEach(data => {
                    let msg = data.data()
                msgs.push({...msg, createdAt: msg?.createdAt.toDate()})
            })
            setMessages((previousMessages: any) => GiftedChat.append([], msgs))
        })
    }

    React.useEffect(() => {
        getMsg()

        const sunscriber = firestore()
        .collection('chats')
        .doc(chatId)
        .collection('messages')
        .orderBy('createdAt', 'desc')
        .onSnapshot((msg: any) => {
            let msgs: any = []
            msg.forEach((i: any) => {
                    let msg = i.data()
                msgs.push({...msg, createdAt: msg?.createdAt.toDate()})
            })
                    setMessages(() => GiftedChat.append([], msgs))
        },
        (e) => {
            console.log('====================================');
            console.log('Error: ', e);
            console.log('====================================');
        })

        return () => {
            sunscriber()
        }

    }, [])

    

    console.log('====================================');
    console.log(messages, myId);
    console.log('====================================');

    const texts = [
        { text: '12JH28E', rotate: '-15deg', top: 50, left: 20  },
        { text: '12JH28E', rotate: '-15deg' ,  top: 120, left: 220},
        { text: '12JH28E', rotate: '-15deg' , top: 230, left: 80},
        { text: '12JH28E', rotate: '-15deg' , top: 300, left: 200},
        { text: '12JH28E', rotate: '-15deg' , top: 360, left: 50},
        { text: '12JH28E', rotate: '-15deg' , top: 420, left: 200},
        { text: '12JH28E', rotate: '-15deg' , top: 500, left: 50},
        { text: '12JH28E', rotate: '-15deg' , top: 550, left: 220},

      ];
    

  return (

   <View style={{flex:1}}>

     <View >
   <View style={{flexDirection:"row"}}>
    <TouchableOpacity
     onPress={() => {
      navigation.goBack();
    }}
    >
    <Image style={{height:24, width:24, marginLeft:20, marginTop:27, marginRight:10}}
     source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8eIB0ABwAABQAAAACfn56jpKIbHRrDw8MZHBjMzMzAwcAbHhrExcQDCQDS0tIVGBQKDgi4ubjl5eVxcnEQEw/29vbe396ur66YmJdeX13Z2di1trUlJyRRUlFlZmRERkQ5Ozg0NjN4eXhTVFLuQuL+AAADfUlEQVR4nO2dbU/bQBCE/XLFdvxSO06CAwQI9P//xiaASiDjVqrOWt3cPN8jzeh2vbt3ji9JhBBCCCGEEEIIIYQQQgghhBBC/AfjtN9Po7WK5Rg3znWdc3f31koWYlUN6Rtb92CtZRFKV6QfFK60VrMA9afBNK0OO2s93qmzC4Np6iZrQb5p3ReDaf9orcgz3w2eFtFakl/qK4NkDr/l4NvTdLAW5ZPyegXT7ZO1Ko8gg6mrrWX5o86Bwf7ZWpY/StdcG6yGW2td3oAhWnU/rXV5A5SJ8wqurHV5A5QJLoMwRIucx+B1q3ZeQaccDIYyQ2WiIzLIXiawwZzHIH2ZaFGrVjgegzhEM6IQZS8T9DmIW7WM3KBatYAoc7VqYYNDlMkge5mAAy9Tq4YnerVq4UCfg2rVQqeGnQxViCKDRBu/atVCJ9IyQd+qMW38qlULHJyD9FsWTDmI3pOptkwrqMOXsFGZCB3692T4J3r2HNThS+jgEGWqg+xlgv7wRa1a6NDnoA5fQqeGA++BxyCc6NP+6eZHwEzt7sIgCNGzxSxknHOb8e8Gw2d4LwX3AwpRDqrh/Cg59tY6FqQ/JsnaWatYFLdONsxLeFrETfLC+ph5p3hJrCUszYF+DY/JZmstYlG2r/TP0pK8Hm4f33oa3kzs+1vqvrTpio/5D+6xpefZIg+Y02zx+md+atGR9mk+nG4C5qG9/JRTiSwWKc+MH8FmcBwWO7QZRXSsFsE7UHEEKn5NqLXW5ZGyQ6s4MFmMIlD5LaJDNrJcxEWDyWIMgYosNlyBCotGRmURByqTxZlA5cpF/gYO1cWGKhcjeKLO1EUqi+ijcw3V99bhm25NzmQxhkDFFom+gzzTwHFZxKvIlYuwu4nAIlOgwj9bcllU0WCghMc2VBZhA8dlcSZQVTSCoo62gWOyGEHRaNFfaAu3ttblkZmiwWQxhkDFm4xMqzhTNKgsKhcJgA0cWS7CYxsqi7CBa8gClX8V8bENk0V8bENlcaZoyGJQzDRwTLdyx9vAcVmEUz/TX1HwXbJHa1k+wfcBM8UpvtP5zlqVV9C93J21KL/Q360OikbD5vDKYv/LWpF3vuWim6wF+edLLlaH3b9/ERwXRYPr4PSTVTN8FMOMabq4ZNw413XO3d1bK1mOcdrvp9FahRBCCCGEEEIIIYQQQgghhBBCRMtv7PxEggm3iH4AAAAASUVORK5CYII='}}/>
    </TouchableOpacity>
    <View>
      <Image style={{height:50, width:50, marginLeft:20, borderRadius:25, marginTop:10}}
       source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC'}}/>
    </View>
    <TouchableOpacity style={{marginLeft:15, marginTop:13}}
    onPress={() => navigation.navigate('ChatDetail',{data:  item.name})}
    >
    <Text style={{fontWeight:"bold", fontSize:20, marginBottom:5}}>{item.name}</Text>
    <Text>Online 5 hours ago</Text>
   
    </TouchableOpacity>
   
   

    
     </View>
    <View style={{borderWidth:1, borderColor:"#CCC", marginTop:10}}/>
   </View>
   <View style={{flex:6}}>
   {texts.map((item, index) => (
        <Text key={index} style={[styles.backgroundText, { transform: [{ rotate: item.rotate }],top: item.top, left: item.left }]}>
          {item.text}
        </Text>
      ))}

   {/* <ImageBackground
    source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2gOp_o0HxgwsnD2iyj3XXC2eFq5Q8KyYD6A&usqp=CAU'}}
     style={{flex:1}}
> */}


     <GiftedChat
    messages={messages}
    onSend={(messages: any) => onSend(messages)}
    user={{
      _id: item?.id === 1 ? 2 : 1,
    }}
    // renderInputToolbar={(props)=>{
    //     return <InputToolbar {...props}
    //     containerStyle={{width:"65%", borderWidth:1, borderColor:"#ccc", marginHorizontal:10, borderRadius:8, marginBottom:10}}
    //     />
    //   }}
    //   renderSend={
    //     (sendProps) => {
    //      return(
    //      <View style={{flexDirection:"row"}}>
    //        <TouchableOpacity>
            
    //         <Image  style={{height:50, width:50, left:110, borderRadius:25}}
    //         source={{uri:'data:image/jpeg;base64,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'}} />
    //       </TouchableOpacity>
    //         <TouchableOpacity>
              
    //         <Image  style={{height:50, width:50, left:120, borderRadius:25}}
    //         source={{uri:'data:image/jpeg;base64,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'}} />
    //       </TouchableOpacity>
    //      </View>
    //      )
        
    //      }
    //   }
    renderBubble={(props) => {
        return <Bubble
        {...props}

        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#000',
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: "#fff",
            marginBottom:10,

          },
          right: {
            backgroundColor: "#ccc",
          },
        }}
        

        
        />
      }}
      renderMessageImage={renderMessageImage}


    />
  
    {/* </ImageBackground> */}

  </View>

   </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backgroundText: {
      position: 'absolute',
      fontSize: 30,
      fontWeight:"bold",
      color: 'rgba(0, 0, 0, 0.1)', // Adjust the text color and opacity
    },
  });

export default Chat

// import AgoraUIKit from 'agora-rn-uikit';

// const connectionData = {
//     appId: 'cabd3d96f2314631bd7b592ea9a555cb',
//     channel: 'test',
//     token: '007eJxTYFjCcYFHIIW//6bocs2Nf56uKCyoNZGT/2Kp9vHSktmx7VIKDMaWxilmSabmRqkmqSZmZpYW5mnJluaplmkG5qapZiYWrRdfJzcEMjLEHbRmZGSAQBCfhaEktbiEgQEA9o4evw==',
// };


//   return (
//     <View style={{flex: 1}}>
//         <AgoraUIKit connectionData={connectionData}  />
//     </View>
//   )