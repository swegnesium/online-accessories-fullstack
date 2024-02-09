import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/themes.css';

export const TopFooter = style({
    color: vars.colors.complementary,
    background: vars.colors.grey600,
    padding: vars.space["3x"],
    borderTop: `1px solid ${vars.colors.grey600}`,
    textAlign: "center"
})

export const TopFooterContent = style({
    content: "",
    display: "inline",
    clear: "both",
})

export const TopFooterNav = style({
    float: "left",
    width: "33.33%"
})

export const NavStyling = style({
    listStyleType: "none",
})

export const navLink = style({
    color: vars.colors.complementary,
    fontSize: vars.fontSizes["3x"],
    textTransform: "uppercase",
    transition: "0.2s ease-in",
    textDecoration: "none",
  
    ":hover": {
      color: vars.colors.brand
    }
})

export const socialBox = style({
    display: "inline-block",
    alignContent: "center",
    alignItems: "center",
    margin: "auto"
})

export const socialLink = style({
    transition: "0.2s ease-in",
    listStyleType: "none",
    float: "right",
    margin: "1rem",
    width: "5em",


    ":hover": {
        color: vars.colors.brand
      }
})