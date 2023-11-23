import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import Modal from "./Modal";
const API = import.meta.env.VITE_API_URL;
function ChartBar() {
  const Selector = useSelector((state) => state.users);

  const [Data, setData] = useState([]);
  const [IsLogin, setLogin] = useState(true);
  const [IsGet, setGet] = useState(true);

  useEffect(() => {
    if (Selector.length <= 0) {
      setLogin(true);
    } else {
      setLogin(false);
      getData();
    }
  }, []);

  async function getData() {
    await axios({
      method: "get",
      maxBodyLength: Infinity,
      url: API,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        setData(response.data);
        setTimeout(() => {
          setGet(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ratings for the Products by Price",
      },
    },
  };

  const labels = Data.map((data) => data.price);

  const data = {
    labels,
    datasets: [
      {
        label: "Men's Clothing",
        data: Data.map((rate) => {
          if (rate.category === "men's clothing") {
            return rate.rating.rate;
          } else {
            return 0;
          }
        }),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Jewelry",
        data: Data.map((rate) => {
          if (rate.category === "jewelery") {
            return rate.rating.rate;
          } else {
            return 0;
          }
        }),
        backgroundColor: "rgb(139, 118, 255,0.5)",
      },

      {
        label: "Electronic",
        data: Data.map((rate) => {
          if (rate.category === "electronics") {
            return rate.rating.rate;
          } else {
            return 0;
          }
        }),
        backgroundColor: "rgb(122, 255, 96,0.5)",
      },
      {
        label: "Women' Clothing",
        data: Data.map((rate) => {
          if (rate.category === "women's clothing") {
            return rate.rating.rate;
          } else {
            return 0;
          }
        }),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      {IsLogin ? (
        <Modal setLogin={setLogin} />
      ) : IsGet ? (
        <div className="spinner-loader">
          <div
            className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>

          <p className="loading-let">Loading...</p>
        </div>
      ) : (
        <div className="bar-graph-container">
          <Bar options={options} data={data} />
        </div>
      )}
    </>
  );
}

export default ChartBar;
