import * as R from 'ramda';
import { get } from '../utils';
import initTags from "../TAG_DATA.json"; 

let initState =  { isFetching: false, data: initTags };

export default function list( state = initState, action ) {
    switch (action.type) {
    case "CREATE_TAG":
        return R.merge( state,
            {
                data: R.append(
                    action.instance, state.data.filter(
                        item => item.id !== action.image.id
                    )
                )
            }
        );
    case "DELETE_TAG":
        return R.merge( action.list,
            {   
                data: R.reject(
                    R.propEq( 'id', action.instance ), 
                    state.data
                ),    
            },
        );

    default:
        return state;
    }
}