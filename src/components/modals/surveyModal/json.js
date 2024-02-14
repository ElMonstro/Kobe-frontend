
export const panel = {
    "type": "panel",
    "name": "",
    "elements": [
     {
      "type": "rating",
      "name": "np-score",
      "title": "",
      "defaultValue": 5,
      "rateMin": 0,
      "rateMax": 10
     }
    ]
   }

export const page = {
    "name": "",
    "title": "Joshua Moracha",
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
    "showPrevButton": false,
    "showQuestionNumbers": "off",
    "widthMode": "static",
    "width": "800"
   };
