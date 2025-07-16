import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AppTheme } from '@/src/constants/colorSchemes/theme';
import styles from './styles';

interface SubtitleProps {
  name: string;
  style?: object;
}

export const Subtitle: React.FC<SubtitleProps> = ({ name, style }) => {
  const { colors } = useTheme() as AppTheme;
  
  return (
    <Text style={[styles.subtitulo, { color: colors.second_text }, style]}>
      {name}
    </Text>
  );
};