import {Helper} from "./Helper";

export type IActivity = {
    id: bigint
    name: string
    price: number
}

export function Activity(props: { activity: IActivity, onChange: () => void, isChecked: boolean }) {
    const {id, name, price} = props.activity

    return <div className="activities-list-item">
        <div className="left-section">
            <input
                type="checkbox"
                id={`custom-checkbox-${id}`}
                name={name}
                value={name}
                onChange={props.onChange}
                checked={props.isChecked}
            />
            <label htmlFor={`custom-checkbox-${id}`}>{name}</label>
        </div>
        <div className="right-section">{Helper.getFormattedPrice(price)}</div>
    </div>;
}
