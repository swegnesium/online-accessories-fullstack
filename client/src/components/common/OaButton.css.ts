import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/themes.css';

export const button = style({
  margin: vars.space['1x'],
  padding: vars.space['1x'],
  color: vars.colors.complementary,
  background: vars.colors.primary,
  border: `2px ${vars.colors.brandDark} solid`,
  borderRadius: 5,
  textTransform: "uppercase",
  fontFamily: vars.fonts.brand,
  fontWeight: vars.fontWeights.bolder,
  textAlign: "center",
  transition: "0.5s ease-in-out",

  ":hover": {
    color: vars.colors.primary,
    background: vars.colors.complementary,
    border: `2px ${vars.colors.brandDark} solid`,
    transition: "0.5s ease-in-out"
  }
})