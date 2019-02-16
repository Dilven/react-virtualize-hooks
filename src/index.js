import React, { useState } from "react";
import ReactDOM from "react-dom";
import mock from "./data.generated.json";
import useUserCrawling from "./useUserCrawling";
import "./styles.css";

const elmentHeight = 30;

function useVirtualize(data, h) {
  const [offset, setOffset ] = useState(0);
  const start = Math.floor(offset / h);


  return [
    data.slice(start, start * 15),
    offset => {
      setOffset(Math.max(0, offset));
    },
    { height: `${data.length * h}px` }
  ]
}

function List({ initialData }) {
  // const data = useUserCrawling(initialData);

  const [ data, setOffset, styles ] = useVirtualize(initialData, elmentHeight)

  
  const handleScroll = e => {
    setOffset(e.target.scrollTop);
  };

  return (
    <div className="App">
      <div className="wrapper" onScroll={handleScroll}>
        <div className="container" style={styles}>
          {data.map(i => (
            <div key={i.name} className="row">
              <img src={i.avatar} />
              <span>{i.name}</span>
              <span>{i.country}</span>
              <span>{i.lastSeen}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const data = useUserCrawling(mock);
  return <List initialData={data} />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
