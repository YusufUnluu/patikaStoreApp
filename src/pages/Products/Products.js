import React  from "react";
import {FlatList } from "react-native"; 
import config from "../../../config";
import ProductCard from "../../components/ProductCard/ProductCard";
import useFetch from "../../hooks/useFetch/useFetch";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";

const Products=({navigation}) => {
    const {loading,data,error} = useFetch(config.API_URL)

    const handleProductSelect =id => {
      navigation.navigate("DetailPage",{id})
    }

    const RenderProduct=({item}) =><ProductCard product={item} onSelect={()=>handleProductSelect(item.id)}/>;

    if(loading){
      return <Loading/>;
    }

    if(error){
      return<Error/>;}

  return <FlatList data={data} renderItem={RenderProduct}/>
}

export default Products;