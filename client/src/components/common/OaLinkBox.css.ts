import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const LinkBoxTitle = style({
    position: 'absolute',
    color: 'white',
    top: '5px',
    left: '10px',

})

export const LinkBox = style({
    height: '200px',
    width: '200px',
    border: 'solid black',
    borderRadius: '20px',
    overflow: 'hidden',

    transition: `all .2s ease-in-out`,
    ':hover': {
        transform: `scale(1.1)`,
    },

    selectors: {
        [`${LinkBoxTitle}:hover &`]: {
            visibility: 'visible'
        }
    }
})

export const LinkBoxContent = style({
    textAlign: 'center',
    objectFit: 'fill',
    position: 'relative'
})

export const LinkBoxImage = style({
    height: '200px',
    width: '200px',
    // ':hover': {
    //     filter: `blur(2px)`
    // }
})

