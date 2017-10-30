export const dominant = '#264A43'
export const tonic = '#DDFF31'
export const white= '#fff';
export const black= '#000';

const themeDominant = {
  dark: '#132521',
  medium: '#4A7069',
  light: '#7DA196',
  extraLight: '#B9CBC6'
}

const themeTonic = {
  darkGrey: '#949493',
  mediumGrey: '#B8B8B7',
  lightGrey: '#DCDDDA',
  pureWhite: '#FFFFFF'
}

const palettes = {
  dominant: themeDominant,
  tonic: themeTonic
}

export const getColor = (color, theme = 'dominant') =>
  palettes[theme][color]

let dominantRGBA = [38, 74, 67]
let rgba = {
  dominant: dominantRGBA
}

export const getColorRGBA = (color = 'dominant', transparency = 1) =>
  `rgba(${rgba[color].join(',')}, ${transparency})`
