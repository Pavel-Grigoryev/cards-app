import React from 'react'
import {Slider, SliderProps} from '@mui/material'

const SuperRange: React.FC<SliderProps> = (props) => {
    return (
        <Slider
            sx={{ // стили для слайдера // пишет студент
                color: 'var(--palette-vivid-malachite)',
                '& .MuiSlider-rail': {
                    color: 'var(--palette-philippine-gray)'
                },
                '& .MuiSlider-thumb': {
                    color: 'var(--palette-white)',
                    border: '1px solid var(--palette-vivid-malachite)'
                },
                '& .MuiSlider-thumb::before':  {
                    content: '""',
                    position: 'absolute',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--palette-vivid-malachite)'
                }

            }}
            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange
