import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/themes.css';

export const navlink = style({
  display: "inline-block",
  textDecoration: "none",
  margin: vars.space['1x'],
  padding: vars.space['1x'],
  color: vars.colors.primary,
  backgroundColor: "red",
  borderRadius: 0,
  border: `1px ${vars.colors.complementary} solid`,
  textTransform: "uppercase",
  fontFamily: vars.fonts.brand,
  fontWeight: vars.fontWeights.bolder,
  textAlign: "center",
  verticalAlign: "middle",
  minHeight: 0,

  ":hover": {
    color: vars.colors.complementary,
    backgroundColor: vars.colors.error,
    border: `1px ${vars.colors.complementary} solid`,
  }
})