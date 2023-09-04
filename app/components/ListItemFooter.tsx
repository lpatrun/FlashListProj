import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { PAGE_SPACING } from '../helpers/spacings';
import TimeAgo from '@andordavoti/react-native-timeago';

interface Props {
    likes: number;
    description: string;
    onLike: () => void;
    datePosted: number;
    bookmarked: boolean;
    onBookmarked: () => void;
    comments: number;
    reshares: number;
}

const ListItemFooter = ({
    likes,
    description,
    onLike,
    datePosted,
    bookmarked,
    onBookmarked,
    comments,
    reshares,
}: Props) => {
    return (
        <View style={styles.wrapper}>
            <View style={styles.actionBar}>
                <View style={styles.elemAction}>
                    <Pressable onPress={onLike} hitSlop={10}>
                        <Image style={styles.actionButton} source={require('../assets/like.png')} />
                    </Pressable>
                    <Text style={styles.actionText}>{likes}</Text>
                </View>
                <View style={styles.elemAction}>
                    <Image style={styles.actionButton} source={require('../assets/retweet.png')} />
                    <Text style={styles.actionText}>{reshares}</Text>
                </View>
                <View style={styles.elemAction}>
                    <Image style={styles.actionButton} source={require('../assets/comment.png')} />
                    <Text style={styles.actionText}>{comments}</Text>
                </View>
                <Image style={styles.actionButton} source={require('../assets/share.png')} />
                <Pressable onPress={onBookmarked} hitSlop={15}>
                    {bookmarked ? <Text>&#x278A;</Text> : <Text>&#x2780;</Text>}
                </Pressable>
            </View>
            <Text>{description}</Text>
            <TimeAgo dateTo={new Date(datePosted)} />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: PAGE_SPACING,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionBar: {
        marginBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        width: 18,
        height: 18,
        marginRight: 8,
    },
    elemAction: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    actionText: {
        fontSize: 12,
        color: '#444',
    },
});

export default ListItemFooter;
