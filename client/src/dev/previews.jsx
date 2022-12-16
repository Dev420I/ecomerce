import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import ItemDetails from "../scenes/itemDetails/ItemDetails";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/ItemDetails">
                <ItemDetails/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
