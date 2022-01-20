////////////////////////////////////////
// IMPORT
////////////////////////////////////////

import {PermissionsAndroid} from "react-native";
////////////////////
// Local
import Common from './Common';

////////////////////////////////////////

const requestStoragePermission = async () => {
    try {
        if (Common.checkAndroid()) {
            let granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
            ]);
            return granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED
                && granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED;
            // const granted = await PermissionsAndroid.request(
            //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            //     {
            //         title: 'My App Storage Permission',
            //         message: 'My App needs access to your storage ' +
            //             'so you can save your photos',
            //     },
            // );
            // return granted;
        }
        return true;
    } catch (err) {
        // console.error('Failed to request permission ', err);
        return false;
    }
};

////////////////////////////////////////

export {
    requestStoragePermission
};
