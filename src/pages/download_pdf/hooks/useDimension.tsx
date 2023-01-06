import {useState, useEffect} from 'react'

export default function useDimension() {
    const [isWidthSmall, setisWidthSmall] = useState(false);
console.log(window.innerWidth)
  useEffect(() => {
    window.innerWidth < 767 ? setisWidthSmall(true) : setisWidthSmall(false);
    const onChange = (e: any) => {
      window.innerWidth < 767 ? setisWidthSmall(true) : setisWidthSmall(false);
    };
    window.addEventListener("resize", onChange);

    return () => window.removeEventListener("resize", onChange);
  }, []);
    return {isWidthSmall}
}
