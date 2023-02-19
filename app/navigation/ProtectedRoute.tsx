import React from 'react';
import { userEnums } from '../enums';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
type PropsType = {
    path: string;
    redirectPath: string;
    component: JSX.Element;
    permission: userEnums.Role[];
    role: userEnums.Role;
    Stack: any;
}

const ProtectedRoute: React.FC<PropsType> = ({ Stack, path, redirectPath, component, permission, role }) => {
    if (permission.includes(role)) {
        return <Stack.Screen name={path} component={component} />
    }
    return <Stack.Screen />
};

export default ProtectedRoute;