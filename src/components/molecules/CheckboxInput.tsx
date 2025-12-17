import styles from './CheckboxRadioInput.module.css';

interface Props {
    name: string;
    value: string;
    checked?: boolean;
    label?: string;
    onChange?: ( value: string ) => void;
}

export default function CheckboxInput({ name, value, checked, label, onChange }: Props) {

    const handleChange = () => {

        if (onChange) {
            onChange(value );
        }
    };

    return (<>
        <label className={`${styles.label} ${checked ? styles.checked : ''}`}>
            <input
                type="checkbox"
                name={name}
                value={value}
                checked={ checked }
                onChange={handleChange}
            />
            { label }
        </label>
    </>);
}