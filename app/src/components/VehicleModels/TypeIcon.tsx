import React from 'react';
import { vehicleEnums } from '../../../enums';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../../constants';

const VehicleTypeIcon: React.FC<{ type: vehicleEnums.VehicleType, color?: keyof typeof COLORS, size?: number }> = ({ type, color, size = 24 }) => {
    let iconNode = <></>;
    switch (type) {
        case vehicleEnums.VehicleType.Bus:
            iconNode = <FontAwesome name='bus' size={size} color={COLORS[color as never] || COLORS['danger-800']} />
            break;
        case vehicleEnums.VehicleType.Plane:
            iconNode = <FontAwesome name='plane' size={size} color={COLORS[color as never] || COLORS['danger-800']} />
            break;
        case vehicleEnums.VehicleType.Train:
            iconNode = <FontAwesome name='train' size={size} color={COLORS[color as never] || COLORS['danger-800']} />
            break;
    }

    return iconNode;
}

export default VehicleTypeIcon;