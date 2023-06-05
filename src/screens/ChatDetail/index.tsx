import {View, Text, Image, StyleSheet, FlatList, ScrollView, Switch, TouchableOpacity} from 'react-native';
import React from 'react';
//@ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ChatDetail = ({route: {params: item}}: any) => {
  const navigation: any = useNavigation();
  const [isMuted, setIsMuted] = React.useState(false);
  const [group, setGroup] = React.useState();


  const handleToggleSwitch = () => {
    setIsMuted((prevState) => !prevState);
  };

  const data = [
    { id: '1', image: 'https://www.southernliving.com/thmb/vr9mB3rsupqxnV_yjn1VuzDYZ9A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-892959344-88c4f99df9984da2876de836f14a35a1.jpg'},
    { id: '2', 
    image: 'data:image/jpeg;base64,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' },
    {id:'3', image:"data:image/jpeg;base64,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"},
    { id: '4', image: 'data:image/jpeg;base64,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' },
    { id: '4', image: 'data:image/jpeg;base64,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' },
  ];

  const data1 = [
    {
      id: '1', 
     image:"https://www.southernliving.com/thmb/vr9mB3rsupqxnV_yjn1VuzDYZ9A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-892959344-88c4f99df9984da2876de836f14a35a1.jpg",
     name: 'You',
     description:"Available",
     admin:"Group Admin"
    },
    {
       id: '2', 
       image:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALQAdwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQACAwYBB//EADoQAAIBAwIDBgQEBAUFAAAAAAECAwAEERIhBTFBEyJRYXGBBhQykUKhsfAVI2LBotHh4vEzQ1Jykv/EABkBAAMBAQEAAAAAAAAAAAAAAAECAwQABf/EACcRAAICAQMEAgEFAAAAAAAAAAABAhEDEiExBBNBUTJhIiMzYnGB/9oADAMBAAIRAxEAPwC1xGMu+c4zQkN3Ii6RTBMMsw/qNIrsXDTGO3IG/PPKopBbGq3DSKQQM46UrWTsb3fbNa2VteCYdqw01lxNJTcqIRvRSOu0MvnAgAAFVN6oOcUvFrfnGQp2r02PEGPJaOlAtDZeKoFxg14OMb4APlSxeH3w5gVb5C+6qtdpQbQyPETIpDCguAwk3M8nRmzQjQ3ikho8AdaZfDxYa1cYNI1SCnuNOHXKw3cqO/M0Px65SRv5TZOOlDTJMbtysWR40LNFch89icHwpo8HSoSXZZnCt1OKewt2dsq0kvml+aQdmc+lHr8yyqqxk+NGUbQqHVnIGYb74ryguHpOJz2iFRipSaaHsZW8eqF2OO8xxSmS2aOcsGUEnxp3aqwhCZ6Vjc2mSGziknPTwJpbBYreTUDrUjyrG+tzG6urb05ihIiXlQnEY+6p86WGRvkZRrkwjEmle8n3rYdovNk+9b26LpXYUbHYGdtsYNL3XYNIu1SA81oq3t7qcdwbeNPrTg8AAaQKSPGm1vBBGMKAMeVWT9h0HGycKu8EnT+dAcMikhuZlcbiu9nMYB3H2rkS2nilxkd3ausbTRrb2szsWVRjzpfxS4lsydcYx/7V03CZUMXSuc+PrVbjh8mgDVzGKGrc5w2s5C64kJL5O7p33GRvTWXiiWwRyrY8q4N43R1G+QedbcQ+YeFdOvPlWhpEzueHfEC3ty0KwvsM5xXlc38EwT/Ps0gcLoO5qUkmrOW6PooiONqykHQ5oxZ107rWEhDNq08qwN/Zao+yqatOOlC8TOmDPhR8DBjgrtWHFYFeFlB38qaGzG0IwsHR4VIIzTSGZ4x3cVy1hbXMMpAOUzXQI7CLfnSukxVBIP8AnpQMa969S+nH4qTq79tuDimCsmnzpb+xlBPybm4lf6moeVF3bG55mtEKHrVnWPTzorV7C4CixvJBdNEjYAo25ia4GmXcUsmVYLvWn4j0o5ZXbGxAoysXtuQK3AbUsD2YPtV14RbrzjH2o9WwNzj1qjzoORrrmwPDRhFaQQNlVx7VKwur9U5kH3qUyUhe2MUdT0FWbTjpWJCg4XnUVWJ3JrFRJprk17ijariBJE1OaG7NieZxRAY6AvLFMpUNFsiwRg7AfarGEY6VullMw2wG6KTiqvBLFvIjAePT71NZU+BnCcfkjH5dScgV6lm0sgVN2PQVvbxmaVYwQM9T4CmYCWyYGVDdBzPrSyzad2Ww4pZH9Cw2apkZyy88dKGuA+nSKZQEGVlfk4IrIICd+dHp+qc1bRbqMXaaSYnNn2n1itxGqJjSdqYlFFVZVO1ae8Qi3E5niDXLNphyPOlUy3qMNTswrtnt4zzoG44ektUhm9nSk/JwnEri4jwoznPjUp1f/Ddy9wJEkGnHI15WpZYUIdDFEV61tpIrFWbO2a2OdPWvNoWjzBG+a81kEEdK90Np61mofVgg+9BxZzVcHRQyRyqsmrBYBgMVuZEByGUeOBSm1l1IEIwRy86I3FedKTxyaaPYhFZIKV2Fx3Nut5FAHVZZg5jU4BbSBk/nWMsTSOWckmgVso7zi0V3L9VqMREc1J5n+3tRk172DaLgYUnIlXl7jpWmWFyxqTO06X+INdSC0UvhjpxnSMmslkSZyUOCeYr2RxLLkHug7EdawlKxyo6jd20n1qvT9NpWqXkh1EtSr0bumOtZlipreJCwwT71JIQDvT6WlZicfKMC5NVZ8cqsUGdjWZhcb5ooV2UaVy2OlSoykHepXWwbmKHJOmtEEgYZ3odv5f0NvXouZV3p7O1UNokyMsmBQ8zKGwtUS/YrhsVdQr9486ZtSQ92jJpgCBnemJzJw0zM3LY4pZMYgdxk10fCuyl4aqzaWUbHI228qEMUJy/Iv083GTo5/hPHOH3ErwW11DJMOapIGNEX19Fbq7zMqL+Is2APvRqwcJtbtri3skaVRqLJGNXtgUJcrw/jTtHe24kQnADp19xvWtKK2NH6j3owsbqC7jDwMrKeRUgg/avb1cQufxDSw9Qf+a3g4VYcO7ljGsY6hQB+lY3k8YmMWAXWPUQRtjP60MiTiybg3yDLczIByr0XkjbNzpbLdNsOtXjdn3JrI0efqDu2YHc5rZp2ZdjsKWNI/hWiGZl7u1ckx0wztlb6iM1KWSJKW571KamLqZRO0B7+au82+BnHlR0vCuI40fKPkcmFacK+HeIzzD5uMRRg9Tuabty4F3oVuzBgV3BouF3K88V2cHALGJADEGOObCs7n4ctZSGiBib+nlVV00h0ck0ZxknNN+FRzfLTFgFibBXLbk9dqM/gHZyDtJNUfPAG5rK/GmSOMCRgWwdIwijn6np48/OrYelfMxY5O3kUkKr604rNHM3DeIizJAGrsg5PlvypfY2/xAjE8QvrWZQc7QkN+R/tXSM0sNlDMhUyFcvjkTSyfiDnfsyT5ilrwetrtWE6iBrfYDnSey4pHxRpVaKW3ZWKNqX6SOjfb99c3u555SrN3Qdwo29KPt7LQ/aJlZCSXwGIfzIHtv5DnWnpsKlepGLrcz4izM2kZXUAD6UO8WliFXFN2s3mVRC6RsMnO5Hof869X4f4oTuYTnrqNZc3TSg6RkjO1wKEXTu5q/bFfp5U0f4Y4gwIZo/uaHb4b4jEpJ0sB0U71LtzXgZMBjlQMS5FSsriwmSQalZR5ipXb+gbn0a3h7Ia5GOpvPaiNW3dwTWF3xG3tVTWWYue4qKWLVjc8Ys7RVa7kEGo4VWO5+1ejTe41pBus53GKmotsprOOWK4VZI2DA7g+NaLDGHL5Or1obh2AbhndzHy6Zz08fz/ACpTx2aK3tmI05II3HU5Of3/AJU8u4wgaQHJOAfKuN45cGTkSYgSe6cZA3z/AIfsF8a1Y0mZ52mH8LmFzYiOZQCpPLlvVLvhiORoLAHwpbbMbK3hHMlRsBsPEE8uv7FdHw6UTKJR9CgMSduvKsuXC1Pbhm7DnTx2+ULrfgywPFkYA3Yg7x7Zz68vvVbiKOEGRSMd5iNI8hzI8RimV1c6VfsyBIw06h0Ow/UD70NFCJlLSnTEu5J8CS2PzFa41CP0YneSVkto2MhJk0pH9TashfHqf0FMLfiMMrvDGxGgYGo7keNIeKXju7QIgEOB2cXjzJY/vrVbSXRbjSRkd4lRhT6eVFJSVsSVxdI6q0vxdM6EFWT86JibVkY5da5u3uGhuBMhxrGfEGnEd/HIgGSrddqjkxu9isJqtwmWNJD341bFe0te9kR+63Pl4VKg6TpmhRbVoZa9KZ0Y8AKFmt7a6dZbi2ikaI5R3QEqfKitXgao2n+nPpXb+AULb60uru7t3t+IyW1vGpLJCAGc523PTnW/8SaOcxfLysF5yMQoPpnnV5YlZTiQj16fvwoG2huGuytzcMIABhAcCT1BG1I272KQ076gq4uNWXAcxSd1sdBSDiVqqK8bA4DbeYPh7bV0EqKAyIoVAdhSriGHhEcjBWX6HJwB5GqYcmmVMPUYdUNSFXaFOD27aEkl0lBr6Mx0/q3+GunEK29slqoBwoDkDGM88/8A1n2rlLyJobK3R105vEyp2yS6/wC70zTL4r+KYuCFbW0QT8QldVKbNjPl154962yfB50UM5YbeAdpcNo6iPPeJ5nA9f0oKa5a4IwuiJfoQf3pDwbhV2txc3nELyae4uZNR1NnSAMAZ6nGM9Kbu3ZIemBWDNkbdJnqdNhUVqaBbxka4ZMhiBuOeNv3/pVY1VFGs6STyzuT+/fzoMXkd5qMEojc76HOknz/AHyI9RRlpw+Z+9O6+S6e6PbqK3RajFWeZNuU3RpJPHGwidh2jd4qR+z+tbw3BaMNpwOpO1HRQJsWjQ+wo1MY7qr6VN5lYyxMSW80lyGSLtDpYjUFzjFSn8RWNdKIEHgABXlZ51KVmmEnCNBDPg6WU+1DTW4L67d17TGNLk7+fj+tbi3iUhn1SOPxOx29BXuYwxkWNdYH1Bd6aP0JL+RhEl02UlRQvMHVmh/kbrviZ4HX8DEEEeo3ph8wrHSWAOKz+pwqgsCNmANCmGoySb3B7fUqtHLIHkXmQuMjptQHHLVrixuEjByyEDHPJHSjbs3FuI2itJHUNhggBOk56c6xN2YgUlBWXKIuoeOwqEvxZ6GKpR2OftTxTjVvDBxbh81pdRgASgApI2R3tt1O2TkAeFNx8PWYvv4jesZbwppO/dGwyceJxVX4rDqnftlSGBtHaMQAX6jPv+eK8j4mLotHE3asvPQNR/KneWTVCLpoxlqYRMY0GIxjzpdIe0kMYBI/EQOVMoeF31zksBboRsX3b7dPej7bhBhQAy5bqcc6movkfLljWlMQWtusbF1kLZ2w4z/xUlsuI3F32nZQTW6bIusjHmRjc10q8Ni1AuucefOtSgXuxoV9qqnJGRxgzkzbcXgkGA6hsg7Bgp/MUzs3uGhBnKF88sFc0+0aV3JJ67VXGpDqXYeP+tPKblyhVGKTYFEmsbtpPmKlZ3SniCtDb3Utuw/7iZ/tg/nXtTuwtNBhZCN/v41RzEcdphl/fWhnbDHXIGB6E8q2NvFIh7zIfI7U8eRZTTj+JrAbdv8ApIvrp/vRIIxtj2oaGBUOQ5YDYZr24aRMNHuBzA50zafAkdVbhQwRz39azkjhbAdVY9MjNKoZp7rAhDBMnLnajTLHAAGYsR9R60vOyKfDds1jsLJYyiWkCqTqIEQwT4+taxRxQjTEgUeCrgVl8xGGGXAz08a3yG3RgRRA78lsg16fKqZAr3O1cLR6D0H3qbeNVJxyFULsUIGx6HFcckaahy2qjOv/AJj3oKVZApPb79CwqW8EpmZ59oxjQNecnrmlt+h9MfEgrTrOVVDn8RHOpVmbOy4FSjsAXoe01M6gn0qJvEF6VKlJHgD+RYSuJwoOAOlaQSNJs29SpTR4ZSfMf6CCO7jxpXL/AC51VeRkwc9dqlSnjwycd5ozskWS4nLAfyyukDptTQd2XC7AjNSpQ8Itk/c/wGku5VdgMcz0o9WJUHxqVKpJLYx423JnrVUOSTmpUqXku/iZ6iXwcEc60NSpXHeCdmuc715UqVwp/9k=",
       name: 'Anjali',
       description:"Available"
      },
      {
        id: '2', 
        image:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALQAdwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAAEBQACAwYBB//EADoQAAIBAwIDBgQEBAUFAAAAAAECAwAEERIhBTFBEyJRYXGBBhQykUKhsfAVI2LBotHh4vEzQ1Jykv/EABkBAAMBAQEAAAAAAAAAAAAAAAECAwQABf/EACcRAAICAQMEAgEFAAAAAAAAAAABAhEDEiExBBNBUTJhIiMzYnGB/9oADAMBAAIRAxEAPwC1xGMu+c4zQkN3Ii6RTBMMsw/qNIrsXDTGO3IG/PPKopBbGq3DSKQQM46UrWTsb3fbNa2VteCYdqw01lxNJTcqIRvRSOu0MvnAgAAFVN6oOcUvFrfnGQp2r02PEGPJaOlAtDZeKoFxg14OMb4APlSxeH3w5gVb5C+6qtdpQbQyPETIpDCguAwk3M8nRmzQjQ3ikho8AdaZfDxYa1cYNI1SCnuNOHXKw3cqO/M0Px65SRv5TZOOlDTJMbtysWR40LNFch89icHwpo8HSoSXZZnCt1OKewt2dsq0kvml+aQdmc+lHr8yyqqxk+NGUbQqHVnIGYb74ryguHpOJz2iFRipSaaHsZW8eqF2OO8xxSmS2aOcsGUEnxp3aqwhCZ6Vjc2mSGziknPTwJpbBYreTUDrUjyrG+tzG6urb05ihIiXlQnEY+6p86WGRvkZRrkwjEmle8n3rYdovNk+9b26LpXYUbHYGdtsYNL3XYNIu1SA81oq3t7qcdwbeNPrTg8AAaQKSPGm1vBBGMKAMeVWT9h0HGycKu8EnT+dAcMikhuZlcbiu9nMYB3H2rkS2nilxkd3ausbTRrb2szsWVRjzpfxS4lsydcYx/7V03CZUMXSuc+PrVbjh8mgDVzGKGrc5w2s5C64kJL5O7p33GRvTWXiiWwRyrY8q4N43R1G+QedbcQ+YeFdOvPlWhpEzueHfEC3ty0KwvsM5xXlc38EwT/Ps0gcLoO5qUkmrOW6PooiONqykHQ5oxZ107rWEhDNq08qwN/Zao+yqatOOlC8TOmDPhR8DBjgrtWHFYFeFlB38qaGzG0IwsHR4VIIzTSGZ4x3cVy1hbXMMpAOUzXQI7CLfnSukxVBIP8AnpQMa969S+nH4qTq79tuDimCsmnzpb+xlBPybm4lf6moeVF3bG55mtEKHrVnWPTzorV7C4CixvJBdNEjYAo25ia4GmXcUsmVYLvWn4j0o5ZXbGxAoysXtuQK3AbUsD2YPtV14RbrzjH2o9WwNzj1qjzoORrrmwPDRhFaQQNlVx7VKwur9U5kH3qUyUhe2MUdT0FWbTjpWJCg4XnUVWJ3JrFRJprk17ijariBJE1OaG7NieZxRAY6AvLFMpUNFsiwRg7AfarGEY6VullMw2wG6KTiqvBLFvIjAePT71NZU+BnCcfkjH5dScgV6lm0sgVN2PQVvbxmaVYwQM9T4CmYCWyYGVDdBzPrSyzad2Ww4pZH9Cw2apkZyy88dKGuA+nSKZQEGVlfk4IrIICd+dHp+qc1bRbqMXaaSYnNn2n1itxGqJjSdqYlFFVZVO1ae8Qi3E5niDXLNphyPOlUy3qMNTswrtnt4zzoG44ektUhm9nSk/JwnEri4jwoznPjUp1f/Ddy9wJEkGnHI15WpZYUIdDFEV61tpIrFWbO2a2OdPWvNoWjzBG+a81kEEdK90Np61mofVgg+9BxZzVcHRQyRyqsmrBYBgMVuZEByGUeOBSm1l1IEIwRy86I3FedKTxyaaPYhFZIKV2Fx3Nut5FAHVZZg5jU4BbSBk/nWMsTSOWckmgVso7zi0V3L9VqMREc1J5n+3tRk172DaLgYUnIlXl7jpWmWFyxqTO06X+INdSC0UvhjpxnSMmslkSZyUOCeYr2RxLLkHug7EdawlKxyo6jd20n1qvT9NpWqXkh1EtSr0bumOtZlipreJCwwT71JIQDvT6WlZicfKMC5NVZ8cqsUGdjWZhcb5ooV2UaVy2OlSoykHepXWwbmKHJOmtEEgYZ3odv5f0NvXouZV3p7O1UNokyMsmBQ8zKGwtUS/YrhsVdQr9486ZtSQ92jJpgCBnemJzJw0zM3LY4pZMYgdxk10fCuyl4aqzaWUbHI228qEMUJy/Iv083GTo5/hPHOH3ErwW11DJMOapIGNEX19Fbq7zMqL+Is2APvRqwcJtbtri3skaVRqLJGNXtgUJcrw/jTtHe24kQnADp19xvWtKK2NH6j3owsbqC7jDwMrKeRUgg/avb1cQufxDSw9Qf+a3g4VYcO7ljGsY6hQB+lY3k8YmMWAXWPUQRtjP60MiTiybg3yDLczIByr0XkjbNzpbLdNsOtXjdn3JrI0efqDu2YHc5rZp2ZdjsKWNI/hWiGZl7u1ckx0wztlb6iM1KWSJKW571KamLqZRO0B7+au82+BnHlR0vCuI40fKPkcmFacK+HeIzzD5uMRRg9Tuabty4F3oVuzBgV3BouF3K88V2cHALGJADEGOObCs7n4ctZSGiBib+nlVV00h0ck0ZxknNN+FRzfLTFgFibBXLbk9dqM/gHZyDtJNUfPAG5rK/GmSOMCRgWwdIwijn6np48/OrYelfMxY5O3kUkKr604rNHM3DeIizJAGrsg5PlvypfY2/xAjE8QvrWZQc7QkN+R/tXSM0sNlDMhUyFcvjkTSyfiDnfsyT5ilrwetrtWE6iBrfYDnSey4pHxRpVaKW3ZWKNqX6SOjfb99c3u555SrN3Qdwo29KPt7LQ/aJlZCSXwGIfzIHtv5DnWnpsKlepGLrcz4izM2kZXUAD6UO8WliFXFN2s3mVRC6RsMnO5Hof869X4f4oTuYTnrqNZc3TSg6RkjO1wKEXTu5q/bFfp5U0f4Y4gwIZo/uaHb4b4jEpJ0sB0U71LtzXgZMBjlQMS5FSsriwmSQalZR5ipXb+gbn0a3h7Ia5GOpvPaiNW3dwTWF3xG3tVTWWYue4qKWLVjc8Ys7RVa7kEGo4VWO5+1ejTe41pBus53GKmotsprOOWK4VZI2DA7g+NaLDGHL5Or1obh2AbhndzHy6Zz08fz/ACpTx2aK3tmI05II3HU5Of3/AJU8u4wgaQHJOAfKuN45cGTkSYgSe6cZA3z/AIfsF8a1Y0mZ52mH8LmFzYiOZQCpPLlvVLvhiORoLAHwpbbMbK3hHMlRsBsPEE8uv7FdHw6UTKJR9CgMSduvKsuXC1Pbhm7DnTx2+ULrfgywPFkYA3Yg7x7Zz68vvVbiKOEGRSMd5iNI8hzI8RimV1c6VfsyBIw06h0Ow/UD70NFCJlLSnTEu5J8CS2PzFa41CP0YneSVkto2MhJk0pH9TashfHqf0FMLfiMMrvDGxGgYGo7keNIeKXju7QIgEOB2cXjzJY/vrVbSXRbjSRkd4lRhT6eVFJSVsSVxdI6q0vxdM6EFWT86JibVkY5da5u3uGhuBMhxrGfEGnEd/HIgGSrddqjkxu9isJqtwmWNJD341bFe0te9kR+63Pl4VKg6TpmhRbVoZa9KZ0Y8AKFmt7a6dZbi2ikaI5R3QEqfKitXgao2n+nPpXb+AULb60uru7t3t+IyW1vGpLJCAGc523PTnW/8SaOcxfLysF5yMQoPpnnV5YlZTiQj16fvwoG2huGuytzcMIABhAcCT1BG1I272KQ076gq4uNWXAcxSd1sdBSDiVqqK8bA4DbeYPh7bV0EqKAyIoVAdhSriGHhEcjBWX6HJwB5GqYcmmVMPUYdUNSFXaFOD27aEkl0lBr6Mx0/q3+GunEK29slqoBwoDkDGM88/8A1n2rlLyJobK3R105vEyp2yS6/wC70zTL4r+KYuCFbW0QT8QldVKbNjPl154962yfB50UM5YbeAdpcNo6iPPeJ5nA9f0oKa5a4IwuiJfoQf3pDwbhV2txc3nELyae4uZNR1NnSAMAZ6nGM9Kbu3ZIemBWDNkbdJnqdNhUVqaBbxka4ZMhiBuOeNv3/pVY1VFGs6STyzuT+/fzoMXkd5qMEojc76HOknz/AHyI9RRlpw+Z+9O6+S6e6PbqK3RajFWeZNuU3RpJPHGwidh2jd4qR+z+tbw3BaMNpwOpO1HRQJsWjQ+wo1MY7qr6VN5lYyxMSW80lyGSLtDpYjUFzjFSn8RWNdKIEHgABXlZ51KVmmEnCNBDPg6WU+1DTW4L67d17TGNLk7+fj+tbi3iUhn1SOPxOx29BXuYwxkWNdYH1Bd6aP0JL+RhEl02UlRQvMHVmh/kbrviZ4HX8DEEEeo3ph8wrHSWAOKz+pwqgsCNmANCmGoySb3B7fUqtHLIHkXmQuMjptQHHLVrixuEjByyEDHPJHSjbs3FuI2itJHUNhggBOk56c6xN2YgUlBWXKIuoeOwqEvxZ6GKpR2OftTxTjVvDBxbh81pdRgASgApI2R3tt1O2TkAeFNx8PWYvv4jesZbwppO/dGwyceJxVX4rDqnftlSGBtHaMQAX6jPv+eK8j4mLotHE3asvPQNR/KneWTVCLpoxlqYRMY0GIxjzpdIe0kMYBI/EQOVMoeF31zksBboRsX3b7dPej7bhBhQAy5bqcc6movkfLljWlMQWtusbF1kLZ2w4z/xUlsuI3F32nZQTW6bIusjHmRjc10q8Ni1AuucefOtSgXuxoV9qqnJGRxgzkzbcXgkGA6hsg7Bgp/MUzs3uGhBnKF88sFc0+0aV3JJ67VXGpDqXYeP+tPKblyhVGKTYFEmsbtpPmKlZ3SniCtDb3Utuw/7iZ/tg/nXtTuwtNBhZCN/v41RzEcdphl/fWhnbDHXIGB6E8q2NvFIh7zIfI7U8eRZTTj+JrAbdv8ApIvrp/vRIIxtj2oaGBUOQ5YDYZr24aRMNHuBzA50zafAkdVbhQwRz39azkjhbAdVY9MjNKoZp7rAhDBMnLnajTLHAAGYsR9R60vOyKfDds1jsLJYyiWkCqTqIEQwT4+taxRxQjTEgUeCrgVl8xGGGXAz08a3yG3RgRRA78lsg16fKqZAr3O1cLR6D0H3qbeNVJxyFULsUIGx6HFcckaahy2qjOv/AJj3oKVZApPb79CwqW8EpmZ59oxjQNecnrmlt+h9MfEgrTrOVVDn8RHOpVmbOy4FSjsAXoe01M6gn0qJvEF6VKlJHgD+RYSuJwoOAOlaQSNJs29SpTR4ZSfMf6CCO7jxpXL/AC51VeRkwc9dqlSnjwycd5ozskWS4nLAfyyukDptTQd2XC7AjNSpQ8Itk/c/wGku5VdgMcz0o9WJUHxqVKpJLYx423JnrVUOSTmpUqXku/iZ6iXwcEc60NSpXHeCdmuc715UqVwp/9k=",
        name: 'Priya',
        description:"Available"
       },
  ]

  const renderItem1 = ({ item }:any) => {
    return (
     <View>
        <View style={{flexDirection:'row', justifyContent:"space-between", paddingHorizontal:15, marginVertical:10}}>
            <View style={{flexDirection:"row"}}>
            <Image source={{uri: item.image}} style={{width:50, height:50, borderRadius:25}}/>
            <View>
            <Text style={{marginLeft:15, fontWeight:"bold"}}>{item.name}</Text>
            <Text style={{marginLeft:15}}>{item.description}</Text>

            </View>
            </View>
          
            {item.id === '1' && 
            <View style={{height:30, width:100, borderRadius:10, backgroundColor:"lightgreen", alignItems:"center", justifyContent:"center"}}>
            <Text>{item.admin}</Text>
            </View>}
            {item.id != '1' &&
                <TouchableOpacity style={{height:30, width:100, borderRadius:10, backgroundColor:"lightgreen", alignItems:"center", justifyContent:"center"}}>
                <Text>Mute</Text>
               </TouchableOpacity>
            }

        </View>
     </View>
    );
  };

  
  const renderItem = ({ item }:any) => {
    return (
      <View style={{marginTop:10, marginLeft:15}}>
        <Image source={{uri: item.image}} style={{width:100, height:100, borderRadius:10}}/>
      </View>
    );
  };

  return (
    <ScrollView style={styles.firstContainer}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={30}
          color="#000"
          onPress={() => navigation.goBack()}
        />
        <Image
          style={styles.image}
          source={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXk5ueutLepsLPo6uursbXJzc/p6+zj5ea2u76orrKvtbi0ubzZ3N3O0dPAxcfg4uPMz9HU19i8wcPDx8qKXtGiAAAFTElEQVR4nO2d3XqzIAyAhUD916L3f6+f1m7tVvtNINFg8x5tZ32fQAIoMcsEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQRAEQTghAJD1jWtnXJPP/54IgNzZQulSmxvTH6oYXX4WS+ivhTbqBa1r26cvCdCu6i0YXbdZ0o4A1rzV+5IcE3YE+z58T45lqo7g1Aa/JY5tgoqQF3qb382x7lNzBLcxft+O17QUYfQI4IIeklKsPSN4i6LKj/7Zm8n99RbHJpEw9gEBXNBpKIYLJqKYRwjOikf//r+J8ZsVuacbqCMNleI9TqGLGqMzhnVdBOdd6F/RlrFijiCoVMk320CBIahUxTWI0KKEcJqKbMdpdJb5QvdHq6wCI5qhKlgGMS/RBHkubWDAE+QZxB4xhCyDiDkLZxgGEVdQldzSKbTIhmZkFkSEPcVvmBn2SMuZB9od7fQDsMiDdKJjFUSCQarM5WirZ3C2TT/htYnyPcPfgrFHWz0BI74gr6J/IZiGUxAZGQLqmvQLTrtE/Go4YxhVRIpEw+sww1IIcqr5NKmUUzLF3d4/qPkYIp2T/obPuemlojFUR4t9Q2Vojhb7BmgElWHzLPH8hucfpefPNFTVgs9h1AdU/Pin96vwWbWdf+X9Absn3OdO34aMdsDnP8WgKYisTqI6CkNGqZQo1XA6Ef6AU32SJzOcBukHPF07/xNSgmHKa5BOhtezv6mA/rYJpwXNAnbRZ1XuF3BzDcO3vpA3+ny2909gbqE4hhD3LIPhLLyBNhPZvbZ3B+3tPYa18A7auSlXQayKwTPNLKDcuOB0xPYKDPFTkWsevQPRZ1J8Hji9I1KQ34r7hZhrwNwOZ97QxNx0drwn4QI0wQk1DcEsfKCWKdxVvxPSNUIp/knmAXT+nT+Ko3+0H96rcNb3m1fx7MBTJdeBJ7uFcWsc0wvgAsC4pROW0l2inbAmIBv/7GZmuhQH6API2rr8T0e6yuZJ+80A9LZeG62T3tik31XwxtwZcizKuTHkMjB1WdZde4Kmic/A5ZI3rr1ae21d08PlVHYfAaxw9G9CYRbJ+8ZdbTcMRV1XM3VdF0M32vtoTdZ0+u29s0OttJ5bz64UwinjaFMVY9vkqc3KKSxN21Xl+0L4Q3Vuv1tYl0pqnX6ms4XetFz7gdZVAgUEoJntfOUe4ZwsHd9FzqQ3Vv6xe41l0XJcqcKl6TZvlv7ClAW3BsqQW4X7ypApB8dmTgK4IX5wvqIVj33HtD2qSG4BqznxdIefL27Y4sahi0MdIdvUsDva8agGGbCtITmCY31MHD2O0uIdh/0rJDQ1VX5Zdxz3rR2QDbv6qXl9vudzqQtGm1Jv9LDXOsfvvB7VcZ8PDKD0mQ1VHPYQ9O+Yj4hR1IUD8rBnn3ho2m8oQMxbCFiKlL2ioSW5heeJqegED52CzxCtcGD3Kv8Wms9EYLyUhwaFIhSMBClevWEmiK/Iaogu4H7sg6ppQhQG8RUqivuTGOAJOg6FfgW0q0M0PQMRMEgXaeNf3SYDZ8PIMI0+wHgr/MgN7wYwpiLjCCqM6ydUDZLQiB6nDdNC8SDyig3jPPpFXGcC9O8BUBDVmgBY59E7Md/35Loe/UVEECEJwYggJjELZ4J71SaQSBeC02n4Da29CayJNA28SAhd2CQyC1Xw6pSmGSINQVuMhAZp4DClan9MgmkDDNmezqwS8sgtlXK/EPBhoaSmYVC/F7IO1jQEdHOlabpKh3+jzLQSTUiq4X2I+Ip/zU8rlaqAvkS21ElR+gqu3zbjjL+hIAiCIAiCIAiCIAiCsCf/AKrfVhSbvA+DAAAAAElFTkSuQmCC',
          }}
        />
        <Icon name="ellipsis-vertical" size={30} color="#000" />
      </View>
      <View style={styles.secondContainer}>
     <View style={styles.information}>
     <Text style={styles.name}>{item.data}</Text>
     <Text style={styles.number}>+91 9876543210</Text>
     


     </View>
     <View style={styles.audio}>
     <View>
     <Icon name="call-sharp" size={30} color="green" />
     <Text style={styles.text}>Audio</Text>
     </View>
     <View>
     <Icon name="videocam" size={30} color="green" />
     <Text style={styles.text}>Vedio</Text>
     </View>
      <View>
     <Icon name="md-qr-code-sharp" size={30} color="green" />
     <Text style={styles.text}>Pay</Text>
     </View>
      <View>
     <Icon name="search" size={30} color="green" />
     <Text style={styles.text}>Search</Text>
     </View>
     </View>
     <View style={{borderWidth:0.5, borderColor:"#ccc", marginTop:22}}/>
      </View>
      <View style={styles.thirdContainer}>
        <View style={styles.photos}>
           <View style={styles.photoContainer}>
           <Text style={styles.media}>
                Media, links, and docs
            </Text>
            <View style={styles.totalPhoto}>
                <Text>
                    27
                </Text>
              <Icon name="md-chevron-forward-sharp" size={20} color="green" />
            </View>
           </View>
           <FlatList
           data={data}
           renderItem={renderItem}
           keyExtractor={(item) => item.id}
           horizontal
           showsHorizontalScrollIndicator={false}
            />


        </View>
       <View style={{borderWidth:0.5, borderColor:"#ccc"}}/>
       <View>
        <View style={styles.muteContainer} >
        <View style={styles.mute}>
        <View style={{flexDirection:"row"}}>
        <Icon name="md-notifications-outline" size={30} color="grey" style={{marginLeft:10}} />
        <Text style={styles.muteNotificationText}>
            Mute notifications
        </Text>
        </View>
        <Switch
        value={isMuted}
        onValueChange={handleToggleSwitch}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={isMuted ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
      />
      
        </View>
        <View style={{flexDirection:"row", paddingHorizontal:10, paddingVertical:15}}>
        <Icon name="musical-note" size={30} color="grey" style={{marginLeft:10}}/>
        <Text style={styles.muteNotificationText}>
            Custom notification
        </Text>
        </View>
        <View style={{flexDirection:"row", paddingHorizontal:10, paddingVertical:10}}>
        <Icon name="ios-images" size={30} color="grey" style={{marginLeft:10}} />
        <Text style={styles.muteNotificationText}>
            Media visibility
        </Text>
        </View>
       <View style={{borderWidth:0.5, borderColor:"#ccc"}}/>

        
        
        </View>
        <View style={styles.muteContainer} >
        <View style={styles.mute}>
        <View style={{flexDirection:"row"}}>
        <Icon name="lock-closed" size={30} color="grey" style={{marginTop:10, marginLeft:10}} />
       <View>
       <Text style={styles.muteNotificationText}>
            Encryption
        </Text>
        <Text style={{marginLeft:20, fontSize:15, marginRight:50}}>
            Messages and calls are end-to-end encrypted. Tap to verify
        </Text>
       </View>
        </View>
        </View>
        <View style={{flexDirection:"row", paddingHorizontal:10, paddingVertical:5}}>
        <Icon name="timer-outline" size={30} color="grey" style={{marginTop:10,  marginLeft:10}} />
        <View>
        <Text style={styles.muteNotificationText}>
            Disappearing message
        </Text>
        <Text style={{marginLeft:20, fontSize:15}}>
            off
        </Text>
        </View>
        </View>
       
       <View style={{borderWidth:0.5, borderColor:"#ccc", marginTop:10}}/>

        
        
        </View>
        <View style={styles.muteContainer} >
        <View style={styles.mute}>
            <Text style={styles.groups}>7 participants</Text>
           
        </View>
        <FlatList
           data={data1}
           renderItem={renderItem1}
           keyExtractor={(item) => item.id}
            />
        {/* <View style={{flexDirection:"row", paddingHorizontal:10, paddingVertical:5,}}>
        <Icon name="ios-people-circle-sharp" size={40} color="grey" style={{marginLeft:10}}  />
        <Text style={[styles.muteNotificationText, {marginBottom:15}]}>
            Create group with Tarun
        </Text>
        </View> */}
        
       <View style={{borderWidth:0.5, borderColor:"#ccc",}}/>

        
        
        </View>

        <View style={[styles.muteContainer, {marginBottom:20}]} >
        
        <View style={{flexDirection:"row", paddingHorizontal:10,marginTop:15}}>
        <Icon name="musical-note" size={30} color="red" style={{marginLeft:10}} />
        <Text style={[styles.muteNotificationText, {marginBottom:15, color:"red"}]}>
            Block Tarun 
        </Text>
        </View>
        <View style={{flexDirection:"row", paddingHorizontal:10, marginTop:10}}>
        <Icon name="thumbs-down-sharp" size={30} color="red" style={{marginLeft:10}} />
        <Text style={[styles.muteNotificationText, {marginBottom:15, color:"red"}]}>
            Report Tarun 
        </Text>
        </View>
        
       <View style={{borderWidth:0.5, borderColor:"#ccc",}}/>

        
        
        </View>

       </View>


      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 120,
    marginLeft: 20,
    borderRadius: 60,
    marginTop: 10,
  },
  groups:{
   paddingLeft:10,
   fontSize:16,
   fontWeight:"bold"
  },
  muteContainer:{
   backgroundColor:"#fff",
   marginTop:15
  },
  mute:{
 flexDirection:"row",
 justifyContent:"space-between",
 paddingVertical:10,
 paddingHorizontal:10

  },
  muteNotificationText:{
  marginTop:5,
  fontSize:18,
  color:"#000",
  marginLeft:20
  },
  photoContainer:{
   flexDirection:"row",
   justifyContent:"space-between",
   paddingHorizontal:15
  },
  media:{
  fontSize:16,
  fontWeight:"bold"
  },
  totalPhoto:{
   flexDirection:"row"
  },
  photos:{
   backgroundColor:"#fff",
   paddingVertical:15,
   
  },
  thirdContainer:{
    flex:3.5,
    marginTop:20
  },
  text:{
marginTop:5,
fontSize:16,
fontWeight:"bold",
color:"green"
  },
  firstContainer: {
    flex: 1,
  },
  name:{
fontWeight:"bold",
fontSize:22
  },
  number:{
marginTop:5,
fontSize:18

  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 10,
    backgroundColor:"#fff"

  },
  secondContainer:{
    flex:1.5,
    backgroundColor:"#fff"

  },
  information:{
    alignItems:"center",
    marginVertical:10
  },
  audio:{
    flexDirection:"row",
    justifyContent:"space-around",
    marginTop:25
  }
});

export default ChatDetail;
