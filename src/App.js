import React, { useCallback, useEffect, useState } from "react";
import Card from "./components/Card";
import logo from "../src/images/logo.svg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import axios from "axios";

// export const URL = 'http://127.0.0.1:8000';

export const URL = "https://project-x-production.up.railway.app";

const App = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getCard = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${URL}/app/v1/cards`);

      setLoading(false);
      setData(data);

      console.log(data);
    } catch (error) {
      setLoading(false);
      setError("Something Went Wrong");

      console.log(`error: `, error);
    }
  }, []);

  useEffect(() => {
    getCard();
  }, [getCard]);

  if (error) return <>{error}</>;

  console.log(data);

  return (
    <>
      <div className="container">
        <h2 className="heading">We are Offering Best Features</h2>
        <div className="text-box">
          <p className="text">
            BlueLight Health Envisions a World Where Living a Healthy Lifestyle
            Comes Naturally. You, as Part of Bluelight
          </p>
        </div>
        <ul className="lists">
          {loading && (
            <>
              <Skeleton height={544} width={391} />
              <Skeleton height={544} width={391} />
              <Skeleton height={544} width={391} />
              <Skeleton height={544} width={391} />
              <Skeleton height={544} width={391} />
              <Skeleton height={544} width={391} />
            </>
          )}

          {data &&
            data.data.map((el, i) => (
              <li key={i}>
                <Card
                  imageSrc={el.image}
                  logoSrc={logo}
                  title={el.title}
                  description={el.description}
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default App;
