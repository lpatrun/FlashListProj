import React, { useCallback, useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ListItem from './app/components/ListItem';
import { Pokemon, data } from './data';
import { FlashList, useBenchmark } from '@shopify/flash-list';

if (__DEV__) {
    const { connectToDevTools } = require('react-devtools-core');
    connectToDevTools({
        host: 'localhost',
        port: 8097,
    });
}

const ITEM_SIZE = 313;

function App(): JSX.Element {
    const [pokemonData, setPokemonData] = useState(data);

    //for FlashList
    const renderItem = ({ item, index }: { item: Pokemon; index: number }) => (
        <ListItem item={item} index={index} setPokemonData={setPokemonData} />
    );

    //for FlatList
    const renderPokemon = useCallback(
        ({ item, index }: { item: Pokemon; index: number }) => (
            <ListItem item={item} index={index} setPokemonData={setPokemonData} />
        ),
        []
    );

    //for FlashList
    /* const ref = useRef<FlashList<Pokemon>>(null);
    const [blankAreaTracker] = useBenchmark(ref, res => {
        if (!res.interrupted) {
            Alert.alert('Blank area', res.formattedString);
        }
    }); */

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle='dark-content' />
                {/*  <FlashList
                    //ref={ref}
                    //onBlankArea={blankAreaTracker}
                    data={pokemonData}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    estimatedItemSize={ITEM_SIZE}
                    estimatedListSize={{
                        height: Dimensions.get('screen').height,
                        width: Dimensions.get('screen').width,
                    }}
                /> */}
                <FlatList
                    data={pokemonData}
                    keyExtractor={item => item.id}
                    renderItem={renderPokemon}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={Divider}
                    windowSize={10}
                    maxToRenderPerBatch={12}
                    getItemLayout={(_, index) => ({
                        length: ITEM_SIZE,
                        offset: ITEM_SIZE * index,
                        index,
                    })}
                />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}

export const Divider = () => {
    return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    divider: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#DDD',
    },
});

export default App;
