import { View, Text, StyleSheet, FlatList } from "react-native";
import CategoryItem from "../components/CategoryItem";
import { baseURL } from "./../components/util/util";

function CategoriesOverviewScreen({ route, navigation }) {
  //alternatively to getting the route
  // const route = useRoute();
  // const catId = route.params.categoryId

  const data = {
    name: route.params.name,
    description: route.params.description,
    id: route.params.id,
    image: route.params.image,
  };

  // const displayedMeals = MEALS.filter((mealItem) => {
  //   return mealItem.categoryIds.indexOf(catId) >= 0;
  // });

  // useLayoutEffect(() => {
  //   const categoryTitle = CATEGORIES.find(
  //     (category) => category.id === catId
  //   ).title;

  //   navigation.setOptions({
  //     title: categoryTitle,
  //   });
  // }, [catId, navigation]);

  function renderCategoryItem(itemData) {
    //const item = itemData.item;
    const categoryProps = {
      id: data.id,
      name: data.name,
      imageUrl: `${baseURL}/images/categories/${data.image}`,
      description: data.description,
    };
    return <CategoryItem {...categoryProps} />;
  }
  const imageUrl = `${baseURL}/images/categories/${data.image}`;

  return (
    // <View style={styles.container}>
    //   <FlatList
    //     data={data}
    //     keyExtractor={(item) => item.id}
    //     renderItem={renderCategoryItem}
    //   />
    // </View>
    <CategoryItem
      name={data.name}
      id={data.id}
      description={data.description}
      imageUrl={imageUrl}
    />
  );
}

export default CategoriesOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
