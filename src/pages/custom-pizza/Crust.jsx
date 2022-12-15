import React, { useState } from 'react'

const Crust = () => {
    const [crusts, setCrusts] = useState(["Original", "Stuffed", "Widd"]);
    const [selected, setSelected] = useState(null);

    return (
        crusts.map((crust, index) => (
            <div key={index}><h1>{crust}</h1></div>
        ))
    )
}

export default Crust