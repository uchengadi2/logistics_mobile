import React, { useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import MealExtraDetail from "../components/CategoryExtraDetail";
import { MEALS } from "./../data/dummy-data";
import IconButton from "../components/IconButton";

function MealDetailScreen({ route, navigation }) {
  function headerButtonPressHandler() {
    console.log("Pressed");
  }
  const mealId = route.params.mealId;
  const selectedMealItem = MEALS.find((meal) => meal.id === mealId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon="star"
            color="white"
            onPress={headerButtonPressHandler}
          />
        );
      },
    });
  }, [navigation, headerButtonPressHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{ uri: selectedMealItem.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMealItem.title}</Text>
      <View>
        <MealExtraDetail
          duration={selectedMealItem.duration}
          complexity={selectedMealItem.complexity}
          affordability={selectedMealItem.affordability}
          textStyle={styles.detailText}
        />
      </View>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Ingredients</Text>
      </View>

      {selectedMealItem.ingredients.map((ingredient) => (
        <View key={ingredient} style={styles.listItem}>
          <Text style={styles.listItemText}>{ingredient}</Text>
        </View>
      ))}
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Steps</Text>
      </View>

      {selectedMealItem.steps.map((step) => (
        <View key={step} style={styles.listItem}>
          <Text style={styles.listItemText}>{step}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 250,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  subtitle: {
    color: "#351401",
    fontSize: 18,
    fontWeight: "bold",

    textAlign: "center",
  },
  subtitleContainer: {
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 6,
    borderBottomColor: "#351401",
    borderBottomWidth: 1,
  },
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "#351411",
  },
  listItemText: {
    color: "#3f2f25",
    textAlign: "center",
  },
});
