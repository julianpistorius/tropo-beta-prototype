import * as R from "ramda";
import { editListItem } from "../utils";
import get from "../utils/get";
import initProjects from "../PROJECT_DATA.json";
import updateList from "../utils/updateList";
import edit from "material-ui/svg-icons/image/edit";

const initState = {
  isFetching: false,
  data: initProjects
};

export default function list(state = initState, action) {
  switch (action.type) {
    case "CONFIRM_MOVE_TO_PROJECT":
      return R.merge(state, {
        data: state.data.map(
          project =>
            project.id === action.data.oldProject
              ? R.merge(project, {
                  [action.data.assetType]: R.reject(
                    R.equals(action.data.assetId),
                    project[action.data.assetType]
                  )
                })
              : project.id === action.data.newProject
                ? R.merge(project, {
                    [action.data.assetType]: R.append(
                      action.data.assetId,
                      project[action.data.assetType]
                    )
                  })
                : project
        )
      });
    case "ADD_IMAGE_TO_PROJECT":
      return R.merge(state, {
        data: editListItem("id", action.project, {
          images: [...get.byId(action.project)(state.data).images, action.image]
        })(state.data)
      });
    case "CREATE_INSTANCE":
      return action.instance.project
        ? R.merge(state, {
            data: editListItem("id", action.instance.project, {
              instances: [
                ...get.byId(action.instance.project)(state.data).instances,
                action.instance.id
              ]
            })(state.data)
          })
        : state;
    case "CREATE_VOLUME":
      return action.volume.project
        ? R.merge(state, {
            data: editListItem("id", action.volume.project, {
              volumes: [
                ...get.byId(action.volume.project)(state.data).volumes,
                action.volume.id
              ]
            })(state.data)
          })
        : state;
    case "CREATE_LINK":
      return action.link.project
        ? R.merge(state, {
            data: editListItem("id", action.link.project, {
              links: [
                ...get.byId(action.link.project)(state.data).links,
                action.link.id
              ]
            })(state.data)
          })
        : state;
    case "EDIT_PROJECT":
      return R.merge(state, {
        isSubmitting: true,
        data: updateList.name(
          action.data.name,
          action.data.provider,
          state.data
        )
      });
    case "CREATE_PROJECT":
      return R.merge(state, {
        data: R.append(
          action.project,
          state.data.filter(item => item.id !== action.project.id)
        )
      });
    case "DELETE_PROJECT":
      return R.merge(action.list, {
        data: R.reject(R.propEq("id", action.project), state.data)
      });
    default:
      return state;
  }
}
