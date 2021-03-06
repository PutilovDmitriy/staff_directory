import { AppActions } from './../types/actions';
import { Staff } from './../types/Staff';
import { WorkerActions } from '../action';
import { FetchActions } from '../action/fetchAction';


const initialState: Staff = {
  staff: [],
  loading: false,
  error: null
};

const staffReducer = (state = initialState, action: AppActions): Staff => {
  switch (action.type) {
    case FetchActions.FETCH_STAFF_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      };

    case FetchActions.FETCH_STAFF_SUCCESS:
      return {
        ...state,
        loading: false,
        staff: action.staff
      };

    case FetchActions.FETCH_STAFF_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        staff: []
      };
    case WorkerActions.ADD_WORKER:
      return { staff: state.staff.concat(action.worker), loading: state.loading, error: state.error };
    case WorkerActions.UPDATE_WORKER:
      const calculateN = (): number => {
        for (let n = 0; n < state.staff.length; n++) {
          if (state.staff[n].id === action.id) {
            return n
          }
        }
        return -1;
      };
      let n = calculateN()
      let workersBefore = state.staff.slice(0, n)
      let workersAfter = state.staff.slice(n + 1)
      return {
        staff: [
          ...workersBefore,
          ...[{
            id: action.worker.id,
            FIO: action.worker.FIO,
            position: action.worker.position,
            birthday: action.worker.birthday,
            gender: action.worker.gender,
            isFired: action.worker.isFired,
            colleagues: action.worker.colleagues
          }],
          ...workersAfter
        ],
        loading: state.loading,
        error: state.error
      }
    case WorkerActions.DELETE_WORKER:
      const calculateI = (): number | undefined => {
        for (let i = 0; i < state.staff.length; i++) {
          if (state.staff[i].id === action.id) {
            return i;
          }
        }
      };
      let i = calculateI()
      if (i !== undefined) {
        return {
          staff: [
            ...state.staff.slice(0, i),
            ...state.staff.slice(i + 1)
          ],
          loading: state.loading,
          error: state.error
        }
      }
    default:
      return state;
  }
}

export default staffReducer;