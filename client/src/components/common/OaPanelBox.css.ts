import { style } from "@vanilla-extract/css";
import { vars } from "../../styles/themes.css";

export const panelBox = style({
    width: "100%",
    backgroundColor: `${vars.colors.grey600}`,
    borderRadius: "5px",
    margin: "1em",
    border: "black solid 1px",

})

export const boxContent = style({
    display: "flex",
    textAlign: "left"
})

export const modalBox = style({
    textAlign: "center",
})

export const modalHeader = style({
    background: `${vars.colors.compTwo}`,
    color: `${vars.colors.complementary}`,

})

export const modalTitle = style({
    margin: "auto"
})

export const modalBody = style({
    background: `${vars.colors.compTwo}`,
    color: `${vars.colors.complementary}`
})

export const modalFooter = style({
    background: `${vars.colors.compTwo}`,
    color: `${vars.colors.complementary}`,
})
export const modalFooterText = style({
    margin: "auto"
})

export const title = style({
    margin: `${vars.space["2x"]}`,
    width:"85%"
})

export const button = style({
    width: "15%",

})