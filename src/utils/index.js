import forge from 'node-forge';
import { toast } from 'react-toastify';
import store from "../redux/store/store.js";
import { changeLoginStatus, setNotifications, setWebSocket } from "../redux/actions";
import { BIANNUALS, CHARACTERS, NESTED, OBJECTIVES, PERSPECTIVES, QUARTERS, UNITS } from './constants.js';
import { socketsMessagesURL } from '../services/urls.js';

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
    const localStorage = window.localStorage;
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
    const localStorage = window.localStorage;
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
    const base64 = forge.util.encode64(encrypted);
    return base64;

};

export function checkSessionStatus (response) {
    if (response.status === 401) {      
        store.dispatch(changeLoginStatus(false));
    }
};

export const createErrorObjects = (data) => {
    let errorObjects = []
    if (data) {
        Object.keys(data).map(key => {
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
        console.log(initiativesSchema[i])
        if (!data[initiativesSchema[i]]?.cascadeId || !data[initiativesSchema[i]].initiativeId ) {
            return false;
        }

        return true;
    }
};

export const createObjectivePayload = (data, initiativesSchema, measures, periods) => {
    const initiativesPayload = [];
    const measuresPayload = [];
    const periodTargetsPayload = [];
  
    initiativesSchema.map(initiative => {
      const initiativePayload = {};
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
      return undefined;
    });

    measures.map(measure => {
      const measurePayload = {};
      measurePayload['name'] = data[measure.measureId];
      measurePayload['weight'] = data[measure.weightId];
      
      delete data[measure.weightId];
      delete data[measure.measureId];

      measuresPayload.push(measurePayload);
  
      return undefined;
    });
  
    periods.map(period => {
        const periodTargetPayload = {};
        if (data[period]) {
            periodTargetPayload['target'] = data[period]
            periodTargetPayload['period'] = period;
            periodTargetsPayload.push(periodTargetPayload);
        } 

        delete data[period];
        return undefined;
    })
  
    data.measures = measuresPayload;
    data.initiatives = initiativesPayload;
    if (periodTargetsPayload.length > 0) {
      data.period_targets = periodTargetsPayload;
    }
    data.data_type === UNITS? delete data["percentage_target"]: delete data["units_target"]
    // Clear empty fields
    Object.keys(data).map(key => {
        if (data[key].length===0) {
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
    values.data_type === UNITS? target = Math.abs(values.endline - values.baseline): target = values.percentage_target
    
    return parseInt(target)
};

export const arePeriodicalInputsValid = (values, periods, setFieldError) => {
    let total = 0;
    const target = getTarget(values);
    periods.map(period => {
        total += parseInt(values[period]);
    });

    if (total !== target) {
        periods.map(period => {
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
        if (notification.is_seen === false) {
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
    console.log(data.message.message_type)
    action_mapper[data.message.message_type](data.message.data);
};

export const connectWebSocket = () => {
    const webSocket = new WebSocket(socketsMessagesURL);
    store.dispatch(setWebSocket(webSocket));
    webSocket.onmessage = webSocketMessageHandler;
    webSocket.onclose = connectWebSocket;
    
    return webSocket;
};

export const getAgeString = createdAt => {
    const startStrings = createdAt.split(" ");
    const startDateStrings = startStrings[0].split("-");
    const startTimeStrings = startStrings[1].split(":");
    const startDate = new Date(
        startDateStrings[0], startDateStrings[1], startDateStrings[2], 
        startTimeStrings[0], startTimeStrings[1], startTimeStrings[2]
        );

    const endDate = new Date();
    let diff = (endDate.getTime() - startDate.getTime()) / 1000;
    console.log(startDate);
    const days = Math.floor(diff / 86400);
    diff -= days * 86400;
    const hours = Math.floor(diff / 3600) % 24;
    diff -= hours * 3600;
    const minutes = Math.floor(diff / 60) % 60;
    diff -= minutes * 60;
    const seconds = Math.floor(diff % 60); 
    
    let ageString = "";

    if (days > 3) {
        ageString = `${startDate.getDay}/${startDate.getMonth()}/${startDate.getFullYear}`
    } 
    else if (days > 0) {
        ageString = `${days} days`;
        ageString += " ago.";
    } else {
        hours? ageString += hours + "h ": ageString += "";
        minutes? ageString += minutes + "m ": ageString += "";
        !hours && seconds? ageString += seconds + " s ": ageString += "";
        ageString += "ago";
    }

    return ageString;
};

export const getCurrentDashboardObject = (perspectives, mode, currentObjectID ) => {
    let objects = [];
    
   if (mode === PERSPECTIVES) {
        objects = perspectives;
   } else if (mode === OBJECTIVES) {
        perspectives.map(perspective => 
            objects = objects.concat(perspective.objectives));
   } else {
        perspectives.map(perspective =>
            perspective.objectives?.map(objective => 
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
