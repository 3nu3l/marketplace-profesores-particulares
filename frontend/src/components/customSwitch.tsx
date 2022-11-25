import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function CustomSwitch() {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <Switch
        checked={checked}
        onChange={handleChange}
        />
    );
}