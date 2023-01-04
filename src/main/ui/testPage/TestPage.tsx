import React, {useState} from 'react';
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import SuperButton from "../common/SuperButton/SuperButton";
import SuperEditableSpan from "../common/SuperEditableSpan/SuperEditableSpan";
import SuperInputText from "../common/SuperInputText/SuperInputText";
import SuperPagination from "../common/SuperPagination/SuperPagination";
import SuperRadio from "../common/SuperRadio/SuperRadio";
import SuperRange from "../common/SuperRange/SuperRange";
import SuperSelect from "../common/SuperSelect/SuperSelect";
import SuperSort from "../common/SuperSort/SuperSort";

export const TestPage = () => {

    const [stateForAllInputs, setStateForAllInputs] = useState<string>('');

    const [value, setValue] = useState<number>(1);


    const arr = [
        { id: 1, value: '1' },
        { id: 2, value: '2' },
        { id: 3, value: '3' },
    ]

    return (
        <div>
            <SuperCheckbox/>
            <SuperButton> Button </SuperButton>
            <SuperEditableSpan value={"Edit text"}/>
            <SuperInputText value={stateForAllInputs}
                            onChange={(e) => setStateForAllInputs(e.currentTarget.value)}/>
            <SuperPagination page={1} itemsCountForPage={3} totalCount={10} onChange={() => {}}/>
            <SuperRadio options={arr}
                        value={value}
                        onChangeOption={setValue}/>
            <SuperRange/>
            <SuperSelect options={arr}
                         value={value}
                         placeholder={'Select'}
                         onChangeOption={setValue}/>
            <SuperSort sort={"sort"} value={'developer'} onChange={()=>{}}/>
        </div>
    );
};

