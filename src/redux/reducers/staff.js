import { ADD_WORKER, DELITE_WORKER, UPDATE_WORKER } from '../action';
import {
  FETCH_STAFF_BEGIN,
  FETCH_STAFF_SUCCESS,
  FETCH_STAFF_FAILURE
} from '../action/fetchAction';

const initialState = {
  staff: [],
  loading: false,
  error: null
};

export default function walkings(state = initialState, action) {
  switch(action.type) {
    case FETCH_STAFF_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FETCH_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        staff: action.staff
      };

    case FETCH_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        staff: []
      };
      case ADD_WORKER:     
        return Object.assign({}, { walks: state.staff.concat(action.worker), loading: state.loading, error: state.error});
      case UPDATE_WORKER:
        //Исправить Update
        return Object.assign({}, { walks: [].concat(state.staff.slice(0, action.i), [{ id: state.staff[action.i].id, date: action.walking.date, distance: action.walking.distance }] ,state.walks.slice(action.i + 1)), loading: state.loading, error: state.error});       
      case DELITE_WORKER:
        let id = () => {
          for(let i = 0; i < state.staff.length; i++) {       
          if(state.staff[i].id === action.id) {                                      
            return i;
          }
        }};
        if (id() === undefined) {
          return state
        }else return Object.assign({}, { walks: [].concat(state.staff.slice(0, id()), state.staff.slice(id() + 1)), loading: state.loading, error: state.error});
    default:
      return state;
  }
}
