import React, { useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { fetchDataFromUrl } from "../reducers";
import { List, Text, Button } from "react-native-paper";
import { ScrollView, View, Alert } from "react-native";

function UsersScreen({ navigation, fetchData, users }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Users",
    });
  }, []);

  useEffect(() => {
    fetchData("users");
  }, []);

  useEffect(() => {
    fetchData("accounts");
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          justifyContent: "space-evenly",
          padding: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            flexDirection: "row",
          }}
        >
          <Text
            variant="titleLarge"
            style={{ fontWeight: "bold", textAlign: "center", margin: 10 }}
          >
            {" "}
            Current Users
          </Text>
        </View>
        <List.Section>
          {users.map((user) => (
            <List.Item
              key={user?._id}
              title={`${user?.first_name} ${user?.last_name}`}
              description={`Contact: ${user?.phone_number}`}
              left={(props) => <List.Icon {...props} icon="account" />}
              right={(props) => (
                <Button
                  {...props}
                  icon="plus"
                  onPress={async () => {
                    try {
                      navigation.navigate("AddMoneyToUserAccountScreen", {userId: user._id});
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                />
              )}
            />
          ))}
        </List.Section>
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (url) => {
      dispatch(fetchDataFromUrl(url));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen);
