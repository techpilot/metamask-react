import { Radio } from 'antd'
import React, {useState} from 'react'
import CryptoPaymentsForm, { CHAIN_IDS } from '../../components/CryptoPaymentsForm'

const Practice = () => {
    const currencyOptions = [
        {
            name: CHAIN_IDS.ETHEREUM.NAME,
            value: CHAIN_IDS.ETHEREUM.CURRENCY_CODE
        },
        {
            name: CHAIN_IDS.BINANCE.NAME,
            value: CHAIN_IDS.BINANCE.CURRENCY_CODE
        }
    ]

    const networkOptions = [
        {
            value: "testnet",
        },
        {
            value: "mainnet",
        }
    ]

    const [currency, setCurrency] = useState(currencyOptions[0].value);
    const [network, setNetwork] = useState(networkOptions[0].value);

    const selectCurrency = (
        <Radio.Group value={currency} onChange={(event) => setCurrency(event.target.value)} optionType="button" buttonStyle='solid'>
            {currencyOptions.map((currencyOption) => (
                <Radio.Button key={currencyOption.value} value={currencyOption.value}>
                    {currencyOption.name}
                </Radio.Button>
            ))}
        </Radio.Group>
    )

    const selectNetwork = (
        <Radio.Group value={network} onChange={(event) => setNetwork(event.target.value)} optionType="button" buttonStyle='solid'>
            {networkOptions.map((networkOption) => (
                <Radio.Button key={networkOption.value} value={networkOption.value}>
                    {networkOption.value}
                </Radio.Button>
            ))}
        </Radio.Group>
    )

    return (
        <div className="my-3">
            <div className="pl-5 ml-5">
                {selectCurrency} <br /> 
                <br />
                {selectNetwork} <br />
            </div>

            <CryptoPaymentsForm currency={currency} isTestNet={network === "testnet"} />
        </div>
    )
}

export default Practice
