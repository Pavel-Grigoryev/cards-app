import React from 'react'
import noSort from './noSort.svg'
import up from './up.svg'
import down from './down.svg'


// добавить в проект иконки и импортировать
const downIcon = down
const upIcon = up
const noneIcon = noSort

export type SuperSortPropsType = {
    id?: string
    sort: string
    value: string
    onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
    // пишет студент,
    //sort: (click) => down (click) => up (click) => '' (click) => down ...
    console.log(sort)

    switch (sort[0]) {
        case undefined:
            return down
        case '1':
            return up
        default:
            return ''
    }
}

const SuperSort: React.FC<SuperSortPropsType> = (
    {
        sort, value, onChange, id = 'hw15',
    }
) => {
    const up = '0' + value
    const down = '1' + value

    const onChangeCallback = () => {
        onChange(pureChange(sort, down, up))
    }

    const icon = sort === down
        ? downIcon
        : sort === up
            ? upIcon
            : noneIcon

    return (
        <span
            id={id + '-sort-' + value}
            onClick={onChangeCallback}
        >
            <img
                id={id + '-icon-' + sort}
                src={icon}
            />
        </span>
    )
}

export default SuperSort
