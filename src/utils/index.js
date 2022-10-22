import forge from 'node-forge';
import { toast } from 'react-toastify';
import store from "../redux/store/store.js";
import { changeLoginStatus } from "../redux/actions";
import { BIANNUALS, CHARACTERS, QUARTERS, UNITS } from './constants.js';
import { round } from 'lodash';


const notificationTypeMapper = {
    success: toast.success,
    info: toast.info,
    warning: toast.warn,
    error: toast.error
}


export const  parseJwt = token => {
    try {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
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
}


export const isLoggedInFromLocalStorage = () => {
    const localStorage = window.localStorage;
    const tokens = localStorage.getItem('tokens');
    return Boolean(tokens);
}


export const fireNotification = (type, message) => {
    const notification = notificationTypeMapper[type];
    notification(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
  };
  

  String.format = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {       
        var reg = new RegExp("\\{" + i + "\\}", "gm");             
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}


export function encryptData( publicKey, string){
    const pubKey = forge.pki.publicKeyFromPem(publicKey);
    const encrypted = pubKey.encrypt(string, "RSA-OAEP", {
        md: forge.md.sha256.create(),
        mgf1: forge.mgf1.create()
    });
    const base64 = forge.util.encode64(encrypted);
    return base64;

}

export function checkSessionStatus (response) {
    if (response.status === 401) {      
        store.dispatch(changeLoginStatus(false));
    }
}


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

}


export const generateString = length => {
    let result = ' ';
    const charactersLength = CHARACTERS.length;
    for ( let i = 0; i < length; i++ ) {
        result += CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result.trim();
}


export const logout = () => {
    localStorage.clear()
    store.dispatch(changeLoginStatus(false));
}


export const getPeriods = months => {
    const mapper = {
        3: QUARTERS,
        6: BIANNUALS
    }

    return mapper[months]
}

export const createObjectPayload = (data, initiatives, measures, periods) => {
    const initiativesPayload = [];
    const measuresPayload = [];
    const periodTargetsPayload = [];
  
    initiatives.map(initiative => {
      const initiativePayload = {};
      initiativePayload['name'] = data[initiative.initiativeId];
      if (data[initiative.weightId] !== "") initiativePayload['weight'] = data[initiative.weightId];
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
            periodTargetPayload['target'] = round(data[period]/100, 2)
            periodTargetPayload['period'] = period;
            periodTargetsPayload.push(periodTargetPayload);
        } 

        delete data[period];
        return undefined;
    })
  
    data.measures = measuresPayload;
    data.initiatives = initiativesPayload;
    if (periodTargetsPayload.length > 0) data.period_targets = periodTargetsPayload;
    
    Object.keys(data).map(key => {
        if (data[key]==="") {
            delete data[key];
        }
        return undefined;
    });

    if (data.data_type === UNITS) {
        data.target = data.units_target;
    } else {
        data.target = round(data.percentage_target / 100, 2);
    }

    if (data.weight) {
        data.weight = round( data.weight / 100, 2);
    }

    return data;
  };


export const searchOrgChart = (orgChart, roleId) => {
    for (let i = 0; i < orgChart.length; i++) {
        const role = orgChart[i]; 

        if (role.id.toString() === roleId) {
            
            return role;
        } else {
            return searchOrgChart(role.underlings, roleId);
        }
    }
};


export const isObjectEmpty = obj => {
    return obj 
        && Object.keys(obj).length === 0 
        && Object.getPrototypeOf(obj) === Object.prototype;
}


export const arePeriodicalInputsValid = (values, periods, setFieldError) => {
    let total = 0;
    periods.map(period => {
        total += parseInt(values[period]);
    });

    if (total !== 100) {
        periods.map(period => {
            setFieldError(period, "All periodical targets have to add up to 100");
        });

        return false;
    }

    return true;
}

export const isWeightsFieldValid = (values, remainingObjectiveWeight, setFieldError) => {

    if (parseInt(values.weight) > remainingObjectiveWeight){ 
        setFieldError("weight", `Objective weights cannot exceed 100. Remaining maximum weight for an objective is ${remainingObjectiveWeight} `);
        return false;
    }

    return true;
} 
