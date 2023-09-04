import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { Pokemon } from '../../data';
import ListItemFooter from './ListItemFooter';
import ListItemHeader from './ListItemHeader';
import ListItemSwiper from './ListItemSwiper';
import { MINI_SPACING } from '../helpers/spacings';

export const Spacing = ({ spacing }: { spacing: number }) => (
    <View style={{ height: spacing * 5 }} />
);

interface Props {
    item: Pokemon;
    index: number;
    setPokemonData: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}

const ListItem = ({ item, index, setPokemonData }: Props) => {
    const setData = (newItem: Pokemon) => {
        setPokemonData(prev => {
            const newArray = [...prev];
            newArray.splice(index, 1, newItem);
            return newArray;
        });
    };

    const onLike = () => {
        const newItem: Pokemon = { ...item, likes: item.likes + 1 };
        setData(newItem);
    };

    const onBookmarked = () => {
        const bookmarked = !item.bookmarked;
        const newItem: Pokemon = { ...item, bookmarked };
        setData(newItem);
    };

    const onScroll = (newImageIndex: number) => {
        const newItem: Pokemon = { ...item, imageIndex: newImageIndex };
        setData(newItem);
    };

    return (
        <View style={styles.container}>
            <ListItemHeader owner={item.owner} ownerIcon={item.ownerIcon} />

            <Spacing spacing={5} />

            <ListItemSwiper
                id={item.id}
                images={item.images}
                scrollTo={item.imageIndex}
                owner={item.owner}
                onScroll={onScroll}
            />
            <Spacing spacing={5} />

            <ListItemFooter
                likes={item.likes}
                onLike={onLike}
                description={item.description}
                datePosted={item.datePosted}
                bookmarked={item.bookmarked}
                onBookmarked={onBookmarked}
                comments={Math.ceil(Math.random() * 10)}
                reshares={Math.ceil(Math.random() * 10)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: MINI_SPACING,
    },
});

//for FlashList
export default ListItem;

//for FlatList
/* export default memo(
    ListItem,
    (prev, next) =>
        prev.item.id === next.item.id &&
        prev.item.likes === next.item.likes &&
        prev.item.bookmarked === next.item.bookmarked
);
 */
