import React from 'react';
import { vehicleEnums } from '../../../enums';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../../../constants';

const VehicleTypeIcon: React.FC<{ type: vehicleEnums.VehicleType, color?: keyof typeof COLORS }> = ({ type, color }) => {
    let iconNode = <></>;
    switch (type) {
        case vehicleEnums.VehicleType.Bus:
            iconNode = <FontAwesome name='bus' size={24} color={COLORS[color as never] || COLORS['danger-800']} />
            break;
        case vehicleEnums.VehicleType.Plane:
            iconNode = <FontAwesome name='plane' size={24} color={COLORS[color as never] || COLORS['danger-800']} />
            break;
        case vehicleEnums.VehicleType.Train:
            iconNode = <FontAwesome name='train' size={24} color={COLORS[color as never] || COLORS['danger-800']} />
            break;
    }

    return iconNode;
}

export default VehicleTypeIcon;