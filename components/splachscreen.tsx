import LottieView from "lottie-react-native";

import realEstateAnimation from "../assets/animations/Real Estate Logo Animation.json";

export default function SplashScreen({ onFinish = (isCancelled) => {} } : { onFinish?: (isCancelled: boolean) => void }) {
  return (
    <LottieView
      source={realEstateAnimation}
      onAnimationFinish={onFinish}
      autoPlay
      resizeMode="contain"
      loop={false}
      style={{
        flex: 1,
        width: "100%",
        backgroundColor: "#093A59"
      }}
    />   
  )
}