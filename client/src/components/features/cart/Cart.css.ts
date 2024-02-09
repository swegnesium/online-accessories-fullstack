import { style } from "@vanilla-extract/css";
import { vars } from "../../../styles/themes.css";

export const modalHeader = style({
    background: `${vars.colors.compTwo}`,
    color: `${vars.colors.complementary}`,
})

export const modalBody = style({
    background: `${vars.colors.compTwo}`,
    color: `${vars.colors.complementary}`,
})

export const modalFooter = style({
    background: `${vars.colors.compTwo}`,
    color: `${vars.colors.complementary}`,
})

export const cartItemBox = style({
    margin: "1rem",
    display: "inline-block",
    width: "90%"
})

export const cartTitles = style({
    marginBottom: "2rem"
})

export const cartTitle = style({
    borderBottom: "solid 0.5px white"
})

export const cartItem = style({
    listStyleType: "none"
})


export const productImage = style({
    height: "8rem",

})

export const cartProductQuantity = style({
    margin: "auto",
    textAlign: "center",
})

export const cartProductPrice = style({
    margin: "auto",
    textAlign: "center"
})

export const totalPrice = style({
    borderTop: "0.5px solid white",
    padding: "1rem"
})