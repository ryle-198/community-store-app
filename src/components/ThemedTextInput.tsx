import { TextInput } from "react-native";
// const ThemedTextInput = ({style, ...props}) => {
const ThemedTextInput = () => {
  // const colorScheme = useColorScheme()

  return (
    <TextInput
      style={[
        {
          // backgroundColor: theme.uiBackground, //dont have these
          // color: theme.uiBackground // dont have these
          padding: 20,
          borderRadius: 6,
        },
        // style
      ]}
      //   {...props}
    />
  );
};
export default ThemedTextInput;
