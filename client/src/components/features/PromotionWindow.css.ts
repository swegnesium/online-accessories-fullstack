import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/themes.css';

export const PromotionDiv = style({
    textAlign: "center",
    alignContent: "center",
    padding: vars.space['5x']
})

export const PromotionWindow = style({
    border: "solid red",
    margin: "0 auto",
    borderRadius: "5px",
    backgroundColor: `${vars.colors.complementary}`
})

export const PromotionText = style({
    color: "red"
})