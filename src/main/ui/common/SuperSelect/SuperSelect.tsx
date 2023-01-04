import React, {
    SelectHTMLAttributes,
    DetailedHTMLProps,
    ChangeEvent, useState,
} from 'react'
import s from './SuperSelect.module.css'

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
    placeholder?: string
}

const SuperSelect: React.FC<SuperSelectPropsType> = ({
                                                         options,
                                                         className,
                                                         onChange,
                                                         onChangeOption,
                                                         placeholder,
                                                         ...restProps
                                                     }) => {
    const [active, setActive] = useState(false);

    const mappedOptions: any[] = options
        ? options.map((o) => (
            <option
                id={'hw7-option-' + o.id}
                className={s.option + ' ' + (active ? s.active : '')}
                key={o.id}
                value={o.id}
            >
                {o.value}
            </option>
        ))
        : [] // map options with key

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChangeOption) {
            onChangeOption(+e.currentTarget.value);
        }
        if (onChange) {
            onChange(e);
        }
    }

    const finalSelectClassName = s.select +
        (className ? ' ' + className : '');

    return (
        <div className={s.selectWrapper + ' ' + (active ? s.active : '')}>
            <select
                className={finalSelectClassName}
                onChange={onChangeCallback}
                {...restProps}
                onClick={() => (setActive(!active))}
            >
                {placeholder && <option value='0' disabled selected hidden>{placeholder}</option>}
                {mappedOptions}
            </select>
        </div>
    )
}

export default SuperSelect
