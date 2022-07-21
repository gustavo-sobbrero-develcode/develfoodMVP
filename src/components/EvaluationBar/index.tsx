import theme from '@global/styles/theme';
import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

export function EvaluationBar({childToParent}: any) {
  const [defaultRating, setDefaultRating] = useState<number>(0);
  const [maxRating] = useState([1, 2, 3, 4, 5]);

  return (
    <View style={styles.ratingBarStyle}>
      {maxRating.map((item, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => {
              setDefaultRating(item);
              childToParent(item);
            }}>
            <Image
              style={styles.starImageStyle}
              source={
                item <= defaultRating
                  ? theme.images.star
                  : theme.images.starEmpty
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
  },
});
