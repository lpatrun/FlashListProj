import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BASIC_SPACING, MINI_SPACING, PAGE_SPACING } from '../helpers/spacings';

interface Props {
    ownerIcon: string;
    owner: string;
}

const ListItemHeader = ({ ownerIcon, owner }: Props) => {
    return (
        <View style={styles.container}>
            <Image width={20} height={20} source={{ uri: ownerIcon }} style={styles.image} />

            <Text>{owner}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: MINI_SPACING,
        paddingHorizontal: PAGE_SPACING,
        paddingBottom: BASIC_SPACING,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginTop: MINI_SPACING,
    },
    image: {
        borderRadius: 16,
    },
});

export default ListItemHeader;
