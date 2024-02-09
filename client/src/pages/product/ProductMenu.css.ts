import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/themes.css'

export const hardwareHeading = style({
    marginTop: "2em",
    color: `${vars.colors.complementary}`
})

export const filterButtons = style({
    display: "flex",

})

export const searchBar = style({
    width: "100%"
})