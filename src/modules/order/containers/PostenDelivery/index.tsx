import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import InputField from "components/InputField";
import DropdownOrder from "modules/order/components/DropdownOrder";
import styles from "./index.module.scss";
import { inputs } from "./data";

const PostenDelivery = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [postList, setPostList] = useState([]);
  const [selectedPost, setSelectedPost] = useState("");
  console.log(postList);
  

  const { t } = useTranslation();

  const onSelectCity = (city: string) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    fetch(
      "http://localhost/vise-data-base/api/v1/order/posten/post-offices.php?postalCode=0170"
    )
      .then((res) => res.json())
      .then((data) => console.log('data', data));




    // https://api.bring.com/address/api/NO/addresses?address_type=street&q=Skrautvål



  }, [selectedCity]);
  
// fetch(
//   `http://localhost/vise-data-base/api/v1/order/posten/post-offices.php?postalCode=4601&city=Kristiansand&street=Markens&streetNumber=12`
// )
//   .then((res) => res.json())
//   .then((data) => console.log(data));





  useEffect(() => {
    fetch("http://localhost/vise-data-base/api/v1/order/posten/sities.php")
      .then((res) => res.json())
      .then((data) => setCountriesList(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const props = inputs.map((input) => {
    if (input.title === "town") {
      return {
        ...input,
        list: countriesList,
        selected: selectedCity, // тут поточне значення
        onSetTitle: onSelectCity, // тут функція зміни
      };
    } else if (input.title === "ZIP") {
      return {
        ...input,
        list: postList || [],
        selected: selectedPost,
        onSetTitle: setSelectedPost,
      };
    }
    return input;
  });

  // const getAddressFromCoords = async (lat: string, lon: string) => {
  //   const res = await fetch(
  //     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  //   );
  //   const data = await res.json();
  //   console.log(data); // повна адреса
  // };

  // const pp = getAddressFromCoords("62.1143425350427", "10.6165444446212");
  // console.log(pp);
  


  // console.log(props);
  

  return (
    <div className={styles.customerDetails}>
      <div className={styles.detailsBox}>
        {props.map(
          ({ title, placeholder, dropdown, list, selected, onSetTitle }) =>
            dropdown ? (
              <DropdownOrder
                key={title}
                title={t(`order.${title}`)}
                list={list || []} // list беремо з props
                onSetTitle={onSetTitle} // функція зміни
                selected={selected} // поточне значення
              />
            ) : (
              <InputField
                key={title}
                title={t(`order.${title}`)}
                placeholder={placeholder ? t(`order.${placeholder}`) : ""}
                require={true}
              />
            )
        )}
      </div>
    </div>
  );

};

export default PostenDelivery;
