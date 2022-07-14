import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function CategoryExtraDetail({
  name,
  imageUrl,
  description,
  style,
  textStyle,
}) {
  return (
    <View style={[styles.details, style]}>
      {/* <View>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
      </View> */}
      <View>
        <Text style={[styles.detailItem, textStyle]}>{description}m</Text>
      </View>
      {/* <Text style={[styles.detailItem, textStyle]}>
        {complexity.toUpperCase()}
      </Text>
      <Text style={[styles.detailItem, textStyle]}>
        {affordability.toUpperCase}
      </Text> */}
    </View>
  );
}

export default CategoryExtraDetail;

const styles = StyleSheet.create({
  details: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  detailItem: {
    marginHorizontal: 4,
    fontSize: 12,
  },
  image: {
    width: "100%",
    height: 200,
  },
  name: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
    margin: 8,
  },
});
