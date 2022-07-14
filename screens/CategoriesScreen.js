import React, { useEffect, useState } from "react";
import { Text, FlatList } from "react-native";

import { CATEGORIES } from "./../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";
import data from "./../apis/local";

// const categoriesList = (
//   <React.Fragment>
//     <Grid container direction="row">
//       {categories.map((category, index) => (
//         <ProductCard
//           title={category.title}
//           key={`${category.title}${index}`}
//           description={category.description}
//           image={category.image}
//           token={props.token}
//           userId={props.userId}
//         />
//       ))}
//     </Grid>
//   </React.Fragment>
// );

function CategoriesScreen({ navigation, token, userId }) {
  const [categoryList, setCategoryList] = useState([]);

  
  useEffect(() => {
    const fetchData = async () => {
      let allData = [];
      //data.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const response = await data.get("/categories");
      const workingData = response.data.data.data;
      workingData.map((category) => {
        allData.push({
          id: category._id,
          name: category.name,
          image: category.image || " ",
          description: category.description || " ",
        });
      });
      setCategoryList(allData);
    };

    //call the function

    fetchData().catch(console.error);
  }, []);

  //console.log("this is the category list:", categoryList);

  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("CategoriesOverviewScreen", {
        id: itemData.item.id,
        name: itemData.item.name,
        description: itemData.item.description,
        image: itemData.item.image,
        categoryList: categoryList,
      });
    }
    return (
      <CategoryGridTile
        name={itemData.item.name}
        image={itemData.item.image}
        description={itemData.item.description}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      // data={CATEGORIES}
      data={categoryList}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
      numColumns={1}
    />
  );
}

export default CategoriesScreen;
