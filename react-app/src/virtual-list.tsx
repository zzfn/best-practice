import {useState, Profiler, useRef, useEffect} from "react";
import type{UIEvent} from 'react'
import styles from './list.module.css'


const callback = (id: any, phase: any, actualDuration: any, baseDuration: any, startTime: any, commitTime: any) => {
    console.log(`${id}'s ${phase} phase:`);
    console.log(`Actual time: ${actualDuration}`);
    console.log(`Base time: ${baseDuration}`);
    console.log(`Start time: ${startTime}`);
    console.log(`Commit time: ${commitTime}`);
}

function VirtualList() {

    function generate() {
        setList(Array.from({length: 10000}).map((_, idx) => idx))
        setBox(Array.from({length: 10000}).map((_, idx) => idx).slice(0,10))
    }
    const [list, setList] = useState<number[]>([])
    const [box, setBox] = useState<number[]>([])
    const vRef = useRef(null)
    useEffect(()=>{
        (vRef.current as any).addEventListener('scroll', handleScroll, false)
    },[list])
    function handleScroll(e: any) {
        if(e.target.clientHeight+e.target.scrollTop===e.target.scrollHeight){
            console.log(list.slice(11,20))
            setBox(list.slice(11,20))
        }
    }
    return (
        <div>
            {list.length}
            <h3>Creat large of DOMs：</h3>
            <button onClick={generate}>Create Simple DOMs</button>
            <Profiler id={'test'} onRender={callback}>
                <ul ref={vRef} className={styles.ul}>
                    <div >
                        {box.length}
                        {box.map(item => <li className={styles.li} key={item}>{item}</li>)}
                    </div>
                </ul>
            </Profiler>

        </div>
    );
}

export default VirtualList;