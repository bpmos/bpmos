import React from 'react';
import { Config } from '../../bpmos-config';

export function Home(config: Config) {

    var items = config.packages.map(function (p) {
        return <li>
            <a href="/{p.name}"> {p.name} </a>
            {
                config.builders.map(b => {
                    return <button>Gerar {p.name} </button>;
                })
            }
        </li>;
    });

    return <html>
        <body>
            <ul>
                {items}
            </ul>
        </body>
    </html>;
}