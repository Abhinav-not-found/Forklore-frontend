import React from 'react'

const Test = () => {
    return (
        <div>
            <button popovertarget='popup'>Click</button>
            <div id='popup' popover >
                this is a popup
            </div>
        </div>
    )
}

export default Test
