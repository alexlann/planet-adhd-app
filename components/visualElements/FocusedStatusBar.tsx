import { StatusBar } from 'react-native';

const FocusedStatusBar = (props: any) => {
    return <StatusBar backgroundColor={props.backgroundColor || "transparent"} barStyle={props.barStyle || 'dark-content'} translucent={props.translucent || true} animated={true} {...props} />
}

export default FocusedStatusBar