import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import InputField from "components/InputField";
import DropdownOrder from "modules/order/components/DropdownOrder";
import styles from "./index.module.scss";
import { inputs } from "./data";

const PostenDelivery = () => {
  const [countriesList, setCountriesList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  // const [postList, setPostList] = useState([]);
  // const [selectedPost, setSelectedPost] = useState("");
  // console.log(postList);
  console.log(selectedCity);

  const { t } = useTranslation();

  const onSelectCity = (city: string) => {
    setSelectedCity(city);
  };

  useEffect(() => {
    const postalCode = "5019"; // або взяти динамічно
    fetch(
      `http://localhost/vise-data-base/api/v1/order/posten/post-offices.php?postalCode=${postalCode}`
    )
      .then((res) => res.json())
      .then((data) => console.log("data", data))
      .catch((err) => console.error("Fetch error:", err));
  }, [selectedCity]);

  // fetch(
  //   `http://localhost/vise-data-base/api/v1/order/posten/post-offices.php?postalCode=4601&city=Kristiansand&street=Markens&streetNumber=12`
  // )
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  useEffect(() => {
    fetch("http://localhost/vise-data-base/api/v1/order/posten/sities.php")
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
        setCountriesList(data);
      })
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
    }
    // else if (input.title === "ZIP") {
    //   return {
    //     ...input,
    //     list: postList || [],
    //     selected: selectedPost,
    //     onSetTitle: setSelectedPost,
    //   };
    // }
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
        {props.map((input) => {
          if ("list" in input) {
            return (
              <DropdownOrder
                key={input.title}
                title={t(`order.${input.title}`)}
                list={input.list}
                onSetTitle={input.onSetTitle}
                selected={input.selected}
              />
            );
          } else {
            return (
              <InputField
                key={input.title}
                title={t(`order.${input.title}`)}
                placeholder={
                  input.placeholder ? t(`order.${input.placeholder}`) : ""
                }
                require={true}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default PostenDelivery;
