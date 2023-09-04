import React, { useRef } from 'react';
import {
    Animated,
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';

import { PAGE_SPACING } from '../helpers/spacings';
import InstaImageZoom from './InstaImageZoom';
import { Spacing } from './ListItem';
import PaginationDots from './PaginationDots';

const FULL_WIDTH = Dimensions.get('window').width;
const PHONE_WIDTH = FULL_WIDTH - 2 * PAGE_SPACING;
const WIDTH = PHONE_WIDTH;
const HEIGHT = 500;

interface Props {
    id: string;
    images: string[];
    scrollTo: number;
    owner: string;
    onScroll: (index: number) => void;
}

const ListItemSwiper = ({ id, images, scrollTo, owner, onScroll }: Props) => {
    const scrollViewRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const scrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offset = (event.nativeEvent.contentOffset.x / FULL_WIDTH) % 1;

        if (offset > 0.999 || offset === 0 || offset < 0.001) {
            const index = Math.round(event.nativeEvent.contentOffset.x / FULL_WIDTH);

            onScroll(Math.max(0, index));
            scrollX.setValue(index * FULL_WIDTH);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentOffset={{ x: scrollTo * FULL_WIDTH, y: 0 }}
                bounces={false}
            >
                {images.map(image => (
                    <View style={styles.imageWrapper} key={image + id + owner}>
                        <InstaImageZoom imageSource={{ uri: image }} />
                    </View>
                ))}
            </ScrollView>

            {images.length > 1 && (
                <>
                    <Spacing spacing={2} />
                    <PaginationDots numOfImages={images.length ?? 0} scrollX={scrollX} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#ffeeee',
        borderBottomColor: '#ffeeee',
    },
    image: {
        borderRadius: 15,
        width: WIDTH,
        height: HEIGHT,
    },
    imageWrapper: {
        width: FULL_WIDTH,
        paddingHorizontal: PAGE_SPACING,
        overflow: 'hidden',
        alignItems: 'center',
    },
});

export default ListItemSwiper;
