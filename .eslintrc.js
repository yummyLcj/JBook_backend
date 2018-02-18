module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": ["error", 4],
        'comma-dangle': [2, 'never'],
        'no-plusplus': ["error", { "allowForLoopAfterthoughts": true }]
    },
    "globals": {
        "next": false
    }
};
