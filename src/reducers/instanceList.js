import * as R from "ramda";
import { get, editListItem } from "../utils";
import initInstances from "../INSTANCE_DATA.json";

let initState = { isFetching: false, showForm: false, data: initInstances };

export default function list(state = initState, action) {
  switch (action.type) {
    case "CREATE_INSTANCE_BUILDING":
      return R.merge(state, {
        data: editListItem("id", action.instance.id, { progress: 80 })(
          state.data
        )
      });
    case "CREATE_INSTANCE_COMPLETE":
    return R.merge(state, {
    data: editListItem("id", action.instance.id, { progress: 100, activity: "Active" })(
        state.data
    )
    });
    case "CREATE_INSTANCE":
      return R.merge(state, {
        data: R.append(
          action.instance,
          state.data.filter(item => item.id !== action.instance.id)
        )
      });
    case "DELETE_INSTANCE":
      return R.merge(action.list, {
        data: R.reject(R.propEq("id", action.instance), state.data)
      });

    default:
      return state;
  }
}

// Selectors
export const getInstanceList = ({ instanceList, providerList }) => {
  if (R.isEmpty(providerList.data)) return { isFetching: true, data: [] };

  const image = item => {
    let provider = get.byId(item.provider)(providerList.data);

    let size = provider ? get.byId(item.size)(provider.sizes) : null;

    return R.merge(item, {
      provider: provider.name,
      size: size.name
    });
  };

  const data = instanceList.data.map(image);
  return R.merge(instanceList, { data });
};