
export const rating = {
     "type": "rating",
     "name": "",
     "title": "",
     "defaultValue": 5,
     "rateMin": 1,
     "rateMax": 10
};

export const panel = {
    "type": "panel",
    "name": "",
    "elements": []
   };

export const page = {
    "name": "",
    "title": "",
    "elements": []
   }

export const json = {
    "title": "Staff Behavioral Survey Question",
    "description": "This survey collects workmates rating of their colleagues on behavioral objectives. Please rate fairly.",
    "focusFirstQuestionAutomatic": false,
    "completedHtmlOnCondition": [
     {
      "html": "Thanks for your feedback."
     }
    ],
    "pages": [page],
    "showPrevButton": true,
    "showQuestionNumbers": "off",
    "widthMode": "static",
    "width": "800"
   };
