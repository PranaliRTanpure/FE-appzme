import { ActionType } from "../action-type";
import { IS_LOADING, LOADER_OFF, LOADER_ON } from "../actions/loader-action";

export type LoaderState = {
	isLoading: boolean;
};

const initialState: LoaderState = {
	isLoading: false,
};

const getLoaderReducer = (
	state = initialState,
	action: ActionType<boolean>
) => {
	switch (action.type) {
		case LOADER_ON:
			return { ...state, isLoading: true };
		case LOADER_OFF:
			return { ...state, isLoading: false };
		case IS_LOADING:
			return { ...state, isLoading: action.payload };

		default:
			return { ...state, isLoading: false };
	}
};

export default getLoaderReducer;
