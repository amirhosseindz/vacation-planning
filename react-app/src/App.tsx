import {useEffect, useState} from "react";
import "./App.css";
import {Activity, IActivity} from "./Activity";
import {Helper} from "./Helper";

export default function App() {
    const [activities, setActivities]     = useState<IActivity[]>([]);
    const [total, setTotal]               = useState<number>(0);
    const [checkedState, setCheckedState] = useState<boolean[]>([]);

    const fetchData = async () => {
        const response = await fetch("activities.json")
        const data     = await response.json()

        setActivities(data)
        setCheckedState(new Array(data.length).fill(false))
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleOnChange = (position: number): void => {
        const updatedCheckedState = checkedState.map((item: boolean, index: number) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState)

        const totalPrice = updatedCheckedState.reduce((sum: number, checked: boolean, index: number): number =>
            checked ? sum + activities[index].price : sum
        , 0);

        setTotal(totalPrice)
    }

    return (
        <div className="App">
            <h3>Select Activities</h3>
            <ul className="activities-list">
                {activities.map((activity: IActivity, index: number) => {
                    return (
                        <li key={index}>
                            <Activity activity={activity} onChange={() => handleOnChange(index)}
                                      isChecked={checkedState[index]}/>
                        </li>
                    );
                })}
                <li>
                    <div className="activities-list-item">
                        <div className="left-section">Total:</div>
                        <div className="right-section">{Helper.getFormattedPrice(total)}</div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
