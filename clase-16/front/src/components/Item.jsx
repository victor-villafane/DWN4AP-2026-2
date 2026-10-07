import React from 'react'

export default function Item({cryptos, setSelected}) {
    return (
        cryptos.map(crypto => (
            <tr key={crypto.symbol} onClick={ () => setSelected(crypto) }>
                <td className="p-3 text-md bg-gray-100" >
                    <img width="100px" src={crypto.icon_url} alt="" />
                </td>
                <td className="p-3 text-md bg-gray-100" >{crypto.symbol}</td>
                <td className="p-3 text-md bg-gray-100" >{crypto.name}</td>
                <td className="p-3 text-md bg-gray-100" >{crypto.name_full}</td>
                <td className="p-3 text-md bg-gray-100" >{crypto.max_supply}</td>
            </tr>
        ))
    )
}
