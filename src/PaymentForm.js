import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import crypto from 'crypto-js';

const initiatorName = 'Иван.К';
const fundraiserName = 'Экскурсия';

function PaymentForm() {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvc: '',
        amount: '',
        name: '',
        message: '',
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateCard = (number) => {
        let sum = 0;
        let shouldDouble = false;
        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number[i]);
            if (shouldDouble) {
                if ((digit *= 2) > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateCard(formData.cardNumber.replace(/\s/g, ''))) {
            setStatus('Номер карты недействителен.');
            return;
        }

        const amount = parseInt(formData.amount, 10);
        if (amount < 10) {
            setStatus('Сумма должна быть не менее 10 рублей.');
            return;
        }

        setStatus('Отправка...');

        const transactionId = Date.now().toString();
        const apiKey = "316b2be8-3475-4462-bd57-c7794d4bdb53";
        const secret = "1234567890";
        const hashSum = crypto.SHA256(apiKey + transactionId + (amount * 100).toString() + secret).toString();

        const payload = {
            api_key: apiKey,
            transaction: transactionId,
            description: `${initiatorName} - ${fundraiserName}`,
            amount: amount,
            hash_sum: hashSum,
            custom_data: {
                initiator: initiatorName,
                fundraiser: fundraiserName,
            }
        };

        window.location.href = `/confirm?data=${encodeURIComponent(JSON.stringify(payload))}`;
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center' }}>Форма оплаты</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                    <label>Номер карты</label>
                    <InputMask
                        mask="9999 9999 9999 9999"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div>
                    <label>Дата (MM/ГГ)</label>
                    <InputMask
                        mask="99/99"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div>
                    <label>CVC</label>
                    <InputMask
                        mask="999"
                        name="cvc"
                        value={formData.cvc}
                        onChange={handleChange}
                        required
                        style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div>
                    <label>Сумма</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        min="10"
                        required
                        style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div>
                    <label>Имя</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        maxLength="50"
                        required
                        style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div>
                    <label>Сообщение</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        maxLength="50"
                        required
                        style={{ width: '100%', padding: '8px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }}>
                    Отправить
                </button>
            </form>
            <p style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>{status}</p>
        </div>
    );
}

export default PaymentForm;
