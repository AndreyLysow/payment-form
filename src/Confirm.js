import React from 'react';
import { useLocation } from 'react-router-dom';

function Confirm() {
    const query = new URLSearchParams(useLocation().search);
    const data = JSON.parse(decodeURIComponent(query.get('data')));

    return (
        <div>
            <h2>Подтверждение платежа</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default Confirm;
