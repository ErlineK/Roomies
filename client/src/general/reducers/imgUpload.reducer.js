// reducer to handle image upload state

const imgUploadReducer = (state, action) => {
  switch (action.type) {
    case "UPLOAD_READY": //got selected image
      return {
        ...state,
        readyToUpload: true,
        displayImg: action.payload
      };
    case "UPLOAD_CANCEL": //original image to be returned in payload
      return {
        ...state,
        isLoading: false,
        isError: false,
        readyToUpload: false,
        displayImg: action.payload
      };
    case "UPLOAD_INIT": //start upload
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        readyToUpload: false,
        displayImg: action.payload
      };

    case "UPLOAD_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
};

export default imgUploadReducer;
