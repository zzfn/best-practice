import React, {memo} from 'react';
import logo from './logo.svg';
import './App.css';
import VirtualList from "./virtual-list";
const Item = memo(({ index }:any) => (
    <div
        style={{
            height: 30,
            lineHeight: "30px",
            display: "flex",
            justifyContent: "space-between",
            padding: "0 10px"
        }}
        id={index}
        className="row"
        key={index}
    >
        <img
            alt={index}
            src={`https://picsum.photos/id/${(index % 10) + 1}/200/300`}
        />
        row index {index}
    </div>
));
function App() {
  return (
    <div className="App">
        <VirtualList
            itemCount={10000}
            height={300}
            childHeight={30}
            Item={Item}
        />
    </div>
  );
}

export default App;
