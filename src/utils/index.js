import forge from 'node-forge';
import { toast } from 'react-toastify';
import store from "../redux/store/store.js";
import { changeLoginStatus, setNotifications, setWebSocket } from "../redux/actions";
import { BIANNUALS, CHARACTERS, NESTED, OBJECTIVES, PERSPECTIVES, QUARTERS, UNITS } from './constants.js';
import { socketsMessagesURL } from '../services/urls.js';
import { LOGOUT } from '../redux/actions/actionTypes.js';

const notificationTypeMapper = {
    success: toast.success,
    info: toast.info,
    warning: toast.warn,
    error: toast.error
};

export const  parseJwt = token => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload); 
    } catch (error) {
        console.log(token);
    }
    
};

export const getHeaderDetails = (formData) => {
    const {localStorage} = window;
    const accessToken = JSON.parse(localStorage.getItem('tokens'))?.access;
    const config = {
        headers: { Authorization: `Bearer ${accessToken}` }
    };
    
    if (formData){ 
        config.headers['Content-Type'] = "multipart/form-data"; 
    }

    return config;
};

export const isLoggedInFromLocalStorage = () => {
    const {localStorage} = window;
    const tokens = localStorage.getItem('tokens');
    return Boolean(tokens);
}

export const fireNotification = (type, message) => {
    const notification = notificationTypeMapper[type];
    notification(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  };
  
  String.format = function() {
    let s = arguments[0];
    for (let i = 0; i < arguments.length - 1; i++) {       
        const reg = new RegExp("\\{" + i + "\\}", "gm");             
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};

export function encryptData( publicKey, string){
    const pubKey = forge.pki.publicKeyFromPem(publicKey);
    const encrypted = pubKey.encrypt(string, "RSA-OAEP", {
        md: forge.md.sha256.create(),
        mgf1: forge.mgf1.create()
    });
    return forge.util.encode64(encrypted);

};

export function checkSessionStatus (response) {
    if (response.status === 401) {      
        store.dispatch(changeLoginStatus(false));
    }
};

export const createErrorObjects = (data) => {
    let errorObjects = []
    if (data) {
        Object.keys(data).forEach(key => {
                errorObjects.push({
                    name: key,
                    errors: data[key]
                })
        })
    } 

    return errorObjects

};

export const generateString = length => {
    let result = ' ';
    const charactersLength = CHARACTERS.length;
    for ( let i = 0; i < length; i++ ) {
        result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.trim();
};

export const logout = () => {
    localStorage.clear()
    store.dispatch(changeLoginStatus(false));
    store.dispatch({type: LOGOUT});
};

export const getPeriods = months => {
    const mapper = {
        3: QUARTERS,
        6: BIANNUALS
    }

    return mapper[months]
};

export const areInitiativesValid = (initiativesSchema, data) => {
    for (let i=0; i<initiativesSchema.length; i++) {
        if (!data[initiativesSchema[i]]?.cascadeId || !data[initiativesSchema[i]].initiativeId ) {
            return false;
        }

        return true;
    }
};

export const createObjectivePayload = (data, initiativesSchema, measures, periods, milestones) => {
    const initiativesPayload = [];
    const measuresPayload = [];
    const periodTargetsPayload = [];
    const milestonesPayload = [];
  
    initiativesSchema.forEach(initiative => {
      const initiativePayload = {};
      if (!data[initiative.cascadeId]) {
        return;
      }

      initiativePayload['name'] = data[initiative.initiativeId];
      if (!initiativePayload['name']) {
        return
      }
      if (data[initiative.weightId] !== "") {
        initiativePayload['weight'] = data[initiative.weightId];
      }
      initiativePayload['role'] = data[initiative.cascadeId];

      delete data[initiative.initiativeId];
      delete data[initiative.weightId];
      delete data[initiative.cascadeId];
  
      initiativesPayload.push(initiativePayload);
    });

    milestones?.forEach(milestone => {
        if (!data[milestone.milestoneId]) {
            return;
        }
        const milestonePayload = {};
        milestonePayload['description'] = data[milestone.milestoneId];
        milestonePayload['percentage'] = data[milestone.percentageId];
        delete data[milestone.milestoneId];
        delete data[milestone.percentageId];

        milestonesPayload.push(milestonePayload);
    
    });

    measures.forEach(measure => {
        const measurePayload = {};
        measurePayload['name'] = data[measure.measureId];
        measurePayload['weight'] = data[measure.weightId];
        
        delete data[measure.weightId];
        delete data[measure.measureId];

        measuresPayload.push(measurePayload);
  
    });

    periods.forEach(period => {
        const periodTargetPayload = {};
        if (data[period]) {
            periodTargetPayload['target'] = data[period]
            periodTargetPayload['period'] = period;
            periodTargetsPayload.push(periodTargetPayload);
        } 

        delete data[period];
    })
  
    data.measures = measuresPayload;
    data.initiatives = initiativesPayload;
    data.milestones = milestonesPayload;

    console.log(data);
    if (periodTargetsPayload.length > 0) {
      data.period_targets = periodTargetsPayload;
    }
    data.data_type === UNITS? delete data["percentage_target"]: delete data["units_target"]
    // Clear empty fields
    Object.keys(data).forEach(key => {
        if (data[key]?.length===0) {
            delete data[key];
        }
        return undefined;
    });

    return data;
  };

export const searchOrgChart = (orgChart, roleId) => {
    for (let i = 0; i < orgChart.length; i++) {
        const role = orgChart[i]; 

        if (role?.id?.toString() === roleId) {
            
            return role;
        } else {
            return searchOrgChart(role?.underlings, roleId);
        }
    }
};


export const isObjectEmpty = obj => {
    return obj 
        && Object.keys(obj).length === 0 
        && Object.getPrototypeOf(obj) === Object.prototype;
};

const getTarget = values => {
    let target;
    values.data_type === UNITS? target = values.units_target: target = values.percentage_target
    
    return parseInt(target);
};

export const arePeriodicalInputsValid = (values, periods, setFieldError) => {
    let total = 0;
    const target = getTarget(values);

    periods.forEach(period => {
        total += parseFloat(values[period]);
    });

    if (total !== target) {
        periods.forEach(period => {
            setFieldError(period, `All periodical targets have to add up to ${target}`);
        });

        return false;
    }

    return true;
};

export const isWeightsFieldValid = (values, remainingObjectiveWeight, setFieldError) => {

    if (parseInt(values.weight) > remainingObjectiveWeight){ 
        setFieldError("weight", `Objective weights cannot exceed 100. Remaining maximum weight for an objective is ${remainingObjectiveWeight} `);
        return false;
    }

    return true;
} ;

export const countUnreadNotifications = (notifications) => {
    let count = 0;

    for (const notification of notifications) {
        if (notification.is_seen === false || notification.needs_attention) {
          count++;
        }
    }

    return count;
};

const handleNotifications = data => {
    store.dispatch(setNotifications(data));
};

export const webSocketMessageHandler = event => {
    const data = JSON.parse(event.data);
    const action_mapper = {
        new_notifications: handleNotifications,
        undefined: () => {},
    };
    action_mapper[data.message.message_type](data.message.data);
};

export const connectWebSocket = () => {
    const webSocket = new WebSocket(socketsMessagesURL);
    store.dispatch(setWebSocket(webSocket));
    webSocket.onmessage = webSocketMessageHandler;
    webSocket.onclose = connectWebSocket;
    
    return webSocket;
};

export const getTimeDifference = (dateString) => {
    const date = new Date(dateString);
    const options = { timeZone: 'Africa/Nairobi' };
    const now = new Date();
    const dateTimeString = now.toLocaleString('en-US', options);

    const localizedNow = new Date(Date.parse(dateTimeString));
    const diff = localizedNow - date;
  
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
  
    if (days < 2) {
      return `${hours} hours, ${minutes} minutes ago`;
    } else {
      return `${days} days ago`;
    }
  }
  

export const getCurrentDashboardObject = (perspectives, mode, currentObjectID ) => {
    let objects = [];
    
   if (mode === PERSPECTIVES) {
        objects = perspectives;
   } else if (mode === OBJECTIVES) {
        perspectives.forEach(perspective => 
            objects = objects.concat(perspective.objectives));
   } else {
        perspectives.forEach(perspective =>
            perspective.objectives?.forEach(objective => 
                objects = objects.concat(objective.initiatives)));
   }
   
   return objects.find(object => object.id === parseInt(currentObjectID));
    
};

export const getDashboardObjects = (currentObject, mode) => {
    if (mode === PERSPECTIVES) {
        return currentObject?.objectives;
    } else if (mode === OBJECTIVES) {
        return currentObject?.initiatives;
    } else {
        return null;
    }
};

export const filterEmployees = (employee, filters) => {
    for (const key of Object.keys(filters)) {
        const filter = filters[key];
        let passesFilter = false;
        if (filter.type === NESTED) {
            passesFilter = employee[key]?.id === filter.value;
        } else {
            passesFilter = employee[key] === filter.value;
        }

        if (!passesFilter) {
          return false;
        }
    }

    return true;
};

export const getDivisionsFromEmployees = (employees, typeKey) => { //get departments, division, or section objects 
    const divisionsMap = {};

    for (const employee of employees) {
        divisionsMap[employee[typeKey]?.id] = employee[typeKey].name;
    }

    return divisionsMap;
};

export const getPercentage = (value, otherValue) => {
    let result
    value && otherValue? result = Math.round(value/ otherValue * 100): result = 0;
    return result;
};

export const deleteFromObjectlist = (items, key, deleteId) => {
    for (let index=0; index < items.length; index++ ) {
        if (items[index][key] === deleteId) {
            items.splice(index, 1);
            break;
        }
    }

    return [...items];
}

export const convertFromNestedToFlat = (nestedObject, key) => {
    let flatList = nestedObject[key];

    for (const item of flatList) {
        flatList = flatList.concat(convertFromNestedToFlat(item, key));
    }

    return flatList;
}

export const calculatePeriodPerfomance = (currentObject) => {
    const last_period_score = currentObject?.last_period_score
    const actualPercentage = currentObject?.percentage_progress;
    const percentage_diff = actualPercentage - last_period_score;

    if (!last_period_score) {
        return actualPercentage
    }

    return (percentage_diff / currentObject?.current_period_target);
}


export const createOverallCurrentObject = (perspectives) => {
    const currentObject = {
        percentage_progress: 0,
        percentage_target: 0,
        current_period_target: 0,
        last_period_score: 0
    }
    for (let perspective of perspectives) {
        currentObject.percentage_progress += perspective.percentage_progress * perspective.weight/100;
        currentObject.current_period_target += perspective.current_period_target * perspective.weight/100;
        currentObject.last_period_score += perspective.last_period_score * perspective.weight/100;
    }
    return currentObject;
}