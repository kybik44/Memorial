import { useMediaQuery } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { TextVariants } from "../components/atoms/text/Text";
import { theme } from '../core/theme';

const useScreenSize = () => {
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const isLargeScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const isMaxScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('xl'));

  return { isSmallScreen, isMediumScreen, isLargeScreen, isMaxScreen };
}

const getFontValue = (value: string): number => Number(value?.replace("px", ""))

export const getFontSizes = (variant: TextVariants) => {

  const { isSmallScreen, isMediumScreen, isLargeScreen, isMaxScreen } = useScreenSize();
  const { fontSize, lineHeight } = theme.typography[variant];

  const smallTitleCondition = variant === 'h1' || variant === 'h2';

  const getAdjustedValue = (value: string): string => {
    if (isSmallScreen && smallTitleCondition) return `${getFontValue(value) * 0.37}px`;
    if (isSmallScreen) return `${getFontValue(value) * 0.45}px`;
    if (isMediumScreen) return `${getFontValue(value) * 0.6}px`;
    if (isLargeScreen) return `${getFontValue(value) * 0.8}px`;
    if (isMaxScreen) return `${getFontValue(value) * 0.9}px`;
    return value;
  }

  const adjustedFontSize = getAdjustedValue(fontSize as string);
  const adjustedLineHeight = getAdjustedValue(lineHeight as string);



  return { adjustedFontSize, adjustedLineHeight }
}