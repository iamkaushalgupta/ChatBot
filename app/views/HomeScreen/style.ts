import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../constants";

let {height,width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.backgroundColor
    },
    headingLogo:{
        marginVertical:10,
        alignSelf:'center',
        height:height*0.05,
        width:width*0.5,
        resizeMode:'contain'
    }
    
})

export default styles