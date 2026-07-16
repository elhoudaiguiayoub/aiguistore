import type { Product } from "../types/product";


import shortbleufront from "../assets/products/shortcasab1.png";
import shortbleuback from "../assets/products/shortcasab2.png";
import shortrosefront from "../assets/products/shortcasarose.jpeg";
import shortroseback from "../assets/products/shortcasarosec.png";
import shortrosemode1 from "../assets/products/shrs1.png";
import shortrosemode2 from "../assets/products/shrs2.png";
import shortrosemode3 from "../assets/products/shrs3.png";
import teeWhiteFront from "../assets/products/whitet-shirtb.png";
import teeWhiteBack from "../assets/products/whitet-shirtbd.png";
import teeBlackFront from "../assets/products/blacktshirtdv.png";
import teeBlackBack from "../assets/products/blacktshirtdo.png";
import teeroseFront from "../assets/products/rosetshirtdv.png";
import teeroseBack from "../assets/products/rosetshirtdo.png";
import shortblackback from "../assets/products/shortcasabdos.png";
import shortblackfront from "../assets/products/shortcasab3.png";
import shortgreenmode2 from "../assets/products/shgr1.png";
import shortgreenmode1 from "../assets/products/shgr.png";
import shortgreenback from "../assets/products/shortcasagreenn.png";
import shortgreenfront from "../assets/products/shortcasagreen.png";
import shortgreenmode3 from "../assets/products/shgr2.png";


  


export const products: (Product & { image: string })[] = [
 {
    id: "t-shirt-casablanca",
    name: "t-shirt casablanca",
    price: 45,
    category: "T-Shirts",
    image: teeWhiteFront,
    colors: [
      {
        name: "Blanc",
        hex: "#ffffff",
        images: [teeWhiteFront, teeWhiteBack],
      },
      {
        name: "Noir",
        hex: "#000000",
        images: [teeBlackFront, teeBlackBack],
      },
      {
        name: "Rose",
        hex: "#ff69b4",
        images: [teeroseFront, teeroseBack],
      }
    ],
  },
  { 
    id: "short-casablanca",
    name: "short casablanca",
    price: 45,
    category: "shorts",
    image: shortrosefront,
    colors: [
      {
        name: "Bleu-ciel",
        hex: "#178aae",
        images: [shortbleufront, shortbleuback],
      },
      {
        name: "Noir",
        hex: "#000000",
        images: [shortblackfront, shortblackback],
      },
      {
        name: "Rose",
        hex: "#ff69b4",
        images: [shortrosefront, shortroseback,shortrosemode1, shortrosemode2, shortrosemode3],
      },
      {
        name: "green",
        hex: "#027a3a",
        images: [shortgreenfront, shortgreenback, shortgreenmode1, shortgreenmode2, shortgreenmode3],
      }
    ],
  }, 
  
];
