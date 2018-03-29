import * as R from 'ramda';
import { get } from '../utils';
import initVolumes from "../VOLUME_DATA.json"; 

let initState =  { isFetching: false, showForm: false, data: initVolumes };

export default function list( state = initState, action ) {
    switch (action.type) {
    case "CREATE_VOLUME":
        return R.merge( state,
            {
                data: R.append(
                    action.volume, state.data.filter(
                        item => item.id !== action.volume.id
                    )
                )
            }
        );
    case "DELETE_VOLUME":
        return R.merge( action.list,
            {   
                data: R.reject(
                    R.propEq( 'id', action.volume ), 
                    state.data
                ),    
            },
        );

    default:
        return state;
    }
}