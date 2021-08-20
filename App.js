
import React ,{useEffect,useCallback}from 'react';
import { StyleSheet, Text, View ,Dimensions,TouchableOpacity} from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated , {useSharedValue,useAnimatedProps,withTiming,useDerivedValue} from 'react-native-reanimated'
import { ReText } from 'react-native-redash';


const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const {width, height} =Dimensions.get('window');

const CIRCLE_LENGTH = 1000; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);

export default function App() {

  const progress=useSharedValue(0);

  const progressText=useDerivedValue(()=>{
   return `${Math.floor(progress.value * 100)}`;
  })

  const AnimatedCircle=Animated.createAnimatedComponent(Circle);

  useEffect(()=>{
    progress.value=withTiming(1,{duration:1000})
  },[])

  const animatedProps=useAnimatedProps(()=>{

    return {
      strokeDashoffset:CIRCLE_LENGTH*(1-progress.value)
    }

  })

  const onPress = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, { duration: 2000 });
  }, []);

  return (
    <View style={styles.container}>
      <ReText style={styles.text} text={progressText}/>

      <Svg style={styles.svg}>
        <Circle cx={width/2} cy={height/2} r={R} stroke={BACKGROUND_STROKE_COLOR} strokeWidth={30} />
        <AnimatedCircle cx={width/2} cy={height/2} r={R} stroke={STROKE_COLOR}
         strokeWidth={15}  strokeDasharray={CIRCLE_LENGTH} animatedProps={animatedProps} strokeLinecap={'round'}  />
      </Svg>

      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Run</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg:{
    position: 'absolute',

  },
  text: {
    fontSize:80,
    fontWeight:'700',
    color:'#fff',
    width:200,
    textAlign:'center',
  },
  button: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    letterSpacing: 2.0,
  },
});
