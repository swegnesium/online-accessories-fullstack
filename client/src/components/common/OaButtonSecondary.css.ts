import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/themes.css';

export const button = style({
  margin: vars.space['1x'],
  padding: vars.space['1x'],
  color: vars.colors.complementary,
  backgroundColor: vars.colors.primary,
  borderRadius: 5,
  border: `1px ${vars.colors.brand} solid`,
  textTransform: "uppercase",
  fontFamily: vars.fonts.brand,
  fontWeight: vars.fontWeights.bolder,
  textAlign: "center",

  ":hover": {
    color: vars.colors.complementary,
    backgroundColor: vars.colors.error,
    border: `1px ${vars.colors.complementary} solid`,
  }
})