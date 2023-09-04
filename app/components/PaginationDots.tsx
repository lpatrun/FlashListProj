import React from 'react';
import { Animated, Dimensions, StyleSheet, View, ViewStyle } from 'react-native';
import { MINI_SPACING } from '../helpers/spacings';

const DEFAULT_WIDTH = 8;
const DEFAULT_MARGIN = 4;
const FULL_WIDTH = Dimensions.get('window').width;

export interface SlidingDotProps {
    containerStyle?: ViewStyle;
    dotStyle?: ViewStyle;
    numOfImages: number;
    scrollX: Animated.Value;
}

const PaginationDots = ({ containerStyle, dotStyle, numOfImages, scrollX }: SlidingDotProps) => {
    const maxValue = numOfImages * FULL_WIDTH;
    const maxWidth = numOfImages * (DEFAULT_WIDTH + 2 * DEFAULT_MARGIN) + DEFAULT_MARGIN;

    return (
        <View style={[styles.containerStyle, containerStyle]}>
            {new Array(numOfImages).fill('').map((_item, index) => (
                <View key={index} style={[styles.dotStyle, dotStyle]} />
            ))}

            <Animated.View
                style={[
                    styles.slidingIndicatorStyle,
                    {
                        transform: [
                            {
                                translateX: scrollX.interpolate({
                                    inputRange: [0, maxValue],
                                    outputRange: [DEFAULT_MARGIN, maxWidth],
                                }),
                            },
                        ],
                    },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        position: 'absolute',
        bottom: MINI_SPACING,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    slidingIndicatorStyle: {
        position: 'absolute',
        backgroundColor: '#ee3333',
        zIndex: 120,
        width: DEFAULT_WIDTH,
        height: DEFAULT_WIDTH,
        borderRadius: DEFAULT_WIDTH,
    },
    dotStyle: {
        backgroundColor: '#dddd33',
        width: DEFAULT_WIDTH,
        height: DEFAULT_WIDTH,
        borderRadius: DEFAULT_WIDTH,
        marginHorizontal: DEFAULT_MARGIN,
        zIndex: 10,
    },
});

export default PaginationDots;
