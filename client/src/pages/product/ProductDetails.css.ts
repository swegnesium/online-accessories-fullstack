import { style, globalStyle } from '@vanilla-extract/css'
import { vars } from '../../styles/themes.css'

export const detailsCard = style({
    margin: `${vars.space['3x']} 0`
})

export const adminPanel = style({
    border: "1px solid black",
    borderRadius: "10px",
    width: "23em",
    background: `${vars.colors.warning}`,
    textAlign: "center",
    margin: "0 auto"
})

export const detailsCardContent = style({
    paddingTop: `${vars.space['5x']}`,
    color: `${vars.colors.complementary}`
})

export const detailsLeftBox = style({
    height: "100%",
    width: "80%",
    borderRight: "1px grey outset",
    paddingRight: `${vars.space['3x']}`
})

export const detailsTitle = style({
    fontFamily: `${vars.fonts.brand}`,
    fontWeight: `${vars.fontWeights['bolder']}`
})

export const detailsPrice = style({
    fontWeight: `${vars.fontWeights.bold}`,
    fontSize: `${vars.fontSizes['5x']}`,
    border: "2px solid red",
    width: "5.5em",
    backgroundColor: `${vars.colors.primary}`
})

export const detailsManufacturer = style({
    fontWeight: `${vars.fontWeights.light}`
})

export const detailsDescription = style({
    margin: `${vars.space['2x']}`,
    width: "80%"
})