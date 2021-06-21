import React, {memo,Profiler} from 'react';
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
function callBack(...arg:any) {
    console.log(arg[2])
}
function App() {
  return (
    <div className="App">
        <Profiler id={'test'} onRender={callBack}>
            <VirtualList
                itemCount={10000}
                height={300}
                childHeight={30}
                Item={Item}
            />
        </Profiler>
    </div>
  );
}

export default App;
