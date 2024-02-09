import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../styles/themes.css'


export const userNav = style({
    fontSize: "0.9 rem",
    fontStyle: "italic",
    marginTop: "1rem",
    paddingTop: "1rem",

    
});

globalStyle(`${userNav} a`, {
    textDecoration: "none",
    color: vars.colors.brand
    }
);
globalStyle(`${userNav} a:hover`, {
    textDecoration: "underline",
    color: vars.colors.brandDark
    }
);

export const background = style({

})

export const glowContainer = style({

})