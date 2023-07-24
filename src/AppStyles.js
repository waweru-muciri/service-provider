import { Platform, StyleSheet, Dimensions } from "react-native";
import { Configuration } from "./Configuration";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
const numColumns = 2;

const colors = {
  primary: '#555CC4',
  primaryLight: '#829BF8',
  primaryGradientStart: '#4f44b6',
  primaryGradientEnd: '#4f44b6',
  secondaryGradientStart: '#FF1358',
  secondaryGradientEnd: '#FF1358',
  profileGradientStart: '#54CBF6',
  profileGradientEnd: '#49D2D0',
  secondary: '#FF1358',
  grey: '#acacac',
  gray: '#5f5f5f',
  darkGray: '#4d4d4d',
  lightGray: '#9b9b9b',
  white: '#ffffff',
  blue: '#5A81F7',
  bluish: '#F1F1F7',
  black: '#000000',
  green: '#6DD0A3',
  yellow: '#ffc247',
};

export default colors;

export const AppStyles = {
  color: {
    main: "#5ea23a",
    text: "#696969",
    title: "#464646",
    subtitle: "#545454",
    categoryTitle: "#161616",
    tint: "#ff5a66",
    description: "#bbbbbb",
    filterTitle: "#8a8a8a",
    starRating: "#2bdf85",
    location: "#a9a9a9",
    white: "white",
    facebook: "#4267b2",
    grey: "grey",
    greenBlue: "#00aea8",
    placeholder: "#a0a0a0",
    background: "#f2f2f2",
    blue: "#3293fe"
  },
  fontSize: {
    title: 30,
    content: 20,
    normal: 16
  },
  buttonWidth: {
    main: "70%"
  },
  textInputWidth: {
    main: "80%"
  },
  borderRadius: {
    main: 25,
    small: 5
  }
};

export const AppIcon = {
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 8,
    marginRight: 10
  },
  style: {
    tintColor: AppStyles.color.tint,
    width: 25,
    height: 25
  },
  images: {
    home: require("../assets/icons/home.png"),
    defaultUser: require("../assets/icons/default_user.jpg"),
    logout: require("../assets/icons/shutdown.png"),
    menu: require("../assets/icons/menu.png")
  }
};

export const HeaderButtonStyle = StyleSheet.create({
  multi: {
    flexDirection: "row"
  },
  container: {
    padding: 10
  },
  image: {
    justifyContent: "center",
    width: 35,
    height: 35,
    margin: 6
  },
  rightButton: {
    color: AppStyles.color.tint,
    marginRight: 10,
    fontWeight: "normal",
  }
});

export const ListStyle = StyleSheet.create({
  title: {
    fontSize: 16,
    color: AppStyles.color.subtitle,
    fontWeight: "bold"
  },
  subtitleView: {
    minHeight: 55,
    flexDirection: "row",
    paddingTop: 5,
    marginLeft: 10
  },
  leftSubtitle: {
    flex: 2
  },
  avatarStyle: {
    height: 80,
    width: 80
  }
});
