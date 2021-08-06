const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //regex to check for valid email

//can also use HTML regex to get rid of warning in console log --> /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default (emails) => {
    //split string on the comma character so we can have array of emails
    const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => re.test(email) === false)
    .filter(email => email !== "");
    //for every single email, we trim it, return the trimmed string, and end up with a new array of trimmed emails

    if (invalidEmails.length) {
        return `These emails are invalid: ${invalidEmails}`;
        //using backticks because I want to use template strings
    }

    return;
};