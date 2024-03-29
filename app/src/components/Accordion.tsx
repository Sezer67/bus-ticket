import React, { useEffect, useState } from 'react';
import { LayoutAnimation, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

type PropsType = {
    title: React.ReactNode;
    children: React.ReactNode;
    isOpened?: boolean; 
    setActiveIndex?: () => void;
}

const Accordion: React.FC<PropsType> = ({ title, children, isOpened = false, setActiveIndex }) => {
    const [isOpen, setIsOpen] = useState(isOpened);

    useEffect(() => {
        if(setActiveIndex && isOpen){
            setActiveIndex();
        }
    },[isOpen])

    useEffect(() => {
        setIsOpen(isOpened);
    },[isOpened])

    const toggleOpen = () => {
        setIsOpen(value => !value);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    return (
        <>
            <TouchableOpacity onPress={toggleOpen} style={styles.heading} activeOpacity={0.6}>
                {title}
                <Ionicons name={isOpen ? "chevron-up-outline" : "chevron-down-outline"} size={18} color="black" />
            </TouchableOpacity>
            <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
                {children}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    heading: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10
    },
    hidden: {
        height: 0,
    },
    list: {
        overflow: 'hidden'
    },
})

export default Accordion;