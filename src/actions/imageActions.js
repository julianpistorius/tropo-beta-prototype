export const addToProject = (image, project) => ({
    type: "ADD_IMAGE_TO_PROJECT",
    image,
    project
});

export const changeImageProject = (project) => ({
    type: "CHANGE_IMAGE_PROJECT",
    project
});

export const toggleAddImageToProject = ( image, project ) => ({
    type: "TOGGLE_ADD_IMAGE_TO_PROJECT_FORM",
    image,
    project,
})

export const resetAddToProject = () => ({
    type: "RESET_ADD_TO_PROJECT",
})

export const toggleFavorite = (image) => ({
    type: "TOGGLE_FAVORITE_IMAGE",
    image
})