import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import React, { useState } from 'react'

const CheckboxButtons = ({ items, checked, onChange }) => {
    const [checkedItems, setCheckedItems] = useState(checked || []);

    function handleChecked(value) {
        const currentIndex = checkedItems.findIndex(item => item === value);
        let newChecked = [];
        if (currentIndex === -1) newChecked = [...checkedItems, value];
        else newChecked = checkedItems.filter(item => item !== value);
        setCheckedItems(newChecked);
        onChange(newChecked);
    }

    return (
        <FormGroup>
            {items.map(item => (
                <FormControlLabel
                    control={<Checkbox
                        checked={checkedItems.indexOf(item) !== -1}
                        onClick={() => handleChecked(item)}
                    />}
                    label={item}
                    key={item}
                />
            ))}
        </FormGroup>
    )
}

export default CheckboxButtons